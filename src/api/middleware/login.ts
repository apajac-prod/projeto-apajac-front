import { LoginApi } from "@/types/login";

export function apiToLogin(data: LoginApi) {
    return {
        name: data.nome,
        login: data.login,
        roles: data.roles
    }
}