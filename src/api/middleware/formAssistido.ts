import {
  Assistido,
  Pais,
  Responsavel,
  ComposicaoFamiliar,
  Finalizar,
} from "@/types/formAssistido.type";

import { ApiAssistido, Contato, Familiares } from "@/types/ApiAssistido.type";

import dayjs from "dayjs";

//Steps in order, to be used to generate the final object (below function getResultObject())
const STEPS = [
  "assistido",
  "mae",
  "pai",
  "responsavel",
  "composicaoFamiliar",
  "finalizar",
];

type AssistidoInput = Array<
  Assistido | Pais | Responsavel | ComposicaoFamiliar | Finalizar
>;

//Format object to what API expects
export function assistidoToApi(
  assistido: AssistidoInput,
  sessionId: number
): ApiAssistido {
  let data: any = assistido.map((element: any, index: number) => {
    if (STEPS[index] == "composicaoFamiliar") {
      return element.familyComposition;
    }
    return element;
  });
  //Transform array to object
  data = data.reduce(
    (acc: { [key: string]: object }, curr: any, index: number) => (
      (acc[STEPS[index]] = curr), acc
    ),
    {}
  );

  //Transform phone arrays to flat arrays
  const steps = ["mae", "pai", "responsavel"];
  steps.forEach((step) => {
    if (data[step] && data[step].phones) {
      data[step].phones = data[step].phones.map(
        (phoneObject: { value: string }) => {
          return { contato: phoneObject.value };
        }
      );
    }
  });

  // Parse Datestring to Date:
  /* const birthdate = new Date(Date.parse(localDateFormatToDefaultFormat(data.assistido.birthdate)))
    console.log(birthdate);

    console.log("data:",data)
    console.log("data.assistido.birthdate:", data.assistido.birthdate);
    console.log("birthdate:", birthdate) */

  // const dataToApi: { [key: string]: any} = {

  let dataToApi: ApiAssistido = {
    idResponsavelPeloCadastro: sessionId,
    cadastradoEm: data.assistido.registerDate.format("YYYY-MM-DD"),
    id: data.assistido.id ?? null,
    statusAssistido: data.assistido.status ?? null,
    nome: data.assistido.name,
    dataNascimento: data.assistido.birthdate.format("YYYY-MM-DD"),
    genero: data.assistido.gender,
    escolaridade: data.assistido.educationLevel,
    escola: data.assistido.school,
    telEscola: data.assistido.schoolPhone,
    cadastroInstituicao:
      data.assistido.anyInstitutionRegister == "yes" ? true : false,
    instituicao: data.assistido.whichInstitution,
    encaminhadoPara: data.assistido.forwardedTo,
    quemIndicouApajac: data.assistido.whoRecommended,
    informacoesFornecidasPor: data.assistido.informationProvidedBy,
    endereco: {
      cep: data.assistido.postalCode,
      endereco: data.assistido.address,
      numero: data.assistido.addressNumber,
      bairro: data.assistido.district,
      cidade: data.assistido.city,
      uf: data.assistido.fu,
      complemento: data.assistido.complement,
    },
    familiares: [
      {
        nome: data.mae.name,
        contatos: data.mae.phones,
        ocupacao: data.mae.ocupation,
        localTrabalho: data.mae.placeOfWork,
        salario: data.mae.salary,
        vinculoEmpregaticio:
          data.mae.employmentRelationship == "outro"
            ? data.mae.employmentRelationshipDesc
            : data.mae.employmentRelationship,
        tipoParentesco: "MAE",
      },
      {
        nome: data.pai.name,
        contatos: data.pai.phones,
        ocupacao: data.pai.ocupation,
        localTrabalho: data.pai.placeOfWork,
        salario: data.pai.salary,
        vinculoEmpregaticio:
          data.pai.employmentRelationship == "outro"
            ? data.pai.employmentRelationshipDesc
            : data.pai.employmentRelationship,
        tipoParentesco: "PAI",
      },
    ],
    responsavel: {
      tipoParentesco:
        data.responsavel.responsible == "outro"
          ? "OUTROS"
          : data.responsavel.responsible.toUpperCase(),
      nome:
        data.responsavel.responsible == "outro"
          ? data.responsavel.responsibleName
          : data.responsavel.responsible == "mae"
          ? data.mae.name
          : data.pai.name,
      contatos:
        data.responsavel.responsible == "outro"
          ? data.responsavel.phones
          : data.responsavel.responsible == "mae"
          ? data.mae.phones
          : data.pai.phones,
    },
    composicaoFamiliar: [],
    observacoes: data.finalizar.comments,
  };

  // Insert family composition into the output object
  if (data.composicaoFamiliar.length > 0) {
    data.composicaoFamiliar.forEach((familyMember: any) => {
      dataToApi.composicaoFamiliar.push({
        nome: familyMember.name,
        anoNascimento: familyMember.age,
        parentesco: familyMember.relationship,
        observacoes: familyMember.comments,
        ocupacao: familyMember.ocupation,
      });
    });
  }

  return dataToApi;
}

