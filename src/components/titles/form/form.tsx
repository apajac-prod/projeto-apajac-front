import styles from "./form.module.css";
import { formTitleIcon } from "@/types/formTitleIcon.type";
import Image from "next/image";

type Props = {
  icon?: formTitleIcon;
  title: string;
  className?: string;
};
function FormTitle({ icon, title, className }: Props) {
  let style = styles.container;
  if (className) {
    style += ` ${className}`;
  }
  return (
    <div className={style}>
      {icon && (
        <Image alt={icon.iconDesc} src={icon.iconSrc} width={18} height={18} />
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
export default FormTitle;
