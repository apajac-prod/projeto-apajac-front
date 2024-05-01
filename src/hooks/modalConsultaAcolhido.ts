import { createContext, useState } from "react";

export function modalConsultaAcolhido () {
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string|null>(null);

    return {
        isOpen,
        setIsOpen,
        id,
        setId
    }
}


export const modalConsultaAcolhidoContext = createContext<ReturnType<typeof modalConsultaAcolhido> | undefined>(undefined);