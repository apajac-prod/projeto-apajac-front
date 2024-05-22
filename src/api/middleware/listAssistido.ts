type ListAssistidoApi = {
    id: string;
    nome: string;
    idade: number;
    responsavel: string;
    statusAssistido: boolean;
}

export type ListAssistido = {
    id: string;
    name: string;
    age: number;
    responsible: string;
    status: boolean;
}

export function apiToListAssistido(listAssistidoApi: ListAssistidoApi[]): ListAssistido[] {
    return listAssistidoApi.map((assistido) => {
        return {
        id: assistido.id,
        name: assistido.nome,
        age: assistido.idade,
        responsible: assistido.responsavel,
        status: assistido.statusAssistido
    }
    });
}