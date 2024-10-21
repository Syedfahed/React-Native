import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import {
  CreateBlogValidation,
  SignUpValidation,
} from "../../constants/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "../../components/TextArea";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postMethod } from "../../constants/httpServer";

const Create = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateBlogValidation),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const onPressSend = async (formData) => {
    // Perform actions with the validated form data
    const getData = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(getData);
    const todayDate = new Date()
    const payload = {
      ...formData,
      userEmail: userData.userEmail,
      postBy: userData.userName,
      postDate:todayDate
    };
    console.log(payload);

    try {
      const request = {
        endpoint: "/create-blog",
        payload: payload,
      };
      const data = await postMethod(request)
      reset()
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="w-full px-4 ">
        <Text className="text-xl font-semibold text-white my-5">
          Create Blog
        </Text>
        <View>
          <FormField
            control={control}
            lable={"Title"}
            placeholder={"Title"}
            otherStyle="mt-5"
            name="title"
          />
          <View>
            {errors?.title && (
              <Text className="text-red-600 mt-1">
                {errors?.title?.message}
              </Text>
            )}
          </View>
          <TextArea
            control={control}
            lable={"Description"}
            placeholder={"Description"}
            otherStyle="mt-5"
            name="description"
          />
          <View>
            {errors?.description && (
              <Text className="text-red-600 mt-1">
                {errors?.description?.message}
              </Text>
            )}
          </View>
          <CustomButton
            title={"Create"}
            containerStyle={"mt-7"}
            handlePress={handleSubmit(onPressSend)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
