import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import onboardImage1 from "../../../assets/onboard2.png";


import colors from "../../constants/colors";
import typography from "../../constants/typo";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { supabase } from "../supabase";

export default function Onboard1({ navigation }) {
  const navigate = useNavigation();
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      navigation.replace("Home");
    }
  };
  return (
    <View style={styles.container}>
      <ExpoStatusBar style="dark" />
      {/* <View
        style={{ width: "100%", height: 40, backgroundColor: colors.medium }}
      ></View> */}
      <ScrollView>
        <View style={{ backgroundColor: "#fff", alignItems: "center" }}>
          <View style={styles.vectors}>
            <Image
              source={onboardImage1}
              style={{ width: 300, height: 300, justifyContent: "center" }}
            />
          </View>
          <View style={styles.textView}>
            <Text style={styles.title}>
              Faites des économies, pas des sacrifices !
            </Text>
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
              Trouvez un appartement abordable avec toutes les caractéristiques
              dont vous avez besoin grâce à notre moteur de recherche
              intelligent.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          height: 70,
          backgroundColor: colors.prime,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{ alignContent: "center" }}
          onPress={() => navigate.navigate("Onboard2")}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
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
