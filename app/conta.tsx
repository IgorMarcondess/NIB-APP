import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../components/userContext";
import { db } from "../services/firebase";

export default function Conta() {
    const { user, setUser } = useUser();
    const router = useRouter();
    const [fecharModal, setFecharModal] = useState(false);

    const [newEmail, setNewEmail] = useState<string>(user?.emailUser || "");
    const [newCpf, setNewCpf] = useState<string>(user?.cpfUser || "");
    const [newTelefone, setNewTelefone] = useState<string>(user?.telefoneUser || "");

    const [modalEmailVisivel, setModalEmailVisivel] = useState(false);
    const [modalCpfVisivel, setModalCpfVisivel] = useState(false);
    const [modalTelefoneVisivel, setModalTelefoneVisivel] = useState(false);

    const atualizarDados = async (field: string, value: string) => {
        if (!user || !user.idUser) {
            alert("Usuário não encontrado.");
            return;
        }

        try {
            const DadosUser = doc(db, "usuarios", user.idUser);
            await updateDoc(DadosUser, { [field]: value });
            Alert.alert("Informação atualizada!", `${field} atualizado com sucesso!`);

            const dados = await getDoc(DadosUser);
            if (!dados?.exists()) return;

            const infosUsuario = dados.data();
            const userData = {
                cpfUser: infosUsuario.cpf,
                nomeUser: infosUsuario.nome,
                sobrenomeUser: infosUsuario.sobrenome,
                telefoneUser: infosUsuario.telefone,
                dataNascimentoUser: "",
                planoUser: infosUsuario.plano,
                emailUser: infosUsuario.email,
                idUser: `${dados.id}`
            };

            setUser(userData);
        } catch (error) {
            console.error(`Erro ao atualizar ${field}:`, error);
            Alert.alert(`Erro ao atualizar ${field}.`);
        }
    };

    const deletarConta = async () => {
        if (!user?.idUser) {
            alert("Usuário não encontrado.");
            return;
        }
        try {
            await deleteDoc(doc(db, "usuarios", user.idUser));
            setFecharModal(false);
            alert("Conta excluída com sucesso.");
            router.replace("/initial");
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao excluir conta.");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
                <View className="items-center pt-2">
                    <Image source={require("../assets/ManImage2.png")} className="w-[200px] h-[200px] mb-5" />

                    <Text className="text-[#003EA6] text-lg mb-1">E-mail</Text>
                    <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                        <Text className="text-[#003EA6] text-lg">{user?.emailUser}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalEmailVisivel(true)} className="mb-4">
                        <Text className="text-[#003EA6] text-sm">Mudar E-mail</Text>
                    </TouchableOpacity>

                    <Text className="text-[#003EA6] text-lg mb-1">CPF</Text>
                    <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                        <Text className="text-[#003EA6] text-lg">{user?.cpfUser}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalCpfVisivel(true)} className="mb-4">
                        <Text className="text-[#003EA6] text-sm">Mudar CPF</Text>
                    </TouchableOpacity>

                    <Text className="text-[#003EA6] text-lg mb-1">Telefone</Text>
                    <View className="w-[350px] h-[60px] justify-center items-center border border-blue-500 rounded-2xl bg-white shadow mb-2">
                        <Text className="text-[#003EA6] text-lg">{user?.telefoneUser}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalTelefoneVisivel(true)} className="mb-4">
                        <Text className="text-[#003EA6] text-sm">Mudar Telefone</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFecharModal(true)} className="bg-red-600 py-2 px-6 rounded-full mb-4">
                        <Text className="text-white text-base font-bold">Deletar Conta</Text>
                    </TouchableOpacity>

                    <Link push href="/initial" asChild>
                        <TouchableOpacity className="bg-[#003EA6] py-6 px-16 rounded-full mt-2">
                            <Text className="text-white text-base font-bold">Voltar</Text>
                        </TouchableOpacity>
                    </Link>

                    <StatusBar style="light" />
                </View>
            </ScrollView>

            <Modal visible={modalEmailVisivel} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo E-mail</Text>
                        <TextInput
                            value={newEmail}
                            onChangeText={setNewEmail}
                            placeholder="Digite o novo e-mail"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity onPress={async () => { await atualizarDados("email", newEmail); setModalEmailVisivel(false); }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalEmailVisivel(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalCpfVisivel} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo CPF</Text>
                        <TextInput
                            value={newCpf}
                            onChangeText={setNewCpf}
                            placeholder="Digite o novo CPF"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity onPress={async () => { await atualizarDados("cpf", newCpf); setModalCpfVisivel(false); }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalCpfVisivel(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={modalTelefoneVisivel} transparent animationType="slide">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">Novo Telefone</Text>
                        <TextInput
                            value={newTelefone}
                            onChangeText={setNewTelefone}
                            placeholder="Digite o novo telefone"
                            className="w-full border border-blue-500 rounded-xl px-4 py-2 mb-4 text-[#003EA6]"
                        />
                        <TouchableOpacity onPress={async () => { await atualizarDados("telefone", newTelefone); setModalTelefoneVisivel(false); }}
                            className="bg-[#003EA6] px-6 py-2 rounded-full mb-2"
                        >
                            <Text className="text-white font-bold">Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalTelefoneVisivel(false)}>
                            <Text className="text-sm text-gray-600">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={fecharModal} transparent animationType="fade">
                <View className="flex-1 items-center justify-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl w-[85%] items-center">
                        <Text className="text-lg font-bold text-[#003EA6] mb-4">
                            Tem certeza que deseja excluir sua conta?
                        </Text>
                        <View className="flex-row space-x-4">
                            <TouchableOpacity onPress={() => setFecharModal(false)} className="bg-gray-300 px-6 py-2 rounded-full">
                                <Text className="text-black font-bold">Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deletarConta} className="bg-red-600 px-6 py-2 rounded-full">
                                <Text className="text-white font-bold">Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
