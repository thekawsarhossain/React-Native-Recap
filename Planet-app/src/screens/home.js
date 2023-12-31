import React from "react";
import Text from "../components/text/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/Header";
import { colors } from "../theme/colors";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { PLANET_LIST } from "../data/planet-list";
import { spacing } from "../theme/spacing";
import { AntDesign } from "@expo/vector-icons";

export const HomeScreen = ({ navigation }) => {
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

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FlatList
        data={PLANET_LIST}
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
});
