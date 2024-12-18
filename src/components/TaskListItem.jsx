import { View, Text, Pressable, Image } from "react-native";
import { Meditation } from "@/types";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function TaskListItem({ task }) {
  const onPress = async () => {
    router.push(`/task/${task.id}`);
  };

  let backgroundColor = "";
  if(task.category === "Voter Education") {
    backgroundColor = "bg-blue-500";
  } else if (task.category === "Voter Pride"){
    backgroundColor = "bg-orange-500";
  } else {
    backgroundColor = "bg-lime-500";
  }
  
  const height = 130;
  const backgroundImage = undefined;
  const showTrophy = true;
  const co2e = undefined;

  return (
    
      <Pressable onPress={onPress} className="flex-row items-center gap-5">
        <View
          className={`w-full rounded-2xl mb-4 overflow-hidden ${backgroundColor}`}
          style={{ height }}
        >
          {backgroundImage && (
            <Image
              source={backgroundImage}
              className="absolute w-full h-full"
              resizeMode="cover"
            />
          )}
          <View className="p-4 flex-1 justify-between">
            <View className="flex-row justify-between space-x-2">
              <View className="bg-white/30 rounded-full px-3 py-1.5 flex-row items-center">
                <Image
                  source={require("../../assets/dcash-coin.png")}
                  className="w-5 h-5 rounded-full mr-2"
                />
                <Text className="text-[#1E293B] font-medium">Voting 101</Text>
              </View>
              {showTrophy && (
                <MaterialCommunityIcons
                  name="trophy-outline"
                  size={24}
                  color="#1E293B"
                />
              )}
            </View>

            <View className="flex-row justify-between items-end">
              <Text className="text-white text-xl font-bold">
                {task.title}
              </Text>
              {co2e && (
                <View className="bg-white/30 rounded-full px-3 py-1.5">
                  <Text className="text-[#1E293B] font-medium">
                    {co2e} gram(s) CO2e/task
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* <View className="bg-green-700 p-2 rounded-full">
        <FontAwesome name="check" size={16} color="white" />
      </View>

      <View className="flex-1 p-5 py-8 border-2 border-gray-300 rounded-2xl">
        <Text className="font-semibold text-2xl mb-2">{task.title}</Text>

        <View className="flex-row items-center gap-1">
          <FontAwesome6 name="clock" size={16} color="#6B7280" />
          <Text className="text-gray-600">{task.description}</Text>
        </View>
      </View> */}
      </Pressable>
  );
}
