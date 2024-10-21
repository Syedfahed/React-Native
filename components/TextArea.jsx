import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

const TextArea = ({
  lable,
  placeholder,
  otherStyle,
  name,
  control
}) => {
  return (
    <View className={`${otherStyle}`}>
      <Text className="text-white font-normal">{lable}</Text>
      <View className={`bg-gray-100 mt-1 rounded-md h-[150px] px-2 w-full focus:border-secondary border-2 flex-row items-center`}>
        <Controller
        control={control}
          name={name}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              className="font-normal text-base flex-1"
               textAlignVertical="top"
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#7b7b8b"
              onChangeText={onChange}
              multiline={true}
              numberOfLines={5}
            />
          )}
        />
      </View>
    </View>
  );
};

export default TextArea;
