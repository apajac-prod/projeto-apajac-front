type CARS_CHILDHOOD_TYPE = {
  // Passa a aceitar string como index de objeto
  [key: string]: {
    title: string;
    descricao: string;
    pontos: number;
  }[];
};

//Importante manter na ordem do objeto CARS_CHILDHOOD
export const CARS_CHILDHOOD_INDEX = [
  "relacoesPessoais",
  "imitacao",
  "respostaEmocional",
  "usoCorporal",
  "usoDeObjetos",
  "respostaAMudancas",
  "respostaVisual",
  "respostaAuditiva",
  "respostaUsoPaladarOlfatoTato",
  "medoOuNervosismo",
  "comunicacaoVerbal",
  "comunicacaoNaoVerbal",
  "nivelDeAtividade",
  "nivelEConsistenciaRespostaIntelectual",
  "impressoesGerais",
];

export const CARS_CHILDHOOD_TITLE = [
  "relações pessoais",
  "imitação",
  "resposta emocional",
  "uso corporal",
  "uso de objetos",
  "resposta a mudanças",
  "resposta visual",
  "resposta auditiva",
  "resposta e uso do paladar, olfato e tato",
  "medo ou nervosismo",
  "comunicação verbal",
  "comunicação não-verbal",
  "nível de atividade",
  "nível e consistência da resposta intelectual",
  "impressões gerais",
];

