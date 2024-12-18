import React from "react";
import { View, Text, Image } from "react-native";

const ChampionItem = ({ user }) => {
  return (
    <View className="flex-row items-center justify-between py-4">
      <View className="flex-row items-center">
        <Image
          source={{ uri: user.avatar }} 
          className="w-14 h-14 rounded-full"
        />
        <Text className="text-xl ml-4 text-gray-800">{user.name}</Text>
      </View>
      <Text className="text-xl text-gray-600">{user.points} pts</Text>
    </View>
  );
};

export default ChampionItem;


