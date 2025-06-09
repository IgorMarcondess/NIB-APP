// src/services/enviarHabitos.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

type Habitos = {
  escovacao: boolean;
  fioDental: boolean;
  bochecho: boolean;
};

export const enviarHabitos = async (userId: string, habitos: Habitos): Promise<void> => {
  const hoje = new Date();
  const mesAtual = hoje.toLocaleString("pt-BR", { month: "long" });
  const diaAtual = String(hoje.getDate()).padStart(2, "0");

  const docRef = doc(db, "usuarios", userId);
  const docSnap = await getDoc(docRef);

  let dadosAtualizados: any = {};

  if (docSnap.exists()) {
    dadosAtualizados = docSnap.data();

    if (!dadosAtualizados[mesAtual]) { dadosAtualizados[mesAtual] = {};}

    dadosAtualizados[mesAtual][diaAtual] = { escovacao: habitos.escovacao, fioDental: habitos.fioDental, bochecho: habitos.bochecho,};

  } else {
    dadosAtualizados = {
      [mesAtual]: {
        [diaAtual]: {
          escovacao: habitos.escovacao,
          fioDental: habitos.fioDental,
          bochecho: habitos.bochecho,
        },
      },
    };
  }

  await setDoc(docRef, dadosAtualizados);
};
