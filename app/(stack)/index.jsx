import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";
import { router } from "expo-router";
const index = () => {
  const [name, setName] = useState("");
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/background.jpeg")}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center">
          <Text className="text-3xl font-bold text-white">Quiz App</Text>
          <View className="border-2 border-white p-4 rounded-lg w-11/12 items-center mt-5 bg-white">
            <Text className="text-4xl font-bold text-black mb-2">Welcome</Text>
            <Text className="text-gray-400">Please enter your name</Text>
            <TextInput
              className="border-2 border-gray-300 p-2 rounded-lg w-full my-3"
              placeholder="Your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity className="border-2 w-full text-center p-2  border-blue-500 bg-blue-500">
              <Text
                className="text-white text-center"
                onPress={() => {
                  router.push({
                    pathname: "startingGame",
                    params: { name },
                  });
                }}
              >
                START
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default index;
