import { useContext, useEffect, useState } from "react";
import { useModalConsultaUsuarioContext } from "@/hooks/useModalConsultaUsuario";
import * as icon from "react-flaticons";
import styles from "./modalConsultaUsuario.module.css";
import FormTitle from "../titles/form/form";
import { getUsuarioById } from "@/api/endpoints";
import { apiToConsultaUsuario } from "@/api/middleware/consultaUsuario";
import { useRouter } from "next/navigation";

export const ModalConsultaUsuario = () => {
  const modal = useContext(useModalConsultaUsuarioContext);
  const [usuarioData, setUsuarioData] = useState<null | ReturnType<
    typeof apiToConsultaUsuario
  >>(null);
  const router = useRouter();

  

  //Request to fill modal:
  useEffect(() => {
    modal &&
      modal.id &&
      getUsuarioById(modal.id).then((response: any) => {
        const usuario = apiToConsultaUsuario(response.data);
        console.log("RESPONSE after middleware: ", usuario);
        setUsuarioData(usuario);
      });
  }, []);

    return (
        <>
            <div className={styles.background}>
                <div
                className={styles.backgroundClose}
                onClick={() => modal?.setIsOpen(false)}
            ></div>
            <div className={styles.modal}>
                <icon.X
                    className={styles.closeModal}
                    onClick={() => modal?.setIsOpen(false)}
            />
            <FormTitle
                title="Dados do Usuario"
                Icon={icon.User}
                className={styles.title}
            />

            <div className={styles.data}>
                    
                    
                    <div>
                        <p>Nome:</p>
                        {usuarioData && <p>{usuarioData.name}</p>}
                    </div>
                    
                    </div>

                    
                <div
                    className={`submitBtn ${styles.edit}`}
                    onClick={() => router.push(`alterar/${modal?.id}`)}
                >
                    <p>Alterar usuario</p>
                    <icon.Edit />
                </div>
                </div>
            </div>
        </>
    );
};