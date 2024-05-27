"use client";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";
import styles from "./page.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ToastOptions,
  getListaAssistidosPorNome,
  getListaUsuarios,
} from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling
import { ListAssistido } from "@/types/listAssistido.type";
import { ListUsuario } from "@/types/listUsuario.type";
import rolesToString from "@/functions/rolesToString";
import { TooltipCustom } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

type SortBy = "name" | "status" | "age"; // "responsible" removed due to back issues

export default function ConsultarAssistido() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState<ListUsuario[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIslastPage] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [searchByName, setSearchByName] = useState<string | undefined>(
    undefined
  );
  const [toastOptions, setToastOptions] = useState<ToastOptions | undefined>(
    undefined
  );
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setToastOptions({
            loadingMessage: "Carregando usuários...",
            successMessage: "Usuários carregados com sucesso!",
            errorMessage: "Não foi possível carregar os usuários.",
          });
          setPage((oldValue) => oldValue + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    observerRef.current && observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(`Request, page=${page} ; sortBy=${sortBy}`);
    console.log("isLastPage", isLastPage);
    if (isLastPage) return;

    setIsLoading(true);
    console.log("searchByName:", searchByName);

    /*     if (!!searchByName) {
      getListaAssistidosPorNome(
        searchByName,
        page,
        sortBy,
        orderByAsc,
        toastOptions
      )
        .then(({ usuarios, isLastPage: lastPage }) => {
          setUsuarios((oldArray) => [...oldArray, ...usuarios]);
          setIslastPage(lastPage);
        })
        .finally(() => setIsLoading(false));
    } else { */
    getListaUsuarios(page, toastOptions)
      .then(({ usuarios, isLastPage: lastPage }) => {
        setUsuarios((oldArray) => [...oldArray, ...usuarios]);
        setIslastPage(lastPage);
        console.log("ROLES:", usuarios[0].roles);
      })
      .finally(() => setIsLoading(false));
    //}
  }, [page, sortBy, orderByAsc, searchByName]);

  function handleNameChange(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputName = inputNameRef.current;

    if (inputName && inputName.value != searchByName) {
      if (inputName.value == "" && searchByName == undefined) return;
      if (inputName.value == "" && searchByName != undefined) {
        setSearchByName(undefined);
        setToastOptions(undefined);
      } else {
        setSearchByName(inputName.value);
        setToastOptions({
          loadingMessage: "Carregando assistidos com base no nome inserido...",
          successMessage: "Assistidos carregados com sucesso!",
          errorMessage: "Não foi possível carregar os assistidos.",
        });
      }
      setUsuarios([]);
      setIslastPage(false);
      setOrderByAsc(true);
      setSortBy("name");
      setPage(0);
    }
  }

  return (
    <div className={styles.container}>
      <FormTitle
        title="Consultar Usuários"
        Icon={icon.User}
        className={styles.title}
      />

      <form
        className={styles.search}
        onSubmit={(e) => {
          handleNameChange(e);
        }}
      >
        <label htmlFor="search_input">Nome</label>
        <input type="text" minLength={3} ref={inputNameRef} />
        <input
          type="submit"
          className={`button_submit ${isLoading ? styles.disabled : ""}`}
          value="Pesquisar"
          disabled={isLoading}
        />
      </form>

      <div className={styles.userContainer}>
        {usuarios &&
          usuarios.map((usuario) => (
            <div
              className={styles.userCard}
              key={usuario.id}
              onClick={() => router.push(`alterar/${usuario.id}`)}
            >
              <div className={styles.name}>
                <p>{usuario.name}</p>
              </div>

              <div className={styles.login}>
                <p>Login:</p>
                <TooltipCustom content={usuario.login.toString()}>
                  <p className={styles.content}>{usuario.login}</p>
                </TooltipCustom>
              </div>

              <div className={styles.roles}>
                <p>Permissões:</p>
                <TooltipCustom content={rolesToString(usuario.roles)}>
                  <p className={styles.content}>
                    {rolesToString(usuario.roles)}
                  </p>
                </TooltipCustom>
              </div>

              <div className={styles.status}>
                <p style={{ color: usuario.status ? "green" : "red" }}>
                  {usuario.status ? "ATIVO" : "INATIVO"}
                </p>
              </div>
            </div>
          ))}
      </div>

      {isLastPage && usuarios.length <= 0 && (
        <p>Nenhum usuário encontrado na base de dados.</p>
      )}

      {!isLastPage && <Loader style={{ margin: "40px 0 25px" }} />}
    </div>
  );
}
