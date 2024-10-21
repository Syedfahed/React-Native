import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const [profile, getProfile] = useState();
  const getProfileData = async () => {
    const getData = await AsyncStorage.getItem("userData");
    const userData = JSON.parse(getData);
    getProfile(userData);
    // console.log(userData);
  };
  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="w-full px-4 ">
        <Text className="text-white my-5 text-xl font-semibold">Profile</Text>
        <View>
          <Text className="text-lg text-white mt-4">Name</Text>
          <Text className="text-lg text-white">{profile?.userEmail}</Text>
          <Text className="text-lg text-white mt-4">Email</Text>
          <Text className="text-lg text-white ">{profile?.userName}</Text>
        </View>

        <CustomButton
          title={"Log out"}
          containerStyle={"mt-20"}
          handlePress={() => {
            AsyncStorage.removeItem("token");
            router.push("/sign-in");
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
