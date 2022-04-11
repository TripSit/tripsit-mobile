import * as React from 'react';
// React elements to use
import {
  Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
// This controls the bar at the top of the phone that diplays time, battery, etc
import { StatusBar } from 'expo-status-bar';
// For opening the web browser on links
import * as WebBrowser from 'expo-web-browser';

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

function handleOpenWithWebBrowser(url) {
    // This allows opening of links in the web browser
    // It's at the top level so any page can use this function
    WebBrowser.openBrowserAsync(url);
}

// Images
import logo from '../assets/logo.jpg';
import chatImage from '../assets/chat.png';
import factsheetsImage from '../assets/document.png';
import combinationsImage from '../assets/flasks.png';
import wikiImage from '../assets/globe.png';
import settingsImage from '../assets/gears.png';
import contactImage from '../assets/contact.png';
import aboutImage from '../assets/about.png';


function HomeScreen({ navigation }) {
    // Set the display of the status bar to false
    const [displayStatusBar] = React.useState(false);
    return (
      <View style={styles.container}>
        {/* StatusBar is hidden on this page, which hides it on all other pages */}
        <StatusBar hidden={displayStatusBar} />
        <TouchableOpacity onPress={() => {navigation.navigate('Test');}}>
          <Image source={logo} style={styles.logo} />
        </TouchableOpacity>
        <View>
          <View style={styles.row}></View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => navigation.navigate('TripSit\'s Factsheet Search')} style={styles.button}>
              <Image source={factsheetsImage} style={styles.icon} />
              <Text style={styles.buttonText}>Facts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TripSit\'s Combo Search')} style={styles.button}>
              <Image source={combinationsImage} style={styles.icon} />
              <Text style={styles.buttonText}>Combos</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {handleOpenWithWebBrowser('https://wiki.tripsit.me');}} style={styles.button}>
              <Image source={wikiImage} style={styles.icon} />
              <Text style={styles.buttonText}>Wiki</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {handleOpenWithWebBrowser('https://chat.tripsit.me');}}style={styles.button}>
              <Image source={chatImage} style={styles.icon} />
              <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
          </View>
  
          <View style={styles.row}>
            <TouchableOpacity onPress={() => {navigation.navigate('Contact');}} style={styles.button}>
              <Image source={contactImage} style={styles.icon} />
              <Text style={styles.buttonText}>Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.button}>
              <Image source={aboutImage} style={styles.icon} />
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

module.exports = { HomeScreen };
