"use client";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { getListaAcolhidos } from "@/api/endpoints";
import { ListAcolhido } from "@/api/middleware/listAcolhido";
import { ModalConsultaAcolhido } from "@/components/modal/modalConsultaAcolhido";
import {
  useModalConsultaAcolhido,
  useModalConsultaAcolhidoContext as useModalContext,
} from "@/hooks/useModalConsultaAcolhido";
import Loader from "@/common/loader/loader";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

type SortBy = "name" | "status" | "age"; // "responsible" removed due to back issues

export default function ConsultarAcolhido() {
  const [acolhidos, setAcolhidos] = useState<ListAcolhido[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIslastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [searchByName, setSearchByName] = useState<string | null>(null);
  const observerRef = useRef(null);

  const modal = useModalConsultaAcolhido();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading)
          setPage((oldValue) => oldValue + 1);
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
    getListaAcolhidos(page, sortBy, orderByAsc)
      .then(({ acolhidos, isLastPage: lastPage }) => {
        setAcolhidos((oldArray) => [...oldArray, ...acolhidos]);
        setIslastPage(lastPage);
      })
      .finally(() => setIsLoading(false));
  }, [page, sortBy, orderByAsc]);

  function handleSortChange(clickedSortBy: SortBy) {
    setAcolhidos([]);

    if (sortBy == clickedSortBy) {
      setOrderByAsc((oldValue) => !oldValue);
      setIslastPage(false);
      setPage(0);
      return;
    }

    setSortBy(clickedSortBy);
    setOrderByAsc(true);
    setIslastPage(false);
    setPage(0);
  }

  // Prevent "document is not defined" error
  if (typeof window !== "undefined") {
    tippy("[data-tippy-content]");
  }

  return (
    <div className={styles.container}>
      <FormTitle
        title="Consultar Acolhidos"
        Icon={icon.User}
        className={styles.title}
      />

      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
          alert("busca por nome!");
        }}
      >
        <label htmlFor="search_input">Nome</label>
        <input type="text" minLength={3} />
        <input type="submit" className="submitBtn" value="Pesquisar" />
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
          {acolhidos &&
            acolhidos.map((acolhido) => {
              return (
                <tr
                  key={acolhido.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modal.setIsOpen(true);
                    modal.setId(acolhido.id);
                  }}
                >
                  <td className={styles.name}>
                    <p data-tippy-content={acolhido.name}>{acolhido.name}</p>
                  </td>
                  <td className={styles.age}>
                    <p>{acolhido.age}</p>
                  </td>
                  <td className={styles.name}>
                    <p data-tippy-content={acolhido.responsible}>
                      {acolhido.responsible}
                    </p>
                  </td>
                  <td className={styles.status}>
                    <p
                      style={
                        acolhido.status ? { color: "green" } : { color: "red" }
                      }
                    >
                      {acolhido.status ? "ativo" : "inativo"}
                    </p>
                  </td>
                </tr>
              );
            })}
          <tr ref={observerRef}></tr>
        </tbody>
      </table>

      {isLastPage && acolhidos.length <= 0 && (
        <p>Nenhum acolhido encontrado na base de dados.</p>
      )}
      {modal && modal.isOpen && modal.id && (
        <useModalContext.Provider value={modal}>
          <ModalConsultaAcolhido />
        </useModalContext.Provider>
      )}

      {!isLastPage && <Loader style={{ margin: "40px 0 25px" }} />}
    </div>
  );
}
