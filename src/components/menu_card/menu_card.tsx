import Link from "next/link";
import styles from "./styles.module.css";

type Props = {
  title: string;
  link: string;
  show: boolean | undefined;
  icon?: string;
  className?: string;
};
const MenuCard = ({ title, icon, link, className, show }: Props) => {
  let style = styles.card;
  if (className) {
    style += ` ${className}`;
  }

  if (!show) return undefined;

  return (
    <Link href={link}>
      <div className={style} card-title={title} key={title}>
        <h3>{title}</h3>
      </div>
    </Link>
  );
};
export default MenuCard;
