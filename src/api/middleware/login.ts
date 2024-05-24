import { LoginApi } from "@/types/login";

export function apiToLogin(data: LoginApi) {
    return {
        id: data.id,
        name: data.nome,
        login: data.login,
        roles: data.roles
    }
}