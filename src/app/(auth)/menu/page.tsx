/* "use client"; */
"use client";

import styles from "./styles.module.css";

import MenuCategoria from "@/components/menu_categoria/page";
import MenuCard from "@/components/menu_card/menu_card";
import { useEffect } from "react";

const Menu = () => {
  useEffect(() => {
    window.onbeforeunload = () => false;
  }, []);
  return (
    <div className={styles.container}>
      <MenuCategoria title={"Cadastrar"} className={styles.categoria}>
        <MenuCard title={"Cadastrar acolhido"} link="/acolhido/cadastrar" />
        <MenuCard title={"Cadastrar usuário"} link="/usuario/cadastro" />
      </MenuCategoria>

      <MenuCategoria title={"Consultar"} className={styles.categoria}>
        <MenuCard title={"Consultar acolhido"} link="/acolhido/consultar" />
        <MenuCard title={"Exemplo de card"} link="/exemplo_card" />
      </MenuCategoria>
    </div>
  );
};
export default Menu;