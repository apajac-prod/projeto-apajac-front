import styles from "./not-found.module.css";

import Link from "next/link";

import TitleApajac from "@/components/titles/apajac/apajac";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1>Oops...</h1>
      <p>404 not found</p>
      <h2>Não encontramos a página que você procura...</h2>
      <Link href="/">
        <h3>Clique aqui para voltar a página inicial</h3>
      </Link>
      <TitleApajac />
    </div>
  );
};
export default NotFound;
