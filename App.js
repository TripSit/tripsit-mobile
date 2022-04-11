import * as React from 'react';
// React elements to use
import { StyleSheet } from 'react-native';
// Both below are for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const about = require("./modules/about");
const test = require("./modules/test");
const settings = require("./modules/settings");
const contact = require("./modules/contact");
const combo = require("./modules/combo");
const facts = require("./modules/facts");
const home = require("./modules/home");

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

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // These settings control the navigation bar
        // By default this bar does not appear on the homepage
        screenOptions={{
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        {/* Every screen the user will see must be defined here first */}
        {/* Then use the navigation module and touchableOpacity  */}
        <Stack.Screen name="Home" component={home.HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripSit's Factsheet Search" component={facts.FactsScreen} />
        <Stack.Screen name="TripSit's Combo Search" component={combo.ComboScreen} />
        <Stack.Screen name="Contact" component={contact.ContactScreen} />
        <Stack.Screen name="Settings" component={settings.SettingsScreen} />
        <Stack.Screen name="About" component={about.AboutScreen} />
        <Stack.Screen name="Test" component={test.TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

export default App;