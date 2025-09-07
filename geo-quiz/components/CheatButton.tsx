import React from "react";
import { StyleSheet, View } from "react-native";
import { Link } from "expo-router";


type CheatButtonProps = {
  answer: boolean;
};

const CheatButton = ({ answer }: CheatButtonProps) => {
  return (
    <View style={styles.container}>
      <Link href={{ pathname: '/cheat', params: { answer: answer.toString() } }} style={styles.link}
      >
        CHEAT
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    alignItems: 'center',
  },
  link: {
    fontSize: 18,
    color: '#885eeb',
    textAlign: 'center',
  },
});


export default CheatButton;