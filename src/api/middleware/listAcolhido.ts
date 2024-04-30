type ListAcolhidoApi = {
    id: number;
    nome: string;
    idade: number;
    responsavel: string;
    statusAcolhido: boolean;
}

export type ListAcolhido = {
    id: number;
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