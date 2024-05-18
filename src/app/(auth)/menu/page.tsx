/* "use client"; */
"use client";

import styles from "./styles.module.css";

import MenuCategoria from "@/components/menu_categoria/page";
import MenuCard from "@/components/menu_card/menu_card";
import { useContext, useEffect } from "react";
import { SessionContext } from "@/contexts/sessionContext";
import { ROLES } from "@/constants/roles";

const Menu = () => {
  const session = useContext(SessionContext);

  useEffect(() => {
    window.onbeforeunload = () => false;
  }, []);
  return (
    <div className={styles.container}>
      <MenuCategoria title={"Cadastrar"} className={styles.categoria}>
        <MenuCard
          title={"Cadastrar acolhido"}
          link="/acolhido/cadastrar"
          show={
            session &&
            session.sessionInfo.roles?.includes(ROLES.CADASTRAR_ACOLHIDO)
          }
        />
        <MenuCard
          title={"Cadastrar usuário"}
          link="/usuario/cadastro"
          show={
            session && session.sessionInfo.roles?.includes(ROLES.ADMINISTRADOR)
          }
        />
      </MenuCategoria>

      <MenuCategoria title={"Consultar"} className={styles.categoria}>
        <MenuCard
          title={"Consultar acolhido"}
          link="/acolhido/consultar"
          show={
            session &&
            session.sessionInfo.roles?.includes(ROLES.CONSULTAR_ACOLHIDO)
          }
        />

        <MenuCard
          title={"Consultar usuários"}
          link="/em_construcao"
          show={true}
        />
      </MenuCategoria>
    </div>
  );
};
export default Menu;
