"use client";

import BuscarAssistido from "@/components/buscar_assistido/buscarAssistido";
import { useRouter } from "next/navigation";

const ConsultarAssistido = () => {
  const router = useRouter();

  return (
    <BuscarAssistido
      onSelectCallback={(id) => router.push(`/cars/cadastrar/${id}`)}
    />
  );
};
export default ConsultarAssistido;
