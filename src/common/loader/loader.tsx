import { LegacyRef, ReactElement, RefAttributes, RefObject } from "react";
import styles from "./loader.module.css";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  forwardRef?: LegacyRef<HTMLDivElement>;
};
const Loader = ({ className, style, forwardRef }: Props) => {
  return (
    <div
      className={`${styles.loader} ${className}`}
      style={style}
      ref={forwardRef}
    ></div>
  );
};
export default Loader;
