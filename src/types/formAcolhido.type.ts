export type Acolhido = {
    name: string | undefined;
    birthdate: Date | undefined;
    educationLevel: string | undefined;
    school: string | null | undefined;
    schoolPhone: string | null | undefined;
    anyInstitutionRegister: string | undefined;
    whichInstitution: string | undefined;
    forwardedTo: string | undefined;
    whoRecommended: string | null | undefined;
    informationProvidedBy: string | undefined;

    //Address
    postalCode: string | undefined;
    address: string | undefined;
    district: string | undefined;
    city: string | undefined;
    fu: string | undefined;
  };

  export type Pais = {
    name: string | undefined;
    phones?: Array<{
      value: string | null | undefined;
    }>,
    ocupation: string | undefined;
    placeOfWork: string | null | undefined;
    salary: number | null | undefined;
    employmentRelationship: string | undefined;
    employmentRelationshipDesc: string | undefined;
  }

  export type Responsavel = {
    responsible: string | undefined;
    responsibleWho: string | undefined;
    phones?: Array<{
      value: string | null | undefined;
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