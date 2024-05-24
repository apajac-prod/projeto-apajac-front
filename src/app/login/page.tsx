"use client";

import type { ReactElement } from "react";

import styles from "./page.module.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import TitleApajac from "@/components/titles/apajac/apajac";

import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login } from "@/api/endpoints";
import birthdateToAge from "@/functions/birthdateToAge";

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

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!!session) router.push("/menu");
  }, []);

  // Handling the form
  const onSubmit = (data: loginForm) => {
    login(data.loginApajac, data.password)
      .then((data) => {
        console.log("data", data);
        localStorage.setItem("session", JSON.stringify(data));
        router.push("/menu");
      })
      .catch((error) => {
        if (!error.status) return;
        console.log(error);
        if (loginErrorRef.current) {
          loginErrorRef.current.classList.remove(styles.loginErrorAnimation);
          loginErrorRef.current.offsetWidth;
          loginErrorRef.current.classList.add(styles.loginErrorAnimation);
          console.log(loginErrorRef.current.classList);
        }
        setLoginError(true);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <TitleApajac />
        <h2>Sistema de Gerenciamento</h2>
      </div>
      <div className={styles.loginContainer}>
        <h1>Login</h1>

        <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <p
              className={`${styles.loginError} ${styles.loginErrorAnimation}`}
              ref={loginErrorRef}
            >
              Usuário ou senha incorreto
            </p>
          )}

          <div className={styles.input_container}>
            <input
              {...register("loginApajac")}
              type="text"
              placeholder="Insira seu usuário"
            />
            <Image
              src="/icons/person_24x24.png"
              alt="Ícone de usuário"
              width={16}
              height={16}
            />
          </div>

          <div className={styles.input_container}>
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Insira sua senha"
            />
            <Image
              className={styles.show_password_icon}
              src={
                showPassword
                  ? "/icons/invisible_30x30.png"
                  : "/icons/visible_30x30.png"
              }
              alt="Exibir a senha"
              width={18}
              height={18}
              onClick={() => setShowPassword((currentValue) => !currentValue)}
            />
          </div>

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
};
