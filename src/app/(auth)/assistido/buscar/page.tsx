"use client";

import NotFound from "@/app/not-found";
import BuscarAssistido from "@/components/buscar_assistido/buscarAssistido";
import { useRouter, useSearchParams } from "next/navigation";

const pathMap = new Map([
  ["realizar_cars", "/cars/cadastrar/"],
  ["listar_cars", "/cars/listar/"],
  ["realizar_mchat", "/mchat/cadastrar/"],
  ["listar_mchat", "/mchat/listar/"],
]);

const BuscarAssistidoPage = () => {
  const searchParams = useSearchParams();
  const goto = searchParams.get("goto");
  const router = useRouter();

  if (!goto || !pathMap.get(goto)) return <NotFound />;

  return (
    <BuscarAssistido
      onSelectCallback={(id) => router.push(pathMap.get(goto) + id)}
    />
  );
};
export default BuscarAssistidoPage;
