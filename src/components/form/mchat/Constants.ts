export type MchatFormData = Map<number, {
  pergunta: string;
  resposta: boolean | undefined;
  gabarito: boolean;
  peso: number
}>

export const mchatFormData: MchatFormData = new Map([
  [1, {
    pergunta: "Gosta de brincar ao colo fazendo de “cavalinho”, etc. ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [2, {
    pergunta: "Interessa-se pelas outras crianças ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [3, {
    pergunta: "Gosta de subir objectos, como por exemplo, cadeiras, mesas ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [4, {
    pergunta: "Gosta de jogar às escondidas ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [5, {
    pergunta: "Brinca ao faz-de-conta, por exemplo, falar ao telefone ou dar de comer a uma boneca, etc. ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [6, {
    pergunta: "Aponta com o indicador para pedir alguma coisa ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [7, {
    pergunta: "Aponta com o indicador para mostrar interesse em alguma coisa ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [8, {
    pergunta: "Brinca apropriadamente com brinquedos (carros ou Legos) sem levá-los à boca, abanar ou deitá-los ao chão ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [9, {
    pergunta: "Alguma vez lhe trouxe objectos (brinquedos) para lhe mostrar alguma coisa ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [10, {
    pergunta: "A criança mantém contacto visual por mais de um ou dois segundos ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [11, {
    pergunta: "É muito sensível aos ruídos (ex. tapa os ouvidos) ?",
    resposta: undefined,
    gabarito: true,
    peso: 1
  }],
  [12, {
    pergunta: " Sorri como resposta às suas expressões faciais ou ao seu sorriso ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [13, {
    pergunta: "Imita o adulto (ex. faz uma careta e ela imita) ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [14, {
    pergunta: "Responde/olha quando o(a) chamam pelo nome ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [15, {
    pergunta: "Se apontar para um brinquedo do outro lado da sala, a criança acompanha com o olhar ?",
    resposta: undefined,
    gabarito: false,
    peso: 2
  }],
  [16, {
    pergunta: "Já anda ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [17, {
    pergunta: "Olha para as coisas para as quais o adulto está a olhar ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [18, {
    pergunta: "Faz movimentos estranhos com as mãos/dedos próximo da cara ?",
    resposta: undefined,
    gabarito: true,
    peso: 1
  }],
  [19, {
    pergunta: "Tenta chamar a sua atenção para o que está a fazer ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [20, {
    pergunta: "Alguma vez se preocupou quanto à sua audição ?",
    resposta: undefined,
    gabarito: true,
    peso: 1
  }],
  [21, {
    pergunta: "Compreende o que as pessoas lhe dizem ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
  [22, {
    pergunta: "Por vezes fica a olhar para o vazio ou deambula ao acaso pelos espaços ?",
    resposta: undefined,
    gabarito: true,
    peso: 1
  }],
  [23, {
    pergunta: "Procura a sua reacção facial quando se vê confrontada com situações desconhecidas ?",
    resposta: undefined,
    gabarito: false,
    peso: 1
  }],
])