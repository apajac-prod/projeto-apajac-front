import styles from "./styles.module.css";

type onClickFunction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;

type Props = {
  title: string;
  onClick: onClickFunction;
  icon?: string;
  className?: string;
};
const MenuCard = ({ title, icon, onClick, className }: Props) => {
  let style = styles.card;
  if (className) {
    style += ` ${className}`;
  }

  return (
    <div
      className={style}
      card-title={title}
      key={title}
      onClick={(e) => onClick(e)}
    >
      <h3>{title}</h3>
    </div>
  );
};
export default MenuCard;
