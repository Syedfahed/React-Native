import { View, Text, Image } from "react-native";
import React from "react";
import icons from "../constants/icons";

const Card = ({ title, userName, description, containerStyle }) => {
  return (
    <View className={`rounded-md p-4 bg-white text-primary ${containerStyle}`}>
      <Text className="text-lg font-medium">{title}</Text>
      <View className="flex-row items-center gap-2">
        <Image source={icons.profile} className="h-4 w-4" />
        <Text className="text-secondary text-lg">{userName}</Text>
      </View>
      <Text>{description}</Text>
    </View>
  );
};

export default Card;
