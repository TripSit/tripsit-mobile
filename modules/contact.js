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
import * as MailComposer from 'expo-mail-composer';

function handleOpenWithWebBrowser(url) {
  // This allows opening of links in the web browser
  // It's at the top level so any page can use this function
  WebBrowser.openBrowserAsync(url);
}

function ContactScreen() {
  const feedback = 'Have feedback about the app or any of the information we display?\nMaybe you just want to say hello? We have a few ways to get in contact with us:'
  const discord = "Discord is the preferred method to talk with the developer (Moonbear/Teknos)."
  const irc = "You can connect to the IRC and join the #content channel to talk with the wiki content team."
  const email = "You can email us at app@tripsit.me."

  const [status, setStatus] = React.useState(null)
  
  function sendEmail() {
    console.log('test')
    var options = {
      subject: "Sending email without attachment",
      recipients: ["talkwithcharles@gmail.com"],
      body: "Enter email body here..."
    }
    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
    })
    promise.then(
      result => setStatus("Status: email " + result.status),
      error => setStatus("Status: email " + error.status)
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{feedback}</Text>
      <TouchableOpacity>
        <Text style={styles.text}>{discord}</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.searchButton}
        onPress={() => {
          handleOpenWithWebBrowser('https://www.discord.gg/NSDvVeCb7b');
        }}
      >
        <Text style={styles.text}>Join Discord!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>{irc}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          handleOpenWithWebBrowser('https://chat.tripsit.me/chat/?a=1&nick=AndroidUser&#content');
        }}
      >
        <Text style={styles.text}>Connect to IRC!</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.text}>{email}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => {
            // algo
            MailComposer.composeAsync({
              recipients: 
              ['mobile@gmail.com'],
              subject: 'Contact email from the app!',
              body: 'Hey Team Tripsit, I want to ask...',
            });
          }}
        >
        <Text style={styles.text}>Send email</Text>
      </TouchableOpacity>
      {status !== null &&
        <View>
          <Text>{status}</Text>
        </View>
      }
    </View>
  );
}

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

module.exports = { ContactScreen };