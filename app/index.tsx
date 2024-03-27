import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Link href={"/(pokemon)/test"}>
        <Text>Details</Text>
      </Link>
      <Text>Page from index.tsx</Text>
    </View>
  );
};

export default Page;
