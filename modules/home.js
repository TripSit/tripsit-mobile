import * as React from "react";
// React elements to use
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
// This controls the bar at the top of the phone that diplays time, battery, etc
import { StatusBar } from "expo-status-bar";
// For opening the web browser on links
import * as WebBrowser from "expo-web-browser";

function handleOpenWithWebBrowser(url) {
  // This allows opening of links in the web browser
  // It's at the top level so any page can use this function
  WebBrowser.openBrowserAsync(url);
}

// Images
import logo from "../assets/images/logo.jpg";
import ChatImage from "../assets/svg/trippy_chat.svg";
import FactsheetsImage from "../assets/svg/trippy_document.svg";
import CombinationsImage from "../assets/svg/trippy_flasks.svg";
import WikiImage from "../assets/svg/trippy_globe.svg";
// import settingsImage from '../assets/images/gears.png';
import ContactImage from "../assets/svg/trippy_contact.svg";
import AboutImage from "../assets/svg/trippy_about.svg";

function HomeScreen({ navigation }) {
  // Set the display of the status bar to false
  const [displayStatusBar] = React.useState(false);
  return (
    <View style={styles.container}>
      {/* StatusBar is hidden on this page, which hides it on all other pages */}
      <StatusBar hidden={displayStatusBar} />
      {/* <TouchableOpacity onPress={() => {navigation.navigate('Test');}}> */}
      <TouchableOpacity>
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
      <View>
        <View style={styles.row}></View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TripSit's Factsheet Search")}
            style={styles.button}
          >
            <FactsheetsImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>Facts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("TripSit's Combo Search")}
            style={styles.button}
          >
            <CombinationsImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>Combos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser("https://wiki.tripsit.me");
            }}
            style={styles.button}
          >
            <WikiImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>Wiki</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser("https://chat.tripsit.me");
            }}
            style={styles.button}
          >
            <ChatImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Contact");
            }}
            style={styles.button}
          >
            <ContactImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("About")} style={styles.button}>
            <AboutImage width={100} height={100} style={styles.icon} />
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const color_dict = {
  black: "#000000",
  red: "#FF0000",
  green: "#00FF00",
  blue: "#0000FF",
  white: "#FFFFFF",
  purple: "#4B0082",
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  justifyCenter: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    textAlign: "center",
    border: "1px solid white",
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
    alignItems: "center",
  },
  logo: {
    width: 325,
    height: 159,
    marginBottom: 10,
  },
  button: {
    width: "50%",
    padding: 20,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: color_dict.purple,
    padding: 20,
    borderRadius: 5,
    height: 10,
    justifyContent: "space-around",
  },
  doubleButton: {
    width: "100%",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: color_dict.white,
    alignSelf: "center",
  },
  icon: {
    alignSelf: "center",
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
    alignSelf: "center",
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
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

module.exports = { HomeScreen };