export function apiToAssistido(data: ApiAssistido) {
  type Pais = {
    tipoParentesco: string | null;
    nome: string | null;
    ocupacao: string | null;
    salario: number | null;
    vinculoEmpregaticio: string | null;
    localTrabalho: string | null;
    contatos: any;
  };
  type Responsavel = Omit<
    Pais,
    "ocupacao" | "salario" | "vinculoEmpregaticio" | "localTrabalho"
  >;

  /*     let mae: Familiares = {
        nome: null, contatos: null, tipoParentesco: null, ocupacao: null, salario: null, vinculoEmpregaticio: null,
        localTrabalho: null
    }, pai: Pais = {nome: null, contatos: [], tipoParentesco: null, ocupacao: null, salario: null, vinculoEmpregaticio: null, localTrabalho: null}; */

  let mae: Pais = {
      contatos: null,
      localTrabalho: null,
      nome: null,
      ocupacao: null,
      salario: null,
      tipoParentesco: null,
      vinculoEmpregaticio: null,
    },
    pai: Pais = {
      contatos: null,
      localTrabalho: null,
      nome: null,
      ocupacao: null,
      salario: null,
      tipoParentesco: null,
      vinculoEmpregaticio: null,
    };

  data.familiares.forEach((familiar: Familiares) => {
    if (familiar.tipoParentesco == "MAE") {
      mae.nome = familiar.nome;
      mae.ocupacao = familiar.ocupacao;
      mae.salario = familiar.salario;
      mae.tipoParentesco = familiar.tipoParentesco;
      mae.vinculoEmpregaticio = familiar.vinculoEmpregaticio;
      mae.localTrabalho = familiar.localTrabalho;
      mae.contatos = familiar.contatos!.map((phone: Contato) => {
        return { value: phone.contato };
      });
    } else if (familiar.tipoParentesco == "PAI") {
      pai.nome = familiar.nome;
      pai.ocupacao = familiar.ocupacao;
      pai.salario = familiar.salario;
      pai.tipoParentesco = familiar.tipoParentesco;
      pai.vinculoEmpregaticio = familiar.vinculoEmpregaticio;
      pai.localTrabalho = familiar.localTrabalho;
      pai.contatos = familiar.contatos!.map((phone: Contato) => {
        return { value: phone.contato ?? "" }; // return {value: phone.contato}
      });
    }
  });

  let responsavel: Responsavel = {
    nome: null,
    contatos: [],
    tipoParentesco: null,
  };
  if (data.responsavel.tipoParentesco == "MAE") {
    responsavel.nome = mae!.nome;
    responsavel.contatos = mae!.contatos;
    responsavel.tipoParentesco = mae!.tipoParentesco;
  } else if (data.responsavel.tipoParentesco == "PAI") {
    responsavel.nome = pai!.nome;
    responsavel.contatos = pai!.contatos;
    responsavel.tipoParentesco = pai!.tipoParentesco;
  } else {
    responsavel.nome = data.responsavel.nome;
    responsavel.tipoParentesco = "OUTRO";
    responsavel.contatos = data.responsavel.contatos!.map((phone: Contato) => {
      return { value: phone.contato };
    });
  }

  type ComposicaoFamiliar = {
    nome: string;
    anoNascimento: string;
    ocupacao: string;
    parentesco: string;
    observacoes: string;
  };
  const familyComposition = data.composicaoFamiliar.map(
    (familiar: ComposicaoFamiliar) => {
      return {
        age: familiar.anoNascimento,
        comments: familiar.observacoes,
        name: familiar.nome,
        ocupation: familiar.ocupacao,
        relationship: familiar.parentesco,
      };
    }
  );

  const assistido = [
    {
      registerDate: dayjs(data.cadastradoEm),
      id: data.id || null,
      status: data.statusAssistido || null,
      address: data.endereco.endereco,
      addressNumber: data.endereco.numero,
      anyInstitutionRegister: data.cadastroInstituicao == true ? "yes" : "no",
      /* birthdate: dateToOutputString(new Date(data.dataNascimento)), */
      birthdate: dayjs(data.dataNascimento),
      gender: data.genero,
      city: data.endereco.cidade,
      complement: data.endereco.complemento,
      district: data.endereco.bairro,
      educationLevel: data.escolaridade,
      forwardedTo: data.encaminhadoPara,
      fu: data.endereco.uf,
      informationProvidedBy: data.informacoesFornecidasPor,
      name: data.nome,
      postalCode: data.endereco.cep,
      school: data.escola,
      schoolPhone: data.telEscola,
      whichInstitution: data.instituicao,
      whoRecommended: data.quemIndicouApajac,
    },
    {
      employmentRelationship:
        mae.ocupacao != "outro"
          ? null
          : mae.vinculoEmpregaticio != "clt" &&
            mae.vinculoEmpregaticio != "autonomo"
          ? "outro"
          : mae.vinculoEmpregaticio,
      employmentRelationshipDesc:
        mae.vinculoEmpregaticio != "clt" &&
        mae.vinculoEmpregaticio != "autonomo" &&
        mae.vinculoEmpregaticio != "outro"
          ? mae.vinculoEmpregaticio
          : null,
      name: mae!.nome,
      ocupation: mae!.ocupacao,
      placeOfWork: mae!.localTrabalho,
      salary: mae!.salario,
      phones: mae!.contatos,
    },
    {
      employmentRelationship:
        pai.ocupacao != "outro"
          ? null
          : pai.vinculoEmpregaticio != "clt" &&
            pai.vinculoEmpregaticio != "autonomo"
          ? "outro"
          : pai.vinculoEmpregaticio,
      employmentRelationshipDesc:
        pai.vinculoEmpregaticio != "clt" &&
        pai.vinculoEmpregaticio != "autonomo" &&
        pai.vinculoEmpregaticio != "outro"
          ? pai.vinculoEmpregaticio
          : null,
      name: pai!.nome,
      ocupation: pai!.ocupacao,
      placeOfWork: pai!.localTrabalho,
      salary: pai!.salario,
      phones: pai!.contatos,
    },
    {
      responsible: responsavel.tipoParentesco?.toLowerCase(),
      responsibleName: responsavel.nome,
      phones: responsavel.contatos,
    },
    {
      familyComposition: familyComposition,
    },
    {
      comments: data.observacoes,
    },
  ];
  return assistido;
}
