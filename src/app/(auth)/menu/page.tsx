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
          title={"Cadastrar assistido"}
          link="/assistido/cadastrar"
          show={
            session &&
            session.sessionInfo.roles?.includes(ROLES.CADASTRAR_ASSISTIDO)
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
          title={"Consultar assistido"}
          link="/assistido/consultar"
          show={
            session &&
            session.sessionInfo.roles?.includes(ROLES.CONSULTAR_ASSISTIDO)
          }
        />

        <MenuCard
          title={"Consultar usuários"}
          link="/usuario/consultar"
          show={
            session && session.sessionInfo.roles?.includes(ROLES.ADMINISTRADOR)
          }
        />
      </MenuCategoria>
    </div>
  );
};
export default Menu;
