import React from "react";
import { Image, Text, StyleSheet } from "react-native";
function RenderImage({ desc }) {
  let img = `./assets/overcastclouds.png`;
  let img2 = `./assets/` + desc.replace(/\s/g, "") + `.png`;
  console.log(img2);

  return desc ? (
    <Image style={styles.container} source={{ uri: img }} />
  ) : (
    <Text>err</Text>
  );
}
const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 230,
  },
});
export default RenderImage;
