import { Text, ScrollView, Image, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpValidation } from "../../constants/validations";
const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignUpValidation),
    defaultValues: {
      username:"",
      email: "",
      password: "",
      phoneNumber:""
    },
  });
  const onPressSend = (formData) => {
    // Perform actions with the validated form data
    console.log(formData);
    
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="w-full px-4 ">
        <View className="min-h-[85vh] justify-center">
          <Image
            source={images.blogLogo}
            className="h-[105px] w-[115px]"
            resizeMode="contain"
          />
          <Text className="text-xl text-white mt-10">Sign Up</Text>
          <FormField
            control={control}
            lable={"Username"}
            placeholder={"Name"}
            otherStyle="mt-5"
            name="username"
          />
          <View>
            {errors?.username && (
              <Text className="text-red-600 mt-1">{errors?.username?.message}</Text>
            )}
          </View>
          <FormField
            control={control}
            lable={"Email"}
            placeholder={"Abc@gmail.com"}
            otherStyle="mt-5"
            name="email"
          />
          <View>
            {errors?.email && (
              <Text className="text-red-600 mt-1">{errors?.email?.message}</Text>
            )}
          </View>
          <FormField
            control={control}
            lable={"Password"}
            name="password"
            placeholder={"Password"}
            otherStyle="mt-7"
          />
          <View>
            {errors?.password && (
              <Text className="text-red-600 mt-1">
                {errors?.password?.message}
              </Text>
            )}
          </View>
          <FormField
            control={control}
            lable={"Phone Number"}
            name="phoneNumber"
            placeholder={"1234567890"}
            otherStyle="mt-7"
          />
          <View>
            {errors?.phoneNumber && (
              <Text className="text-red-600 mt-1">
                {errors?.phoneNumber?.message}
              </Text>
            )}
          </View>
          <CustomButton
            handlePress={handleSubmit(onPressSend)}
            title={"Sign Up"}
            containerStyle={"mt-7"}
          />
          <View className="flex-row justify-center items-center gap-1 mt-7 text-xs">
            <Text className="text-white text-center">Already have account?</Text>
            <Link className=" text-secondary" href="/sign-in">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
