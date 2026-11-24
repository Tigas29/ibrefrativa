// Conteúdo da LP /cirurgia-refrativa. Fonte: copy-v6 (18/nov/2026, página voltada à Pesquisa do Google).
// Trechos { pend: '...' } são pendências e viram <Pendente> na tela.

export const WA_NUMERO = '551150284894'

// Preço publicado com o OK do Tiago (18/nov/2026). Mudou o preço, muda aqui no mesmo dia:
// preço anunciado vincula a oferta (CDC, art. 30).
export const PRECO = {
  parcela: '12x de R$ 625',
  linha: 'Os 2 olhos em 12x de R$ 625 sem juros.',
  mes: 'novembro de 2026',
}

// Mensagem já escrita do WhatsApp. Começa com "Vim pelo Google" quando a visita veio de anúncio:
// é o marcador que o robô do IBR usa para pôr a etiqueta `google` no card.
export const waMsgs = (google) => {
  const abre = google ? 'Olá! Vim pelo Google' : 'Olá! Vim pela página do IBR'
  return {
    geral: `${abre} e quero saber se posso fazer a cirurgia refrativa.`,
    valor: `${abre}. Vi o valor da cirurgia refrativa e quero saber se posso fazer.`,
    // idade: 'menos de 21 anos' | 'de 21 a 39 anos' | '40 anos ou mais'. dentro = o caso está na indicação da refrativa (24/nov):
    // fora também vai para o WhatsApp, e a pergunta diz ao robô para onde levar a conversa.
    checador: (idade, grau, cornea, dentro) =>
      dentro
        ? `${abre}. Tenho ${idade}, ${grau} e ${cornea}. Quero saber se posso fazer a cirurgia refrativa.`
        : `${abre}. Tenho ${idade}, ${grau} e ${cornea}. Quero saber qual o melhor caminho pro meu olho.`,
  }
}

export const KICKER_TOPO = 'IBR · Av. Paulista · São Paulo'

// Topo por ?g= (o grupo de anúncios): o título repete o que a pessoa buscou.
export const TOPO = {
  refrativa: {
    h1: 'Cirurgia refrativa a laser na Av. Paulista',
    apoio: 'Miopia e astigmatismo, os 2 olhos no mesmo dia, com o Dr. Luis Felipe Bortolan.',
  },
  miopia: {
    h1: 'Cirurgia de miopia e astigmatismo a laser',
    apoio: 'Para quem tem de 21 a 39 anos e até 10 graus de miopia.',
  },
  tecnica: {
    h1: 'LASIK ou PRK: quem decide é a sua córnea',
    apoio: 'O Pentacam mapeia a córnea e mostra qual técnica serve para o seu olho.',
  },
  parar: {
    h1: 'Cirurgia para parar de usar óculos',
    apoio: 'Os 2 olhos no mesmo dia, em 10 a 15 minutos de cirurgia.',
  },
  valor: {
    h1: 'Valor da cirurgia refrativa em SP',
    apoio: 'Os 2 olhos em 12x de R$ 625 sem juros no cartão.',
  },
}

// Fotos: n = nome do arquivo em /fotos/lp; multi = existe em 800w e 1600w; w/h = proporção.
export const FOTOS = {
  criado: { n: 'cena-criado-mudo', multi: true, w: 1600, h: 1067 },
  livros: { n: 'cena-oculos-livros', multi: true, w: 1600, h: 1067 },
  estojo: { n: 'cena-estojo-lente', multi: true, w: 1600, h: 2133 },
  moto: { n: 'cena-moto', multi: true, w: 1600, h: 2400 },
  armacao: { n: 'cena-armacao-grossa', multi: true, w: 1600, h: 1600 },
  salto: { n: 'desejo-mar-salto', multi: true, w: 1600, h: 2400 },
  cornea: { n: 'pilula-cornea-perfil', multi: true, w: 1600, h: 2066 },
  lampada: { n: 'consultorio-lampada-fenda', multi: true, w: 1600, h: 2400 },
  drHeadshot: { n: 'dr-headshot', multi: false, w: 733, h: 1100 },
  drEditorial: { n: 'dr-editorial', multi: false, w: 800, h: 1200 },
}

export const DEPOIMENTOS = [
  {
    texto:
      '"-8 graus de miopia + astigmatismo... me sinto livre, com melhor qualidade de vida e muito mais bonita."',
    fonte: ['Paciente do IBR · mensagem no WhatsApp'],
  },
]

// Vídeos de pacientes (reels públicos no @ibrefrativa). Arquivos em /videos/lp.
export const VIDEOS = [
  { id: 'marcia', legenda: 'Márcia, 27 anos · 10 dias depois da cirurgia' },
  { id: 'juliana', legenda: 'Juliana, 26 anos · de óculos desde os 6' },
]

