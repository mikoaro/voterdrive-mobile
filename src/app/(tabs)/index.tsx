import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import TaskCard from "@/backup/TaskCard";
import TaskCard2 from "@/backup/TaskCard2";
import { Link, router } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
// import { tasks } from "@/data-task";

import { TaskListItem } from "@/components/TaskListItem";


const PUBLIC_NODE_URL = process.env.EXPO_PUBLIC_NODE_URL;


const HomeScreen = () => {
  const [tasks, setTasks] = useState([])

  const getTasks = async () => {
    const nodeAPIUrl = `${PUBLIC_NODE_URL}/tasks`

    const response = await fetch(nodeAPIUrl);

    const data = await response.json();
    // console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    getTasks()
  }, []);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2 border-b border-gray-200">
        <TouchableOpacity>
          <Feather name="menu" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-[#1E293B]">
          VoterDrive Tasks
        </Text>
        <View className="flex-row space-x-4">
          <TouchableOpacity>
            <Feather name="bell" size={24} color="#1E293B" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="search" size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Main Content */}
        <View className="flex-1  h-[340px]">
          <LinearGradient
            // Background Linear Gradient
            // colors={["#00FF00", "#008000"]}
            colors={["#2980b9", "#3498db", "#8e44ad"]}
            className="flex-1"
          >
            {/* Tags */}
            <View className="flex-row justify-between px-4 pt-4">
              <View className="bg-white/90 rounded-full px-3 py-1.5 flex-row items-center">
                <Image
                  source={require("../../../assets/dcash-coin.png")}
                  className="w-5 h-5 rounded-full mr-2"
                />
                <Text className="text-[#1E293B] font-medium">Voting 101</Text>
              </View>
              <View className="bg-white/90 rounded-full px-3 py-1.5">
                <Text className="text-[#1E293B] font-medium">
                  elections /task
                </Text>
              </View>
            </View>

            {/* Illustration */}
            <View className="flex-1 justify-center items-center">
              <Image
                source={require("../../../assets/wellcome.png")}
                className="w-64 h-64"
                resizeMode="contain"
              />
            </View>

            {/* White area below main content */}
            <View className="h-16 bg-white" />

            {/* Ask VoteGPT Card */}
            {/* <Pressable onPress={onPress} className="flex-row items-center gap-5"> */}
            <View className="absolute bottom-1 left-10 right-10">
              <View className="bg-white rounded-3xl mx-4 px-8 py-2 shadow-lg">
                <Text className="text-2xl font-bold text-[#1E293B] text-center mb-2">
                  #Ask VoteGPT
                </Text>

                <TouchableOpacity className="bg-[#3498db] rounded-full py-2 px-9 self-center">
                  {/* onPress={() => navigation.navigate('/chatbot/home')} */}
                  <Link href="/chatbot/home">
                    <Text className="text-white text-lg font-semibold">
                      Ask
                    </Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </View>
            {/* </Pressable> */}
          </LinearGradient>
        </View>

        {/* Task Cards */}
        <View className="px-4 pt-4 pb-8">
          <FlatList
            data={tasks}
            className="bg-white"
            contentContainerClassName="gap-8 p-3"
            renderItem={({ item }) => <TaskListItem task={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
