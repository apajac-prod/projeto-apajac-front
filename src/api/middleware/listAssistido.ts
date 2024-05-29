import { ListAssistido, ListAssistidoApi } from "@/types/listAssistido.type";

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