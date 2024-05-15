export type Usuario = {
  id?: string;
  name: string | undefined;
  roles: string[] | undefined;
  login: string | undefined;
  password?: string | undefined | null;
  repeatPassword?: string | undefined | null;
}

export type UsuarioApi = {
  id: string;
  nome: string | undefined;
  roles: string[] | undefined;
  login: string | undefined;
}