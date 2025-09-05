import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function Cheat() {
  
  const { answer } = useLocalSearchParams();


    return (
      <View style={styles.container}>
        <Text style={styles.text}>Are you sure you want to do this?</Text>
        <Button title="Show Answer" onPress={() => Alert.alert(`The answer is ${answer}`)} />

      </View>
    );
  }



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    },  
    text: {
    fontSize: 24,
    color: '#885eeb',
    marginBottom: 20,
    textAlign: 'center',
    }
  
}); 