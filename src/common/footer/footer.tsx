"use client";

import styles from "./footer.module.css";

import { usePathname } from "next/navigation";

type Props = {};
const Footer = (props: Props) => {
  // The paths added below will hide the Header
  const pathsToHideFooter = ["/login"];

  if (pathsToHideFooter.includes(usePathname())) {
    return;
  }

  return (
    <footer className={styles.container}>
      <p>FOOTER</p>
    </footer>
  );
};
export default Footer;
