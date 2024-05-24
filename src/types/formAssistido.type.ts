import { Dayjs } from "dayjs";

export type Assistido = {
    registerDate: Dayjs;
    name: string | undefined;
    birthdate: Dayjs | undefined;
    /* birthdate: Date | string | undefined; */
    educationLevel: string | undefined;
    school: string | null | undefined;
    schoolPhone: string | undefined | null;
    anyInstitutionRegister: string | undefined;
    whichInstitution: string | undefined;
    forwardedTo: string | undefined;
    whoRecommended: string | undefined;
    informationProvidedBy: string | undefined;

    //Address
    postalCode: string | undefined | null;
    fu: string | undefined;
    city: string | undefined;
    district: string | undefined;
    address: string | undefined;
    addressNumber: string | undefined;
    complement: string | undefined | null;
  };

  export type Pais = {
    name: string | undefined;
    phones?: Array<{
      value?: string | undefined | null;
    }>,
    ocupation: string | undefined;
    placeOfWork: string | null | undefined;
    salary: string | number | null | undefined;
    employmentRelationship: string | null | undefined;
    employmentRelationshipDesc: string | null | undefined;
  }

  export type Responsavel = {
    responsible: string | undefined;
    responsibleName: string | null | undefined;
    phones?: Array<{
      value?: string | undefined | null;
    }>,
  }

  export type ComposicaoFamiliar = {
    familyComposition?: Array<{
      name: string | undefined;
      relationship: string | undefined;
      age?: number | string | null | undefined;
      ocupation?: string | undefined | null;
      comments?: string | undefined | null;
    }>;
  }

  export type Finalizar = {
    comments?: string | undefined | null;
  }