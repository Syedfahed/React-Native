import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../components/Card";
import { getMethod } from "../../constants/httpServer";
import Loader from "../../components/Loader";

const Home = () => {
  const [getBlog, setBlogs] = useState([]);
  const [loding, setLoading] = useState(true);
  const getBlogDeatilas = async () => {
    try {
      const request = {
        endpoint: "/blogs",
      };
      const { data } = await getMethod(request);
      //  console.log(data.data);
      setBlogs(data.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogDeatilas();
  }, []);
  // console.log("map", getBlog);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="w-full px-4 ">
        {loding ? (
         <View className='h-full justify-center items-center'>
           <Loader />
         </View>
        ) : (
          <View>
            <Text className="text-xl text-white font-semibold my-5">All Blogs</Text>
            {getBlog?.length > 0 &&
              getBlog.map((e) => {
                return (
                  <Card
                    title={e.title}
                    containerStyle={"mt-5"}
                    userName={e.postBy}
                    description={e.description}
                  />
                );
              })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
