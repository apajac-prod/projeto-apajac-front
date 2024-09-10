"use client";

import BuscarAssistido from "@/components/buscar_assistido/buscarAssistido";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const ConsultarAssistido = () => {
  const router = useRouter();

  const handleAssistidoSelect = useCallback((id: string) => {
    router.push(`/cars/childhood/${id}`);
  }, []);

  return (
    <>
      <BuscarAssistido onSelectCallback={(id) => handleAssistidoSelect(id)} />
    </>
  );
};
export default ConsultarAssistido;
