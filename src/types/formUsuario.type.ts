export type Usuario = {
  id?: string;
  status: boolean;
  name: string | undefined;
  roles: string[] | undefined;
  login: string | undefined;
  password?: string | undefined | null;
  repeatPassword?: string | undefined | null;
}

export type UsuarioApi = {
  id: string;
  status: boolean;
  nome: string | undefined;
  roles: string[] | undefined;
  login: string | undefined;
}