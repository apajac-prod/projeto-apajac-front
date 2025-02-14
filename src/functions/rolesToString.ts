import { ROLES } from "@/constants/roles";

const ROLES_TO_PERMISSOES = new Map([
  ["admin", "Administrador"],
  ["alterar_assistido", "Alterar assistido"],
  ["consultar_assistido", "Consultar assistido"],
  ["cadastrar_assistido", "Cadastrar assistido"],
  ["realizar_exame", "Realizar exames"],
  ["consultar_exame", "Consultar exames"],
]);

export default function rolesToString(roles: Array<string>) {
  if (roles.includes(ROLES.ADMINISTRADOR)) return "Administrador";

  let rolesStr = "";
  roles.forEach((role, index) => {
    if (role == ROLES.ADMINISTRADOR) return;
    if (rolesStr == "") {
      rolesStr = rolesStr + ROLES_TO_PERMISSOES.get(role);
      return;
    }
    rolesStr = rolesStr + `, ${ROLES_TO_PERMISSOES.get(role)}`;
  });

  return rolesStr;
}
