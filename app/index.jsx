import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../components/Loader";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          router.push("/home");
        } else {
          setLoading(false);
        }
      } catch (e) {
        console.error("Error retrieving token", e);
        setLoading(false); // Stop loading after checking token
      } finally {
        console.log("Go..");
      }
    };

    checkToken();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        {loading ? (
          <Loader />
        ) : (
          <View className="w-full px-4 items-center justify-center h-[85vh]">
            <Image
              source={images.blogLogo}
              className="w-[130px] h-[84px]"
              resizeMode="contain"
            />
            <Image
              source={images.blogPost}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            <View className=" relative mt-5">
              <Text className="text-2xl text-white font-bold text-center">
                Discover a World of Creative Possibilities
                <Text className="text-secondary pl-5"> Syed</Text>
              </Text>
              <Text className="mt-4 text-sm text-gray-100 text-center">
                Are you ready to break free from the ordinary and embark on a
                journey of limitless exploration? Join us as we delve into the
                exciting world of creativity and innovation, and discover how
                you can bring your ideas to life.
              </Text>
            </View>
            <CustomButton
              title={"Continue with Email"}
              handlePress={() => {
                router.push("/sign-in");
              }}
              containerStyle={"w-full mt-4"}
            />
          </View>
        )}
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
