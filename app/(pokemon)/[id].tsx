import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Pokemon, getPokemonDetails } from "@/api/pokeapi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon>();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const data = await getPokemonDetails(id!);
      setDetails(data);
   
      const isFavorite = await AsyncStorage.getItem(`favorite-${id}`);
      setIsFavorite(isFavorite == "true");
    };

    load();
  }, [id]);

  // for title
  useEffect(() => {
    if (details) {
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      });
    }
  }, [details]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Text onPress={toggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color="#fff"
          />
        </Text>
      ),
    });
  }, [isFavorite]);

  const toggleFavorite = async () => {
    await AsyncStorage.setItem(
      `favorite-${id}`,
      !isFavorite ? "true" : "false"
    );
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={[styles.card, { alignItems: "center" }]}>
            <Image
              source={{ uri: details?.sprites?.front_default }}
              style={styles.preview}
            />
            <Text style={styles.name}>
              #{details?.id} {details?.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              Stats:
            </Text>
            {details.stats.map((item: any, index: number) => (
              <Text key={index}>
                {item.stat.name}: {item.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  preview: {
    width: 200,
    height: 200,
  },
  name: {
    textTransform: "capitalize",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Page;
