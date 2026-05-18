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

-- ============================================================
-- Estoque
-- ============================================================
create table if not exists estoque (
  perfume_id text primary key,
  quantidade integer not null default 0
);
alter table estoque enable row level security;
create policy "public_read_estoque" on estoque for select using (true);

insert into estoque (perfume_id, quantidade) values
  ('1',10),('2',10),('3',10),('4',10),('5',10),('6',10),
  ('7',10),('8',10),('9',10),('10',10),('11',10),('12',10),
  ('13',10),('14',10),('15',10),('16',10),('17',10),('18',10),
  ('19',10),('20',10),('21',10),('22',10),('23',10),('24',10),
  ('25',10),('26',10),('27',10),('28',10),('29',10),('30',10),
  ('31',10),('32',10),('33',10),('34',10),('35',10),('36',10),
  ('37',10),('38',10),('39',10),('40',10),('41',10),('42',10),
  ('43',10),('44',10),('45',10),('47',10),('48',10),('49',10),
  ('50',10),('51',10),('52',10),('54',10),('55',10),
  ('59',10),('60',10),('61',10),('62',10),('63',10),('64',10),
  ('65',10),('66',10),('67',10),('68',10),('69',10),('70',10),
  ('71',10),('72',10),('73',10),('74',10),('75',10),('76',10),
  ('77',10),('78',10)
on conflict (perfume_id) do nothing;

-- ============================================================
-- Avaliações
-- ============================================================
create table if not exists avaliacoes (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  perfume_id text        not null,
  nome       text        not null,
  nota       integer     not null check (nota between 1 and 5),
  comentario text,
  aprovado   boolean     not null default false
);
alter table avaliacoes enable row level security;
create policy "public_read_approved" on avaliacoes for select using (aprovado = true);
create policy "public_insert_avaliacao" on avaliacoes for insert with check (true);

-- ============================================================
-- Avisos de estoque
-- ============================================================
create table if not exists avisos_estoque (
  id         uuid        default gen_random_uuid() primary key,
  created_at timestamptz default now(),
  perfume_id text        not null,
  email      text        not null,
  unique (perfume_id, email)
);
alter table avisos_estoque enable row level security;
create policy "public_insert_aviso" on avisos_estoque for insert with check (true);
