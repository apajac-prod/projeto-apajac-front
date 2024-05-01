import { useContext, useEffect, useState } from "react";
import { useModalConsultaAcolhidoContext } from "@/hooks/useModalConsultaAcolhido";
import * as icon from "react-flaticons";
import styles from "./modalConsultaAcolhido.module.css";
import FormTitle from "../titles/form/form";
import { getAcolhidoById } from "@/api/endpoints";
import { apiToConsultaAcolhido } from "@/api/middleware/consultaAcolhido";
import { useRouter } from "next/navigation";

export const ModalConsultaAcolhido = () => {
  const modal = useContext(useModalConsultaAcolhidoContext);
  const [acolhidoData, setAcolhidoData] = useState<null | ReturnType<
    typeof apiToConsultaAcolhido
  >>(null);
  const router = useRouter();

  function calculate_age(birthdate: Date) {
    var diff_ms = Date.now() - birthdate.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }

  //Request to fill modal:
  useEffect(() => {
    modal &&
      modal.id &&
      getAcolhidoById(modal.id).then((response: any) => {
        const acolhido = apiToConsultaAcolhido(response.data);
        console.log("RESPONSE after middleware: ", acolhido);
        setAcolhidoData(acolhido);
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
            title="Dados do Acolhido"
            Icon={icon.User}
            className={styles.title}
          />

          <div className={styles.data}>
            {/* personalData */}
            <div>
              <div style={{ alignContent: "center" }}>
                <p>Status: </p>
                <p style={{ color: "green" }}>ATIVO</p>
              </div>
              <div>
                <p>Nome:</p>
                {acolhidoData && <p>{acolhidoData.name}</p>}
              </div>
              <div>
                <p>Idade:</p>
                {acolhidoData && <p>{calculate_age(acolhidoData.birthdate)}</p>}
              </div>
              <div>
                <p>Data de nascimento:</p>
                {acolhidoData && (
                  <p>
                    {
                      acolhidoData.birthdate
                        .toLocaleString("pt-br", {
                          timeZone: "America/Sao_Paulo",
                        })
                        .split(",")[0]
                    }
                  </p>
                )}
              </div>
              <div>
                <p>Escolaridade:</p>
                {acolhidoData && <p>{acolhidoData.educationLevel}</p>}
              </div>
              <div>
                <p>Encaminhado para: </p>
                {acolhidoData && <p>{acolhidoData.forwardedTo}</p>}
              </div>
              <div>
                <p>Outra(s) instituição(ões)</p>
                {acolhidoData && <p>{acolhidoData.whichInstitution}</p>}
              </div>
              <div>
                <p>Informações fornecidas por: </p>
                {acolhidoData && <p>{acolhidoData.informationProvidedBy}</p>}
              </div>
            </div>

            {/* addressData */}
            <div>
              <div>
                <p>CEP: </p>
                {acolhidoData && <p>{acolhidoData.address.cep}</p>}
              </div>
              <div>
                <p>Endereço: </p>
                {acolhidoData && <p>{acolhidoData.address.address}</p>}
              </div>
              <div>
                <p>Número: </p>
                {acolhidoData && <p>{acolhidoData.address.number}</p>}
              </div>
              <div>
                <p>Bairro: </p>
                {acolhidoData && <p>{acolhidoData.address.district}</p>}
              </div>
              <div>
                <p>Cidade: </p>
                {acolhidoData && <p>{acolhidoData.address.city}</p>}
              </div>
              <div>
                <p>UF: </p>
                {acolhidoData && <p>{acolhidoData.address.fu}</p>}
              </div>
            </div>

            {/* schoolData */}
            <div>
              <div>
                <p>Escola: </p>
                {acolhidoData && <p>{acolhidoData.school}</p>}
              </div>
              <div>
                <p>Telefone: </p>
                {acolhidoData && acolhidoData.schoolPhone}
              </div>
            </div>

            {/* responsibleData */}
            <div>
              <div>
                <p>Responsável: </p>
                {acolhidoData && <p>{acolhidoData.responsible.name}</p>}
              </div>
              <div className={styles.phones}>
                <p>Contato: </p>
                {acolhidoData && (
                  <div className={styles.phones}>
                    {acolhidoData.responsible.phones.map((phone, index) => (
                      <div key={phone + index}>
                        {index > 0 && (
                          <span className={styles.phoneSeparator}>/</span>
                        )}
                        <p>{phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* motherData */}
            <div>
              <div>
                <p>Mãe: </p>
                {acolhidoData && <p>{acolhidoData.mother.name}</p>}
              </div>
              <div className={styles.phones}>
                <p>Contato: </p>
                {acolhidoData && (
                  <div className={styles.phones}>
                    {acolhidoData.mother.phones.map((phone, index) => (
                      <div key={phone + index}>
                        {index > 0 && (
                          <span className={styles.phoneSeparator}>/</span>
                        )}
                        <p>{phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p>Ocupação: </p>
                {acolhidoData && <p>{acolhidoData.mother.occupation}</p>}
              </div>
              <div>
                <p>Local de trabalho: </p>
                {acolhidoData && <p>{acolhidoData.mother.placeOfWork}</p>}
              </div>
              <div>
                <p>Salário: </p>
                {acolhidoData && <p>{acolhidoData.mother.salary}</p>}
              </div>
              <div>
                <p>Vínculo empregatício: </p>
                {acolhidoData && (
                  <p>{acolhidoData.mother.employmentRelationship}</p>
                )}
              </div>
            </div>

            {/* fatherData */}
            <div>
              <div>
                <p>Pai: </p>
                {acolhidoData && <p>{acolhidoData.father.name}</p>}
              </div>
              <div className={styles.phones}>
                <p>Contato: </p>
                {acolhidoData && (
                  <div className={styles.phones}>
                    {acolhidoData.father.phones.map((phone, index) => (
                      <div key={phone + index}>
                        {index > 0 && (
                          <span className={styles.phoneSeparator}>/</span>
                        )}
                        <p>{phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p>Ocupação: </p>
                {acolhidoData && <p>{acolhidoData.father.occupation}</p>}
              </div>
              <div>
                <p>Local de trabalho: </p>
                {acolhidoData && <p>{acolhidoData.father.placeOfWork}</p>}
              </div>
              <div>
                <p>Salário: </p>
                {acolhidoData && <p>{acolhidoData.father.salary}</p>}
              </div>
              <div>
                <p>Vínculo empregatício: </p>
                {acolhidoData && (
                  <p>{acolhidoData.father.employmentRelationship}</p>
                )}
              </div>
            </div>

            {/* familyCompositionData */}
            <div>
              <p className={styles.familyLabel}>Familiares</p>
              {acolhidoData &&
                acolhidoData.familyComposition.map((familyMember, index) => (
                  <div key={familyMember.name} className={styles.familyMember}>
                    {index > 0 && (
                      <div className={styles.familySeparator}></div>
                    )}
                    <div>
                      <p>Nome: </p>
                      {acolhidoData && <p>{familyMember.name}</p>}
                    </div>
                    <div>
                      <p>Idade: </p>
                      {acolhidoData && <p>{familyMember.birthYear}</p>}
                    </div>
                    <div>
                      <p>Ocupação: </p>
                      {acolhidoData && <p>{familyMember.occupation}</p>}
                    </div>

                    {familyMember.comments && (
                      <div className={styles.familyComments}>
                        <p>Observações</p>
                        <textarea name="obs" cols={20} rows={5} disabled={true}>
                          {familyMember.comments}
                        </textarea>
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* commentsData */}
            <div>
              <div className={styles.comments}>
                <p>Observações adicionais do cadastro</p>
                <textarea
                  name="obs"
                  cols={15}
                  rows={5}
                  disabled={true}
                ></textarea>
              </div>
            </div>
          </div>

          <div
            className={`submitBtn ${styles.edit}`}
            onClick={() => router.push(`alterar/${modal?.id}`)}
          >
            <p>Alterar acolhido</p>
            <icon.Edit />
          </div>
        </div>
      </div>
    </>
  );
};
