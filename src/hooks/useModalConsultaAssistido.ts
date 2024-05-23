import { createContext, useState } from "react";

export function useModalConsultaAssistido () {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string|null>(null);

    return {
        isOpen,
        setIsOpen,
        id,
        setId
    }
}


export const useModalConsultaAssistidoContext = createContext<ReturnType<typeof useModalConsultaAssistido> | undefined>(undefined);