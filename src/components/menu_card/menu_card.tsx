import Link from "next/link";
import styles from "./styles.module.css";

type Props = {
  title: string;
  link: string;
  icon?: string;
  className?: string;
};
const MenuCard = ({ title, icon, link, className }: Props) => {
  let style = styles.card;
  if (className) {
    style += ` ${className}`;
  }

  return (
    <Link href={link}>
      <div className={style} card-title={title} key={title}>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};
export default MenuCard;