export const PASSOS = [
  {
    t: 'Você chama no WhatsApp.',
    d: 'A equipe pergunta a sua idade, o seu grau e se você tem algo na córnea. Depois, te explica a cirurgia e marca o seu exame.',
  },
  {
    t: 'Você faz o exame e passa em consulta, no mesmo dia.',
    d: 'Na IOP, Av. Paulista, 1499, do lado do metrô Trianon-MASP. O Pentacam mapeia a sua córnea e, logo depois, o médico analisa o resultado com você. Exame e consulta saem por R$ 250.',
  },
  {
    t: 'Você sai sabendo o que pode fazer.',
    d: 'Se pode operar e qual cirurgia serve para o seu olho. Com todas as informações na mão, você decide com calma e escolhe a data da cirurgia.',
  },
  {
    t: 'Cirurgia e retornos.',
    d: 'Os dois olhos no mesmo dia. Depois, os retornos com o Dr. Luis até ele te liberar.',
  },
]

export const FAQ = [
  [
    'Qual o valor da cirurgia refrativa? Dá para parcelar?',
    [
      'Os 2 olhos saem em 12x de R$ 625 sem juros no cartão. Antes da cirurgia, o seu único gasto é o exame com a consulta, R$ 250 os dois, no mesmo dia. A cirurgia só precisa estar quitada até o dia dela.',
    ],
  ],
  [
    'Qual a idade para fazer a cirurgia de miopia? Dá depois dos 40?',
    [
      'O Dr. Luis indica a cirurgia a laser de 21 a 39 anos. Antes disso, o grau costuma ainda estar mudando. Lá pelos 40 e poucos anos chega a vista cansada, que a cirurgia a laser não impede, e a indicação muda. Passou dos 40, ou tem algum problema no olho? Vale fazer o exame com a consulta do mesmo jeito: o médico te diz o melhor caminho para o seu caso.',
    ],
  ],
  [
    'A partir de quantos graus dá para operar?',
    ['O Dr. Luis opera miopia de até 10 graus, com ou sem astigmatismo. Se você não sabe o seu grau certinho, a receita do óculos já ajuda, e o exame confirma.'],
  ],
  [
    'A cirurgia de miopia dói?',
    [
      'Durante a cirurgia, o olho fica anestesiado com colírio. Nos primeiros dias pode haver algum incômodo, e o Dr. passa colírios justamente para esse período.',
    ],
  ],
  [
    'É perigoso? Quais os riscos?',
    [
      'O medo faz sentido, é o seu olho. Toda cirurgia tem riscos, e quem explica os do seu caso é o Dr. Luis, na consulta. O que o IBR faz para diminuir esse risco é começar pelo exame: o laser só é indicado quando o Pentacam mostra que a sua córnea permite.',
    ],
  ],
  [
    'Quantos dias de repouso? Quanto tempo de recuperação?',
    [
      'Uns 3 ou 4 dias de repouso em casa, com os colírios. A visão vai melhorando aos poucos, e a maioria volta à rotina do 5º dia em diante. Quem libera é o Dr. Muita gente marca numa quinta ou sexta para emendar com o fim de semana.',
    ],
  ],
  [
    'O grau pode voltar?',
    [
      'Nenhum médico pode prometer resultado. Por isso o Dr. só indica a cirurgia depois do exame e da consulta, quando vê que o seu caso é bom para ela. Grau que ainda está aumentando é um dos motivos para esperar. O que esperar no seu caso, ele te explica na consulta.',
    ],
  ],
  [
    'O convênio cobre? Faz pelo SUS?',
    [
      'A cirurgia no IBR é particular, não é feita pelo convênio nem pelo SUS. Muitos planos não cobrem a refrativa, mas vale conferir no seu.',
    ],
  ],
  [
    'LASIK ou PRK: qual é melhor?',
    [
      'Depende do seu olho. As duas usam laser e o que muda é onde ele trabalha. Qual delas dá no seu caso, o Pentacam mostra antes de qualquer decisão.',
    ],
  ],
  [
    'Vou precisar de óculos de novo?',
    [
      'A cirurgia é feita para corrigir o grau que você tem hoje, e na consulta o Dr. te explica o que esperar no seu caso. Lá pelos 40 e poucos anos, todo mundo passa a precisar de óculos para perto, operado ou não. É a vista cansada, e a refrativa não impede isso.',
    ],
  ],
  [
    'Também tenho olho seco. Posso fazer?',
    [
      'Nos primeiros dias, o olho pode ficar mais seco, e os colírios que o Dr. passa são para isso. Se você já tem olho seco antes da cirurgia, é um dos pontos que ele avalia na consulta. Uma paciente do IBR escreveu, depois da cirurgia: "Minha recuperação tem sido ótima... não tive problema com olho seco, nem nada do tipo."',
    ],
  ],
]

export const MOTIVOS_FORA = {
  menor: 'Antes dos 21, o grau costuma ainda estar mudando. O Dr. Luis indica a cirurgia a laser a partir dos 21 anos.',
  maior: 'Lá pelos 40 e poucos chega a vista cansada, que a cirurgia a laser não impede. Por isso o Dr. Luis indica até os 39 anos.',
  grau: 'O Dr. Luis opera miopia de até 10 graus.',
  cornea: 'Com ceratocone ou outro problema na córnea, a cirurgia a laser não é indicada.',
}
