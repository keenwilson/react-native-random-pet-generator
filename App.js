import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Constants from "expo-constants";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [pet, setPet] = useState();
  const loadPet = async () => {
    setLoading(true);
    const res = await fetch("http://pet-library.moonhighway.com/api/randomPet");
    const data = await res.json();
    await Image.prefetch(data.photo.full);
    console.log(data);
    setPet(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPet();
  }, []);

  if (!pet) return <ActivityIndicator size="large" />;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadPet} />
        }
      >
        <Image style={styles.pic} source={{ uri: pet.photo.full }} />
        <Text style={styles.paragraph}>
          {pet.name} - {pet.category}
        </Text>
        <Text style={styles.support}>Weight: {pet.weight} lbs</Text>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  support: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 16,
    textAlign: "center",
  },
  pic: {
    height: 500,
    width: 500,
  },
});
