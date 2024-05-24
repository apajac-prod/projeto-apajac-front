import { createContext } from "react";

type SessionContextType = {
    sessionInfo: {
      id: number | undefined;
      name: string | undefined;
      login: string | undefined;
      roles: Array<string> | undefined;
    };
    setSessionInfo: Function;
  };

export const SessionContext = createContext<SessionContextType | undefined>(
    undefined
  );