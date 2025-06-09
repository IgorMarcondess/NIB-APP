import axios from "axios";

export interface UsuarioData {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  planoUser: string;
  emailUser: string;
}

export default async function postUsuario(data: UsuarioData): Promise<void> {
  try {
    console.log(data)
    const response = await axios.post("http://192.168.15.10:8080/usuario/criar", data);
    console.log("Usuário criado com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    throw error;
  }
}
