import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet,Alert, Text,Image, SafeAreaView,TouchableOpacity,Button,Platform} from 'react-native';



export default function App() {
  const createAccount = './appCreateAccount.js';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text} >OpenBCI</Text>
        <TouchableOpacity>
          <Image style={styles.imageset}
          fadeDuration={2000}
          source={ require("./assets/icon.png")} />
        </TouchableOpacity>
        <Button title="Enter" onPress={() => Alert.alert("Account","Login or Create Account",[
          {text: "Login", onPress: ()=> console.log("login page")},
          {text: "Create Account", onPress: ()=> console.log("Create Account") },
        ] )}  />
        
        
    </SafeAreaView>
  );
}

const containerStyle = {backgroundColor: "#000000"}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: Platform.OS === "android" ? 20: 0,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tinyLogo:{
    width: 300,
    height: 300,
    resizeMode: 'stretch',
    margin: 10,
  },
  imageset:{
    margin: 10,
  },
  text:{
    color: "#ffffff",
    fontSize: 50,
    margin: 10
  }  
 
 
});
