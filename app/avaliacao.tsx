import { router } from "expo-router";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { db } from "../services/firebase";
import { useUser } from "../components/userContext";

export default function Avaliacao() {
    const { user } = useUser(); // 👈 Pegando o usuário logado
    const [escovacao, setEscovacao] = useState(false);
    const [fioDental, setFioDental] = useState(false);
    const [bochecho, setBochecho] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const salvarHabitos = async () => {
        if (!user?.idUser) {
            alert("Usuário não encontrado.");
            return;
        }

        const dataHoje = new Date().toISOString().split("T")[0]; // Ex: "2025-05-07"
        const userDocRef = doc(db, "habitos", user.idUser);

        try {
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                // Atualiza documento existente
                await updateDoc(userDocRef, {
                    [dataHoje]: {
                        escovacao,
                        fioDental,
                        bochecho,
                    },
                });
            } else {
                // Cria novo documento
                await setDoc(userDocRef, {
                    [dataHoje]: {
                        escovacao,
                        fioDental,
                        bochecho,
                    },
                });
            }

            setPopupVisible(true);
        } catch (error) {
            console.error("Erro ao salvar hábitos:", error);
            alert("Erro ao salvar hábitos.");
        }
    };

    useEffect(() => {
        if (popupVisible) {
            const timeout = setTimeout(() => {
                setPopupVisible(false);
                router.navigate("./initial");
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [popupVisible]);

    return (
        // ... tudo igual até o botão "ENVIAR"
        <TouchableOpacity className="bg-blue-500 rounded-full py-3 w-80 mt-4" onPress={salvarHabitos}>
            <Text className="text-white font-bold text-center">ENVIAR</Text>
        </TouchableOpacity>
        // ... restante igual
    );
}
