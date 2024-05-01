"use client";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getAcolhidoById, getAcolhidos } from "@/api/endpoints";
import { ListAcolhido } from "@/api/middleware/listAcolhido";
import { ModalConsultaAcolhido } from "@/components/modal/modalConsultaAcolhido";
import {
  useModalConsultaAcolhido,
  useModalConsultaAcolhidoContext as useModalContext,
} from "@/hooks/useModalConsultaAcolhido";

type SortBy = "id" | "name" | "status" | "responsible" | "age";

export default function ConsultarAcolhido() {
  const [acolhidos, setAcolhidos] = useState<ListAcolhido[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("name");
  const modal = useModalConsultaAcolhido();
  useEffect(() => {
    console.log(`Request, page=${page} ; sortBy=${sortBy}`);
    getAcolhidos(page, sortBy).then((response) => {
      console.log("acolhidos: ", response);
      setAcolhidos(response);
    });
  }, [page, sortBy]);

  function handleSortChange(sortBy: SortBy) {
    setSortBy(sortBy);
    setPage(1);
  }

  return (
    <div className={styles.container}>
      <FormTitle
        title="Consultar Acolhidos"
        Icon={icon.User}
        className={styles.title}
      />

      <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search_input">Nome</label>
        <input type="text" />
        <input type="submit" value="Pesquisar" />
      </form>

      <table className={styles.table}>
        <thead>
          <tr>
            <th
              className={styles.name}
              onClick={() => handleSortChange("name")}
            >
              Nome {sortBy == "name" && <icon.AngleDown size={12} />}
            </th>
            <th className={styles.age} onClick={() => handleSortChange("age")}>
              Idade {sortBy == "age" && <icon.AngleDown size={12} />}
            </th>
            <th
              className={styles.name}
              onClick={() => handleSortChange("responsible")}
            >
              Nome do Responsável{" "}
              {sortBy == "responsible" && <icon.AngleDown size={12} />}
            </th>
            <th
              className={styles.status}
              onClick={() => handleSortChange("status")}
            >
              Status {sortBy == "status" && <icon.AngleDown size={12} />}
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
                    <p>{acolhido.name}</p>
                  </td>
                  <td className={styles.age}>
                    <p>{acolhido.age}</p>
                  </td>
                  <td className={styles.name}>
                    <p>{acolhido.responsible}</p>
                  </td>
                  <td className={styles.status}>
                    <p
                      style={
                        acolhido.status ? { color: "green" } : { color: "red" }
                      }
                    >
                      {acolhido.status ? "ativo" : "inativo"}
                    </p>
                    {/* <icon.AngleDown /> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={() => setPage((currentPage) => currentPage - 1)}>
        Voltar Pág (substituir por infinity scroll)
      </button>
      <button onClick={() => setPage((currentPage) => currentPage + 1)}>
        Próx Pág (substituir por infinity scroll)
      </button>
      {modal && modal.isOpen && modal.id && (
        <useModalContext.Provider value={modal}>
          <ModalConsultaAcolhido />
        </useModalContext.Provider>
      )}
    </div>
  );
}
