import styles from "./subTitle.module.css";

type Props = {
  text: string;
  className?: string;
};
const SubTitle = ({ text, className = "" }: Props) => {
  return <h3 className={`${styles.text} ${className}`}>{text}</h3>;
};
export default SubTitle;
