export type LoginUser = {
    id: number | undefined;
    name: string | undefined;
    login: string | undefined;
    roles: string[] | undefined;
  };

 export type LoginApi = {
    id: number,
    login: string;
    nome: string;
    roles: Array<string>;
}