import { createContext, useState } from "react";

export function useModalConsultaAcolhido () {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string|null>(null);

    return {
        isOpen,
        setIsOpen,
        id,
        setId
    }
}


export const useModalConsultaAcolhidoContext = createContext<ReturnType<typeof useModalConsultaAcolhido> | undefined>(undefined);