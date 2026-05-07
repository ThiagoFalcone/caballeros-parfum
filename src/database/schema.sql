-- ============================================================
-- Caballeros Parfum — Schema Supabase
-- Cole este SQL no editor do seu projeto em supabase.com
-- ============================================================

-- Tabela de pedidos
create table if not exists pedidos (
  id            uuid        default gen_random_uuid() primary key,
  created_at    timestamptz default now(),
  user_id       uuid        references auth.users(id) on delete set null,

  -- dados do cliente (útil quando não há login)
  nome_cliente  text        not null,
  email_cliente text        not null,
  whatsapp      text,

  -- itens: [{ id, nome, marca, preco, quantidade }]
  itens         jsonb       not null default '[]',
  total         numeric     not null,

  status        text        not null default 'pendente'
                            check (status in ('pendente','confirmado','enviado','entregue','cancelado')),
  observacoes   text
);

-- Row Level Security
alter table pedidos enable row level security;

-- Clientes só veem seus próprios pedidos
create policy "users_select_own" on pedidos
  for select using (auth.uid() = user_id);

-- Clientes só criam pedidos vinculados a si
create policy "users_insert_own" on pedidos
  for insert with check (auth.uid() = user_id);

-- Admins veem tudo (via service_role key no backend)
-- Não criar policy pública para update/delete

-- ============================================================
-- Profiles (dados extras por usuário)
-- ============================================================
create table if not exists profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  nome       text,
  whatsapp   text,
  updated_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "profiles_select_own" on profiles
  for select using (auth.uid() = id);

create policy "profiles_upsert_own" on profiles
  for all using (auth.uid() = id);

-- Trigger: cria profile automaticamente ao cadastrar
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, nome)
  values (new.id, new.raw_user_meta_data ->> 'nome');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
