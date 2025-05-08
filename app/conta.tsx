import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Modal, Text, TouchableOpacity, View, TextInput } from "react-native";
import { useUser } from "../components/userContext";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Conta() {
    const { user } = useUser();
    const router = useRouter();
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newEmail, setNewEmail] = useState<string>(user?.emailUser || "");
    const [newCpf, setNewCpf] = useState<string>(user?.cpfUser || "");
    const [newTelefone, setNewTelefone] = useState<string>(user?.telefoneUser || "");

    const [modalEmailVisible, setModalEmailVisible] = useState(false);
    const [modalCpfVisible, setModalCpfVisible] = useState(false);
    const [modalTelefoneVisible, setModalTelefoneVisible] = useState(false);

    const updateUserField = async (field: string, value: string) => {
        if (!user || !user.idUser) {
            alert("Usuário não encontrado.");
            return;
        }

        try {
            const userRef = doc(db, "usuarios", user.idUser);
            await updateDoc(userRef, { [field]: value });
            alert(`${field} atualizado com sucesso!`);
        } catch (error) {
            console.error(`Erro ao atualizar ${field}:`, error);
            alert(`Erro ao atualizar ${field}.`);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?.idUser) {
            alert("Usuário não encontrado.");
            return;
        }
        try {
            await deleteDoc(doc(db, "usuarios", user.idUser));
            setShowDeleteModal(false);
            alert("Conta excluída com sucesso.");
            router.replace("/login");
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao excluir conta.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white items-center">
            <View className="flex-1 items-center pt-2">
                <Image source={require("../assets/ManImage2.png")} className="w-[270px] h-[265px] mb-5" />

                {/* Email */}
                <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
                <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                    <Text className="text-[#003EA6] text-lg">{user?.emailUser}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalEmailVisible(true)} className="mb-4">
                    <Text className="text-[#003EA6] text-sm">Mudar E-mail</Text>
                </TouchableOpacity>

                {/* CPF */}
                <Text className="text-[#003EA6] text-lg mb-1">CPF</Text>
                <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                    <Text className="text-[#003EA6] text-lg">{user?.cpfUser}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalCpfVisible(true)} className="mb-4">
                    <Text className="text-[#003EA6] text-sm">Mudar CPF</Text>
                </TouchableOpacity>

                {/* Telefone */}
                <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
                <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                    <Text className="text-[#003EA6] text-lg">{user?.telefoneUser}</Text>
                </View>
                <TouchableOpacity onPress={() => setModalTelefoneVisible(true)} className="mb-4">
                    <Text className="text-[#003EA6] text-sm">Mudar Telefone</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowDeleteModal(true)} className="bg-red-600 py-2 px-6 rounded-full mb-4">
                    <Text className="text-white text-base font-bold">Deletar Conta</Text>
                </TouchableOpacity>

                <Link push href="/initial" asChild>
                    <TouchableOpacity className="bg-[#003EA6] py-6 px-16 rounded-full mt-2">
                        <Text className="text-white text-base font-bold">Voltar</Text>
                    </TouchableOpacity>
                </Link>

                <StatusBar style="light" />
            </View>

            {/* Modal de Edição - Email */}
            <Modal visible={modalEmailVisible} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo E-mail</Text>
                        <TextInput
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder="Digite o novo e-mail"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                await updateUserField("email", newEmail);
                                setModalEmailVisible(false);
                            }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalEmailVisible(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Edição - CPF */}
            <Modal visible={modalCpfVisible} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo CPF</Text>
                        <TextInput
                            value={newCpf}
                            onChangeText={setNewCpf}
                            placeholder="Digite o novo CPF"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                await updateUserField("cpf", newCpf);
                                setModalCpfVisible(false);
                            }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalCpfVisible(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Edição - Telefone */}
            <Modal visible={modalTelefoneVisible} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo Telefone</Text>
                        <TextInput
                            value={newTelefone}
                            onChangeText={setNewTelefone}
                            placeholder="Digite o novo telefone"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity
                            onPress={async () => {
                                await updateUserField("telefone", newTelefone);
                                setModalTelefoneVisible(false);
                            }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalTelefoneVisible(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            
            <Modal visible={showDeleteModal} transparent={true} animationType="fade">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">
                            Tem certeza que deseja excluir sua conta?
                        </Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                onPress={() => setShowDeleteModal(false)}
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
        </SafeAreaView>
    );
}
