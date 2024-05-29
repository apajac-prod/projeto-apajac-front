import { ROLES } from "@/constants/roles";

const ROLES_TO_PERMISSOES = new Map([
    ["admin", "Administrador"],
    ["alterar_assistido", "Alterar assistido"],
    ["consultar_assistido", "Consultar assistido"],
    ["cadastrar_assistido", "Cadastrar assistido"],

])

export default function rolesToString(roles: Array<string>){

    if (roles.includes(ROLES.ADMINISTRADOR)) return "Administrador";

    let rolesStr = "";
    roles.forEach((role, index) => {
        console.log("index:", index, "\n", "role:", role)
        console.log("getRole:", ROLES_TO_PERMISSOES.get(role))
        if(role == ROLES.ADMINISTRADOR) return;
        if (rolesStr == "") {
            rolesStr = rolesStr + ROLES_TO_PERMISSOES.get(role);
            return;
        }
        rolesStr = rolesStr + `, ${ROLES_TO_PERMISSOES.get(role)}`;
    })
    console.log("rolesStr:", rolesStr)

    return rolesStr;
}