import { Linking, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../theme/colors";
import Text from "../components/text/Text";
import { Header } from "../components/Header";
import { spacing } from "../theme/spacing";
import {
  EarthSvg,
  JupiterSvg,
  MarsSvg,
  MercurySvg,
  NeptuneSvg,
  SaturnSvg,
  UranusSvg,
  VenusSvg,
} from "../svg";

const PlanetSection = ({ title, value }) => {
  return (
    <View style={styles.planetSection}>
      <Text preset="small" style={{ textTransform: "uppercase" }}>
        {title}
      </Text>
      <Text preset="h2">{value}</Text>
    </View>
  );
};

export const DetailsScreen = ({ route }) => {
  const {
    name,
    description,
    rotationTime,
    revolutionTime,
    radius,
    avgTemp,
    wikiLink,
  } = route.params?.planet || {};

  const renderImage = () => {
    switch (name?.toLowerCase()) {
      case "mercury":
        return <MercurySvg />;
      case "earth":
        return <EarthSvg />;
      case "jupiter":
        return <JupiterSvg />;
      case "mars":
        return <MarsSvg />;
      case "neptune":
        return <NeptuneSvg />;
      case "saturn":
        return <SaturnSvg />;
      case "uranus":
        return <UranusSvg />;
      case "venus":
        return <VenusSvg />;
    }
  };

  const onPressLink = () => {
    Linking.openURL(wikiLink);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header backBtn={true} title={name} />
      <ScrollView>
        <View style={styles.imageView}>{renderImage()}</View>
        <View style={styles.detailsView}>
          <Text preset="h1" style={styles.planetName}>
            {name}
          </Text>
          <Text style={styles.planetDescription}>{description}</Text>
          <Pressable onPress={onPressLink} style={styles.source}>
            <Text>Source: </Text>
            <Text preset="h4" style={styles.wikipedia}> 
              Wikipedia
            </Text>
          </Pressable>
        </View>

        <View style={{ marginTop: spacing[11] }}>
          <PlanetSection title="Rotation Time" value={rotationTime} />
          <PlanetSection title="Revolution Time" value={revolutionTime} />
          <PlanetSection title="Radius" value={radius} />
          <PlanetSection title="Average Temp." value={avgTemp} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageView: {
    marginTop: spacing[9],
    alignItems: "center",
    justifyContent: "center",
  },
  detailsView: {
    marginTop: spacing[11],
    marginHorizontal: spacing[7],
    alignItems: "center",
  },
  planetName: {
    textTransform: "uppercase",
  },
  planetDescription: {
    marginTop: spacing[6],
    textAlign: "center",
    lineHeight: 22,
  },
  source: {
    marginTop: spacing[6],
    flexDirection: "row",
    alignItems: "center",
  },
  wikipedia: {
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  planetSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[5],
    borderWidth: 1,
    borderColor: colors.grey,
    marginHorizontal: spacing[7],
    marginBottom: spacing[5],
  },
});
