import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../components/userContext";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase"; // sem auth
import { useState } from "react";

export default function Conta() {
    const { user } = useUser();
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleDeleteAccount = async () => {
        try {

            if (!user || !user.idUser) {
                alert("Usuário não encontrado. Não é possível excluir a conta.");
                return;
            }

            await deleteDoc(doc(db, "usuarios", user.idUser));
            setShowModal(false);
            alert("Conta excluída com sucesso.");
            router.replace("/login"); // redireciona para tela de login
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao excluir conta.");
        }
    };

    return (
        <View className="flex-1 bg-white items-center">
            <ScrollView>
                <View className="flex-1 flex-col items-center pt-16">
                    <Image
                        source={require("../assets/ManImage2.png")}
                        className="w-[270px] h-[265px] mb-5"
                    />
                    <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4">
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.emailUser}</Text>
                    </View>

                    <Text className="text-[#003EA6] text-lg mb-1">CPF</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4">
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.cpfUser}</Text>
                    </View>

                    <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
                    <View className="flex-row w-[350px] items-center justify-center border border-blue-500 rounded-2xl h-[60px] px-4 bg-white shadow mb-4">
                        <Text className="text-[#003EA6] text-lg mb-1">{user?.telefoneUser}</Text>
                    </View>

                    {/* Botão de deletar conta */}
                    <TouchableOpacity
                        onPress={() => setShowModal(true)}
                        className="bg-red-600 py-2 px-6 rounded-full mb-4"
                    >
                        <Text className="text-white text-base font-bold">Deletar Conta</Text>
                    </TouchableOpacity>

                    {/* Botão de voltar */}
                    <Link push href="/initial" asChild>
                        <TouchableOpacity className="bg-[#003EA6] py-2 px-6 rounded-full mt-2">
                            <Text className="text-white text-base font-bold">Voltar</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
                <StatusBar style="light" />
            </ScrollView>

            {/* Modal de confirmação */}
            <Modal
                visible={showModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowModal(false)}
            >
                <View className="flex-1 items-center justify-center bg-black bg-opacity-40">
                    <View className="bg-white p-6 rounded-2xl w-[80%] items-center shadow-lg">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">
                            Tem certeza que deseja excluir sua conta?
                        </Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                onPress={() => setShowModal(false)}
                                className="bg-gray-300 px-6 py-2 rounded-full"
                            >
                                <Text className="text-black font-bold">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleDeleteAccount}
                                className="bg-red-600 px-6 py-2 rounded-full"
                            >
                                <Text className="text-white font-bold">Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
