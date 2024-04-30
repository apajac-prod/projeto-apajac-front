import styles from "./form.module.css";
import { Icon } from "react-flaticons";

type Props = {
  Icon?: Icon;
  title: string;
  className?: string;
};
function FormTitle({ Icon, title, className }: Props) {
  let style = styles.container;
  if (className) {
    style += ` ${className}`;
  }
  return (
    <div className={style}>
      {Icon && <Icon />}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
export default FormTitle;
