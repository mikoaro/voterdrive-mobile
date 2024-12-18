import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const NavigationBar = ({
  title,
  backButton,
}: {
  title: string;
  backButton: boolean;
}) => {
  const navigation = useNavigation();

  return (
    <View className="bg-blue-500 p-4 flex-row items-center justify-between">
      {backButton && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-white">Back</Text>
        </TouchableOpacity>
      )}
      <Text className="text-white text-lg font-bold">{title}</Text>
      <View /> {/* Placeholder for right-side elements */}
    </View>
  );
};

export default NavigationBar;
