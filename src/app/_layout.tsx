import { Stack } from "expo-router";
import "../../global.css";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen
        name="event/[id]"
        options={{ headerShown: true, animation: "slide_from_right", title: "Event Detail" }}
      />
      <Stack.Screen
        name="task/[id]"
        options={{ headerShown: true, animation: "slide_from_right", title: "Task Detail",}}
      />
      <Stack.Screen
        name="chatbot/home"
        options={{
          headerShown: true,
          animation: "slide_from_right",
          title: "Chatbot",
        }}
      />
    </Stack>
  );
};

export default RootLayout;
