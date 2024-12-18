import React from "react";
import { View, Text } from "react-native";

import { FlatList, SafeAreaView } from "react-native";
import { events } from "@/data-event";
import { EventListItem } from "@/components/EventListItem";
import NavigationBar from "@/components/NavigationBar";

const Events = () => {
  return (
    <SafeAreaView>
      {/* <NavigationBar title="Events" backButton={true} /> */}
      <FlatList
        data={events}
        className="bg-white"
        contentContainerClassName="gap-8 p-3"
        renderItem={({ item }) => <EventListItem event={item} />}
      />
    </SafeAreaView>
  );
};

export default Events;
