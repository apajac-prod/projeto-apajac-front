import {axios} from "@/api/api";
import { acolhidoToApi } from "./middleware/acolhido";
import toast from "react-hot-toast";

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
}

type ToastOptions = {
    noToast?: boolean;
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
}

type CustomError = {
  status: number;
  messageFromApi?: string | null;
  customMessage?: string | null;
  error: Error;
}

function createToast(promise: Promise<any>, toastOptions?: ToastOptions) {
    toast.promise<void>(
        promise,
        {
          loading: toastOptions?.loadingMessage ?? "Carregando informações ...",
          success: () => {
            return toastOptions?.successMessage ?? "Informações carregadas com sucesso!";
          },
          error: (err: CustomError) => {
            let displayErrorMessage = err.customMessage;
            if (err.customMessage && err.messageFromApi) displayErrorMessage += "\n";
            if (err.messageFromApi) displayErrorMessage += `Cód: ${err.status} | ${err.messageFromApi}`;

            return displayErrorMessage!
          },
        },
        {
          style: {
            backgroundColor: "#5992cd",
            outline: "2px #fff solid",
            color: "#fff",
            minWidth: "400px",
            minHeight: "60px",
            marginTop: "5%",
          },
          success: {
            duration: 5000,
          },
          error: {
            duration: 7000,
          },
        }
      );
}

const getRequest = (endpoint: string, toastOptions?: ToastOptions) => {
  const response = axios.get(endpoint)
  .catch(({request: requestError}) => {

    if (!requestError.response) {
      throw <CustomError> {
        status: 0,
        messageFromApi: null,
        customMessage: "Não foi possível se conectar ao servidor.",
        error: new Error()
      }
    }

    throw {
      status: requestError.status,
      messageFromApi: JSON.parse(requestError.response).message,
      customMessage: toastOptions?.errorMessage ?? "Não foi possível carregar as informações.",
      error: new Error()
    }
  })
  
  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
}

const postRequest = (endpoint: string, data: any, toastOptions?: ToastOptions) => {
  const response = axios.post(endpoint, data)
  .catch(({request: requestError}) => {

    if (!requestError.response) {
      throw <CustomError> {
        status: 0,
        messageFromApi: null,
        customMessage: "Não foi possível se conectar ao servidor.",
        error: new Error()
      }
    }

    throw {
      status: requestError.status,
      messageFromApi: JSON.parse(requestError.response).message,
      customMessage: toastOptions?.errorMessage ?? "Não foi possível salvar as informações.",
      error: new Error()
    }
  })
  
  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
}

const putRequest = (endpoint: string, data?: any, toastOptions?: ToastOptions) => {
  const response = axios.put(endpoint, data)
  .catch(({request: requestError}) => {

    if (!requestError.response) {
      throw <CustomError> {
        status: 0,
        messageFromApi: null,
        customMessage: "Não foi possível se conectar ao servidor.",
        error: new Error()
      }
    }

    throw {
      status: requestError.status,
      messageFromApi: JSON.parse(requestError.response).message,
      customMessage: toastOptions?.errorMessage ?? "Não foi possível alterar as informações.",
      error: new Error()
    }
  })
  
  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
}


export const createAcolhido = (acolhidoData: any) => {
    const toastOptions: ToastOptions = {
      loadingMessage: "Cadastrando acolhido ...",
      successMessage: "Acolhido cadastrado com sucesso!",
      errorMessage: "Não foi possível cadastrar este acolhido."
    }
    const data = acolhidoToApi(acolhidoData)
    return postRequest("acolhido", data, toastOptions);
}

export const getAcolhidoById = (acolhidoId: string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações do acolhido ...",
    successMessage: "Informações carregadas com sucesso!",
  }
  return getRequest(`acolhido/por_id/${acolhidoId}`, toastOptions);
}

export const getAddressByCep = (cep: string) => {
  const toastOptions: ToastOptions = {
    noToast: true
  }

  return getRequest(`endereco/${cep}`, toastOptions);
}

export const updateAcolhidoStatus = (id: string, status: boolean) => {
  const toastOptions: ToastOptions = {
    loadingMessage: status ? "Ativando acolhido ..." : "Desativando acolhido ...",
    successMessage: `Acolhido ${status ? "ativado" : "desativado"} com sucesso!`,
    errorMessage: "Não foi possível alterar o status do acolhido."
  }

  return putRequest(`/acolhido/${id}/status_acolhido/${status}`, undefined, toastOptions);
}