import { FlatList, SafeAreaView } from "react-native";
import { meditations } from "@/data";
import { MediationListItem } from "@/backup/MeditationListItem";
import NavigationBar from "./NavigationBar";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <NavigationBar title="Home" backButton={false} />
      <FlatList
        data={meditations}
        className="bg-white"
        contentContainerClassName="gap-8 p-3"
        renderItem={({ item }) => <MediationListItem meditation={item} />}
      />
    </SafeAreaView>
  );
}
