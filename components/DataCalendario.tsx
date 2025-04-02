import { Text, TouchableOpacity, View } from "react-native"

type ConfigDatas = {
    data: number;
    mes: string;
}
export const DataCalendario = (Props: ConfigDatas) => {
    const {data = 10, mes = 'SET'} = Props
    return(
        <TouchableOpacity className="h-28 w-28 bg-white flex justify-center items-center rounded-2xl">
            <Text className="color-primary text-3xl font-bold">{data}</Text>
            <Text className="color-primary text-3xl font-bold">{mes}</Text>
        </TouchableOpacity>
    )
}
