import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import logo from './assets/logo.jpg';
// import Tripsit_image from './assets/trippy_ts.svg';
// import Chat_image from './assets/trippy_chat.svg';
// import Factsheets_image from './assets/trippy_document.svg';
// import Combinations_image from './assets/trippy_flasks.svg';
// import Wiki_image from './assets/trippy_globe.svg';
// import Settings_image from './assets/trippy_gears.svg';
// import Contact_image from './assets/trippy_contact.svg';
// import About_image from './assets/trippy_about.svg';
import tripsit_image from './assets/document.png';
import chat_image from './assets/chat.png';
import factsheets_image from './assets/document.png';
import combinations_image from './assets/flasks.png';
import wiki_image from './assets/globe.png';
import settings_image from './assets/gears.png';
import contact_image from './assets/contact.png';
import about_image from './assets/about.png';

// https://docs.expo.dev/tutorial/

export default function App() {
  return (
    <View style={styles.container}>
      
      <Image source={logo} style={styles.logo} /> 

      <View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.doubleButton}>
            <Image source={chat_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={factsheets_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Facts</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={combinations_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Combos</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={wiki_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Wiki</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={contact_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>

        </View>

        <View style={{flexDirection:"row"}}>


          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={settings_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          

          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Image source={about_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  instructions: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  button: {
    // backgroundColor: 'blue',
    width: '50%',
    padding: 20,
    borderRadius: 5,
  },
  doubleButton: {
    // backgroundColor: 'blue',
    width: '100%',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  },
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center'

  }
});
