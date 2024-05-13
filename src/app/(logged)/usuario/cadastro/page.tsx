"use client"

import { useRouter } from "next/navigation";
import { useForm } from 'react-hook-form';

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import SubTitle from '@/components/form/acolhido/subTitle';
import styles from './page.module.css';

import FormTitle from '@/components/titles/form/form';
import { formTitleIcons } from '@/types/formTitleIcon.type';

import { restoreInputValue } from '@/functions/restoreInputs';
import { MultistepFormContext } from '@/hooks/useMultistepForm';
import { ChangeEvent, useContext, useState } from 'react';
import Login from '@/app/login/page';
import { error } from 'console';
import Image from 'next/image';
import { flushSync } from 'react-dom';

import { createUsuario, updateUsuario } from "@/api/endpoints";




function CadastroUsuario()  {
    const router = useRouter();
    const multistepController = useContext(MultistepFormContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [disableButtons, setDisableButtons] = useState<boolean>(false);
    

    const [permissions, setPermissions] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    

    // name validation
    const [name, setName] = useState("")
    const [nameErr, setNameErr] = useState(false)

    const validateName = () => {
        if(!name) {
            setNameErr(true)
        } else {
            setNameErr(false)
        }
    }

    


    //Registration form object
    type Usuario = {
        name: string;
        login: string;
        password: string;
        repeatPassword: string;
        permissions: string;
    };

   

    //Yup validation schema
    const usuarioSchema: yup.ObjectSchema<Usuario> = yup.object({
        name: yup
            .string()
            .trim()
            .required("Obrigatório inserir o nome do usuário")
            .matches(
                /(?=^.{2,60}$)^[A-ZÀÁÂĖÈÉÊÌÍÒÓÔÕÙÚÛÇ][a-zàáâãèéêìíóôõùúç]+(?:[ ](?:das?|dos?|de|e|[A-Z][a-z]+))*$/,
                "Inserir nome e sobrenome com espaço entre eles! Letras iniciais maiuscúla e não serão aceitos caracteres especiais.")
            .min(3, "Inserir um nome com pelo menos 3 caracteres")
            .max(255, "Limíte maximo de 255 caracteres")
            .typeError("Insira o nome do usuário"),

        login: yup
            .string()
            .trim()
            .required("Obrigatório inserir um login")
            .min(3, "Inserir um login com pelo menos 3 caracteres")
            .max(10, "Login deve ter no máximo 10 caracteres")
            .typeError("Insira um login"),

        password: yup
            .string()
            .trim()
            .required("Obrigatório inserir uma senha")
            .min(6, "A senha deve ter pelo menos 6 caracteres")
            .max(10, "A senha deve ter no máximo 10 caracteres")
            
            .typeError("Insira um password"),

        repeatPassword: yup
            .string()
            .trim()
            .required("Obrigatório inserir a senha novamente")
            .typeError("Repita a senha")
            .oneOf([yup.ref("password") ], "A senha não é igual"),

        permissions: yup
            .string()
            .trim()
            .required("Obrigatório selecionar uma opção")
            .oneOf(["profile_1", "profile_2"], "Obrigatório selecionar uma opção"),

    });

    


    // Setting the form
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm ({
        defaultValues: {
            name: restoreInputValue("name", multistepController || null),
            login: restoreInputValue("login", multistepController || null),
            password: restoreInputValue("password", multistepController || null),
            repeatPassword: restoreInputValue("repeatPassword", multistepController || null),
            permissions: restoreInputValue("permissions", multistepController || null),
        },
        mode: "onBlur",
        resolver: yupResolver(usuarioSchema),
    });





    function registerUsuario(data: any) {
        flushSync(() => {        
            multistepController?.setCurrentStepData(data);
        });

        setDisableButtons(true);
        if (multistepController?.getId()) {
            updateUsuario(multistepController?.getResultObject())
                .then(() => {
                    window.onbeforeunload = () => null;
                    router.push("/menu");
                })
                .finally(() => {
                    setDisableButtons(false);
                });
        }   else {
            createUsuario(multistepController?.getResultObject())
                .then(() => {
                    window.onbeforeunload = () => null;
                    router.push("/menu"); 
                })
                .finally(() => {
                    setDisableButtons(false);
                });
        }
    }


    function back(data: any) {
        if (
            multistepController?.getCurrentStepData != null &&
            !(
                JSON.stringify(multistepController?.getCurrentStepData) == 
                JSON.stringify(data)
            )
        )   {
            handleSubmit((data) => {
                multistepController?.setCurrentStepData(data);
                multistepController?.back();
            })();
            return;
        }
        multistepController?.setCurrentStepCache(data);
        multistepController?.back();
    }



    function handlePermissionsChange(e: ChangeEvent<HTMLSelectElement>) {
        if (e.target.value === "profile_1") {
            setPermissions(true);
        } else if (e.target.value === "profile_2") {
            setPermissions(false);
        }
        
    }



    return(
        <div className={styles.container}>
            <div>
                <FormTitle
                    className={styles.title}
                    title="Cadastrar Usuário"
                    
                />
            </div>

            <div>
                <p className={styles.required_message}>* Campos obrigatórios</p>
            </div>

            <form 
                onSubmit={handleSubmit((data) => registerUsuario(data))}
                autoComplete="off"> 

                <div className={`${styles.formRow} ${styles.input_big}`}>
                    <label htmlFor="name" className={styles.required}>
                        Nome
                    </label>
                <input type="text" id="name" {...register("name")} 
                
                value={name}
                onChange={e => setName(e.target.value)}
                //
                />
                </div> 
                {errors.name && (
                    <p className={styles.error_message}>{String(errors.name.message)} </p>
                )}


                <div className={styles.formRow}>
                    <label htmlFor="login" className={styles.required}>
                        Login        
                    </label>
                    <input type="text" id="login" {...register("login")} />
                </div>
                {errors.login && (
                    <p className={styles.error_message}>{String(errors.login.message)} </p>
                )}


                <div className={`${styles.formRow} ${styles.input_small}`}>
                    <label htmlFor="password" className={styles.required}>
                        Senha
                    </label>
                    <input
                        {...register("password")} 
                        type={showPassword ? "text" : "password"} 
                        id="password"
                    />
                    <Image
                        className={styles.show_password_icon}
                        src={
                            showPassword
                                ? "/icons/invisible_30x30.png" 
                                : "/icons/visible_30x30.png"
                        }
                        alt="Exibir a senha"
                        width={18}
                        height={18}
                        onClick={() => setShowPassword((currentValue) => !currentValue)}
                    />                        
                </div>
                {errors.password && (
                    <p className={styles.error_message}>{String(errors.password.message)} </p>
                )}


                <div className={`${styles.formRow} ${styles.input_small}`}>
                    <label htmlFor="repeatPassword" className={styles.required}>
                        Repita a senha
                    </label>
                    <input
                        {...register("repeatPassword")}
                        type={showPassword ? "text" : "password"} 
                        id="repeatPassword"
                    />
                </div>
                {errors.repeatPassword && (
                    <p className={styles.error_message}>{String(errors.repeatPassword.message)}</p>
                )}


                <div className={styles.formRow}>
                    <label htmlFor="permissions" className={styles.required}>
                        Permissões
                    </label>
                    <select                    
                        defaultValue={""}
                        {...register("permissions", {
                            onChange: (e) => handlePermissionsChange(e),
                        })}
                        id="permissions"
                    >
                        <option value="" hidden>
                            
                        </option>
                        <option value="profile_1">Perfil_1</option>
                        <option value="profile_2">Perfil_2</option>
                    </select>
                </div>
                {errors.permissions && (
                    <p className={styles.error_message}>{String(errors.permissions.message)}</p>
                )}

                
                <div className={styles.buttons}>
                    <button
                        className={`submitBtn ${
                            (disableButtons || !multistepController?.getActiveStatus()) &&
                            styles.buttons_disabled
                        }`}
                        disabled={disableButtons}
                        onClick={handleSubmit
                            ((data) => registerUsuario(data),
                            (erro) => console.log("Erro detectado:", erro)                        
                        )}
                    >
                        {multistepController?.getId
                            ? "Finalizar alterações"
                            : "Finalizar Cadastro"}                        
                    </button>
                    

                    <button
                        className={`submitBtn ${disableButtons && styles.buttons_disabled}`} 
                        type="button"
                        disabled={disableButtons} 
                        onClick={() => back(getValues())}
                    >
                        Voltar
                    </button>
                </div>

            </form>


        </div>
        
    )
}

export default CadastroUsuario;




