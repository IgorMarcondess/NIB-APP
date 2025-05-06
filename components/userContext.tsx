import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState
} from "react";

type UserType = {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  planoUser: string;
  emailUser: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: (userData: UserType) => void; //userdata vai ser o parametro e o parametro deve ser do tipo UserType
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUserState] = useState<UserType | null>(null);
  const setUser = (userData: UserType) => setUserState(userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve estar dentro de UserProvider");
  }
  return context;
};