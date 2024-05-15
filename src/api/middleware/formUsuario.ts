import { Usuario, UsuarioApi } from "@/types/formUsuario.type";

export function usuarioToApi(data: Usuario) {

    return {
            id: data.id ?? null,
            nome: data.name,
            roles: data.roles,
            login: data.login,
            password: data.password    
        }
}

export function apiToUsuario(data: UsuarioApi) {

    return {
            id: data.id,
            name: data.nome,
            roles: data.roles,
            login: data.login 
        }
}

