import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.copyright}>
        <span className={styles.copyright}>&copy;</span>
        <p>{new Date().getFullYear()} APAJAC. Todos os direitos reservados.</p>
      </div>
      <a href="/em_construcao">
        Desenvolvido através do Projeto Integrador, UNIVESP
      </a>
    </footer>
  );
};
export default Footer;
