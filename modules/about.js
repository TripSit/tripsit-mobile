import * as React from 'react';
// React elements to use
import {
  ScrollView, Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
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

import facebookImage from '../assets/facebook.png';
import redditImage from '../assets/reddit.png';
import twitterImage from '../assets/twitter.png';
import bitcointImage from '../assets/bitcoin.png';


function AboutScreen() {
    const about = 'This app is created by TripSit, an organisation which helps to provide factual information about drugs and how to reduce the harms involved in using them. We also have an active IRC (internet relay chat) network where we provide tripsitting services, harm reduction advice, and general chat.';
    const disclaimer = 'Although we have a team dedicated to keeping the information on this app up to date, it is not always possible to provide entirely accurate information on the safety level of drugs. The information here should be used as guidelines only, and it is important to do your own research from multiple sources before ingesting a substance. We also strongly advise using a testing kit and scales to ensure you are taking the correct dosage. These can both be bought online for reasonable prices.';
    const support = 'TripSit is a completely free service run by volunteers. If you wish to help out, feel free to join the IRC, follow and share our content on social media, or make a donation to keep the servers running.';
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.aboutHeaderText}>About TripSit</Text>
          <Text style={styles.text}>{about}</Text>
          <Text style={styles.aboutHeaderText}>Disclaimer</Text>
          <Text style={styles.text}>{disclaimer}</Text>
          <Text style={styles.aboutHeaderText}>Support TripSit</Text>
          <Text style={styles.text}>{support}</Text>
          <View style={[styles.row, styles.justifyCenter]}>
            <TouchableOpacity
              onPress={() => {
                handleOpenWithWebBrowser('https://www.facebook.com/groups/tripsit/');
              }}
            >
              <Image source={facebookImage} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenWithWebBrowser('https://www.reddit.com/r/TripSit/');
              }}
            >
              <Image source={redditImage} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenWithWebBrowser('https://twitter.com/teamtripsit');
              }}
            >
              <Image source={twitterImage} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleOpenWithWebBrowser('https://tripsit.me/donate/');
              }}
            >
              <Image source={bitcointImage} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

module.exports = { AboutScreen };