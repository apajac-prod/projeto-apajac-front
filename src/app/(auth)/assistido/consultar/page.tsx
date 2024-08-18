"use client";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";
import styles from "./page.module.css";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ToastOptions,
  getListaAssistidos,
  getListaAssistidosPorNome,
} from "@/api/endpoints";
import { ModalConsultaAssistido } from "@/components/modal/modalConsultaAssistido";
import {
  useModalConsultaAssistido,
  useModalConsultaAssistidoContext as useModalContext,
} from "@/hooks/useModalConsultaAssistido";
import Loader from "@/common/loader/loader";
import "tippy.js/dist/tippy.css"; // optional for styling
import { ListAssistido } from "@/types/listAssistido.type";
import { TooltipCustom } from "@/components/ui/tooltip";

type SortBy = "name" | "status" | "age"; // "responsible" removed due to back issues

export default function ConsultarAssistido() {
  const [assistidos, setAssistidos] = useState<ListAssistido[]>([]);
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

  const modal = useModalConsultaAssistido();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setToastOptions({
            loadingMessage: "Carregando assistidos...",
            successMessage: "Assistidos carregados com sucesso!",
            errorMessage: "Não foi possível carregar os assistidos.",
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
    if (isLastPage) return;

    setIsLoading(true);

    if (!!searchByName) {
      getListaAssistidosPorNome(
        searchByName,
        page,
        sortBy,
        orderByAsc,
        toastOptions
      )
        .then(({ assistidos, isLastPage: lastPage }) => {
          setAssistidos((oldArray) => [...oldArray, ...assistidos]);
          setIslastPage(lastPage);
        })
        .finally(() => setIsLoading(false));
    } else {
      getListaAssistidos(page, sortBy, orderByAsc, toastOptions)
        .then(({ assistidos, isLastPage: lastPage }) => {
          setAssistidos((oldArray) => [...oldArray, ...assistidos]);
          setIslastPage(lastPage);
        })
        .finally(() => setIsLoading(false));
    }
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
      setAssistidos([]);
      setIslastPage(false);
      setOrderByAsc(true);
      setSortBy("name");
      setPage(0);
    }
  }

  function handleSortChange(clickedSortBy: SortBy) {
    if (isLoading) return;

    setAssistidos([]);

    if (sortBy == clickedSortBy) {
      setOrderByAsc((oldValue) => !oldValue);
      setIslastPage(false);
      setPage(0);
      return;
    }

    setToastOptions({
      loadingMessage: "Reorganizando a tabela com base na coluna clicada...",
      successMessage: "Tabela reorganizada com sucesso!",
      errorMessage: "Não foi possível reorganizar a tabela.",
    });
    setSortBy(clickedSortBy);
    setOrderByAsc(true);
    setIslastPage(false);
    setPage(0);
  }

  return (
    <div className={styles.container}>
      <FormTitle
        title="Consultar Assistidos"
        Icon={icon.User}
        className={styles.title}
      />

      <form
        aria-label="search by name"
        className={styles.search}
        onSubmit={(e) => {
          handleNameChange(e);
        }}
      >
        <label htmlFor="search_input">Nome</label>
        <input type="text" id="search_input" minLength={3} ref={inputNameRef} />
        <input
          type="submit"
          className={`button_submit ${isLoading ? styles.disabled : ""}`}
          value="Pesquisar"
          disabled={isLoading}
        />
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.name}
              onClick={() => handleSortChange("name")}
            >
              Nome
              {sortBy == "name" &&
                (orderByAsc ? (
                  <icon.AngleDown size={12} />
                ) : (
                  <icon.AngleUp size={12} />
                ))}
            </th>
            <th className={styles.age} onClick={() => handleSortChange("age")}>
              Idade
              {sortBy == "age" &&
                (orderByAsc ? (
                  <icon.AngleDown size={12} />
                ) : (
                  <icon.AngleUp size={12} />
                ))}
            </th>
            <th className={styles.name} style={{ cursor: "not-allowed" }}>
              Nome do Responsável
            </th>
            <th
              className={styles.status}
              onClick={() => handleSortChange("status")}
            >
              Status
              {sortBy == "status" &&
                (orderByAsc ? (
                  <icon.AngleDown size={12} />
                ) : (
                  <icon.AngleUp size={12} />
                ))}
            </th>
          </tr>
        </thead>
        <tbody>
          {assistidos &&
            assistidos.map((assistido) => {
              return (
                <tr
                  key={assistido.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modal.setIsOpen(true);
                    modal.setId(assistido.id);
                  }}
                >
                  <td className={styles.name}>
                    <TooltipCustom content={assistido.name}>
                      <p>{assistido.name}</p>
                    </TooltipCustom>
                  </td>
                  <td className={styles.age}>
                    <p>{assistido.age}</p>
                  </td>
                  <td className={styles.name}>
                    <TooltipCustom content={assistido.responsible}>
                      <p>{assistido.responsible}</p>
                    </TooltipCustom>
                  </td>
                  <td className={styles.status}>
                    <p
                      style={
                        assistido.status ? { color: "green" } : { color: "red" }
                      }
                    >
                      {assistido.status ? "ativo" : "inativo"}
                    </p>
                  </td>
                </tr>
              );
            })}
          <tr ref={observerRef}></tr>
        </tbody>
      </table>

      {isLastPage && assistidos.length <= 0 && (
        <p>Nenhum assistido encontrado na base de dados.</p>
      )}
      {modal && modal.isOpen && modal.id && (
        <useModalContext.Provider value={modal}>
          <ModalConsultaAssistido />
        </useModalContext.Provider>
      )}

      {!isLastPage && <Loader style={{ margin: "40px 0 25px" }} />}
    </div>
  );
}
