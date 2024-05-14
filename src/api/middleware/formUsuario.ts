
import { ApiUsuario } from "@/types/ApiUsuario.type";


/* //Format object to what API expects
export function usuarioToApi(usuario: ApiUsuario) {
    console.log("usuario before all conversion:", usuario);

    let data: any = usuario.map((element: any, index: string) => {

        return element;
        
    });
   
} */

export type Usuario = {
    name: string | undefined;
    permissions: string | undefined;
    login: string | undefined;
    password?: string | undefined;
    repeatPassword?: string | undefined;
}

export type UsuarioApi = {
    nome: string | undefined;
    role: string | undefined;
    login: string | undefined;
}

export function usuarioToApi(data: Usuario) {

    return {
            nome: data.name,
            role: data.permissions,
            login: data.login,
            password: data.password    
        }
}

export function apiToUsuario(data: UsuarioApi) {

    return {
            name: data.nome,
            permissions: data.role,
            login: data.login,   
        }
}

