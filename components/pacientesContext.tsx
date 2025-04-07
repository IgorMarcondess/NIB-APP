// context/PacienteContext.tsx
import { createContext, useContext, useState, ReactNode, PropsWithChildren } from "react";

type Paciente = {
  nome: string;
  exame: string;
  horario: string;
  cpf: string;
  ano: string;
};

type PacienteContextType = {
  pacienteSelecionado: Paciente | null;
  setPacienteSelecionado: (paciente: Paciente) => void;
  pacientesAtendidos: string[];
  marcarComoAtendido: (nome: string) => void;
};

const PacienteContext = createContext<PacienteContextType | undefined>(undefined);

export const PacienteProvider = ({children} : PropsWithChildren<{}>) => {
  const [pacienteSelecionado, setPacienteSelecionado] = useState<Paciente | null>(null);
  const [pacientesAtendidos, setPacientesAtendidos] = useState<string[]>([]);

  const marcarComoAtendido = (nome: string) => {
    setPacientesAtendidos((prev) => [...prev, nome]);
  };

  return (
    <PacienteContext.Provider value={{ pacienteSelecionado, setPacienteSelecionado, pacientesAtendidos, marcarComoAtendido }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePaciente = () => {
  const context = useContext(PacienteContext);
  if (!context) throw new Error("usePaciente deve estar dentro do PacienteProvider");
  return context;
};
