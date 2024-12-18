import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { events } from "@/data-event";

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return <Text>Event not found!</Text>;
  }

  return (
   
      <ScrollView className="flex-1 bg-white">
        {/* <Image source={{ uri: event.imageUrl }} className="w-full h-64" /> */}
        <View className="p-4">
          <Text className="text-2xl font-bold mb-2">{event.title}</Text>
          <Text className="text-lg text-blue-600 mb-4">{event.category}</Text>
          <Text className="text-gray-700 mb-4">{event.description}</Text>
          <View className="bg-gray-100 p-4 rounded-lg">
            <Text className="font-bold mb-2">Task Details:</Text>
            <Text>Date: {event.Date}</Text>
            <Text>Specific Audiences: {event.specificAudiences}</Text>
            <Text>Start: {new Date(event.startTime).toLocaleDateString()}</Text>
            <Text>Ends: {new Date(event.endTime).toLocaleDateString()}</Text>
            <Text>Ticket Fee: {event.ticketfee}</Text>
            <Text>Location: {event.location}</Text>
            <Text>Sponsored By: {event.sponsoredBy}</Text>
          </View>
        </View>
      </ScrollView>
  );
}
