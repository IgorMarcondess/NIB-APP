import { Slot } from "expo-router"
import "../global.css"
import Tela from './(medico)/tela_principal'
import { UserProvider } from "../components/userContext";
import { PacienteProvider } from "../components/pacientesContext";
 
const RootLayout = () => {
  return (
    <UserProvider>
      <PacienteProvider>
        <Slot/>
      </PacienteProvider>
    </UserProvider>
  )
}

export default RootLayout