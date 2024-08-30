import { View, Text, StyleSheet } from "react-native";
import React from "react";

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <Text>This is a about section</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
});

export default AboutUs;
