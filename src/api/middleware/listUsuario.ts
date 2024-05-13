type ListUsuarioApi = {
    id: string;
    nome: string;
    role: string;
    login: string;
    password: string;
    
}

export type ListUsuario = {
    id: string;
    nome: string;
    role: string;
    login: string;
    password: string;
}


export function apiToListUsuario(listUsuarioApi: ListUsuarioApi[]): ListUsuario[] {
    return listUsuarioApi.map((usuario) => {
        return {
        id: usuario.id,
        name: usuario.nome,
        role: usuario.role,
        login: usuario.login,
        password: usuario.password
    }
    });
}

