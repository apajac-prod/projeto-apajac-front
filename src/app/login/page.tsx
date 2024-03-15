"use client";

/* import { metadata } from "../layout";
metadata.title = "APAJAC - Login";
metadata.description = "Login do Sistema De Gerenciamento APAJAC."; */

import styles from "./page.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TitleApajac from "@/components/title/apajac";

// Login Form Object
type loginForm = {
  loginApajac: string;
  password: string;
};

//

//Yup validation schema
const loginSchema: yup.ObjectSchema<loginForm> = yup.object({
  loginApajac: yup.string().required("Insira seu login"),
  password: yup.string().required("Insira sua senha"),
});

type Props = {};

const Login = (props: Props) => {
  // Setting the form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });

  // Handling the form
  const onSubmit = (data: loginForm) => alert(JSON.stringify(data));

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <TitleApajac />
        <h2>Sistema de Gerenciamento</h2>
      </div>
      <div className={styles.loginContainer}>
        <h1>Login</h1>

        {/* {loginError && (
          <p className={styles.loginError}>Usuário ou senha incorreto</p>
        )} */}

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("loginApajac")}
            type="text"
            placeholder="Insira seu usuário"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Insira sua senha"
          />

          <div className={styles.errors}>
            {errors.loginApajac && (
              <p className={styles.inputError}>Insira o usuário</p>
            )}

            {errors.password && (
              <p className={styles.inputError}>Insira a senha</p>
            )}
          </div>

          <input type="submit" value="entrar" />
        </form>
      </div>
    </div>
  );
};
export default Login;
