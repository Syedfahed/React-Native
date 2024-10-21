import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { Controller } from "react-hook-form";

const FormField = ({
  lable,
  placeholder,
  value,
  handleChangeText,
  otherStyle,
  name,
  control
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`${otherStyle}`}>
      <Text className="text-white font-normal">{lable}</Text>
      <View className={`bg-gray-100 mt-1 rounded-md h-14 px-2 w-full focus:border-secondary border-2 flex-row items-center`}>
        <Controller
        control={control}
          name={name}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="font-normal text-base flex-1"
              value={value}
              keyboardType ={lable==='Phone Number' ? 'numeric' :'default'}
              placeholder={placeholder}
              placeholderTextColor="#7b7b8b"
              onChangeText={onChange}
              secureTextEntry={lable === "Password" && !showPassword}
            />
          )}
        />

        {lable === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              resizeMode="contain"
              className="h-6 w-6"
              source={!showPassword ? icons.eyeHide : icons.eye}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
