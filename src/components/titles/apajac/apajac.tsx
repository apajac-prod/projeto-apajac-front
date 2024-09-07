/*

import styles from "./apajac.module.css";
import Image from "next/image";

import { Handlee } from "next/font/google";
const handlee = Handlee({ weight: "400", subsets: ["latin"] });

const apajac = () => {
  return (
    <div className={styles.apajac}>
      <Image
        src="/icons/apajac.jpg"
        alt="Logotipo da APAJAC"
        width={80}
        height={80}
      ></Image>
      <h2 className={handlee.className}>apajac</h2>
    </div>
  );
};
export default apajac;

*/


import styles from "./apajac.module.css";
import Image from "next/image";
import { Handlee } from "next/font/google";
const handlee = Handlee({ weight: "400", subsets: ["latin"] });

const Apajac = () => {
  return (
    <div className={styles.apajac} role="banner" aria-label="Logotipo e título da APAJAC">
      <Image
        src="/icons/apajac.jpg"
        alt="Logotipo da APAJAC"
        width={80}
        height={80}
      />
      <h2 className={handlee.className}>apajac</h2>
    </div>
  );
};

export default Apajac;
