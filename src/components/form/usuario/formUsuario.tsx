"use client";

import { ReactElement, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
("next/navigation");

import styles from "./formUsuario.module.css";

import FormTitle from "@/components/titles/form/form";
import * as icon from "react-flaticons";

//FormHeader Index components
import {
  MultistepFormHeader,
  StepHeader,
} from "@/components/multistep_form/multistep_form";


//Custom hooks
import { MultistepFormContext, useMultistepForm } from "@/hooks/useMultistepForm";






import { getUsuarioById, updateUsuarioStatus } from "@/api/endpoints";
import Loader from "@/common/loader/loader";
import { apiToUsuario } from "@/api/middleware/formUsuario";


/* const [usuarioPromise, setUsuarioPromise] */

type Props = {
  editId?: string | null;
};

function FormUsuario({ editId = null }: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const multistepController = useMultistepForm(
    [
     <FormUsuario key={0} />,
     
    ],
    null
  );

  useEffect(() => {
    if (editId) {
      setIsLoading(true);
      getUsuarioById(editId)
        .then(({ data }) => {
          console.log("data da requisição:", data);
          multistepController.loadData(apiToUsuario(data));
          multistepController.setId(data.id);
          multistepController.setActiveStatus(data.statusUsuario);
        })
        .catch(() => {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          setTimeout(() => router.push("/menu"), 3000);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  function changeStatusUsuario() {
    const activeStatus = multistepController.getActiveStatus();
    if (
      activeStatus &&
      !confirm(
        "Deseja realmente desativar este usuario?\nAlterações não salvas poderão ser perdidas."
      )
    )
      return;
    editId &&
      updateUsuarioStatus(editId, !activeStatus).then(() => {
        if (multistepController.getActiveStatus()) {
          window.onbeforeunload = () => null; // Removes the exit confirmation
          window.location.reload();
        }
        multistepController.changeActiveStatus();
      });
  }

  useEffect(() => {
    if (multistepController.getActiveStatus()) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = () => null;
    }
  }, [multistepController.getActiveStatus()]);

  return (
    <div className={styles.container}>
      <FormTitle
        className={styles.title}
        title={editId ? "Alterar Usuario" : "Cadastrar Usuario"}
        Icon={icon.User}
      />
     

        <p className={styles.required_message}>* Campos obrigatórios</p>

        {editId && isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>

            {editId && (
              <button
                className={`submitBtn ${
                  multistepController.getActiveStatus()
                    ? styles.deactivate
                    : styles.activate
                }`}
                type="button"
                onClick={() => changeStatusUsuario()}
              >
                {multistepController.getActiveStatus()
                  ? "Desativar Usuario"
                  : "Ativar Usuario"}
              </button>
            )}
          </>
        )}
      
    </div>
  );
}
export default FormUsuario;