"use client";

import styles from "./header.module.css";

import { usePathname } from "next/navigation";

type Props = {};
const Header = (props: Props) => {
  // The paths added below will hide the Header
  const pathsToHideHeader = ["/login"];

  /*   if (pathsToHideHeader.includes(usePathname())) {
    return;
  } */

  return (
    <header className={styles.container}>
      <p>HEADER</p>
    </header>
  );
};
export default Header;
