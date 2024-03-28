import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Pokemon, getPokemon } from "@/api/pokeapi";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);
    };
    load();
  }, []);

  return (
    <GestureHandlerRootView>
      <ScrollView>
        {pokemon.map((p) => (
          <Link href={`/(pokemon)/${p.id}`} key={p.id} asChild>
            <TouchableOpacity>
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: p.image }}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={{ fontSize: 18, textTransform: 'capitalize', flex: 1 }}>{p.name}</Text>
                <FontAwesome5 name="chevron-right" size={16} color="black" />
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Page;
