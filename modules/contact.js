import * as React from 'react';
// React elements to use
import {
  Alert, ScrollView, SafeAreaView, TextInput, Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
// This controls the bar at the top of the phone that diplays time, battery, etc
import { StatusBar } from 'expo-status-bar';
// Both below are for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// For the collapseable view on the Facts page
import Accordion from 'react-native-collapsible/Accordion';
// For the animation of Collapse and Expand on the accordian
import * as Animatable from 'react-native-animatable';
// For opening the web browser on links
import * as WebBrowser from 'expo-web-browser';
// For storing data
import * as SQLite from 'expo-sqlite';
// import Autocomplete component
// import Autocomplete from 'react-native-autocomplete-input';

const color_dict = {
    black: '#000000',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    white: '#FFFFFF',
    purple: '#4B0082',
  };

const styles = StyleSheet.create({
    flex: {
      flex: 1
    },
    justifyCenter: {
      justifyContent: 'center'
    },
    row: {
      flexDirection: 'row',
    },
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      backgroundColor: color_dict.white,
    },
    container: {
      flex: 1,
      backgroundColor: color_dict.black,
      alignItems: 'center',
    },
    logo: {
      width: 305,
      height: 159,
      marginBottom: 10,
    },
    button: {
      width: '50%',
      padding: 20,
      borderRadius: 5,
    },
    searchButton: {
      backgroundColor: color_dict.purple,
      padding: 20,
      borderRadius: 5,
      height: 10,
      justifyContent: 'space-around'
    },
    doubleButton: {
      width: '100%',
      padding: 20,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 20,
      color: color_dict.white,
      alignSelf: 'center',
    },
    icon: {
      height: 60,
      width: 60,
      alignSelf: 'center',
    },
    text: {
      fontSize: 16,
      color: color_dict.white,
    },
    header: {
      backgroundColor: color_dict.purple,
      padding: 10,
    },
    aboutHeaderText: {
      fontSize: 20,
      color: color_dict.white,
      alignSelf: 'center'
    },
    headerText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: color_dict.white,
    },
    content: {
      padding: 20,
    },
    active: {
      backgroundColor: color_dict.black,
    },
    inactive: {
      backgroundColor: color_dict.black,
    },
  });


  

function ContactScreen() {
    const feedback = 'Got any feedback about the app or any of the information we display? Or maybe you just want to say hello or ask a question? The links below will let you email us with any feedback, or you can always go back to the main menu and chat with us live on IRC. Join the #content channel for sources and more information on the content we provide.';
    return (
  
      <View style={styles.container}>
        <Text style={styles.text}>{feedback}</Text>
        <TouchableOpacity>
          <Text style={styles.text}>Report a bug</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Suggestions / Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Issues with content / information</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Say hello!</Text>
        </TouchableOpacity>
      </View>
    );
  }

module.exports = { ContactScreen };