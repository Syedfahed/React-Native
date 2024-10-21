import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  isLoading,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? " opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
