type ListAcolhidoApi = {
    id: string;
    nome: string;
    idade: number;
    responsavel: string;
    statusAcolhido: boolean;
}

export type ListAcolhido = {
    id: string;
    name: string;
    age: number;
    responsible: string;
    status: boolean;
}

export function apiToListAcolhido(listAcolhidoApi: ListAcolhidoApi[]): ListAcolhido[] {
    return listAcolhidoApi.map((acolhido) => {
        return {
        id: acolhido.id,
        name: acolhido.nome,
        age: acolhido.idade,
        responsible: acolhido.responsavel,
        status: acolhido.statusAcolhido
    }
    });
}