export const CARS_CHILDHOOD: CARS_CHILDHOOD_TYPE = {
  relacoesPessoais: [
    {
      title:
        "Nenhuma evidência de dificuldade ou anormalidade nas relações pessoais",
      descricao:
        "O comportamento da criança é adequado à sua idade. Alguma timidez, nervosismo ou aborrecimento podem ser observados quando é dito à criança o que fazer, mas não em grau atípico.",
      pontos: 0,
    },
    {
      title: "Relações levemente anormais",
      descricao:
        "A criança pode evitar olhar o adulto nos olhos, evitar o adulto ou ter uma reação exagerada se a interação é forçada, ser excessivamente tímido, não responder ao adulto como esperado ou agarrar-se ao pais um pouco mais que a maioria das crianças da mesma idade.",
      pontos: 1.5,
    },
    {
      title: "Relações moderadamente anormais",
      descricao:
        "Às vezes, a criança demonstra indiferença (parece ignorar o adulto). Outras vezes, tentativas persistentes e vigorosas são necessárias para se conseguir a atenção da criança. O contato iniciado pela criança é mínimo.",
      pontos: 2.5,
    },
    {
      title: "Relações gravemente anormais",
      descricao:
        "A criança está constantemente indiferente ou inconsciente ao que o adulto está fazendo. Ela quase nunca responde ou inicia contato com o adulto. Somente a tentativa mais persistente para atrair a atenção tem algum efeito.",
      pontos: 3.5,
    },
  ],

  imitacao: [
    {
      title: "Imitação adequada",
      descricao:
        "A criança pode imitar sons, palavras e movimentos, os quais são adequados para o seu nível de habilidade.",
      pontos: 0,
    },
    {
      title: "Imitação levemente anormal",
      descricao:
        "Na maior parte do tempo, a criança imita comportamentos simples como bater palmas ou sons verbais isolados; ocasionalmente imita somente após estimulação ou com atraso.",
      pontos: 1.5,
    },
    {
      title: "Imitação moderadamente anormal",
      descricao:
        "A criança imita apenas parte do tempo e requer uma grande dose de persistência ou ajuda do adulto; freqüentemente imita apenas após um tempo (com atraso).",
      pontos: 2.5,
    },
    {
      title: "Imitação gravemente anormal",
      descricao:
        "A criança raramente ou nunca imita sons, palavras ou movimentos mesmo com estímulo e assistência.",
      pontos: 3.5,
    },
  ],

  respostaEmocional: [
    {
      title: "Resposta emocional adequada à situação e à idade",
      descricao:
        "A criança demonstra tipo e grau adequados de resposta emocional, indicada por uma mudança na expressão facial, postura e conduta",
      pontos: 0,
    },
    {
      title: "Resposta emocional levemente anormal",
      descricao:
        "A criança ocasionalmente apresenta um tipo ou grau inadequados de resposta emocional. As vezes, suas reações não estão relacionadas a objetos ou a eventos ao seu redor.",
      pontos: 1.5,
    },
    {
      title: "Resposta emocional moderadamente anormal",
      descricao:
        "A criança demonstra sinais claros de resposta emocional inadequada (tipo ou grau). As reações podem ser bastante inibidas ou excessivas e sem relação com a situação; pode fazer caretas, rir ou tornar-se rígida até mesmo quando não estejam presentes objetos ou eventos produtores de emoção.",
      pontos: 2.5,
    },
    {
      title: "Resposta emocional gravemente anormal",
      descricao:
        "As respostas são raramente adequadas a situação. Uma vez que a criança atinja um determinado humor, é muito difícil alterá-lo. Por outro lado, a criança pode demonstrar emoções diferentes quando nada mudou.",
      pontos: 3.5,
    },
  ],

  usoCorporal: [
    {
      title: "Uso corporal adequado à idade",
      descricao:
        "A criança move-se com a mesma facilidade, agilidade e coordenação de uma criança normal da mesma idade.",
      pontos: 0,
    },
    {
      title: "Uso corporal levemente anormal",
      descricao:
        "Algumas peculiaridades podem estar presentes, tais como falta de jeito, movimentos repetitivos, pouca coordenação ou a presença rara de movimentos incomuns.",
      pontos: 1.5,
    },
    {
      title: "Uso corporal moderadamente anormal",
      descricao:
        "Comportamentos que são claramente estranhos ou incomuns para uma criança desta idade podem incluir movimentos estranhos com os dedos, postura peculiar dos dedos ou corpo, olhar fixo, beliscar o corpo, auto-agressão, balanceio, girar ou caminhar nas pontas dos pés.",
      pontos: 2.5,
    },
    {
      title: "Uso corporal gravemente anormal",
      descricao:
        "Movimentos intensos ou freqüentes do tipo listado acima são sinais de uso corporal gravemente anormal. Estes comportamentos podem persistir apesar das tentativas de desencorajar as crianças a fazê-los ou de envolver a criança em outras atividades.",
      pontos: 3.5,
    },
  ],

  usoDeObjetos: [
    {
      title: "Uso e interesse adequados por brinquedos e outros objetos",
      descricao:
        "A criança demonstra interesse normal por brinquedos e outros objetos adequados para o seu nível de habilidade e os utiliza de maneira adequada.",
      pontos: 0,
    },
    {
      title:
        "Uso e interesse levemente inadequados por brinquedos e outros objetos",
      descricao:
        "A criança pode demonstrar um interesse atípico por um brinquedo ou brincar com ele de forma inadequada, de um modo pueril (exemplo: batendo ou sugando o brinquedo)",
      pontos: 1.5,
    },
    {
      title:
        "Uso e interesse moderadamente inadequados por brinquedos e outros objetos",
      descricao:
        "A criança pode demonstrar pouco interesse por brinquedos ou outros objetos, ou pode estar preocupada em usá-los de maneira estranha. Ela pode concentrar-se em alguma parte insignificante do brinquedo, tornar-se fascinada com a luz que reflete do mesmo, repetitivamente mover alguma parte do objeto ou exclusivamente brincar com ele.",
      pontos: 2.5,
    },
    {
      title:
        "Uso e interesse gravemente inadequados por brinquedos e outros objetos",
      descricao:
        "A criança pode engajar-se nos mesmos comportamentos citados acima, porém com maior freqüência e intensidade. É difícil distrair a criança quando ela está engajada nestas atividades inadequadas.",
      pontos: 3.5,
    },
  ],

  respostaAMudancas: [
    {
      title: "Respostas à mudança adequadas a idade",
      descricao:
        "Embora a criança possa perceber ou comentar as mudanças na rotina, ela é capaz de aceitar estas mudanças sem angústia excessiva.",
      pontos: 0,
    },
    {
      title: "Respostas à mudança adequadas à idade levemente anormal",
      descricao:
        "Quando um adulto tenta mudar tarefas, a criança pode continuar na mesma atividade ou usar os mesmos materiais.",
      pontos: 1.5,
    },
    {
      title: "Respostas à mudança adequadas à idade moderadamente anormal",
      descricao:
        "A criança resiste ativamente a mudanças na rotina, tenta continuar sua antiga atividade e é difícil de distraí-la. Ela pode tornar-se infeliz e zangada quando uma rotina estabelecida é alterada.",
      pontos: 2.5,
    },
    {
      title: "Respostas à mudança adequadas à idade gravemente anormal",
      descricao:
        "A criança demonstra reações graves às mudanças. Se uma mudança é forçada, ela pode tornar-se extremamente zangada ou não disposta a ajudar e responder com acessos de raiva.",
      pontos: 3.5,
    },
  ],

  respostaVisual: [
    {
      title: "Resposta visual adequada",
      descricao:
        "O comportamento visual da criança é normal e adequado para sua idade. A visão é utilizada em conjunto com outros sentidos como forma de explorar um objeto novo.",
      pontos: 0,
    },
    {
      title: "Resposta visual levemente anormal",
      descricao:
        "A criança precisa, ocasionalmente, ser lembrada de olhar para os objetos. A criança pode estar mais interessada em olhar espelhos ou luzes do que o fazem seus pares, pode ocasionalmente olhar fixamente para o espaço, ou pode evitar olhar as pessoas nos olhos.",
      pontos: 1.5,
    },
    {
      title: "Resposta visual moderadamente anormal",
      descricao:
        "A criança deve ser lembrada freqüentemente de olhar para o que está fazendo, ela pode olhar fixamente para o espaço, evitar olhar as pessoas nos olhos, olhar objetos de um ângulo incomum ou segurar os objetos muito próximos aos olhos.",
      pontos: 2.5,
    },
    {
      title: "Resposta visual gravemente anormal",
      descricao:
        "A criança evita constantemente olhar para as pessoas ou para certos objetos e pode demonstrar formas extremas de outras peculiaridades visuais descritas acima.",
      pontos: 3.5,
    },
  ],

  respostaAuditiva: [
    {
      title: "Respostas auditivas adequadas para a idade",
      descricao:
        "O comportamento auditivo da criança é normal e adequado para idade. A audição é utilizada junto com outros sentidos.",
      pontos: 0,
    },
    {
      title: "Respostas auditivas levemente anormal",
      descricao:
        "Pode haver ausência de resposta ou uma resposta levemente exagerada a certos sons. Respostas a sons podem ser atrasadas e os sons podem necessitar de repetição para prender a atenção da criança. A criança pode ser distraída por sons externos.",
      pontos: 1.5,
    },
    {
      title: "Respostas auditivas moderadamente anormal",
      descricao:
        "As repostas da criança aos sons variam. Freqüentemente ignora o som nas primeiros vezes em que é feito. Pode assustar-se ou cobrir as orelhas ao ouvir alguns sons do cotidiano.",
      pontos: 2.5,
    },
    {
      title: "Respostas auditivas gravemente anormal",
      descricao:
        "A criança reage exageradamente e/ou ou despreza sons num grau extremamente significativo, independente do tipo de som.",
      pontos: 3.5,
    },
  ],

  respostaUsoPaladarOlfatoTato: [
    {
      title: "Uso e reposta normais do paladar, olfato e tato",
      descricao:
        "A criança explora novos objetos de um modo adequado a sua idade, geralmente sentindo ou olhando. Paladar ou olfato podem ser usados quando adequados. Ao reagir a pequenas dores do dia-a-dia, a criança expressa desconforto mas não reage exageradamente.",
      pontos: 0,
    },
    {
      title: "Uso e reposta levemente anormais do paladar, olfato e tato",
      descricao:
        "A criança pode persistir em colocar objetos na boca; pode cheirar ou provar/experimentar objetos não comestíveis. Pode ignorar ou ter reação levemente exagerada à uma dor mínima, para a qual uma criança normal expressaria somente desconforto.",
      pontos: 1.5,
    },
    {
      title: "Uso e resposta moderadamente anormais do paladar, olfato e tato",
      descricao:
        "A criança pode estar moderadamente preocupada em tocar, cheirar ou provar objetos ou pessoas. A criança pode reagir demais ou muito pouco.",
      pontos: 2.5,
    },
    {
      title: "Uso e resposta gravemente anormais do paladar, olfato e tato",
      descricao:
        "A criança está preocupada em cheirar, provar e sentir objetos, mais pela sensação do que pela exploração ou uso normal dos objetos. A criança pode ignorar completamente a dor ou reagir muito fortemente a desconfortos leves.",
      pontos: 3.5,
    },
  ],

  medoOuNervosismo: [
    {
      title: "Medo ou nervosismo normais",
      descricao:
        "O comportamento da criança é adequado tanto à situação quanto à idade.",
      pontos: 0,
    },
    {
      title: "Medo ou nervosismo levemente anormais",
      descricao:
        "A criança ocasionalmente demonstra muito ou pouco medo ou nervosismo quando comparada às reações de uma criança normal da mesma idade e em situação semelhante.",
      pontos: 1.5,
    },
    {
      title: "Medo ou nervosismo moderadamente anormais",
      descricao:
        "A criança demonstra bastante mais ou bastante menos medo do que seria típico para uma criança mais nova ou mais velha em uma situação similar.",
      pontos: 2.5,
    },
    {
      title: "Medo ou nervosismo gravemente anormais",
      descricao:
        "Medos persistem mesmo após experiências repetidas com eventos ou objetos inofensivos. É extremamente difícil acalmar ou confortar a criança. A criança pode, por outro lado, falhar em demonstrar consideração adequada aos riscos que outras crianças da mesma idade evitam.",
      pontos: 3.5,
    },
  ],

  comunicacaoVerbal: [
    {
      title: "Comunicação verbal normal",
      descricao: "Comunicação verbal normal, adequada a idade e à situação.",
      pontos: 0,
    },
    {
      title: "Comunicação verbal levemente anormal",
      descricao:
        "A fala demonstra um atraso global. A maior parte do discurso tem significado; porém, alguma ecolalia ou inversão pronominal podem ocorrer. Algumas palavras peculiares ou jargões podem ser usados ocasionalmente.",
      pontos: 1.5,
    },
    {
      title: "Comunicação verbal moderadamente anormal",
      descricao:
        "A fala pode estar ausente. Quando presente, a comunicação verbal pode ser uma mistura de alguma fala significativa e alguma linguagem peculiar, tais como jargão, ecolalia ou inversão pronominal. As peculiaridades na fala significativa podem incluir questionamentos excessivos ou preocupação com algum tópico em particular.",
      pontos: 2.5,
    },
    {
      title: "Comunicação verbal gravemente anormal",
      descricao:
        "Fala significativa não é utilizada. A criança pode emitir gritos estridentes e infantis, sons animais ou bizarros, barulhos complexos semelhantes à fala, ou pode apresentar o uso bizarro e persistente de algumas palavras reconhecíveis ou frases.",
      pontos: 3.5,
    },
  ],

  comunicacaoNaoVerbal: [
    {
      title: "Uso normal da comunicação não-verbal adequado",
      descricao:
        "Uso normal da comunicação não-verbal adequado à idade e situação.",
      pontos: 0,
    },
    {
      title: "Uso da comunicação não-verbal levemente anormal",
      descricao:
        "Uso imaturo da comunicação não-verbal; a criança pode somente apontar vagamente ou esticar-se para alcançar o que quer, nas mesmas situações nas quais uma criança da mesma idade pode apontar ou gesticular mais especificamente para indicar o que deseja.",
      pontos: 1.5,
    },
    {
      title: "Uso da comunicação não-verbal moderadamente anormal",
      descricao:
        "A criança geralmente é incapaz de expressar suas necessidades ou desejos de forma não verbal, e não consegue compreender a comunicação não-verbal dos outros.",
      pontos: 2.5,
    },
    {
      title: "Uso da comunicação não-verbal gravemente anormal",
      descricao:
        "A criança utiliza somente gestos bizarros ou peculiares, sem significado aparente, e não demonstra nenhum conhecimento do significados associados aos gestos ou expressões faciais dos outros.",
      pontos: 3.5,
    },
  ],

  nivelDeAtividade: [
    {
      title: "Nível de atividade normal para idade e circunstâncias",
      descricao:
        "A criança não é nem mais nem menos ativa que uma criança normal da mesma idade em uma situação semelhante.",
      pontos: 0,
    },
    {
      title: "Nível de atividade levemente anormal",
      descricao:
        "A criança pode tanto ser um pouco irrequieta quanto um pouco preguiçosa, apresentando, algumas vezes, movimentos lentos. O nível de atividade da criança interfere apenas levemente no seu desempenho.",
      pontos: 1.5,
    },
    {
      title: "Nível de atividade moderadamente anormal",
      descricao:
        "A criança pode ser bastante ativa e difícil de conter. Ela pode ter uma energia ilimitada ou pode não ir prontamente para a cama à noite. Por outro lado, a criança pode ser bastante letárgica e necessitar de um grande estímulo para mover-se.",
      pontos: 2.5,
    },
    {
      title: "Nível de atividade gravemente anormal",
      descricao:
        "A criança exibe extremos de atividade ou inatividade e pode até mesmo mudar de um extremo ao outro.",
      pontos: 3.5,
    },
  ],

  nivelEConsistenciaRespostaIntelectual: [
    {
      title:
        "A inteligência é normal e razoavelmente consistente em várias áreas",
      descricao:
        "A criança é tão inteligente quanto crianças típicas da mesma idade e não tem qualquer habilidade intelectual ou problemas incomuns.",
      pontos: 0,
    },
    {
      title: "Funcionamento intelecual levemente anormal",
      descricao:
        "A criança não é tão inteligente quanto crianças típicas da mesma idade; as habilidades apresentam-se razoavelmente regulares através de todas as áreas.",
      pontos: 1.5,
    },
    {
      title: "Funcionamento intelectual moderadamente anormal",
      descricao:
        "Em geral, a criança não é tão inteligente quanto uma típica criança da mesma idade, porém, a criança pode funcionar próximo do normal em uma ou mais áreas intelectuais.",
      pontos: 2.5,
    },
    {
      title: "Funcionamento intelectual gravemente anormal",
      descricao:
        "Embora a criança geralmente não seja tão inteligente quanto uma criança típica da mesma idade, ela pode funcionar até mesmo melhor que uma criança normal da mesma idade em uma ou mais áreas.",
      pontos: 3.5,
    },
  ],

  impressoesGerais: [
    {
      title: "Sem autismo",
      descricao:
        "A criança não apresenta nenhum dos sintomas característicos do autismo.",
      pontos: 0,
    },
    {
      title: "Autismo leve",
      descricao:
        "A criança apresenta somente um pequeno número de sintomas ou somente um grau leve de autismo.",
      pontos: 1.5,
    },
    {
      title: "Autismo moderado",
      descricao:
        "A criança apresenta muitos sintomas ou um grau moderado de autismo.",
      pontos: 2.5,
    },
    {
      title: "Autismo grave",
      descricao:
        "A criança apresenta inúmeros sintomas ou um grau extremo de autismo.",
      pontos: 3.5,
    },
  ],
};
