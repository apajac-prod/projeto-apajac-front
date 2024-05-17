export type LoginUser = {
    name: string | undefined;
    login: string | undefined;
    roles: string[] | undefined;
  };

 export type LoginApi = {
    login: string;
    nome: string;
    roles: Array<string>;
}