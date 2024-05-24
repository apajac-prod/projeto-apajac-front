export interface ApiAssistido {
    idResponsavelPeloCadastro: number;
    id?: string;
    statusAssistido?: boolean;
    cadastradoEm: string;
    nome: string;
    dataNascimento: string;
    escolaridade: string;
    escola: string;
    telEscola: string;
    cadastroInstituicao: boolean;
    instituicao: string;
    encaminhadoPara: string;
    quemIndicouApajac: string;
    informacoesFornecidasPor: string;
    endereco: Endereco;
    observacoes: string;
    familiares: Familiares[];
    composicaoFamiliar: ComposicaoFamiliar[];
    responsavel: Responsavel;
  }
  
  interface Responsavel {
    nome: string;
    tipoParentesco: string;
    contatos: Contato[];
  }
  
  interface ComposicaoFamiliar {
    nome: string;
    anoNascimento: string;
    parentesco: string;
    ocupacao: string;
    observacoes: string;
  }
  
  export interface Familiares {
    nome: string;
    contatos: Contato[];
    ocupacao: string;
    localTrabalho: string;
    salario: number;
    vinculoEmpregaticio: string;
    tipoParentesco: string;
  }
  
  export interface Contato {
    contato: string;
  }
  
  interface Endereco {
    cep: string;
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    complemento: string;
    uf: string;
  }