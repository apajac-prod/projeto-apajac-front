import styles from "./em_construcao.module.css";

import Link from "next/link";

import TitleApajac from "@/components/titles/apajac/apajac";

const EmConstrucao = () => {
  return (
    <div className={styles.container}>
      <h1>Oops...</h1>
      <h2>Esta página ainda está em construção ...</h2>
      <Link href="/menu">
        <h3>Clique aqui para voltar a página inicial</h3>
      </Link>
      <TitleApajac />
    </div>
  );
};
export default EmConstrucao;
