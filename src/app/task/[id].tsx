import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router, useLocalSearchParams } from "expo-router";
// import { tasks } from "@/backup/data-task";

// import PinataUploader from "../../components/PinataUploader";
// import { TaskProvider, useTask } from "@/context/TaskContext";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

// const PUBLIC_NODE_URL = process.env.EXPO_PUBLIC_NODE_URL;
const PINATA_JWT = process.env.EXPO_PUBLIC_PINATA_JWT;
const PINATA_GATEWAY = "https://api.pinata.cloud";
const PUBLIC_GATEWAY_URL = process.env.EXPO_PUBLIC_GATEWAY_URL;
const PUBLIC_NODE_URL = process.env.EXPO_PUBLIC_NODE_URL;

const TaskDetail = () => {
  const [task, setTask] = useState(null);

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  // const { task, setTask } = useTask();

  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("id is here");
  console.log(id);

  const getTask = async () => {
    const nodeAPIUrl = `${PUBLIC_NODE_URL}/tasks/${id}`;

    const response = await fetch(nodeAPIUrl);

    const data = await response.json();
    console.log("data in task IDDddddddda");
    console.log(data);
    setTask(data);
  };

  // getTask()
  useEffect(() => {
    getTask();
  }, [id]);

  // const task = tasks.find((t) => t.id === Number(id));

  if (!task) {
    return <Text>Task not found!</Text>;
  }

  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result.uri);
      console.log(result);
      if (result) setFile(result);
    } catch (err) {
      console.error("Error picking document:", err);
    }
  };

  const captureImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        // mediaTypes: ImagePicker.MediaTypeOptions.Images,
        mediaTypes: ["images"],
        allowsEditing: false,
        // aspect: [4, 3],
        aspect: [1, 1],
        quality: 1,
      });

      console.log("result");
      console.log(result);

      if (!result.canceled) {
        setFile(result);
      }
    } catch (err) {
      console.error("Error capturing image:", err);
    }
  };

  const uploadToServer = async (hash) => {
    // post to server
    const image = `${PUBLIC_GATEWAY_URL}/ipfs/${hash}`;
    const nodeAPIUrl = `${PUBLIC_NODE_URL}/task/edit/${task.id}`;

    const response = await fetch(nodeAPIUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: true,
        image: image,
      }),
    });

    const data = await response.json();
    console.log("data in PinataUploader");
    console.log(data);
    setTask(data);
    // setInputMessage("");
    // setOutputMessage(responseJson.response.trim());
  };

  const uploadToPinata = async () => {
    if (!file) {
      setUploadStatus("Please select or capture a file first");
      return;
    }

    setUploading(true);
    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("file", {
      uri: file.assets[0].uri,
      type: file.assets[0].mimeType || "application/octet-stream",
      name: file.assets[0].name || "captured_image.jpg",
    });

    try {
      const response = await axios.post(
        `${PINATA_GATEWAY}/pinning/pinFileToIPFS`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${PINATA_JWT}`,
          },
        }
      );

      setUploadStatus(
        `File uploaded successfully! CID: ${response.data.IpfsHash}`
      );

      uploadToServer(response.data.IpfsHash);
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
      setUploadStatus("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Image source={{ uri: task.image }} className="w-full h-64" />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-2">{task.title}</Text>
        <Text className="text-lg text-blue-600 mb-4">{task.category}</Text>
        <Text className="text-gray-700 mb-4">{task.description}</Text>
        <View className="bg-gray-100 p-4 rounded-lg">
          <Text className="font-bold mb-2">Task Details:</Text>
          <Text>Points: {task.points}</Text>
          <Text>Assignee: {task.assignee}</Text>
          <Text>Created: {new Date(task.createdAt).toLocaleDateString()}</Text>
          <Text>Due: {new Date(task.dueAt).toLocaleDateString()}</Text>
          <Text>Status: {task.completed ? "Completed" : "In Progress"}</Text>
        </View>
      </View>

      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Upload</Text>
        <Text className="text-gray-700 mb-4">
          This screen demonstrates file uploading to earn points and complete a
          task. You can select a file from your device or capture a new image
          using your camera.
        </Text>
      </View>

      {/* PinataUploader  */}

      <View className="flex-1 justify-center items-center p-4 bg-gray-100">
        <View className="flex-row justify-center space-x-4 mb-4">
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded-lg"
            onPress={pickDocument}
          >
            <Text className="text-white font-semibold">Select File</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 py-2 px-4 rounded-lg"
            onPress={captureImage}
          >
            <Text className="text-white font-semibold">Capture Image</Text>
          </TouchableOpacity>
        </View>

        {file && (
          <View className="mb-4 items-center">
            <Text className="text-gray-700 mb-2">
              Selected: {file.assets[0].name || "Captured Image"}
            </Text>
            {file.assets[0].type === "image" && (
              <Image
                source={{ uri: file.assets[0].uri }}
                className="w-32 h-32 rounded-lg"
              />
            )}
          </View>
        )}

        <TouchableOpacity
          className={`py-2 px-4 rounded-lg mb-4 ${
            file ? "bg-purple-500" : "bg-gray-400"
          }`}
          onPress={uploadToPinata}
          disabled={!file || uploading}
        >
          <Text className="text-white font-semibold">Upload</Text>
        </TouchableOpacity>

        {uploading && <ActivityIndicator size="large" color="#0000ff" />}

        {uploadStatus !== "" && (
          <Text className="text-center text-gray-700">{uploadStatus}</Text>
        )}
      </View>

      {/* <PinataUploader task={task} /> */}
    </ScrollView>
  );
};

export default TaskDetail;
