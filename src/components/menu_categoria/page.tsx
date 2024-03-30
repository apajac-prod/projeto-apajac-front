import { ReactElement } from "react";
import styles from "./styles.module.css";

type Props = {
  title: string;
  className?: string;
  children: ReactElement[];
};
const MenuCategoria = ({ title, children, className }: Props) => {
  let style = styles.menuCategoria;
  if (className) {
    style += ` ${className}`;
  }

  return (
    <div className={style}>
      <h2>{title}</h2>
      <div className={styles.divisor}></div>
      <div className={styles.cards}>
        {children.map((card, i) => (
          <div key={i} className={styles.card}>
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MenuCategoria;
