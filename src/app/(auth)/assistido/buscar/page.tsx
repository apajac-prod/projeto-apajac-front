"use client";

import NotFound from "@/app/not-found";
import BuscarAssistido from "@/components/buscar_assistido/buscarAssistido";
import { useRouter, useSearchParams } from "next/navigation";

const pathMap = new Map([
  ["realizar_cars", "/cars/cadastrar/"],
  ["listar_cars", "/cars/listar/"],
]);

const BuscarAssistidoPage = () => {
  const searchParams = useSearchParams();
  const goto = searchParams.get("goto");
  const router = useRouter();

  console.log("goto: ", goto);
  if (!goto) return <NotFound />;

  return (
    <BuscarAssistido
      onSelectCallback={(id) => router.push(pathMap.get(goto) + id)}
    />
  );
};
export default BuscarAssistidoPage;
