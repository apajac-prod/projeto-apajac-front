import { axios } from "@/api/api";
import { assistidoToApi as assistidoToApi } from "./middleware/formAssistido";
import toast from "react-hot-toast";
import { apiToListAssistido } from "./middleware/listAssistido";
import { apiToUsuario, usuarioToApi } from "./middleware/formUsuario";
import { apiToLogin } from "./middleware/login";
import { apiToListUsuario } from "./middleware/listUsuario";
import { carsToApi } from "./middleware/cars";
import { MchatFormData } from "@/components/form/mchat/Constants";

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
};

export type ToastOptions = {
  noToast?: boolean | undefined;
  dismissAnyPreviousToast?: boolean | undefined;
  id?: string | undefined;
  loadingMessage?: string | undefined;
  successMessage?: string | undefined;
  errorMessage?: string | undefined;
  duration?: {
    sucess?: number | undefined;
    error?: number | undefined;
  };
  position?:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "top-left"
    | "top-right";
};

type CustomError = {
  status: number;
  messageFromApi?: string | null;
  customMessage?: string | null;
  error: Error;
};

function createToast(promise: Promise<any>, toastOptions?: ToastOptions) {
  toastOptions && !!toastOptions.dismissAnyPreviousToast && toast.dismiss(); //Dismiss any previous toast that is displayed in screen
  toast.promise<void>(
    promise,
    {
      loading: toastOptions?.loadingMessage ?? "Carregando informações ...",
      success: () => {
        return (
          toastOptions?.successMessage ?? "Informações carregadas com sucesso!"
        );
      },
      error: (err: CustomError) => {
        let displayErrorMessage = err.customMessage;
        if (err.customMessage && err.messageFromApi)
          displayErrorMessage += "\n";
        if (err.messageFromApi)
          displayErrorMessage += `Cód: ${err.status} | ${err.messageFromApi}`;

        return displayErrorMessage!;
      },
    },
    {
      style: {
        backgroundColor: "#5992cd",
        outline: "2px #fff solid",
        color: "#fff",
        minWidth: "300px",
        minHeight: "60px",
        margin: "5%",
      },
      success: {
        duration: toastOptions?.duration?.sucess ?? 1500,
      },
      error: {
        duration: toastOptions?.duration?.error ?? 5000,
      },
      id: toastOptions?.id ?? "default",
      position: toastOptions?.position ?? "top-center",
    }
  );
}

const getRequest = (endpoint: string, toastOptions?: ToastOptions) => {
  const response = axios.get(endpoint).catch(({ request: requestError }) => {
    if (!requestError.response) {
      throw <CustomError>{
        status: 0,
        messageFromApi: null,
        customMessage: "Não foi possível se conectar ao servidor.",
        error: new Error(),
      };
    }

    throw {
      status: requestError.status,
      messageFromApi: JSON.parse(requestError.response).message,
      customMessage:
        toastOptions?.errorMessage ??
        "Não foi possível carregar as informações.",
      error: new Error(),
    };
  });

  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
};

const postRequest = (
  endpoint: string,
  data: any,
  toastOptions?: ToastOptions
) => {
  const response = axios
    .post(endpoint, data)
    .catch(({ request: requestError }) => {
      if (!requestError.response) {
        throw <CustomError>{
          status: 0,
          messageFromApi: null,
          customMessage: "Não foi possível se conectar ao servidor.",
          error: new Error(),
        };
      }

      throw {
        status: requestError.status,
        messageFromApi: JSON.parse(requestError.response).message,
        customMessage:
          toastOptions?.errorMessage ??
          "Não foi possível salvar as informações.",
        error: new Error(),
      };
    });

  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
};

const putRequest = (
  endpoint: string,
  data?: any,
  toastOptions?: ToastOptions
) => {
  const response = axios
    .put(endpoint, data)
    .catch(({ request: requestError }) => {
      if (!requestError.response) {
        throw <CustomError>{
          status: 0,
          messageFromApi: null,
          customMessage: "Não foi possível se conectar ao servidor.",
          error: new Error(),
        };
      }

      throw {
        status: requestError.status,
        messageFromApi: JSON.parse(requestError.response).message,
        customMessage:
          toastOptions?.errorMessage ??
          "Não foi possível alterar as informações.",
        error: new Error(),
      };
    });

  !toastOptions?.noToast && createToast(response, toastOptions);

  return response;
};

export const createAssistido = (assistidoData: any, sessionId: number) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Cadastrando assistido ...",
    successMessage: "Assistido cadastrado com sucesso!",
    errorMessage: "Não foi possível cadastrar este assistido.",
  };
  const data = assistidoToApi(assistidoData, sessionId);
  return postRequest("assistido", data, toastOptions);
};

export const updateAssistido = (assistidoData: any, sessionId: number) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Alterando assistido ...",
    successMessage: "Assistido alterado com sucesso!",
    errorMessage: "Não foi possível alterar este assistido.",
  };
  const data = assistidoToApi(assistidoData, sessionId);
  return postRequest("assistido", data, toastOptions);
};

