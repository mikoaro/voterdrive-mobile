import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { GiftedChat } from "react-native-gifted-chat";

import * as Speech from "expo-speech";

const apiUrl = process.env.EXPO_PUBLIC_OPENAI_URL;
const apiDalleUrl = process.env.EXPO_PUBLIC_DALLE_URL;
const apiKey = process.env.EXPO_PUBLIC_OPENAI_KEY;
const apiStFastAPIUrl = process.env.EXPO_PUBLIC_ST_FASTAPI_URL;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [outputMessage, setOutputMessage] = useState(
    "Results to be shown here"
  );

  const handleButtonClick = async () => {
    console.log(inputMessage);

    if (inputMessage.trim().toLowerCase().startsWith("generate image")) {
      generateImages();
    } else {
      generateText();
    }
  };

  const generateText = async () => {
    console.log(inputMessage);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );

    try {
      const response = await fetch(apiStFastAPIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputMessage,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson.response);
      setInputMessage("");
      setOutputMessage(responseJson.response.trim());

      const message = {
        _id: Math.random().toString(36).substring(7),
        text: responseJson.response.trim(),
        createdAt: new Date(),
        user: { _id: 2, name: "VoteGPT" },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [message])
      );

      // let options = {};
      // Speech.speak(responseJson.response, options);
    } catch (error) {
      console.error(error);
    }
  };

  const generateImages = async () => {
    console.log(inputMessage);
    const message = {
      _id: Math.random().toString(36).substring(7),
      text: inputMessage,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [message])
    );

    try {
      const response = await fetch(apiDalleUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "dall-e-2",
          prompt: inputMessage,
          n: 2,
          size: "1024x1024",
        }),
      });

      const responseJson = await response.json();
      // console.log(responseJson.data[0].url);
      console.log(responseJson);
      setInputMessage("");
      setOutputMessage(responseJson.data[0].url);

      responseJson.data.forEach((item) => {
        console.log("item:", item);
        const message = {
          _id: Math.random().toString(36).substring(7),
          text: "Image",
          createdAt: new Date(),
          user: { _id: 2, name: "VoteGPT" },
          image: item.url,
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [message])
        );
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleTextInput = (text: string) => {
    setInputMessage(text);
    console.log(text);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={require("../../../assets/bg.jpg")}
        resizeMode="cover"
        className="flex-1 w-screen h-screen"
      >
        <View className="flex-1 justify-center">
          {/* <Text>{outputMessage}</Text> */}
          <GiftedChat
            messages={messages}
            renderInputToolbar={() => {}}
            user={{ _id: 1 }}
            minInputToolbarHeight={0}
          />
        </View>

        <View className="flex-row">
          <View className="flex-1 mx-3 mb-5 bg-white rounded-2xl border-2 border-gray-100 h-30 justify-center px-3">
            <TextInput
              placeholder="Enter your question"
              onChangeText={handleTextInput}
              value={inputMessage}
            />
          </View>

          <TouchableOpacity onPress={handleButtonClick}>
            <View className="bg-blue-400 p-5 mr-2 mb-5 rounded-full size-30 justify-center">
              {/* <Text>Send</Text> */}
              <MaterialIcons name="send" size={30} color="white" ml-10 />
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Chatbot;
