import { useContext, useEffect, useState } from "react";
import { useModalConsultaAssistidoContext as useModalConsultaAssistidoContext } from "@/hooks/useModalConsultaAssistido";
import * as icon from "react-flaticons";
import styles from "./modalConsultaAssistido.module.css";
import FormTitle from "../titles/form/form";
import { getAssistidoById } from "@/api/endpoints";
import { apiToConsultaAssistido } from "@/api/middleware/consultaAssistido";
import { useRouter } from "next/navigation";
import maskPhone from "@/functions/maskPhone";
import dayjs from "dayjs";
import birthdateToAge from "@/functions/birthdateToAge";

export const ModalConsultaAssistido = () => {
  const modal = useContext(useModalConsultaAssistidoContext);
  const [assistidoData, setAssistidoData] = useState<null | ReturnType<
    typeof apiToConsultaAssistido
  >>(null);
  const router = useRouter();

  //Request to fill modal:
  useEffect(() => {
    modal &&
      modal.id &&
      getAssistidoById(modal.id).then((response: any) => {
        const assistido = apiToConsultaAssistido(response.data);
        console.log("RESPONSE after middleware: ", assistido);
        setAssistidoData(assistido);
      });
  }, []);

  return (
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
          title="Dados do Assistido"
          Icon={icon.User}
          className={styles.title}
        />

        <div className={styles.data}>
          {/* personalData */}
          <div>
            <div style={{ alignContent: "center" }}>
              <p>Status: </p>
              {assistidoData &&
                (assistidoData.status ? (
                  <p style={{ color: "green" }}>ATIVO</p>
                ) : (
                  <p style={{ color: "red" }}>INATIVO</p>
                ))}
            </div>
            <div>
              <p>Nome:</p>
              {assistidoData && <p>{assistidoData.name}</p>}
            </div>
            <div>
              <p>Idade:</p>
              {assistidoData && (
                <p>{birthdateToAge(assistidoData.birthdate)}</p>
              )}
            </div>
            <div>
              <p>Data de nascimento:</p>
              {assistidoData && (
                /*<p>{dateToOutputString(assistidoData.birthdate)}</p>*/
                <p>{assistidoData.birthdate.format("DD/MM/YYYY")}</p>
              )}
            </div>
            <div>
              <p>Escolaridade:</p>
              {assistidoData && (
                <p>{assistidoData.educationLevel ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Encaminhado para: </p>
              {assistidoData && (
                <p>{assistidoData.forwardedTo ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Cadastro em outra(s) instituição(ões)</p>
              {assistidoData && assistidoData.anyInstitutionRegister ? (
                <p>{assistidoData.whichInstitution}</p>
              ) : (
                <p>Não possui</p>
              )}
            </div>

            <div>
              <p>Informações fornecidas por: </p>
              {assistidoData && (
                <p>{assistidoData.informationProvidedBy ?? "Não informado"}</p>
              )}
            </div>
          </div>

          {/* addressData */}
          <div>
            <div>
              <p>CEP: </p>
              {assistidoData && (
                <p>{assistidoData.address.cep ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Endereço: </p>
              {assistidoData && (
                <p>{assistidoData.address.address ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Número: </p>
              {assistidoData && (
                <p>{assistidoData.address.number ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Bairro: </p>
              {assistidoData && (
                <p>{assistidoData.address.district ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Cidade: </p>
              {assistidoData && (
                <p>{assistidoData.address.city ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>UF: </p>
              {assistidoData && (
                <p>{assistidoData.address.fu ?? "Não informado"}</p>
              )}
            </div>
          </div>

          {/* schoolData */}
          <div>
            <div>
              <p>Escola: </p>
              {assistidoData && (
                <p>{assistidoData.school ?? "Não informado"}</p>
              )}
            </div>
            <div>
              <p>Telefone: </p>
              {assistidoData && (
                <p>{maskPhone(assistidoData.schoolPhone) ?? "Não informado"}</p>
              )}
            </div>
          </div>

          {/* responsibleData */}
          <div>
            <div>
              <p>Responsável: </p>
              {assistidoData && (
                <p>{assistidoData.responsible.name ?? "Não informado"}</p>
              )}
            </div>
            <div className={styles.phones}>
              <p>Contato: </p>
              {assistidoData && (
                <div className={styles.phones}>
                  {assistidoData.responsible.phones.map((phone, index) => (
                    <div key={phone + index}>
                      {index > 0 && (
                        <span className={styles.phoneSeparator}>/</span>
                      )}
                      <p>{maskPhone(phone)}</p>
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
              {assistidoData && (
                <p>{assistidoData.mother.name ?? "Não informado"}</p>
              )}
            </div>
            <div className={styles.phones}>
              <p>Contato: </p>
              {assistidoData && (
                <div className={styles.phones}>
                  {assistidoData.mother.phones.map((phone, index) => (
                    <div key={phone + index}>
                      {index > 0 && (
                        <span className={styles.phoneSeparator}>/</span>
                      )}
                      <p>{maskPhone(phone)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p>Ocupação: </p>
              {assistidoData && <p>{assistidoData.mother.occupation}</p>}
            </div>
            {assistidoData && assistidoData.mother.placeOfWork && (
              <div>
                <p>Local de trabalho: </p>
                <p>{assistidoData.mother.placeOfWork}</p>
              </div>
            )}
            {assistidoData && assistidoData.mother.salary && (
              <div>
                <p>Salário: </p>
                <p>R$ {assistidoData.mother.salary}</p>
              </div>
            )}
            {assistidoData && assistidoData.mother.employmentRelationship && (
              <div>
                <p>Vínculo empregatício: </p>
                <p>{assistidoData.mother.employmentRelationship}</p>
              </div>
            )}
          </div>

          {/* fatherData */}
          <div>
            <div>
              <p>Pai: </p>
              {assistidoData && (
                <p>{assistidoData.father.name ?? "Não informado"}</p>
              )}
            </div>
            <div className={styles.phones}>
              <p>Contato: </p>
              {assistidoData && (
                <div className={styles.phones}>
                  {assistidoData.father.phones.map((phone, index) => (
                    <div key={phone + index}>
                      {index > 0 && (
                        <span className={styles.phoneSeparator}>/</span>
                      )}
                      <p>{maskPhone(phone)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <p>Ocupação: </p>
              {assistidoData && <p>{assistidoData.father.occupation}</p>}
            </div>
            {assistidoData && assistidoData.father.placeOfWork && (
              <div>
                <p>Local de trabalho: </p>
                <p>{assistidoData.father.placeOfWork}</p>
              </div>
            )}
            {assistidoData && assistidoData.father.salary && (
              <div>
                <p>Salário: </p>
                <p>R$ {assistidoData.father.salary}</p>
              </div>
            )}
            {assistidoData && assistidoData.father.employmentRelationship && (
              <div>
                <p>Vínculo empregatício: </p>
                <p>{assistidoData.father.employmentRelationship}</p>
              </div>
            )}
          </div>

          {/* familyCompositionData */}
          <div>
            <p className={styles.familyLabel}>Familiares</p>
            {assistidoData &&
              assistidoData.familyComposition.map((familyMember, index) => (
                <div key={familyMember.name} className={styles.familyMember}>
                  {index > 0 && <div className={styles.familySeparator}></div>}
                  <div>
                    <p>Nome: </p>
                    {assistidoData && (
                      <p>{familyMember.name ?? "Não informado"}</p>
                    )}
                  </div>
                  <div>
                    <p>Parentesco: </p>
                    {assistidoData && (
                      <p>{familyMember.relationship ?? "Não informado"}</p>
                    )}
                  </div>
                  <div>
                    <p>Idade: </p>
                    {assistidoData && (
                      <p>{familyMember.birthYear ?? "Não informado"}</p>
                    )}
                  </div>
                  <div>
                    <p>Ocupação: </p>
                    {assistidoData && (
                      <p>{familyMember.occupation ?? "Não informado"}</p>
                    )}
                  </div>

                  {familyMember.comments && (
                    <div className={styles.familyComments}>
                      <p>Observações</p>
                      <textarea
                        name="obs"
                        cols={20}
                        rows={5}
                        disabled={true}
                        value={familyMember.comments}
                      ></textarea>
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
                value={
                  assistidoData && assistidoData.comments
                    ? assistidoData.comments
                    : "Nenhuma observação adicionada"
                }
              ></textarea>
            </div>
          </div>
        </div>

        <div
          className={`button_submit ${styles.edit}`}
          onClick={() => router.push(`alterar/${modal?.id}`)}
        >
          <p>Alterar assistido</p>
          <icon.Edit />
        </div>
      </div>
    </div>
  );
};
