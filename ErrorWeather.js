import React from "react";
import { View, StyleSheet, Text } from "react-native";

function ErrorWeather({ error }) {
  return (
    <View style={styles.container}>
      <Text style={styles.error}>Something went wrong</Text>
      <Text style={styles.error}>Please try to refresh the page</Text>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1,
  },
  error: {
    fontSize: 30,
    color: "#fff",
  },
});
export default ErrorWeather;
