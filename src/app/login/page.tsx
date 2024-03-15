import { metadata } from "../layout";
metadata.title = "APAJAC - Login";
metadata.description = "Login do Sistema De Gerenciamento APAJAC.";

import TitleApajac from "@/components/title/apajac";

type Props = {};

import styles from "./page.module.css";

const login = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <TitleApajac />
        <h2>Sistema de Gerenciamento</h2>
      </div>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form action="" className={styles.loginForm}>
          <input type="text" placeholder="Insira seu usuário" />
          <input type="password" placeholder="Insira sua senha" />
          <input type="button" value="entrar" />
        </form>
      </div>
    </div>
  );
};
export default login;
