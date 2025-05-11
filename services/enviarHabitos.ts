 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export const enviarHabitos = async (userId: string): Promise<void> => {
  
  const dataAtual = new Date();
  const mesAtual = dataAtual.toLocaleString("pt-BR", { month: "long" });
  const diaAtual = String(dataAtual.getDate()).padStart(2, "0");
  let infosAtualizada = {};

  const docRef = doc(db, "usuarios", userId);
  const dadosUsuario = await getDoc(docRef);
  console.log("Infos do usuario", dadosUsuario)


  if (dadosUsuario.exists()) {
    const infosUsuario = dadosUsuario.data();

    if (!infosUsuario[mesAtual]) {infosUsuario[mesAtual] = {};} // verificando o mês
    if (!infosUsuario[mesAtual][diaAtual]) {infosUsuario[mesAtual][diaAtual] = 0;}

    infosUsuario[mesAtual][diaAtual] += 1;
    infosAtualizada = infosUsuario;

  } else {
    infosAtualizada = { [mesAtual]: {[diaAtual]: 1},}; //prevenção caso n exista nada
  }

  await setDoc(docRef, infosAtualizada);
};
