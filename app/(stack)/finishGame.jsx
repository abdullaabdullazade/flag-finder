import {
  View,
  Text,
  ImageBackground,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
const finishGame = () => {
  const { name, correct } = useLocalSearchParams();
  useState(()=>{
    console.log(name,correct)
  })
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require("../../assets/images/background.jpeg")}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1 items-center text-center">
          <Text className="text-center text-4xl font-bold text-white my-40 ">
            Your Score
          </Text>
          <Image
            source={require("../../assets/images/winner.png")}
            className="w-40 h-40 mb-20"
          />
          <Text className="text-center text-white text-3xl font-bold">
            Congratulations, {name}
          </Text>
          <Text className="text-white text-xl font-bold mb-5">
            Your score is {correct}/10
          </Text>
          <TouchableOpacity
            className="border-2 w-1/2 rounded-full mx-20 p-2  border-blue-500 bg-blue-500"
            onPress={() => {
              router.replace({
                pathname: "/",
              });
            }}
          >
            <Text className="text-white text-center">TRY AGAIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default finishGame;
