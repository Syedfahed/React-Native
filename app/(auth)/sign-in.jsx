import { Text, ScrollView, Image, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "../../constants/validations";
import { postMethod } from "../../constants/httpServer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

const SignIn = () => {
  const [loading,setLoading] = useState(false)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onPressSend = async (formData) => {
    setLoading(true)
    // Perform actions with the validated form data
    const request = {
      endpoint: "/login",
      payload: formData,
    };
    console.log(request);

    try {
      const data = await postMethod(request);
      const authToken = data.data.token;
      AsyncStorage.setItem("token", authToken);
      const decodeToken = jwtDecode(authToken);
      AsyncStorage.setItem("userData", JSON.stringify(decodeToken));
      router.push("/home");
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
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
          <Text className="text-xl text-white mt-10">Log in</Text>
          <FormField
            control={control}
            lable={"Email"}
            placeholder={"Abc@gmail.com"}
            otherStyle="mt-5"
            name="email"
          />
          <View>
            {errors?.email && (
              <Text className="text-red-600 mt-1">
                {errors?.email?.message}
              </Text>
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

          <CustomButton
            handlePress={handleSubmit(onPressSend)}
            title={"Sign In"}
            containerStyle={"mt-7"}
            isLoading={loading}
          />
          <View className="flex-row justify-center items-center gap-1 mt-7 text-xs">
            <Text className="text-white text-center">Don't have account?</Text>
            <Link className=" text-secondary" href="/sign-up">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
