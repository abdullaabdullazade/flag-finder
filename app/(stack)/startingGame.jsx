import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { router } from "expo-router";
const questions = require("../quiz.json");

const startingGame = () => {
  const { name } = useLocalSearchParams();
  const [questionIndex, setQuestionIndex] = useState(
    Math.floor(Math.random() * questions.length)
  );
  const [correct, setCorrect] = useState(0);
  const [questionCount, setQuestionCount] = useState(1);
  const progress = questionCount / 10;
  const [select, setSelect] = useState("");
  const [isTrue, setIsTrue] = useState([
    false,
    questions[questionIndex].answer,
  ]);
  const [click, setClick] = useState(false);
  useEffect(() => {
    setIsTrue([false, questions[questionIndex].answer]);
    setClick(false);
    setSelect("");
  }, [questionIndex]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-16">
        <View className="px-20">
          <Text className="text-3xl text-center">
            What country does this flag belong to?
          </Text>
          <Image
            src={questions[questionIndex].flagLink}
            resizeMode="contain"
            className="w-80 h-60 mt-5"
          />
        </View>
        <View className="flex-row justify-between self-center items-center my-10">
          <Progress.Bar
            progress={progress}
            width={350}
            height={5}
            color="blue"
            unfilledColor="#EDE7F6"
            borderWidth={0}
          />
          <Text className="ml-4">{questionCount}/10</Text>
        </View>
        <FlatList
          data={questions[questionIndex].options}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`border-2 ${
                select === item ? "border-purple-500" : "border-gray-200"
              } p-2 rounded-lg w-11/12 my-2 mx-4 h-14 justify-center ${
                click
                  ? item === questions[questionIndex].answer
                    ? "bg-green-600"
                    : select === item
                    ? "bg-red-500"
                    : ""
                  : ""
              }`}
              onPress={() => {
                setSelect(item);
              }}
              disabled={click}
            >
              <Text
                className={`text-center text-xl ${
                  select === item ? "text-black font-bold" : "text-gray-400"
                } ${
                  click
                    ? item === questions[questionIndex].answer
                      ? "text-gray-400"
                      : select === item
                      ? "text-white"
                      : ""
                    : ""
                }`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
        <TouchableOpacity
          className="border-2 border-blue-500 rounded-xl w-11/12 bg-blue-500 justify-center items-center self-center my-2 mx-4 h-14"
          activeOpacity={0.8}
          onPress={() => {
            if (click) {
              setQuestionIndex((i) => (i + 1) % questions.length);
              setQuestionCount((i) => i + 1);
              setClick(false);
              if (questionCount == 10) {
                router.replace({
                  pathname: "finishGame",
                  params: { name: name, correct: correct },
                });
              }
            } else {
              setClick(true);
              if (select === questions[questionIndex].answer) {
                setIsTrue([true, questions[questionIndex].answer]);
                setCorrect((i) => i + 1);
              }
            }
          }}
        >
          <Text className="text-xl text-white font-bold">
            {!click ? "Submit" : "Go to next question"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default startingGame;
