import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import images from '../../assets/images';

const image = { uri: "../../" };

const App = () => (
  <View style={styles.container}>
    <ImageBackground source={images.images.loading} style={styles.image}>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default App;