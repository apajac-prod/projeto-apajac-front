"use client";

import Header from "@/common/header/header";
import Footer from "@/common/footer/footer";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { LoginUser } from "@/types/login";

type SessionContextType = {
  sessionInfo: {
    name: string | undefined;
    login: string | undefined;
    roles: Array<string> | undefined;
  };
  setSessionInfo: Function;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export default function LoggedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const [sessionInfo, setSessionInfo] = useState<LoginUser | undefined>(
    undefined
  );

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) {
      router.push("/login");
      return;
    }
    setSessionInfo(JSON.parse(session));
  }, []);

  if (sessionInfo) {
    return (
      <SessionContext.Provider value={{ sessionInfo, setSessionInfo }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </SessionContext.Provider>
    );
  }
}
