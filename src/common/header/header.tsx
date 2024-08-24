"use client";

import Image from "next/image";
import styles from "./header.module.css";
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
    <header className={styles.container}>
      <Image
        tabIndex={1}        
        onClick={() => goToHome()}
        src={"/icons/apajac.jpg"}
        alt="Logotipo da APAJAC"
        width={48}
        height={48}
      />
      <p tabIndex={2} onClick={() => goToHome()} className={styles.title}>
        SISTEMA DE GERENCIAMENTO APAJAC
      </p>

      <div className={styles.logoutContainer}>
        <p>Olá, {session?.sessionInfo.name?.split(" ")[0]}</p>
        <p tabIndex={3} onClick={() => handleLogout()} className={styles.logout}>
          Logout <icon.Exit />
        </p>
      </div>
    </header>
  );
};
export default Header;
