import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import ChampionItem from "@/components/ChampionItem";
import { Image } from 'react-native';
import { useAssets } from 'expo-asset';

const leaderboardData = [
  {
    id: 1,
    name: "Sarah Ballot",
    points: 395,
    avatar: './assets/dcash-coin.png',
  },
  {
    id: 2,
    name: "Jordan Voter",
    points: 355,
    avatar: "./assets/dcash-coin.png",
  },
  {
    id: 3,
    name: "Alex Register",
    points: 320,
    avatar: "./assets/dcash-coin.png",
  },
];

const Champions = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-6">
          {leaderboardData.map((user) => (
            <ChampionItem key={user.id} user={user} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Champions;
