"use client";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { getListaUsuarios } from "@/api/endpoints";
import { ListUsuario } from "@/api/middleware/listUsuario";
import { ModalConsultaUsuario } from "@/components/modal/modalConsultaUsuario";
import {
  useModalConsultaUsuario,
  useModalConsultaUsuarioContext as useModalContext,
} from "@/hooks/useModalConsultaUsuario";
import Loader from "@/common/loader/loader";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css"; // optional for styling

type SortBy = "name" | "status" ; // "responsible" removed due to back issues

export default function ConsultarUsuario() {
  const [usuarios, setUsuarios] = useState<ListUsuario[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIslastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const [orderByAsc, setOrderByAsc] = useState(true);
  const [searchByName, setSearchByName] = useState<string | null>(null);
  const observerRef = useRef(null);

  const modal = useModalConsultaUsuario();

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
    getListaUsuarios(page, sortBy, orderByAsc)
      .then(({ usuarios, isLastPage: lastPage }) => {
        setUsuarios((oldArray) => [...oldArray, ...usuarios]);
        setIslastPage(lastPage);
      })
      .finally(() => setIsLoading(false));
  }, [page, sortBy, orderByAsc]);

  function handleSortChange(clickedSortBy: SortBy) {
    setUsuarios([]);

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
        title="Consultar Usuarios"
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
            
          </tr>
        </thead>
        <tbody>
          {usuarios &&
            usuarios.map((usuario) => {
              return (
                <tr
                  key={usuario.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    modal.setIsOpen(true);
                    modal.setId(usuario.id);
                  }}
                >
                  <td className={styles.name}>
                    <p data-tippy-content={usuario.nome}>{usuario.nome}</p>
                  </td>
                  
                </tr>
              );
            })}
          <tr ref={observerRef}></tr>
        </tbody>
      </table>

      {isLastPage && usuarios.length <= 0 && (
        <p>Nenhum usuario encontrado na base de dados.</p>
      )}
      {modal && modal.isOpen && modal.id && (
        <useModalContext.Provider value={modal}>
          <ModalConsultaUsuario />
        </useModalContext.Provider>
      )}

      {!isLastPage && <Loader style={{ margin: "40px 0 25px" }} />}
    </div>
  );
}
