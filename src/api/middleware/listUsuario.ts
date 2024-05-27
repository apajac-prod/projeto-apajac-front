import { ListUsuarioApi, ListUsuario } from "@/types/listUsuario.type";

export function apiToListUsuarios(listUsuarioApi: ListUsuarioApi[]): ListUsuario[] {
    return listUsuarioApi.map((usuario) => {
        return {
        id: usuario.id,
        name: usuario.nome,
        login: usuario.login,
        roles: usuario.roles,
        status: usuario.status
    }
    });
}