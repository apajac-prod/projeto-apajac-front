import styles from "./loader.module.css";

type Props = {
  className?: string;
};
const Loader = ({ className }: Props) => {
  return <div className={`${styles.loader} ${className}`}></div>;
};
export default Loader;
