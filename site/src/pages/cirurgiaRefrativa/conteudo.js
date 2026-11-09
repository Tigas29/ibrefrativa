// Conteúdo da LP /cirurgia-refrativa (fonte: copy-v4.md, Partes 2 e 3).
// Trechos { pend: '...' } são pendências e viram <Pendente> na tela.

export const WA_NUMERO = '551150284894'
export const WA_MSG_HEADER =
  'Olá! Vim pela página do IBR e quero saber se posso fazer a cirurgia refrativa.'

export const TITULOS = {
  a: 'Pare de usar óculos e nunca mais acorde procurando por eles.',
  b: 'Pare de usar lente de contato e nunca mais carregue estojo e solução na bolsa.',
  c: 'Pare de depender do óculos e nunca mais deixe o grau escolher a sua armação.',
}

export const KICKERS = {
  refrativa: 'Cirurgia refrativa a laser · Av. Paulista, São Paulo',
  miopia: 'Cirurgia de miopia a laser · Av. Paulista, São Paulo',
  tecnica: 'LASIK e PRK · Av. Paulista, São Paulo',
  parar: 'Cirurgia para parar de usar óculos · Av. Paulista',
  valor: 'Cirurgia refrativa · valor e parcelamento',
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

export const DORES = [
  {
    id: 'oculos',
    foto: 'livros',
    pos: '50% 55%',
    kicker: 'Anos de óculos',
    titulo: 'Acordar e colocar o óculos antes de qualquer coisa.',
    texto:
      'O primeiro gesto do dia é sempre o mesmo, há anos. O óculos escuro que precisa ter grau. A piscina e o mar sem enxergar quem está na areia. O grau que você já sabe de cor, de tanto repetir na ótica.',
  },
  {
    id: 'lente',
    foto: 'estojo',
    pos: '50% 50%',
    kicker: 'A lente de contato',
    titulo: 'A lente que você alterna com o óculos há anos.',
    texto:
      'O olho cansado no fim do dia. A lente que resseca no ar-condicionado. O estojo e a solução em toda bolsa e em toda mala. Tem gente que usa lente há 17 anos antes de procurar a cirurgia.',
  },
  {
    id: 'moto',
    foto: 'moto',
    pos: '50% 60%',
    kicker: 'Moto, treino e campo',
    titulo: 'Trocar o óculos pela lente só para incomodar menos em alguma atividade.',
    texto:
      'O óculos que embaça dentro do capacete. A lente que sai do lugar no treino. Não reconhecer o rosto do colega do outro lado do campo. Para quem leva impacto no rosto, pesa muito qual técnica o seu olho permite. A diferença está mais abaixo.',
  },
  {
    id: 'armacao',
    foto: 'armacao',
    pos: '50% 50%',
    kicker: 'A lente fundo de garrafa',
    titulo: 'A armação que o grau escolheu por você.',
    texto:
      'A lente grossa que só cabe nas armações mais largas. A sensação de que o óculos deixa o rosto mais pesado, mais velho. Gostar mais do próprio rosto sem a armação e não conseguir ficar sem ela.',
  },
]

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
    t: 'Você responde 3 perguntas no WhatsApp.',
    d: 'Idade, grau e se tem algo na córnea. Se fizer sentido seguir, a equipe te explica a cirurgia, te passa o valor e faz o pedido do exame.',
  },
  {
    t: 'Você faz o Pentacam.',
    d: 'Na Clínica Spot, Av. Paulista, 91. O resultado costuma sair no mesmo dia e vai para você e para o Dr. Luis. O exame é pago direto na clínica, e dá para fazer pelo convênio, se o seu cobrir. Já fez um Pentacam nos últimos 6 meses? Ele vale.',
  },
  {
    t: 'Você passa em consulta com o Dr. Luis.',
    d: 'No mesmo prédio do exame. Ele faz o exame oftalmológico, analisa o Pentacam com você e, estando tudo certo, você já sai com a data da cirurgia.',
  },
  {
    t: 'Cirurgia e retornos.',
    d: 'Os dois olhos no mesmo dia. Depois, os retornos com o Dr. Luis até ele te liberar.',
  },
]

export const FAQ = [
  [
    'Qual a idade para fazer a cirurgia de miopia? Dá depois dos 40?',
    [
      'O Dr. Luis indica a cirurgia a laser de 21 a 39 anos. Antes disso, o grau costuma ainda estar mudando. Lá pelos 40 e poucos anos chega a vista cansada, que a cirurgia a laser não impede, e a indicação muda.',
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
    'Qual o valor da cirurgia refrativa? Dá para parcelar?',
    [
      'O valor a gente te passa no WhatsApp, logo depois de entender o seu caso. Dá para parcelar em até 12 vezes sem juros no cartão. Até a consulta com o Dr., o seu único gasto é o exame, pago direto na clínica, e a cirurgia só precisa estar quitada até o dia dela.',
    ],
  ],
  [
    'O convênio cobre? Faz pelo SUS?',
    [
      'A cirurgia no IBR é particular, não é feita pelo convênio nem pelo SUS. Muitos planos não cobrem a refrativa, mas vale conferir no seu. O Pentacam você pode fazer pelo convênio, se ele cobrir.',
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
