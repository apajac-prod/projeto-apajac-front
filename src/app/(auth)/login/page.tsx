"use client";

import type { ReactElement } from 'react'

import styles from "./page.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TitleApajac from "@/components/title/apajac";

import { useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";

// Login Form Object
type loginForm = {
  loginApajac: string;
  password: string;
};

//Yup validation schema
const loginSchema: yup.ObjectSchema<loginForm> = yup.object({
  loginApajac: yup.string().required("Insira seu login"),
  password: yup.string().required("Insira sua senha"),
});

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const loginErrorRef = useRef<HTMLParagraphElement>(null);

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
  const onSubmit = (data: loginForm) => {
    if (data.loginApajac === "admin" && data.password === "123456") {
      // Cookie
      router.push("/menu");
    } else {
      if (loginErrorRef.current) {
        loginErrorRef.current.classList.remove(styles.loginErrorAnimation);
        loginErrorRef.current.offsetWidth;
        loginErrorRef.current.classList.add(styles.loginErrorAnimation);
        console.log(loginErrorRef.current.classList);
      }
    }
    setLoginError(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <TitleApajac />
        <h2>Sistema de Gerenciamento</h2>
      </div>
      <div className={styles.loginContainer}>
        <h1>Login</h1>

        {loginError && (
          <p
            className={`${styles.loginError} ${styles.loginErrorAnimation}`}
            ref={loginErrorRef}
          >
            Usuário ou senha incorreto
          </p>
        )}

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

Login.getLayout = function getLayout(children: ReactElement) {
  return children;
}