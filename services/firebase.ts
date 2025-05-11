import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMgTaq9QJMPT5d2nBl5FJaSyKvcMrem4M",
  authDomain: "nib-teethdiary.firebaseapp.com",
  projectId: "nib-teethdiary",
  storageBucket: "nib-teethdiary.firebasestorage.app",
  messagingSenderId: "1097197017823",
  appId: "1:1097197017823:web:f80980a78b80ddc998e76a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type UserData = {
  email: string;
  senha: string;
  nome: string;
  telefone: string;
  plano?: string;
  idUser?: string;
};

export type UserType = {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  planoUser: string;
  emailUser: string;
  idUser: string;
};

export const registerUser = async (userData: UserData) => {
  const usuariosRef = collection(db, "usuarios");
  const existing = await getDocs(query(usuariosRef, where("email", "==", userData.email)));
  if (!existing.empty) {
    throw new Error("E-mail já cadastrado.");
  }
  const docRef = await addDoc(usuariosRef, userData);
  return { uid: docRef.id, ...userData };
};

export const loginUser = async (email: string, senha: string): Promise<UserType> => {
  const usuariosRef = collection(db, "usuarios");
  const snapshot = await getDocs(query(usuariosRef, where("email", "==", email)));

  if (snapshot.empty) {
    throw new Error("E-mail não encontrado.");
  }

  const userDoc = snapshot.docs[0];
  const userData = userDoc.data();

  if (userData.senha !== senha) {
    throw new Error("Senha incorreta.");
  }

  const UserData: UserType = {
    cpfUser: userData.cpf,
    nomeUser: userData.nome,
    sobrenomeUser: userData.sobrenome,
    telefoneUser: userData.telefone,
    dataNascimentoUser: userData.dataNascimento,
    planoUser: userData.plano,
    emailUser: userData.email,
    idUser: userDoc.id
  };

  return UserData;
};

export { UserData, db };
