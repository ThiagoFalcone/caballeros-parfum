import { Perfume } from '@/types'

// Fragrantica CDN — ID numérico direto da URL da página do perfume
// Formato: https://fimgs.net/mdimg/perfume/375x500.{ID}.jpg
const F = (id: number) => `https://fimgs.net/mdimg/perfume/375x500.${id}.jpg`

export const perfumes: Perfume[] = [
  // ── LATTAFA ──────────────────────────────────────────────────────────────
  {
    id: '1', slug: 'lattafa-khamrah', nome: 'Khamrah', marca: 'Lattafa',
    familia: 'Especiado', preco: 199.90,
    descricao: 'Rico e embriagante como o vinho das noites orientais. Baunilha cremosa, café e especiarias criam um gourmand oriental de longa duração que dominou os rankings mundiais.',
    notasTopo: ['Mandarina', 'Canela', 'Cardamomo'], notasCorpo: ['Baunilha', 'Café', 'Âmbar'], notasFundo: ['Tabaco', 'Sândalo', 'Almíscar'],
    imagemUrl: F(75805),
    destaque: true, ativo: true,
  },
  {
    id: '2', slug: 'lattafa-asad', nome: 'Asad', marca: 'Lattafa',
    familia: 'Especiado', preco: 174.90,
    descricao: 'O leão do Oriente. Majestoso e poderoso, uma composição marcante de especiarias, oud e madeiras que conquistou seguidores ao redor do mundo.',
    notasTopo: ['Cardamomo', 'Pimenta Rosa', 'Mandarina'], notasCorpo: ['Oud', 'Âmbar', 'Incenso'], notasFundo: ['Almíscar', 'Civet', 'Sândalo'],
    imagemUrl: F(72821),
    destaque: true, ativo: true,
  },
  {
    id: '3', slug: 'lattafa-badeeh-al-oud-for-glory', nome: "Bade'e Al Oud For Glory", marca: 'Lattafa',
    familia: 'Amadeirado', preco: 189.90,
    descricao: "Uma jornada olfativa pelos souks do Oriente Médio. Oud defumado encontra âmbar dourado e especiarias quentes numa composição que perdura horas na pele.",
    notasTopo: ['Oud', 'Especiarias'], notasCorpo: ['Rosa', 'Âmbar', 'Incenso'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(64948),
    destaque: true, ativo: true,
  },
  {
    id: '4', slug: 'lattafa-yara', nome: 'Yara', marca: 'Lattafa',
    familia: 'Floral', preco: 154.90,
    descricao: 'Feminino, frutado e florido. Yara é a fragrância das flores que desabrocham ao amanhecer no deserto — doce, viciante e sofisticada.',
    notasTopo: ['Orquídea', 'Heliotropo', 'Tangerina'], notasCorpo: ['Pêssego', 'Jasmim', 'Íris'], notasFundo: ['Almíscar', 'Baunilha', 'Cedro'],
    imagemUrl: F(76880),
    ativo: true,
  },
  {
    id: '5', slug: 'lattafa-raghba', nome: 'Raghba', marca: 'Lattafa',
    familia: 'Especiado', preco: 144.90,
    descricao: 'Doce e acolhedor como uma noite de inverno em Dubai. Baunilha e especiarias criam uma fragrância que abraça a alma — perfeita para o frio.',
    notasTopo: ['Especiarias', 'Bergamota'], notasCorpo: ['Oud', 'Rosa'], notasFundo: ['Baunilha', 'Âmbar', 'Almíscar'],
    imagemUrl: F(25807),
    ativo: true,
  },
  {
    id: '6', slug: 'lattafa-ameer-al-oudh-intense', nome: 'Ameer Al Oudh Intense', marca: 'Lattafa',
    familia: 'Oriental', preco: 209.90,
    descricao: 'O Príncipe do Oud. Uma versão intensa e luxuosa do clássico Ameer Al Oudh — mais profundo, mais persistente, mais majestoso.',
    notasTopo: ['Oud', 'Açafrão'], notasCorpo: ['Âmbar', 'Rosa', 'Incenso'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(64947),
    ativo: true,
  },

  // ── AL HARAMAIN ──────────────────────────────────────────────────────────
  {
    id: '7', slug: 'al-haramain-amber-oud-gold', nome: 'Amber Oud Gold Edition', marca: 'Al Haramain',
    familia: 'Oriental', preco: 229.90,
    descricao: 'O encontro perfeito entre o oud árabe e o âmbar dourado. Quente, sensual e envolvente — a edição Gold é a versão mais opulenta do ícone da casa.',
    notasTopo: ['Alecrim', 'Cedro', 'Bergamota'], notasCorpo: ['Especiarias', 'Cedro', 'Guaiacol'], notasFundo: ['Âmbar', 'Resinas', 'Almíscar'],
    imagemUrl: F(51817),
    destaque: true, ativo: true,
  },
  {
    id: '8', slug: 'al-haramain-laventure', nome: "L'Aventure", marca: 'Al Haramain',
    familia: 'Amadeirado', preco: 159.90,
    descricao: 'Uma aventura pelos desertos e oásis do Oriente. Frescor inicial que mergulha em profundas madeiras aromáticas — o best-seller masculino da casa.',
    notasTopo: ['Bergamota', 'Pimenta', 'Cardamomo'], notasCorpo: ['Patchouli', 'Vetiver', 'Cedro'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(40405),
    ativo: true,
  },
  {
    id: '9', slug: 'al-haramain-laventure-femme', nome: "L'Aventure Femme", marca: 'Al Haramain',
    familia: 'Floral', preco: 169.90,
    descricao: 'A versão feminina da aventura — flores exóticas, frutas douradas e um fundo oriental que define elegância com uma sofisticação rara.',
    notasTopo: ['Bergamota', 'Limão'], notasCorpo: ['Jasmim', 'Rosa', 'Íris'], notasFundo: ['Sândalo', 'Âmbar', 'Almíscar'],
    imagemUrl: F(51820),
    ativo: true,
  },
  {
    id: '10', slug: 'al-haramain-amber-oud-rouge', nome: 'Amber Oud Rouge Edition', marca: 'Al Haramain',
    familia: 'Floral', preco: 219.90,
    descricao: 'A edição Rouge do ícone Amber Oud. Rosas vermelhas e frutas vibrantes encontram um coração de oud e âmbar numa composição sensual e envolvente.',
    notasTopo: ['Rosa Vermelha', 'Frutas Vermelhas', 'Bergamota'], notasCorpo: ['Oud', 'Âmbar', 'Incenso'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(66100),
    ativo: true,
  },

  // ── RASASI ───────────────────────────────────────────────────────────────
  {
    id: '11', slug: 'rasasi-hawas', nome: 'Hawas', marca: 'Rasasi',
    familia: 'Cítrico', preco: 154.90,
    descricao: 'Fresco como a brisa do Mediterrâneo com profundidade oriental. Um aquático aromático que domina rankings no Oriente Médio e tem performance excepcional.',
    notasTopo: ['Menta', 'Bergamota', 'Maçã'], notasCorpo: ['Jasmim', 'Frésia', 'Cedro'], notasFundo: ['Âmbar', 'Almíscar Branco', 'Sândalo'],
    imagemUrl: F(46890),
    ativo: true,
  },
  {
    id: '12', slug: 'rasasi-la-yuqawam', nome: 'La Yuqawam', marca: 'Rasasi',
    familia: 'Floral', preco: 169.90,
    descricao: 'Irresistível e eterno — seu nome significa "aquele que não pode ser resistido". Flores exóticas abraçadas por madeiras orientais com sillage impressionante.',
    notasTopo: ['Bergamota', 'Limão'], notasCorpo: ['Jasmim', 'Rosa', 'Íris'], notasFundo: ['Sândalo', 'Âmbar', 'Almíscar'],
    imagemUrl: F(19668),
    ativo: true,
  },
  {
    id: '13', slug: 'rasasi-dhanal-oudh-nashwah', nome: 'Dhanal Oudh Nashwah', marca: 'Rasasi',
    familia: 'Oriental', preco: 249.90,
    descricao: 'Uma das composições de oud mais respeitadas da Rasasi. Profundo, fumaçado e autêntico — para quem busca o oud em sua expressão mais pura.',
    notasTopo: ['Oud', 'Especiarias'], notasCorpo: ['Rosa, Incenso', 'Patchouli'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(41261),
    ativo: true,
  },

  // ── ARMAF ─────────────────────────────────────────────────────────────────
  {
    id: '14', slug: 'armaf-club-de-nuit-intense-man', nome: 'Club de Nuit Intense Man', marca: 'Armaf',
    familia: 'Amadeirado', preco: 149.90,
    descricao: 'O dupe mais famoso do mundo. Inspirado no lendário Bleu de Chanel, Club de Nuit Intense Man entregou o impossível: qualidade de alto luxo a um terço do preço.',
    notasTopo: ['Limão', 'Maçã', 'Abacaxi'], notasCorpo: ['Gerânio', 'Jasmim', 'Rosa'], notasFundo: ['Bétula', 'Âmbar', 'Almíscar'],
    imagemUrl: F(34696),
    ativo: true,
  },
  {
    id: '15', slug: 'armaf-club-de-nuit-milestone', nome: 'Club de Nuit Milestone', marca: 'Armaf',
    familia: 'Oriental', preco: 179.90,
    descricao: 'Um marco na história da Armaf. Oud, couro e especiarias se encontram numa composição unissex sofisticada que virou cult entre os entusiastas de fragrâncias.',
    notasTopo: ['Bergamota', 'Cardamomo'], notasCorpo: ['Couro', 'Oud', 'Âmbar'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(64104),
    ativo: true,
  },
  {
    id: '16', slug: 'armaf-club-de-nuit-urban-elixir', nome: 'Club de Nuit Urban Elixir', marca: 'Armaf',
    familia: 'Amadeirado', preco: 164.90,
    descricao: 'O elixir urbano da família Club de Nuit. Especiarias sofisticadas e madeiras defumadas criam uma composição unissex de luxo discreto para as noites da cidade.',
    notasTopo: ['Bergamota', 'Pimenta Rosa', 'Cardamomo'], notasCorpo: ['Oud', 'Couro', 'Patchouli'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(77860),
    ativo: true,
  },

  // ── SWISS ARABIAN ─────────────────────────────────────────────────────────
  {
    id: '17', slug: 'swiss-arabian-shaghaf-oud', nome: 'Shaghaf Oud', marca: 'Swiss Arabian',
    familia: 'Oriental', preco: 179.90,
    descricao: 'Apaixonante e profundo. O oud se funde com especiarias exóticas criando uma sinfonia olfativa digna da realeza árabe — o clássico da Swiss Arabian.',
    notasTopo: ['Bergamota', 'Açafrão'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Âmbar', 'Baunilha', 'Almíscar'],
    imagemUrl: F(50582),
    ativo: true,
  },
  {
    id: '18', slug: 'swiss-arabian-shaghaf-oud-abyad', nome: 'Shaghaf Oud Abyad', marca: 'Swiss Arabian',
    familia: 'Floral', preco: 199.90,
    descricao: 'Abyad significa "branco" em árabe — e esta versão é a face luminosa do Shaghaf Oud. Oud branco, floral e elegante para os dias mais especiais.',
    notasTopo: ['Bergamota', 'Mandarina'], notasCorpo: ['Oud Branco', 'Rosa', 'Jasmim'], notasFundo: ['Almíscar', 'Baunilha', 'Sândalo'],
    imagemUrl: F(54282),
    ativo: true,
  },
  {
    id: '19', slug: 'swiss-arabian-shaghaf-oud-aswad', nome: 'Shaghaf Oud Aswad', marca: 'Swiss Arabian',
    familia: 'Especiado', preco: 219.90,
    descricao: 'Aswad significa "preto" — a versão mais escura e intensa da família Shaghaf. Oud negro, açafrão e âmbar criam uma presença marcante e inesquecível.',
    notasTopo: ['Açafrão', 'Cardamomo'], notasCorpo: ['Oud Negro', 'Âmbar', 'Rosa'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(54283),
    ativo: true,
  },

  // ── AJMAL ─────────────────────────────────────────────────────────────────
  {
    id: '20', slug: 'ajmal-amber-wood', nome: 'Amber Wood', marca: 'Ajmal',
    familia: 'Amadeirado', preco: 189.90,
    descricao: 'A nobreza do âmbar encontra as madeiras sagradas do Oriente. A Ajmal capturou séculos de tradição perfumária árabe neste clássico atemporal.',
    notasTopo: ['Sálvia', 'Bergamota'], notasCorpo: ['Âmbar', 'Sândalo', 'Cedro'], notasFundo: ['Almíscar', 'Baunilha', 'Benjoim'],
    imagemUrl: F(26016),
    ativo: true,
  },
  {
    id: '21', slug: 'ajmal-evoke-silver', nome: 'Evoke Silver Edition', marca: 'Ajmal',
    familia: 'Amadeirado', preco: 179.90,
    descricao: 'Modernidade árabe com sotaque europeu. Evoke Silver é sofisticado, limpo e de longa duração — a escolha do homem que une elegância ocidental à profundidade oriental.',
    notasTopo: ['Bergamota', 'Cardamomo', 'Pimenta'], notasCorpo: ['Cedro', 'Patchouli', 'Lavanda'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(50792),
    ativo: true,
  },
  {
    id: '22', slug: 'ajmal-aurum', nome: 'Aurum', marca: 'Ajmal',
    familia: 'Floral', preco: 169.90,
    descricao: 'O ouro da Ajmal em forma de fragrância. Um floral sofisticado com profundidade oriental — elegante, feminino e de projeção impressionante.',
    notasTopo: ['Bergamota', 'Pimenta Rosa', 'Toranja'], notasCorpo: ['Rosa', 'Jasmim', 'Íris'], notasFundo: ['Patchouli', 'Almíscar', 'Sândalo'],
    imagemUrl: F(14028),
    ativo: true,
  },

  // ── LATTAFA (adicionais) ───────────────────────────────────────────────────
  {
    id: '23', slug: 'lattafa-oud-mood', nome: 'Oud Mood', marca: 'Lattafa',
    familia: 'Oriental', preco: 169.90,
    descricao: 'Uma viagem olfativa ao humor contemplativo do Oriente. Oud suave e cristalino encontra rosas etéreas e incenso sagrado nesta composição hipnótica.',
    notasTopo: ['Bergamota', 'Cardamomo'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(46814),
    ativo: true,
  },
  {
    id: '24', slug: 'lattafa-ana-abiyedh-rouge', nome: 'Ana Abiyedh Rouge', marca: 'Lattafa',
    familia: 'Floral', preco: 164.90,
    descricao: 'Feminino, viciante e cheio de personalidade. Um gourmand floral que combina frutas vermelhas e rosas com almíscar irresistível.',
    notasTopo: ['Morango', 'Pêssego', 'Bergamota'], notasCorpo: ['Rosa', 'Heliotropo', 'Íris'], notasFundo: ['Almíscar', 'Baunilha', 'Sândalo'],
    imagemUrl: F(63062),
    ativo: true,
  },
  {
    id: '25', slug: 'lattafa-ejaazi', nome: 'Ejaazi', marca: 'Lattafa',
    familia: 'Especiado', preco: 189.90,
    descricao: 'Autoridade e presença. Uma fragrância de couro e oud que exala confiança — para os que deixam impressão onde passam.',
    notasTopo: ['Pimenta Preta', 'Especiarias'], notasCorpo: ['Couro', 'Oud', 'Âmbar'], notasFundo: ['Sândalo', 'Almíscar', 'Madeira'],
    imagemUrl: F(68228),
    ativo: true,
  },
  {
    id: '26', slug: 'lattafa-hayaati-gold-elixir', nome: 'Hayaati Gold Elixir', marca: 'Lattafa',
    familia: 'Oriental', preco: 194.90,
    descricao: 'O elixir dourado da vida. Um floral sofisticado que captura a elegância dos perfumes árabes clássicos com um toque contemporâneo luminoso.',
    notasTopo: ['Bergamota', 'Mandarina'], notasCorpo: ['Rosa', 'Íris', 'Jasmim'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(76589),
    ativo: true,
  },

  // ── AL HARAMAIN (adicionais) ──────────────────────────────────────────────
  {
    id: '27', slug: 'al-haramain-amber-oud-tobacco', nome: 'Amber Oud Tobacco Edition', marca: 'Al Haramain',
    familia: 'Oriental', preco: 249.90,
    descricao: 'Audacioso e sensual. A edição Tobacco integra notas de tabaco curado e rum numa composição de fumegante sofisticação — a mais ousada da família Amber Oud.',
    notasTopo: ['Tabaco', 'Bergamota', 'Rum'], notasCorpo: ['Couro', 'Especiarias', 'Oud'], notasFundo: ['Âmbar', 'Baunilha', 'Almíscar'],
    imagemUrl: F(55791),
    ativo: true,
  },

  // ── ARMAF (adicionais) ────────────────────────────────────────────────────
  {
    id: '28', slug: 'armaf-club-de-nuit-intense-woman', nome: 'Club de Nuit Intense Woman', marca: 'Armaf',
    familia: 'Floral', preco: 149.90,
    descricao: 'O feminino mais famoso da Armaf. Frutas vermelhas vibrantes sobre um coração de flores brancas — inspirado em ícones do luxo, mas com personalidade única.',
    notasTopo: ['Groselha Negra', 'Bergamota', 'Limão'], notasCorpo: ['Rosa', 'Jasmim', 'Lírio'], notasFundo: ['Almíscar', 'Cedro', 'Baunilha'],
    imagemUrl: F(27656),
    ativo: true,
  },
  {
    id: '29', slug: 'armaf-club-de-nuit-blue-iconic', nome: 'Club de Nuit Blue Iconic', marca: 'Armaf',
    familia: 'Amadeirado', preco: 159.90,
    descricao: 'Azul, icônico e contemporâneo. Frescor mediterrâneo com profundidade amadeirada oriental — a adição mais moderna à lendária família Club de Nuit.',
    notasTopo: ['Bergamota', 'Limão', 'Cardamomo'], notasCorpo: ['Cedro', 'Gerânio', 'Patchouli'], notasFundo: ['Âmbar', 'Almíscar', 'Madeira'],
    imagemUrl: F(78475),
    ativo: true,
  },

  // ── CÍTRICO / AQUÁTICO ────────────────────────────────────────────────────
  {
    id: '31', slug: 'rasasi-brilliant-silver', nome: 'Brilliant Silver', marca: 'Rasasi',
    familia: 'Cítrico', preco: 134.90,
    descricao: 'Elegância prateada e imaculada. Um cítrico-aquático luminoso que combina bergamota e frutas brancas com um coração suave de frésia e cedro — fresco, limpo e de longa duração.',
    notasTopo: ['Bergamota', 'Limão', 'Maçã'], notasCorpo: ['Frésia', 'Cedro', 'Lavanda'], notasFundo: ['Almíscar Branco', 'Sândalo', 'Almíscar'],
    imagemUrl: F(100966),
    ativo: true,
  },
  {
    id: '32', slug: 'al-haramain-amber-oud-blue', nome: 'Amber Oud Bleu Edition', marca: 'Al Haramain',
    familia: 'Cítrico', preco: 219.90,
    descricao: 'A face aquática e fresca do ícone Amber Oud. Bergamota cítrica e menta marinha abrem caminho para um coração floral que termina em âmbar suave e almíscar.',
    notasTopo: ['Bergamota', 'Menta', 'Toranja'], notasCorpo: ['Jasmim', 'Cedro', 'Lavanda'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(73206),
    ativo: true,
  },
  {
    id: '33', slug: 'rasasi-junoon-satin', nome: 'Junoon Satin', marca: 'Rasasi',
    familia: 'Cítrico', preco: 144.90,
    descricao: 'Suave como cetim, fresco como a manhã. Junoon Satin é um cítrico-floral refinado com um toque oriental suave — elegante, clean e de presença discreta mas marcante.',
    notasTopo: ['Bergamota', 'Toranja', 'Menta'], notasCorpo: ['Jasmim', 'Frésia', 'Cedro'], notasFundo: ['Almíscar Branco', 'Sândalo', 'Almíscar'],
    imagemUrl: F(42900),
    ativo: true,
  },

  // ── ESPECIADO (adicional) ─────────────────────────────────────────────────
  {
    id: '34', slug: 'lattafa-ramz-gold', nome: 'Ramz Gold', marca: 'Lattafa',
    familia: 'Especiado', preco: 184.90,
    descricao: 'Opulência pura em forma de perfume. Açafrão, oud e especiarias quentes se fundem com âmbar e baunilha criando uma composição de profundidade real e presença marcante.',
    notasTopo: ['Açafrão', 'Cardamomo', 'Pimenta'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Âmbar', 'Baunilha', 'Almíscar'],
    imagemUrl: F(70368),
    ativo: true,
  },

  // ── SWISS ARABIAN (adicionais) ────────────────────────────────────────────
  {
    id: '30', slug: 'swiss-arabian-warda', nome: 'Warda', marca: 'Swiss Arabian',
    familia: 'Floral', preco: 149.90,
    descricao: 'Warda significa rosa em árabe — e esta fragrância é uma ode à rainha das flores. Um soliflore de rosa absoluta com o luxo e a pureza da perfumaria árabe clássica.',
    notasTopo: ['Rosa', 'Aldeídos'], notasCorpo: ['Rosa Damascena', 'Rosa Turca'], notasFundo: ['Sândalo', 'Almíscar', 'Âmbar'],
    imagemUrl: F(22209),
    ativo: true,
  },

  // ── LATTAFA (adicionais 2) ────────────────────────────────────────────────
  {
    id: '35', slug: 'lattafa-najdia', nome: 'Najdia', marca: 'Lattafa',
    familia: 'Oriental', preco: 154.90,
    descricao: 'Um clássico do Oriente que nunca sai de moda. Doce, amendoado e almiscarado — Najdia é conforto líquido que embrulha a pele como um xale de seda.',
    notasTopo: ['Baunilha', 'Especiarias', 'Bergamota'], notasCorpo: ['Oud', 'Rosa', 'Âmbar'], notasFundo: ['Almíscar', 'Sândalo', 'Benjoim'],
    imagemUrl: F(66011),
    ativo: true,
  },
  {
    id: '36', slug: 'lattafa-ana-abiyedh-pudra', nome: 'Ana Abiyedh Pudra', marca: 'Lattafa',
    familia: 'Floral', preco: 159.90,
    descricao: 'Pudra e delicadeza. Ana Abiyedh Pudra é o floral mais elegante da Lattafa — íris empoada, rosas frescas e almíscar branco criam uma aura irresistível e feminina.',
    notasTopo: ['Limão', 'Rosa', 'Bergamota'], notasCorpo: ['Íris', 'Almíscar Branco', 'Violeta'], notasFundo: ['Baunilha', 'Sândalo', 'Almíscar'],
    imagemUrl: F(84590),
    ativo: true,
  },
  {
    id: '37', slug: 'lattafa-oud-mood-elixir', nome: 'Oud Mood Elixir', marca: 'Lattafa',
    familia: 'Oriental', preco: 189.90,
    descricao: 'O Elixir do Oud Mood. Mais profundo, mais rico e mais prolongado que o original — oud cristalino encontra rosa absoluta e âmbar numa composição que persiste por todo o dia.',
    notasTopo: ['Bergamota', 'Rosa', 'Açafrão'], notasCorpo: ['Oud', 'Incenso', 'Âmbar'], notasFundo: ['Sândalo', 'Almíscar', 'Madeira Escura'],
    imagemUrl: F(74234),
    ativo: true,
  },
  {
    id: '38', slug: 'lattafa-yara-moi', nome: 'Yara Moi', marca: 'Lattafa',
    familia: 'Floral', preco: 164.90,
    descricao: 'A continuação do fenômeno Yara. Mais madura e sofisticada, Yara Moi aprofunda o floral frutado com notas de peônia e jasmim sobre um fundo almiscarado sedoso.',
    notasTopo: ['Frutas Vermelhas', 'Bergamota', 'Tangerina'], notasCorpo: ['Jasmim', 'Rosa', 'Peônia'], notasFundo: ['Almíscar', 'Baunilha', 'Cedro'],
    imagemUrl: F(80722),
    ativo: true,
  },

  // ── MAISON ALHAMBRA ───────────────────────────────────────────────────────
  {
    id: '39', slug: 'maison-alhambra-exclusif-oud', nome: 'Exclusif Oud', marca: 'Maison Alhambra',
    familia: 'Oriental', preco: 219.90,
    descricao: 'O oud na sua expressão mais luxuosa. Exclusif Oud eleva o padrão da Maison Alhambra com uma composição profunda de oud defumado, rosa turca e âmbar — presença de haute parfumerie a um preço democrático.',
    notasTopo: ['Bergamota', 'Rosa', 'Açafrão'], notasCorpo: ['Oud', 'Rosa Turca', 'Incenso'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(95514),
    destaque: false, ativo: true,
  },
  {
    id: '40', slug: 'maison-alhambra-minerale', nome: 'Minerale', marca: 'Maison Alhambra',
    familia: 'Cítrico', preco: 199.90,
    descricao: 'Frescor mineral e intemporal. Minerale é o cítrico-amadeirado mais refinado da Maison Alhambra — bergamota viva, íris empoada e cedro limpo criam um clássico para qualquer estação.',
    notasTopo: ['Bergamota', 'Lavanda', 'Neroli'], notasCorpo: ['Íris', 'Cedro', 'Frésia'], notasFundo: ['Almíscar', 'Âmbar', 'Sândalo'],
    imagemUrl: F(110554),
    ativo: true,
  },

  // ── AFNAN ─────────────────────────────────────────────────────────────────
  {
    id: '41', slug: 'afnan-9pm', nome: '9PM', marca: 'Afnan',
    familia: 'Especiado', preco: 149.90,
    descricao: 'A noite começa às 9. Inspirado na energia dos perfumes de luxo mais hypados, 9PM combina especiarias sofisticadas, âmbar e baunilha numa composição sedutora e de sillage impressionante.',
    notasTopo: ['Laranja', 'Mandarina', 'Pimenta Rosa'], notasCorpo: ['Couro', 'Âmbar', 'Especiarias'], notasFundo: ['Baunilha', 'Almíscar', 'Sândalo'],
    imagemUrl: F(65414),
    destaque: false, ativo: true,
  },
  {
    id: '42', slug: 'afnan-supremacy-noir', nome: 'Supremacy Noir', marca: 'Afnan',
    familia: 'Amadeirado', preco: 159.90,
    descricao: 'Supremacia no escuro. Uma composição profunda de couro, vetiver e âmbar que define masculinidade com autoridade — para os que não passam despercebidos.',
    notasTopo: ['Bergamota', 'Pimenta Preta'], notasCorpo: ['Couro', 'Vetiver', 'Cedro'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(40683),
    ativo: true,
  },

  // ── ARD AL ZAAFARAN ───────────────────────────────────────────────────────
  {
    id: '43', slug: 'ard-al-zaafaran-oud-24-hours', nome: 'Oud 24 Hours', marca: 'Ard Al Zaafaran',
    familia: 'Oriental', preco: 169.90,
    descricao: 'Vinte e quatro horas de oud puro. A Ard Al Zaafaran criou uma fragrância de resistência excepcional — oud autêntico, sândalo sagrado e âmbar quente que permanece do amanhecer à meia-noite.',
    notasTopo: ['Oud', 'Madeira'], notasCorpo: ['Oud', 'Sândalo', 'Rosa'], notasFundo: ['Âmbar', 'Almíscar', 'Resinas'],
    imagemUrl: F(42090),
    ativo: true,
  },
  {
    id: '44', slug: 'ard-al-zaafaran-dirham', nome: 'Dirham', marca: 'Ard Al Zaafaran',
    familia: 'Oriental', preco: 139.90,
    descricao: 'O clássico que nunca falha. Dirham é a fragrância mais querida da Ard Al Zaafaran — doce, almiscarado e envolvente, com uma longevidade que surpreende pelo preço.',
    notasTopo: ['Bergamota', 'Lavanda', 'Frutas'], notasCorpo: ['Rosa', 'Íris', 'Baunilha'], notasFundo: ['Almíscar', 'Âmbar', 'Sândalo'],
    imagemUrl: F(28304),
    ativo: true,
  },
  {
    id: '45', slug: 'ard-al-zaafaran-dirham-wardi', nome: 'Dirham Wardi', marca: 'Ard Al Zaafaran',
    familia: 'Floral', preco: 144.90,
    descricao: 'A versão rosada do icônico Dirham. Wardi traduz a beleza das rosas do Oriente — floral cremoso, aveludado e feminino, com um sillage que deixa rastros de elegância.',
    notasTopo: ['Rosa', 'Frutas Vermelhas', 'Bergamota'], notasCorpo: ['Rosa Absoluta', 'Peônia', 'Almíscar'], notasFundo: ['Baunilha', 'Sândalo', 'Âmbar'],
    imagemUrl: F(33142),
    ativo: true,
  },

  // ── AL HARAMAIN ───────────────────────────────────────────────────────────
  {
    id: '46', slug: 'al-haramain-amber-oud-gold-edition', nome: 'Amber Oud Gold Edition', marca: 'Al Haramain',
    familia: 'Oriental', preco: 229.90,
    descricao: 'O ouro líquido da Al Haramain. Uma composição magnífica que funde âmbar dourado, oud cristalino e especiarias quentes — presença imponente, sillage de luxo e longevidade extraordinária.',
    notasTopo: ['Açafrão', 'Cardamomo', 'Bergamota'], notasCorpo: ['Oud', 'Rosa', 'Âmbar'], notasFundo: ['Sândalo', 'Almíscar', 'Baunilha'],
    imagemUrl: F(58421),
    destaque: true, ativo: true,
  },
  {
    id: '47', slug: 'al-haramain-laventure', nome: "L'Aventure", marca: 'Al Haramain',
    familia: 'Amadeirado', preco: 199.90,
    descricao: "A aventura começa aqui. L'Aventure é o clássico masculino da Al Haramain — especiarias frescas, couro sofisticado e madeiras profundas criam uma fragrância de confiança e presença marcante.",
    notasTopo: ['Bergamota', 'Limão', 'Pimenta Preta'], notasCorpo: ['Couro', 'Vetiver', 'Cedro'], notasFundo: ['Âmbar', 'Almíscar', 'Madeira'],
    imagemUrl: F(47233),
    ativo: true,
  },
  {
    id: '48', slug: 'al-haramain-hajar', nome: 'Hajar', marca: 'Al Haramain',
    familia: 'Oriental', preco: 189.90,
    descricao: 'Nomeado após a pedra sagrada. Hajar é uma ode à espiritualidade do Oriente — incenso purificador, oud celestial e almíscar branco criam uma fragrância meditativa e duradoura.',
    notasTopo: ['Bergamota', 'Neroli', 'Incenso'], notasCorpo: ['Oud', 'Rosa', 'Baunilha'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(24590),
    ativo: true,
  },

  // ── RASASI ────────────────────────────────────────────────────────────────
  {
    id: '49', slug: 'rasasi-blue-caress', nome: 'Blue Caress', marca: 'Rasasi',
    familia: 'Floral', preco: 169.90,
    descricao: 'Uma carícia azul sobre a pele. Blue Caress combina florais frescos e aquáticos com um coração de almíscar suave — feminino, delicado e perfeito para o dia a dia.',
    notasTopo: ['Bergamota', 'Mandarina', 'Aldeidos'], notasCorpo: ['Íris', 'Rosa', 'Almíscar Branco'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(35678),
    ativo: false,
  },
  {
    id: '50', slug: 'rasasi-la-yuqawam-homme', nome: 'La Yuqawam Homme', marca: 'Rasasi',
    familia: 'Especiado', preco: 179.90,
    descricao: 'Inigualável. La Yuqawam é a joia coroa da Rasasi — uma composição especiada, aromática e amadeirada que compete com os grandes da perfumaria ocidental a um preço imbatível.',
    notasTopo: ['Bergamota', 'Cardamomo', 'Pimenta Rosa'], notasCorpo: ['Oud', 'Couro', 'Âmbar'], notasFundo: ['Vetiver', 'Almíscar', 'Sândalo'],
    imagemUrl: F(19668),
    destaque: true, ativo: true,
  },

  // ── AJMAL ─────────────────────────────────────────────────────────────────
  {
    id: '51', slug: 'ajmal-wisal', nome: 'Wisal', marca: 'Ajmal',
    familia: 'Floral', preco: 189.90,
    descricao: 'Conexão e ternura. Wisal, que significa "união" em árabe, é um floral oriental aveludado — rosas turcas, jasmin noturno e almíscar cremoso que evoca os momentos mais íntimos.',
    notasTopo: ['Bergamota', 'Frutas', 'Aldeidos'], notasCorpo: ['Rosa Turca', 'Jasmim', 'Íris'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(15109),
    ativo: true,
  },
  {
    id: '52', slug: 'ajmal-evoke-silver-her', nome: 'Evoke Silver Edition For Her', marca: 'Ajmal',
    familia: 'Floral', preco: 159.90,
    descricao: 'Prata viva. Evoke Silver For Her é o floral moderno da Ajmal — frutas cítricas vibrantes, magnólia luminosa e almíscar acetinado criam uma fragrância para mulheres que definem seu próprio caminho.',
    notasTopo: ['Bergamota', 'Limão', 'Pêra'], notasCorpo: ['Magnólia', 'Rosa', 'Almíscar'], notasFundo: ['Âmbar Branco', 'Cedro', 'Almíscar'],
    imagemUrl: F(50791),
    ativo: true,
  },

  // ── SWISS ARABIAN ─────────────────────────────────────────────────────────
  {
    id: '53', slug: 'swiss-arabian-shaghaf-oud', nome: 'Shaghaf Oud', marca: 'Swiss Arabian',
    familia: 'Oriental', preco: 249.90,
    descricao: 'Paixão pelo oud. Shaghaf Oud é a composição mais icônica da Swiss Arabian — oud premium, especiarias nobres e madeiras raras se fundem numa fragrância de luxo genuíno que dura horas.',
    notasTopo: ['Açafrão', 'Bergamota', 'Cardamomo'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(43510),
    destaque: true, ativo: false,
  },
  {
    id: '54', slug: 'swiss-arabian-hayaa', nome: 'Hayaa', marca: 'Swiss Arabian',
    familia: 'Floral', preco: 219.90,
    descricao: 'Pudor e elegância. Hayaa, que significa "modéstia" em árabe, é um floral suave e refinado — pétalas de rosa, íris empoada e almíscar puro criam uma aura de sofisticação discreta e irresistível.',
    notasTopo: ['Bergamota', 'Limão', 'Heliotropo'], notasCorpo: ['Rosa', 'Íris', 'Jasmim'], notasFundo: ['Almíscar', 'Âmbar Branco', 'Sândalo'],
    imagemUrl: F(56232),
    ativo: true,
  },

  // ── ZIMAYA ────────────────────────────────────────────────────────────────
  {
    id: '55', slug: 'zimaya-hawwa-intense', nome: 'Hawwa Intense', marca: 'Zimaya',
    familia: 'Especiado', preco: 199.90,
    descricao: 'A intensidade de Eva. Hawwa Intense é a fragrância mais poderosa da Zimaya — especiarias orientais, oud defumado e baunilha cremosa criam um oriental profundo e viciante que domina a noite.',
    notasTopo: ['Açafrão', 'Cardamomo', 'Canela'], notasCorpo: ['Oud', 'Rosa', 'Incenso'], notasFundo: ['Baunilha', 'Âmbar', 'Almíscar'],
    imagemUrl: F(92588),
    ativo: true,
  },
  {
    id: '56', slug: 'zimaya-noble', nome: 'Noble', marca: 'Zimaya',
    familia: 'Amadeirado', preco: 184.90,
    descricao: 'Nobreza destilada. Noble é a fragrância amadeirada e especiada da Zimaya que traduz elegância árabe contemporânea — cedro vivo, patchouli terroso e âmbar quente num composição que irradia carisma.',
    notasTopo: ['Bergamota', 'Cardamomo', 'Pimenta Preta'], notasCorpo: ['Cedro', 'Patchouli', 'Couro'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(89432),
    ativo: false,
  },

  // ── LATTAFA (adicionais 3) ────────────────────────────────────────────────
  {
    id: '57', slug: 'lattafa-nasaem', nome: 'Nasaem', marca: 'Lattafa',
    familia: 'Floral', preco: 164.90,
    descricao: 'Brisa suave do deserto. Nasaem é o floral mais delicado da Lattafa — flores brancas, almíscar puro e notas de pó criam uma fragrância etérea que parece uma segunda pele.',
    notasTopo: ['Bergamota', 'Heliotropo', 'Peônia'], notasCorpo: ['Rosa Branca', 'Jasmim', 'Magnólia'], notasFundo: ['Almíscar', 'Âmbar Branco', 'Cedro'],
    imagemUrl: F(88123),
    ativo: true,
  },
  {
    id: '58', slug: 'lattafa-moana', nome: 'Moana', marca: 'Lattafa',
    familia: 'Floral', preco: 174.90,
    descricao: 'Frescor tropical com alma oriental. Moana une a leveza das frutas tropicais com a profundidade do âmbar árabe — um floral fresco e duradouro perfeito para o verão.',
    notasTopo: ['Manga', 'Maracujá', 'Bergamota'], notasCorpo: ['Jasmim', 'Frésia', 'Rosa'], notasFundo: ['Âmbar', 'Almíscar', 'Sândalo'],
    imagemUrl: F(97435),
    ativo: true,
  },

  // ── XERJOFF ───────────────────────────────────────────────────────────────
  {
    id: '59', slug: 'xerjoff-erba-pura', nome: 'Erba Pura', marca: 'Xerjoff',
    familia: 'Cítrico', preco: 2490.00,
    descricao: 'O fenômeno cítrico-almiscarado que conquistou o mundo. Erba Pura da Xerjoff é uma explosão de frutas mediterrâneas, baunilha quente e almíscar branco — fresco, viciante e de longevidade excepcional.',
    notasTopo: ['Laranja Siciliana', 'Toranja', 'Frutas Tropicais'], notasCorpo: ['Baunilha', 'Almíscar Branco', 'Âmbar'], notasFundo: ['Sândalo', 'Almíscar', 'Cedro'],
    imagemUrl: F(55157),
    destaque: true, ativo: true,
  },
  {
    id: '60', slug: 'xerjoff-naxos', nome: 'Naxos', marca: 'Xerjoff',
    familia: 'Oriental', preco: 2890.00,
    descricao: 'Uma ode à ilha grega banhada de sol e mel. Naxos é o oriental mais admirado da Xerjoff — tabaco mel, lavanda aromática e baunilha cremosa criam uma composição hipnótica e irresistível.',
    notasTopo: ['Lavanda', 'Bergamota', 'Limão'], notasCorpo: ['Mel', 'Tabaco', 'Jasmim'], notasFundo: ['Baunilha', 'Âmbar', 'Almíscar'],
    imagemUrl: F(30529),
    destaque: true, ativo: true,
  },
  {
    id: '61', slug: 'xerjoff-alexandria-ii', nome: 'Alexandria II', marca: 'Xerjoff',
    familia: 'Floral', preco: 3490.00,
    descricao: 'A grandeza de Alexandria em frasco. Uma composição floral-frutal de rara complexidade — rosa turca, oud puro e âmbar cremoso se unem neste ícone absoluto da perfumaria de nicho.',
    notasTopo: ['Açafrão', 'Rosa', 'Frutas'], notasCorpo: ['Oud', 'Rosa Turca', 'Jasmim'], notasFundo: ['Âmbar', 'Sândalo', 'Almíscar'],
    imagemUrl: F(17786),
    ativo: true,
  },

  // ── NISHANE ───────────────────────────────────────────────────────────────
  {
    id: '62', slug: 'nishane-hacivat', nome: 'Hacivat', marca: 'Nishane',
    familia: 'Amadeirado', preco: 1990.00,
    descricao: 'O extravagante amadeirado-verde que redefiniu a perfumaria turca. Hacivat combina patchouli profundo, madeiras nobres e um coração verde-especiado numa fragrância de presença inconfundível.',
    notasTopo: ['Abacaxi', 'Bergamota', 'Hortelã'], notasCorpo: ['Patchouli', 'Cedro', 'Rosa'], notasFundo: ['Almíscar', 'Âmbar', 'Vetiver'],
    imagemUrl: F(44174),
    destaque: true, ativo: true,
  },
  {
    id: '63', slug: 'nishane-ani', nome: 'Ani', marca: 'Nishane',
    familia: 'Floral', preco: 1890.00,
    descricao: 'Delicadeza turca em estado puro. Ani é um floral-cítrico luminoso e sofisticado — neroli fresco, flores brancas e um fundo de almíscar acetinado que perdura suavemente sobre a pele.',
    notasTopo: ['Neroli', 'Bergamota', 'Aldeidos'], notasCorpo: ['Jasmim', 'Rosa', 'Íris'], notasFundo: ['Almíscar', 'Âmbar Branco', 'Sândalo'],
    imagemUrl: F(54785),
    ativo: true,
  },
  {
    id: '64', slug: 'nishane-wulong-cha', nome: 'Wulong Cha', marca: 'Nishane',
    familia: 'Amadeirado', preco: 1990.00,
    descricao: 'Cerimônia do chá em perfume. Wulong Cha captura a essência do chá oolong fumegante — notas verdes e lenhosas, almíscar suave e incenso leve criam uma meditação olfativa única.',
    notasTopo: ['Chá Oolong', 'Bergamota', 'Cardamomo'], notasCorpo: ['Cedro', 'Patchouli', 'Almíscar'], notasFundo: ['Incenso', 'Âmbar', 'Vetiver'],
    imagemUrl: F(30567),
    ativo: true,
  },

  // ── PARFUMS DE MARLY ──────────────────────────────────────────────────────
  {
    id: '65', slug: 'parfums-de-marly-delina', nome: 'Delina', marca: 'Parfums de Marly',
    familia: 'Floral', preco: 2790.00,
    descricao: 'A rainha dos florais modernos. Delina é o perfume mais icônico da Parfums de Marly — pétalas de rosa damasco, litchi suculento e almíscar aveludado criam uma feminilidade refinada e inesquecível.',
    notasTopo: ['Litchi', 'Groselha', 'Bergamota'], notasCorpo: ['Rosa de Damasco', 'Peônia', 'Rosa'], notasFundo: ['Almíscar', 'Baunilha', 'Cedro'],
    imagemUrl: F(43871),
    destaque: true, ativo: true,
  },
  {
    id: '66', slug: 'parfums-de-marly-pegasus', nome: 'Pegasus', marca: 'Parfums de Marly',
    familia: 'Especiado', preco: 2990.00,
    descricao: 'A elegância masculina em sua forma mais pura. Pegasus voa entre lavanda aromática e baunilha cremosa — uma composição clássica e contemporânea que se tornou o padrão do luxo masculino.',
    notasTopo: ['Bergamota', 'Lavanda', 'Heliotropo'], notasCorpo: ['Jasmim', 'Baunilha', 'Almíscar'], notasFundo: ['Sândalo', 'Âmbar', 'Vetiver'],
    imagemUrl: F(16938),
    destaque: true, ativo: true,
  },
  {
    id: '67', slug: 'parfums-de-marly-layton', nome: 'Layton', marca: 'Parfums de Marly',
    familia: 'Especiado', preco: 2990.00,
    descricao: 'O equilíbrio perfeito entre frescor e profundidade. Layton combina maçã fresca, lavanda provençal e especiarias nobres num oriental-fougère que domina os tops mundiais há anos.',
    notasTopo: ['Maçã', 'Lavanda', 'Bergamota'], notasCorpo: ['Jasmim', 'Gerânio', 'Pimenta'], notasFundo: ['Baunilha', 'Patchouli', 'Sândalo'],
    imagemUrl: F(39314),
    ativo: true,
  },
  {
    id: '68', slug: 'parfums-de-marly-herod', nome: 'Herod', marca: 'Parfums de Marly',
    familia: 'Oriental', preco: 2790.00,
    descricao: 'Ousadia e sedução. Herod é o oriental tabaco-baunilha mais sofisticado da Parfums de Marly — pimenta ardente, tabaco curado e baunilha turca criam uma composição de longa projeção e caráter único.',
    notasTopo: ['Pimenta', 'Bergamota', 'Canela'], notasCorpo: ['Tabaco', 'Baunilha', 'Cedro'], notasFundo: ['Patchouli', 'Almíscar', 'Âmbar'],
    imagemUrl: F(16939),
    ativo: true,
  },

  // ── MAISON FRANCIS KURKDJIAN ──────────────────────────────────────────────
  {
    id: '69', slug: 'mfk-baccarat-rouge-540', nome: 'Baccarat Rouge 540', marca: 'Maison Francis Kurkdjian',
    familia: 'Floral', preco: 4290.00,
    descricao: 'O perfume mais comentado da última década. Baccarat Rouge 540 é uma obra-prima de jasmin aquático, cedro e safraleine — uma assinatura olfativa que transcende tendências e redefiniu o luxo contemporâneo.',
    notasTopo: ['Jasmin', 'Açafrão'], notasCorpo: ['Cedro', 'Âmbar'], notasFundo: ['Eritroxileno', 'Almíscar'],
    imagemUrl: F(33519),
    destaque: true, ativo: true,
  },
  {
    id: '70', slug: 'mfk-oud-satin-mood', nome: 'Oud Satin Mood', marca: 'Maison Francis Kurkdjian',
    familia: 'Oriental', preco: 3890.00,
    descricao: 'Oud transformado em seda. Francis Kurkdjian reinterpreta o oud árabe com refinamento parisiense — oud defumado, rosa absoluta e baunilha bourbon criam um luxo íntimo de silagem envolvente.',
    notasTopo: ['Rosa', 'Baunilha'], notasCorpo: ['Oud', 'Rosa Absoluta', 'Resinas'], notasFundo: ['Baunilha Bourbon', 'Âmbar', 'Almíscar'],
    imagemUrl: F(30352),
    ativo: true,
  },

  // ── CREED ─────────────────────────────────────────────────────────────────
  {
    id: '71', slug: 'creed-aventus', nome: 'Aventus', marca: 'Creed',
    familia: 'Frutal', preco: 4990.00,
    descricao: 'A lenda viva da perfumaria masculina. Aventus é o símbolo de conquista e poder — abacaxi defumado, cassis e bétula fumê criam a fragrância mais desejada e reconhecida do mundo do nicho.',
    notasTopo: ['Abacaxi', 'Cassis', 'Maçã'], notasCorpo: ['Bétula', 'Patchouli', 'Rosa'], notasFundo: ['Almíscar', 'Âmbar', 'Vetiver'],
    imagemUrl: F(9828),
    destaque: true, ativo: true,
  },
  {
    id: '72', slug: 'creed-silver-mountain-water', nome: 'Silver Mountain Water', marca: 'Creed',
    familia: 'Cítrico', preco: 4290.00,
    descricao: 'Pureza das altitudes. Silver Mountain Water captura o ar cristalino dos Alpes suíços — bergamota gelada, chá verde e almíscar limpo criam o aquático de luxo mais refinado já criado.',
    notasTopo: ['Bergamota', 'Mandarina', 'Neroli'], notasCorpo: ['Chá Verde', 'Cassis', 'Pêssego'], notasFundo: ['Almíscar', 'Sândalo', 'Âmbar'],
    imagemUrl: F(472),
    ativo: true,
  },

  // ── INITIO ────────────────────────────────────────────────────────────────
  {
    id: '73', slug: 'initio-oud-for-greatness', nome: 'Oud for Greatness', marca: 'Initio',
    familia: 'Oriental', preco: 3190.00,
    descricao: 'Oud para os grandes. A Initio criou uma fragrância de autoridade absoluta — oud aglomerado, açafrão e almíscar animal formam um oriental denso e hipnótico que exige respeito.',
    notasTopo: ['Açafrão', 'Cardamomo'], notasCorpo: ['Oud', 'Patchouli', 'Incenso'], notasFundo: ['Almíscar', 'Âmbar', 'Civet'],
    imagemUrl: F(53641),
    destaque: true, ativo: true,
  },
  {
    id: '74', slug: 'initio-rehab', nome: 'Rehab', marca: 'Initio',
    familia: 'Especiado', preco: 2890.00,
    descricao: 'Viciante por natureza. Rehab explora o poder das moléculas sintéticas na perfumaria — almíscar amplificado, especiarias quentes e notas de couro criam uma fragrância com efeito de "pele aprimorada".',
    notasTopo: ['Cardamomo', 'Bergamota', 'Hortelã'], notasCorpo: ['Almíscar', 'Couro', 'Cedro'], notasFundo: ['Âmbar', 'Baunilha', 'Vetiver'],
    imagemUrl: F(50351),
    ativo: true,
  },

  // ── KILIAN ────────────────────────────────────────────────────────────────
  {
    id: '75', slug: 'kilian-angels-share', nome: "Angel's Share", marca: 'Kilian',
    familia: 'Oriental', preco: 3490.00,
    descricao: 'A parte dos anjos. Inspirado nas adegas de cognac da Borgonha, Angel\'s Share combina conhaque envelhecido, canela ardente e baunilha pura — um gourmand-oriental de luxo que aquece a alma.',
    notasTopo: ['Conhaque', 'Canela', 'Cardamomo'], notasCorpo: ['Âmbar', 'Baunilha', 'Noz-Moscada'], notasFundo: ['Sândalo', 'Patchouli', 'Almíscar'],
    imagemUrl: F(62615),
    destaque: true, ativo: true,
  },
  {
    id: '76', slug: 'kilian-love-dont-be-shy', nome: "Love, Don't Be Shy", marca: 'Kilian',
    familia: 'Floral', preco: 3290.00,
    descricao: 'Amor sem timidez. Este gourmand-floral da Kilian é puro romantismo — neroli fresco, mel dourado e almíscar marshmallow criam uma fragrância doce, sensual e absolutamente irresistível.',
    notasTopo: ['Neroli', 'Bergamota'], notasCorpo: ['Íris', 'Rosa', 'Mel'], notasFundo: ['Almíscar', 'Baunilha', 'Açúcar'],
    imagemUrl: F(4322),
    ativo: true,
  },

  // ── AMOUAGE ───────────────────────────────────────────────────────────────
  {
    id: '77', slug: 'amouage-interlude-man', nome: 'Interlude Man', marca: 'Amouage',
    familia: 'Especiado', preco: 3490.00,
    descricao: 'A obra-prima de Omã. Interlude Man é considerado um dos maiores perfumes masculinos já criados — incenso sagrado, pimenta ardente e oud fumê se unem numa composição de profundidade e complexidade sem igual.',
    notasTopo: ['Bergamota', 'Orégano', 'Pimenta Rosa'], notasCorpo: ['Incenso', 'Resinas', 'Couro'], notasFundo: ['Oud', 'Âmbar', 'Vetiver'],
    imagemUrl: F(15294),
    destaque: true, ativo: true,
  },
  {
    id: '78', slug: 'amouage-reflection-woman', nome: 'Reflection Woman', marca: 'Amouage',
    familia: 'Floral', preco: 3190.00,
    descricao: 'Reflexo de feminilidade pura. Reflection Woman é a joia floral da Amouage — neroli cintilante, rosas absolutas e almíscar fino criam uma fragrância etérea, luminosa e de refinamento supremo.',
    notasTopo: ['Neroli', 'Bergamota', 'Ylang-Ylang'], notasCorpo: ['Rosa', 'Jasmim', 'Narciso'], notasFundo: ['Almíscar', 'Âmbar', 'Sândalo'],
    imagemUrl: F(919),
    ativo: true,
  },
]

export const perfumesBySlug = Object.fromEntries(perfumes.map(p => [p.slug, p]))
export const perfumesDestaque = perfumes.filter(p => p.destaque)
export const familias: string[] = Array.from(new Set(perfumes.map(p => p.familia)))
