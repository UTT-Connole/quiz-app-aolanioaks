import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { unlockAsync, addOrientationChangeListener, removeOrientationChangeListener, Orientation } from 'expo-screen-orientation';
import CheatButton from "../components/CheatButton";
import Entypo from '@expo/vector-icons/Entypo';




const questions = [
  { question: "Canberra is the capital of Australia.", answer: true },
  { question: "The Pacific Ocean is the largest ocean in the world.", answer: true },
  { question: "Mount Everest is located in Japan.", answer: false },
  { question: "The Sahara Desert is in South America.", answer: false },
  { question: "London is the capital of England.", answer: true },
];


export default function Index() {
  //useState is for anytime the screen is rendered
  //useEffect is for anytime the screen is loaded only use when you need to re-establish a connection
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [orientation, setOrientation] = useState(null);


  useEffect(() => {
    unlockAsync();

    const subscription = addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation);
    });
    return () => {
      removeOrientationChangeListener(subscription);
    };
  }, []);



  const currentStyle =
  orientation === Orientation.LANDSCAPE_LEFT || orientation === Orientation.LANDSCAPE_RIGHT
    ? styles.landscapeContainer
    : styles.portraitContainer;


  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);

    if (answer === questions[currentQuestion].answer) {
      Alert.alert("Correct!");
      if (currentQuestion < questions.length - 1){
        handleNext();
      } else {
        setTimeout(restartQuiz, 500);
      }
  
    } else {
      Alert.alert("Incorrect!");
    }
  };



  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCurrentQuestion(0);
    }
    setSelectedAnswer(null);
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setCurrentQuestion(questions.length - 1);
    }
    setSelectedAnswer(null);
  };



  const restartQuiz = () => {
    setCurrentQuestion(0);
  };


  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {questions[currentQuestion].question}
        </Text>
      </View>


      <View style={styles.buttonContainer}>
        <Pressable 
          style={[styles.answerButton, currentStyle, selectedAnswer === true && styles.selectedButton]} 
          onPress={() => handleAnswer(true)} >
          <Text style={styles.buttonText}>TRUE</Text>
        </Pressable>
        


        <Pressable 
          style={[styles.answerButton, currentStyle, selectedAnswer === false && styles.selectedButton]} 
          onPress={() => handleAnswer(false)} >
          <Text style={styles.buttonText}>FALSE</Text>
        </Pressable>
      </View>



      <View style={styles.navigationContainer}>
        <Pressable 
          style={[styles.navButton, currentStyle]} 
          onPress={handlePrev}>
          <Entypo name="chevron-left" size={24} color="white" />
          <Text style={styles.navButtonText}>PREV</Text>
        </Pressable>
        

        <Pressable 
          style={[styles.navButton, currentStyle]} 
          onPress={handleNext}>
          <Text style={styles.navButtonText}>NEXT</Text>
          <Entypo name="chevron-right" size={24} color="white" />
        </Pressable>
      </View>


      {/* made a cheat button component   */}
      <View style={styles.cheatContainer}>
        <CheatButton answer={questions[currentQuestion].answer} />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  questionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  answerButton: {
    flex: 1,
    backgroundColor: '#6f1ff0',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#5a19c7',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  navButton: {
    flex: 1,
    flexDirection: "row",      
    alignItems: "center",      
    justifyContent: "center", 
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#6f1ff0", 
  },
  navButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cheatLink: {
    color: '#885eeb',
    marginTop: 12,
    position: 'absolute',
    left: 160,
    fontWeight: 'bold',
    fontSize: 20,
  },
  cheatContainer: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 16,
  },
  text: {
    color: '#885eeb'
  },
  landscapeContainer: {
    backgroundColor: "#FF10F0",
  },
  portraitContainer: {
    backgroundColor: "#6f1ff0", 
  },
  
});
