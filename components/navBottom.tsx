import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type NavProps = {
    icons: Array<{ name: string; component: JSX.Element; route: string }>;
};

const NavBottom = (Props: NavProps) => {
    const router = useRouter();

    return (
        <View className="h-16 items-center w-full bg-primary p-4 flex-row justify-around rounded-2xl">
            {Props.icons.map((icon) => (
                <TouchableOpacity key={icon.name} onPress={() => router.push(icon.route)}>
                    {icon.component}
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default NavBottom;
