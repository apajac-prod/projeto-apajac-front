import { createContext, useState } from "react";

export function useModalConsultaUsuario () {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string|null>(null);

    return {
        isOpen,
        setIsOpen,
        id,
        setId
    }
}


export const useModalConsultaUsuarioContext = createContext<ReturnType<typeof useModalConsultaUsuario> | undefined>(undefined);