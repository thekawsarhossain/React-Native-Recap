import React, { useState } from "react";
import Text from "../components/text/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { colors } from "../theme/colors";
import { FlatList, Pressable, StyleSheet, TextInput, View } from "react-native";
import { PLANET_LIST } from "../data/planet-list";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
  const [planets, setPlanets] = useState(PLANET_LIST ?? []);

  const renderItem = ({ item }) => {
    const { name, color } = item || {};
    return (
      <Pressable
        onPress={() => {
          navigation.navigate("Details", { planet: item });
        }}
        style={styles.item}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={[styles.circle, { backgroundColor: color }]} />
          <Text preset="h4" style={styles.itemName}>
            {name}
          </Text>
        </View>
        <AntDesign name="right" size={18} color="white" />
      </Pressable>
    );
  };

  const filterPlanets = (text) => {
    const filteredList = PLANET_LIST.filter((planet) =>
      planet.name.toLowerCase().includes(text.toLowerCase())
    );
    setPlanets(filteredList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <TextInput
        placeholder="Type the planet name"
        placeholderTextColor={colors.white}
        style={styles.searchInput}
        autoCorrect={false}
        onChangeText={(text) => filterPlanets(text)}
      />

      <FlatList
        data={planets}
        contentContainerStyle={styles.list}
        keyExtractor={(item, _index) => item.name}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  list: {
    padding: spacing[4],
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing[5],
  },
  itemName: {
    textTransform: "uppercase",
    marginLeft: spacing[4],
  },
  separator: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.white,
  },
  searchInput: {
    padding: spacing[4],
    color: colors.white,
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    margin: spacing[6],
  },
});
