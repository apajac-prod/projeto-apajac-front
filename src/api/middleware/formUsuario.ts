
import { ApiUsuario } from "@/types/ApiUsuario.type";


//Format object to what API expects
export function usuarioToApi(usuario: ApiUsuario) {
    console.log("usuario before all conversion:", usuario);

    let data: any = usuario.map((element: any, index: string) => {

        return element;
        
    });
   
}

export function apiToUsuario(data: ApiUsuario) {

    type Usuario = {
        name: string | undefined;
        role: string | undefined;
        login: string | undefined;
        password: string | undefined;
    }

    const usuario = [
        {
            
            name: data.nome,
            role: data.role,
            login: data.login,
            password: data.password
              
        }
    ]

    return usuario;
}


