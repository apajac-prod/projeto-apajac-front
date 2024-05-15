"use client";

import { getUsuario } from "@/api/endpoints";
import { Usuario } from "@/types/formUsuario.type";
import Loader from "@/common/loader/loader";
import FormUsuario from "@/components/form/usuario/formUsuario";
import { useEffect, useState } from "react";

import Styles from "./page.module.css";

type Params = {
  usuarioId: string;
};

type Props = {
  params: Params;
};

const AlterarUsuario = ({ params: { usuarioId } }: Props) => {
  const [usuario, setUsuario] = useState<Usuario | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUsuario(usuarioId)
      .then((usuario) => {
        setUsuario(usuario);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loader className={Styles.loader} />}
      {usuario && <FormUsuario usuario={usuario} />}
    </>
  );
};
export default AlterarUsuario;
