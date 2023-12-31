import { Pressable, StyleSheet, View } from "react-native";
import Text from "./text/Text";
import { spacing } from "../theme/spacing";
import { colors } from "../theme/colors";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Header = ({ backBtn, title = "THE PLANETS" }) => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      {backBtn && (
        <Pressable
          style={{ marginRight: spacing[3] }}
          onPress={() => {
            navigate.goBack();
          }}
        >
          <AntDesign name="left" size={24} color="white" />
        </Pressable>
      )}
      <Text preset="h2">{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing[4],
    borderBottomWidth: 0.2,
    borderBottomColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
});
