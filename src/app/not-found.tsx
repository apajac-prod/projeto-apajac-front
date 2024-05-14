import styles from "./not-found.module.css";

import Link from "next/link";

import TitleApajac from "@/components/titles/apajac/apajac";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Oops...</h1>
      <p>404 not found</p>
      <h2>Não encontramos a página que você procura...</h2>
      <i className="fi fi-rr-404"></i>
      <Link href="/menu">
        <h3>Clique aqui para voltar a página inicial</h3>
      </Link>
      <TitleApajac />
    </div>
  );
};
export default NotFound;
