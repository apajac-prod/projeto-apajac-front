"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import * as icon from "react-flaticons";
import { useContext } from "react";
import { SessionContext } from "@/contexts/sessionContext";

const HOME_PATH = "/menu";

const Header = () => {
  const router = useRouter();
  const session = useContext(SessionContext);

  function goToHome() {
    router.push(HOME_PATH);
  }

  function handleLogout() {
    localStorage.removeItem("session");
    router.push("/login");
  }

  return (
    <header className="w-screen min-h-[50px] px-3 py-2 box-border flex items-center bg-[#2e5994] relative">
      <div
        className="flex items-center gap-3 cursor-pointer z-10"
        onClick={goToHome}
      >
        <Image
          tabIndex={1}
          src="/icons/apajac.jpg"
          alt="Logotipo da APAJAC"
          width={48}
          height={48}
          className="rounded-[10px]"
        />
      </div>

      <div
        tabIndex={2}
        onClick={goToHome}
        className="hidden sm:block absolute left-1/2 -translate-x-1/2 text-white font-semibold text-lg whitespace-nowrap cursor-pointer"
      >
        <p>SISTEMA DE GERENCIAMENTO APAJAC</p>
      </div>

      <div className="ml-auto flex flex-col items-end justify-center min-h-[50px] min-w-[115px] gap-[4px] z-10 mr-2 print:hidden">
        <p className="text-white font-semibold">
          Olá, {session?.sessionInfo.name?.split(" ")[0]}
        </p>
        <div
          tabIndex={3}
          onClick={handleLogout}
          className="flex items-center gap-1 cursor-pointer"
        >
          <p className="text-white font-semibold whitespace-nowrap">Logout</p>
          <icon.Exit className="w-4 h-4 mb-[2px] px-1 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
