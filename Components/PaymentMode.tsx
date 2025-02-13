import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function PaymentMode() {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>ContactList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 5,
    backgroundColor: "#fff", // Ensure this is a contrasting color to the text
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Change text color to a visible one
  },
});
