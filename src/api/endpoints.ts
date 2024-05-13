import {axios} from "@/api/api";
import { acolhidoToApi } from "./middleware/formAcolhido";
import toast from "react-hot-toast";
import { ListAcolhido, apiToListAcolhido } from "./middleware/listAcolhido";

import { usuarioToApi } from "./middleware/formUsuario";
import { apiToListUsuario } from "./middleware/listUsuario";

const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
}

type ToastOptions = {
    noToast?: boolean|undefined;
    loadingMessage?: string|undefined;
    successMessage?: string|undefined;
    errorMessage?: string|undefined;
    duration?: {
      sucess?: number|undefined;
      error?: number|undefined;
    }
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
            duration: toastOptions?.duration?.sucess ?? 5000,
          },
          error: {
            duration: toastOptions?.duration?.error ?? 7000,
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

export const updateAcolhido = (acolhidoData: any) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Alterando acolhido ...",
    successMessage: "Acolhido alterado com sucesso!",
    errorMessage: "Não foi possível alterar este acolhido."
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
    errorMessage: "Houve um problema ao alterar o status do acolhido."
  }

  return putRequest(`/acolhido/${id}/status_acolhido/${status}`, undefined, toastOptions);
}

// List acolhido response properties, to perform a sort.
type Sort = "id"|"name"|"responsible"|"status"|"age"|undefined;

export const getListaAcolhidos = (page: number, sort: Sort = undefined, orderByAsc: boolean = true) => {

  const SIZE = 100; //Qty of elements in each page per request

  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando acolhidos ...",
    successMessage: "Acolhidos carregados com sucesso!",
    errorMessage: "Não foi possível carregar os acolhidos."
  }
  
  const convertedSort = new Map([
    ["id", "id"],
    ["name", "nome"],
    ["responsible", "responsavel"],
    ["status", "statusAcolhido"],
    ["age", "dataNascimento"],
  ])

  if (sort === "age") orderByAsc = !orderByAsc

  const order = orderByAsc ? "asc" : "desc";

  const sortParameter = sort ? `&sort=${convertedSort.get(sort)},${order}` : "";

  /* return getRequest(`lista-acolhidos?${sort ? `?_sort=${convertedSort.get(sort)}` : ""}`, toastOptions) */
  // Conferir como passar os parametros de page e sort pra api
  return getRequest(`lista-acolhidos?page=${page}&size=${SIZE}${sortParameter}`, toastOptions)
  .then(({data}) => {
    console.log("before data:", data)
    return {acolhidos: apiToListAcolhido(data.acolhidos), isLastPage: data.isLastPage};
  });
}


// usuario ///////////////////////////////////////////////////////////////

export const createUsuario = (usuarioData: any) => {
  const toastOptions: ToastOptions = {
      loadingMessage: "Cadastrando usuário...",
      successMessage: "Usuário cadastrado com sucesso!",
      errorMessage: "Não foi possível cadastrar o usuário." 
  }
  const data = usuarioToApi(usuarioData)
  return postRequest("usuario", data, toastOptions);
}

export const updateUsuario = (usuarioData: any) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Alterando usuário ...",
    successMessage: "Usuário alterado com sucesso!",
    errorMessage: "Não foi possível alterar este usuário."
  }
  const data = usuarioToApi(usuarioData)
  return postRequest("usuario", data, toastOptions);
}

export const getUsuarioById = (usuarioId: string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações do usuario ...",
    successMessage: "Informações carregadas com sucesso!",
  }
  return getRequest(`usuario/por_id/${usuarioId}`, toastOptions);
}

export const updateUsuarioStatus = (id: string, status: boolean) => {
  const toastOptions: ToastOptions = {
    loadingMessage: status ? "Ativando usuario ..." : "Desativando usuario ...",
    successMessage: `Usuario ${status ? "ativado" : "desativado"} com sucesso!`,
    errorMessage: "Houve um problema ao alterar o status do acolhido."
  }

  return putRequest(`/usuario/${id}/status_usuario/${status}`, undefined, toastOptions);
}


// List usuario response properties, to perform a sort.


export const getListaUsuarios = (page: number, sort: Sort = undefined, orderByAsc: boolean = true) => {

  const SIZE = 100; //Qty of elements in each page per request

  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando acolhidos ...",
    successMessage: "Acolhidos carregados com sucesso!",
    errorMessage: "Não foi possível carregar os acolhidos."
  }
  
  const convertedSort = new Map([
    ["id", "id"],
    ["name", "nome"],
    
  ])


  const order = orderByAsc ? "asc" : "desc";

  const sortParameter = sort ? `&sort=${convertedSort.get(sort)},${order}` : "";

  /* return getRequest(`lista-acolhidos?${sort ? `?_sort=${convertedSort.get(sort)}` : ""}`, toastOptions) */
  // Conferir como passar os parametros de page e sort pra api
  return getRequest(`lista-usuarios?page=${page}&size=${SIZE}${sortParameter}`, toastOptions)
  .then(({data}) => {
    console.log("before data:", data)
    return {usuarios: apiToListUsuario(data.usuarios), isLastPage: data.isLastPage};
  });
}


//usuario/////////////////////////////////////////////////////////////////////