export const getAssistidoById = (assistidoId: string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações do assistido ...",
    successMessage: "Informações carregadas com sucesso!",
    position: "bottom-center",
  };
  return getRequest(`assistido/por_id/${assistidoId}`, toastOptions);
};

export const getAddressByCep = (cep: string) => {
  const toastOptions: ToastOptions = {
    noToast: true,
  };

  return getRequest(`endereco/${cep}`, toastOptions);
};

export const updateAssistidoStatus = (
  id: string,
  newStatus: boolean,
  idResponsavelPeloCadastro: number
) => {
  const toastOptions: ToastOptions = {
    loadingMessage: newStatus
      ? "Ativando assistido ..."
      : "Desativando assistido ...",
    successMessage: `Assistido ${
      newStatus ? "ativado" : "desativado"
    } com sucesso!`,
    errorMessage: "Houve um problema ao alterar o status deste assistido.",
  };
  return putRequest(
    `/assistido/${id}/status/${idResponsavelPeloCadastro}`,
    undefined,
    toastOptions
  );
};

// List Assistido response properties, to perform a sort.
type Sort = "id" | "name" | "responsible" | "status" | "age" | undefined;

export const getListaAssistidos = async (
  page: number,
  sort: Sort = undefined,
  orderByAsc: boolean = true,
  toastOptions?: ToastOptions
) => {
  const SIZE = 50; //Qty of elements in each page per request

  const tOptions: ToastOptions = {
    id: "getListaAssistidos",
    position: "bottom-center",
    loadingMessage: toastOptions?.loadingMessage ?? "Carregando assistidos ...",
    successMessage:
      toastOptions?.successMessage ?? "Assistidos carregados com sucesso!",
    errorMessage:
      toastOptions?.errorMessage ?? "Não foi possível carregar os assistidos.",
  };

  const convertedSort = new Map([
    ["id", "id"],
    ["name", "nome"],
    ["responsible", "responsavel"],
    ["status", "statusAssistido"],
    ["age", "dataNascimento"],
  ]);

  if (sort === "age") orderByAsc = !orderByAsc;

  const order = orderByAsc ? "asc" : "desc";

  const sortParameter = sort ? `&sort=${convertedSort.get(sort)},${order}` : "";

  /* return getRequest(`lista-assistidos?${sort ? `?_sort=${convertedSort.get(sort)}` : ""}`, toastOptions) */
  // Conferir como passar os parametros de page e sort pra api
  const { data } = await getRequest(
    `lista_assistidos?page=${page}&size=${SIZE}${sortParameter}`,
    tOptions
  );
  return {
    assistidos: apiToListAssistido(data.assistidos),
    isLastPage: data.isLastPage,
  };
};

export const getListaAssistidosPorNome = async (
  name: string,
  page: number,
  sort: Sort = undefined,
  orderByAsc: boolean = true,
  toastOptions?: ToastOptions
) => {
  const SIZE = 50; //Qty of elements in each page per request

  const tOptions: ToastOptions = {
    id: "getListaAssistidosPorNome",
    position: "bottom-center",
    loadingMessage:
      toastOptions?.loadingMessage ?? "Carregando assistidos por nome...",
    successMessage:
      toastOptions?.successMessage ?? "Assistidos carregados com sucesso!",
    errorMessage:
      toastOptions?.errorMessage ?? "Não foi possível carregar os assistidos.",
  };

  const convertedSort = new Map([
    ["id", "id"],
    ["name", "nome"],
    ["responsible", "responsavel"],
    ["status", "statusAssistido"],
    ["age", "dataNascimento"],
  ]);

  if (sort === "age") orderByAsc = !orderByAsc;

  const order = orderByAsc ? "asc" : "desc";

  const sortParameter = sort ? `&sort=${convertedSort.get(sort)},${order}` : "";

  /* return getRequest(`lista-assistidos?${sort ? `?_sort=${convertedSort.get(sort)}` : ""}`, toastOptions) */
  // Conferir como passar os parametros de page e sort pra api
  const { data } = await getRequest(
    `lista_assistidos_por_nome/${name}?page=${page}&size=${SIZE}${sortParameter}`,
    tOptions
  );
  return {
    assistidos: apiToListAssistido(data.assistidos),
    isLastPage: data.isLastPage,
  };
};

export const createUsuario = (usuarioData: any) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Cadastrando usuário ...",
    successMessage: "Usuário cadastrado com sucesso!",
    errorMessage: "Não foi possível cadastrar este usuário.",
  };
  const data = usuarioToApi(usuarioData);
  return postRequest("usuario", data, toastOptions);
};

export const getUsuario = async (id: string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando usuário ...",
    successMessage: "Usuário carregado com sucesso!",
    errorMessage: "Não foi possível carregar este usuário.",
  };
  const { data } = await getRequest(`usuario/por_id/${id}`, toastOptions);
  return apiToUsuario(data);
};

