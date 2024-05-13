"use client";

import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";
import * as icon from "react-flaticons";

const HOME_PATH = "/menu";

const Header = () => {
  const router = useRouter();

  function goToHome() {
    router.push(HOME_PATH);
  }

  function handleLogout() {
    router.push("/login");
  }
  return (
    <header className={styles.container}>
      <Image
        onClick={() => goToHome()}
        src={"/icons/apajac.jpg"}
        alt="Logotipo da APAJAC"
        width={48}
        height={48}
      />
      <p onClick={() => goToHome()} className={styles.title}>
        SISTEMA DE GERENCIAMENTO APAJAC
      </p>

      <div className={styles.logoutContainer}>
        <p>Olá, Username</p>
        <p onClick={() => handleLogout()} className={styles.logout}>
          Logout <icon.Exit />
        </p>
      </div>
    </header>
  );
};
export default Header;
