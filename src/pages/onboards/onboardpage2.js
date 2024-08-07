import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import onboardImage2 from "../../../assets/onboard1.png";

import colors from "../../constants/colors";
import typography from "../../constants/typo";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { useNavigation } from "@react-navigation/native";

export default function Onboard2({ navigation }) {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" />
      {/* <View
        style={{ width: "100%", height: 40, backgroundColor: colors.medium }}
      ></View> */}
      <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
        <View style={styles.vectors}>
          <Image
            source={onboardImage2}
            style={{ width: 300, height: 300, justifyContent: "center" }}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.title}>Trouvez votre nouvel appartement</Text>
          <Text
            style={{
              paddingTop: 20,
              fontSize: typography.text.fontSize,
              color: colors.medium,
              textAlign: "center",
              paddingHorizontal: 20,
              lineHeight: 25,
            }}
          >
            Profitez d'un service de recherche et d’annonce de logements
            abordables, permettant aux utilisateurs de filtrer les appartements
            par caractéristiques et de vendre rapidement leur propriété
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          height: 70,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            alignContent: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 17,
              }}
            >
              Retour
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("")}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
                paddingBottom: 17,
              }}
            >
              Suivant
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center"
    paddingTop: 60,
    justifyContent: "space-between",
  },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: "bold",
    color: colors.title,
    textAlign: "center",
  },
  vectors: {
    width: 300,
    height: 300,
    paddingTop: 40,
    justifyContent: "center",
  },
  textView: {
    paddingTop: 80,
  },
});
