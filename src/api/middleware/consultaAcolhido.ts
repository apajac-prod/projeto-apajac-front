  interface Api {
  id: number;
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
  familiares: Familiare[];
  composicaoFamiliar: ComposicaoFamiliar[];
  responsavel: Responsavel;
  statusAcolhido: boolean;
}

interface Responsavel {
  nome: string;
  tipoParentesco: string;
  contatos: Contato[];
}

interface ComposicaoFamiliar {
  nome: string;
  anoNascimento: number;
  parentesco: string;
  ocupacao: string;
  observacoes: null;
}

interface Familiare {
  nome: string;
  contatos: Contato[];
  ocupacao: string;
  localTrabalho: string;
  salario: number;
  vinculoEmpregaticio: null|string;
  tipoParentesco: string;
}

interface Contato {
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

export function apiToConsultaAcolhido (data: Api) {

  function convertOccupation(occupation: string){
    if (!occupation) return null;
    
    if (occupation === "do_lar") return "Do Lar";
    if(occupation === "desempregado") return "Desempregado";
    if(occupation === "desconhecido") return "Desconhecido";
    if(occupation === "outro") return "Outro";
  }

    return {
        status: data.statusAcolhido,
        id: data.id,
        name: data.nome,
        birthdate: new Date(data.dataNascimento),
        educationLevel: data.escolaridade,
        school: data.escola,
        schoolPhone: data.telEscola,
        anyInstitutionRegister: data.cadastroInstituicao,
        whichInstitution: data.instituicao,
        forwardedTo: data.encaminhadoPara,
        whoRecommended: data.quemIndicouApajac,
        informationProvidedBy: data.informacoesFornecidasPor,
        address: {
            cep: data.endereco?.cep,
            address: data.endereco?.endereco,
            number: data.endereco?.numero,
            district: data.endereco?.bairro,
            city: data.endereco?.cidade,
            complement: data.endereco?.complemento,
            fu: data.endereco?.uf
        },
        comments: data.observacoes,
        mother: data.familiares && {
            name: data.familiares[0]?.nome,
            phones: data.familiares[0].contatos?.map((phone) => {
                return phone?.contato
            }),
            occupation: convertOccupation(data.familiares[0]?.ocupacao),
            placeOfWork: data.familiares[0]?.localTrabalho,
            salary: data.familiares[0]?.salario,
            employmentRelationship: data.familiares[0]?.vinculoEmpregaticio

        },

        father: data.familiares && {
            name: data.familiares[1]?.nome,
                phones: data.familiares[1]?.contatos?.map((phone) => phone.contato),
                occupation: convertOccupation(data.familiares[1]?.ocupacao),
                placeOfWork: data.familiares[1]?.localTrabalho,
                salary: data.familiares[1]?.salario,
                employmentRelationship: data.familiares[1]?.vinculoEmpregaticio

        },

        familyComposition: data.composicaoFamiliar?.map((familyMember) => {
            return {
                name: familyMember?.nome,
                birthYear: familyMember?.anoNascimento,
                relationship: familyMember?.parentesco,
                occupation: familyMember?.ocupacao,
                comments: familyMember?.observacoes            
            }
        }),

        responsible: data.responsavel && {
            name: data.responsavel?.nome,
            relationship: data.responsavel?.tipoParentesco,
            phones: data.responsavel.contatos?.map((phone) => phone?.contato)
        }
    }
}