export const updateUsuario = (usuarioData: any) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Atualizando usuário ...",
    successMessage: "Usuário atualizado com sucesso!",
    errorMessage: "Não foi possível atualizar este usuário.",
  };
  const data = usuarioToApi(usuarioData);
  return postRequest("usuario", data, toastOptions);
};

export const updateUsuarioStatus = (
  id: string,
  newStatus: boolean,
  idResponsavelPelaAlteracao: number
) => {
  // No futuro, ao adicionar Token, irá remover o idResponsavelPelaAlteracao.
  const toastOptions: ToastOptions = {
    loadingMessage: newStatus
      ? "Ativando usuário ..."
      : "Desativando usuário ...",
    successMessage: `Usuário ${
      newStatus ? "ativado" : "desativado"
    } com sucesso!`,
    errorMessage: "Houve um problema ao alterar o status deste usuário.",
  };
  return putRequest(
    `/usuario/${id}/status/${idResponsavelPelaAlteracao}`,
    undefined,
    toastOptions
  );
};

export const login = async (username: string, password: string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Efetuando login ...",
    successMessage: "Login realizado com sucesso!",
    errorMessage: "Houve um problema ao tentar efetuar login.",
  };

  const data = {
    login: username,
    password: password,
  };

  const { data: dataResponse } = await postRequest(
    "/login",
    data,
    toastOptions
  );
  return apiToLogin(dataResponse);
};

export const getListaUsuarios = async (
  page: number,
  toastOptions?: ToastOptions
) => {
  const SIZE = 50; //Qty of elements in each page per request

  const tOptions: ToastOptions = {
    id: "getListaUsuários",
    position: "bottom-center",
    loadingMessage: toastOptions?.loadingMessage ?? "Carregando usuários ...",
    successMessage:
      toastOptions?.successMessage ?? "Usuários carregados com sucesso!",
    errorMessage:
      toastOptions?.errorMessage ?? "Não foi possível carregar os usuários.",
  };

  const { data } = await getRequest(
    `lista_usuarios?page=${page}&size=${SIZE}`,
    tOptions
  );
  return {
    usuarios: apiToListUsuario(data.usuarios),
    isLastPage: data.isLastPage,
  };
};

export const getListaUsuariosPorNome = async (
  name: string,
  page: number,
  toastOptions?: ToastOptions
) => {
  const SIZE = 50; //Qty of elements in each page per request

  const tOptions: ToastOptions = {
    id: "getListaAssistidosPorNome",
    position: "bottom-center",
    loadingMessage:
      toastOptions?.loadingMessage ?? "Carregando assistidos por nome...",
    successMessage:
      toastOptions?.successMessage ?? "Assistidos carregados com sucesso!",
    errorMessage:
      toastOptions?.errorMessage ?? "Não foi possível carregar os assistidos.",
  };
  // Conferir como passar os parametros de page e sort pra api
  const { data } = await getRequest(
    `lista_usuarios_por_nome/${name}?page=${page}&size=${SIZE}&sort=nome`,
    tOptions
  );
  return {
    usuarios: apiToListUsuario(data.usuarios),
    isLastPage: data.isLastPage,
  };
};

export const createCarsChildhood = (
  assistidoId: string,
  resultPontos: number | undefined,
  result: Array<number | undefined>,
  observacoes: Array<string | undefined>
) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Salvando CARS ...",
    successMessage: "Cars salvo com sucesso!",
    errorMessage: "Não foi possível salvar o CARS.",
  };
  const data = carsToApi(assistidoId, resultPontos, result, observacoes);
  return postRequest("cars", data, toastOptions);
};

export const getCarsByAssistidoId = async (assistidoid: number | string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações ...",
    successMessage: "Informaçõs carregadas com sucesso!",
    errorMessage: "Houve um problema ao listar os CARS deste assistido.",
  };

  return await getRequest(`cars/${assistidoid}`, toastOptions);
};

export const getCarsDetailsById = async (carsId: number | string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações ...",
    successMessage: "Informaçõs carregadas com sucesso!",
    errorMessage: "Houve um problema ao carregar as informações deste CARS.",
  };

  return await getRequest(`cars/detalhes/${carsId}`, toastOptions);
};

export const createMchat = (
  mchatData: any
) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Salvando MCHAT ...",
    successMessage: "MCHAT salvo com sucesso!",
    errorMessage: "Não foi possível salvar o MCHAT.",
  };
  return postRequest("mchat", mchatData, toastOptions);
};

export const getMchatByAssistidoId = async (assistidoid: number | string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações ...",
    successMessage: "Informaçõs carregadas com sucesso!",
    errorMessage: "Houve um problema ao listar os MCHATs deste assistido.",
  };

  return await getRequest(`mchat/${assistidoid}`, toastOptions);
};

export const getMchatDetailsById = async (mchatId: number | string) => {
  const toastOptions: ToastOptions = {
    loadingMessage: "Carregando informações ...",
    successMessage: "Informaçõs carregadas com sucesso!",
    errorMessage: "Houve um problema ao carregar as informações deste MCHAT.",
  };

  return await getRequest(`mchat/detalhes/${mchatId}`, toastOptions);
};