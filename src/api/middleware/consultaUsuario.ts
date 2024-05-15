interface Api {
    id: number;
    nome: string;
    role: string;
    login: string;
    password: string;
  }
  
  
  
  export function apiToConsultaUsuario (data: Api) {
  
      return {
          
          id: data.id,
          name: data.nome,
          role: data.role,
          login: data.login,
          password: data.password,
      }
  }