import * as React from 'react';
// React elements to use
import {
  ScrollView, TextInput, Image, StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
// Honestly idk, i think this is standard
import { StatusBar } from 'expo-status-bar';
// Both below are for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// I thought i needed this for navigation, probably not needed anymore
// import { useNavigation } from '@react-navigation/native';
// import { withNavigation } from '@react-navigation/native';

// import for the collapsible/Expandable view
// import Collapsible from 'react-native-collapsible';
// import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
// import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';
// import for opening the web browser on links
import * as WebBrowser from 'expo-web-browser';

// Images
import logo from './assets/logo.jpg';
// import Tripsit_image from './assets/trippy_ts.svg';
// import Chat_image from './assets/trippy_chat.svg';
// import Factsheets_image from './assets/trippy_document.svg';
// import Combinations_image from './assets/trippy_flasks.svg';
// import Wiki_image from './assets/trippy_globe.svg';
// import Settings_image from './assets/trippy_gears.svg';
// import Contact_image from './assets/trippy_contact.svg';
// import aboutImage from './assets/trippy_about.svg';
// import tripsitImage from './assets/document.png';
import chatImage from './assets/chat.png';
import factsheetsImage from './assets/document.png';
import combinationsImage from './assets/flasks.png';
import wikiImage from './assets/globe.png';
import settingsImage from './assets/gears.png';
import contactImage from './assets/contact.png';
import aboutImage from './assets/about.png';
import facebookImage from './assets/facebook.png';
import redditImage from './assets/reddit.png';
import twitterImage from './assets/twitter.png';
import bitcointImage from './assets/bitcoin.png';

// https://docs.expo.dev/tutorial/

const Stack = createNativeStackNavigator();

function handleOpenWithWebBrowser(url) {
  WebBrowser.openBrowserAsync(url);
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="TripSit's Factsheet Search" component={FactsScreen} />
        <Stack.Screen name="Combos" component={ComboScreen} />
        <Stack.Screen name="Wiki" component={WikiScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [displayStatusBar] = React.useState(false);
  return (
    <View style={styles.container}>
      <StatusBar hidden={displayStatusBar} />
      <Image source={logo} style={styles.logo} />
      <View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://chat.tripsit.me');
            }}
            style={styles.doubleButton}
          >
            <Image source={chatImage} style={styles.icon} />
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('TripSit\'s Factsheet Search')} style={styles.button}>
            <Image source={factsheetsImage} style={styles.icon} />
            <Text style={styles.buttonText}>Facts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Combos')} style={styles.button}>
            <Image source={combinationsImage} style={styles.icon} />
            <Text style={styles.buttonText}>Combos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://wiki.tripsit.me');
            }}
            style={styles.button}
          >
            <Image source={wikiImage} style={styles.icon} />
            <Text style={styles.buttonText}>Wiki</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Contact');
            }}
            style={styles.button}
          >
            <Image source={contactImage} style={styles.icon} />
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.button}>
            <Image source={settingsImage} style={styles.icon} />
            <Text style={styles.buttonText}>Settings</Text>
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

function ChatScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Chat Screen
      </Text>
    </View>
  );
}

function FactsScreen() {
  const [searchValue, setSearchValue] = React.useState('');
  // const [results, setResults] = React.useState({});
  const [shouldShow, setShouldShow] = React.useState(false);
  // const [collapsed, setCollapsed] = React.useState(true);
  const [multipleSelect] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState([]);

  // const toggleExpanded = () => {
  //   // Toggling the state of single Collapsible
  //   setCollapsed(!collapsed);
  // };

  const renderHeader = (section, _, isActive) => (
    <Animatable.View
      duration={400}
      style={[styles.header, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor"
    >
      <Text style={styles.headerText}>{section.title}</Text>
    </Animatable.View>
  );
  const renderContent = (section, _, isActive) => (
    <Animatable.View
      duration={400}
      style={[styles.content, isActive ? styles.active : styles.inactive]}
      transition="backgroundColor"
    >
      <Animatable.Text
        animation={isActive ? 'bounceIn' : undefined}
        style={styles.center}
      >
        {section.content}
      </Animatable.Text>
    </Animatable.View>
  );
  const setSections = (sections) => {
    // setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const [CONTENT, setCONTENT] = React.useState([
    { title: 'Summary', content: 'summary' },
    { title: 'Dosage', content: 'dosage' },
    { title: 'Timings', content: 'timings' },
    { title: 'Combos', content: 'combos' },
    { title: 'Links and sources', content: 'links' },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Substance name"
            onChangeText={(value) => setSearchValue(value)}
          />
          <TouchableOpacity
            onPress={() => {
              const factsheetUrl = `https://tripbot.tripsit.me/api/tripsit/getDrug?name=${searchValue}`;
              // const factsheetUrlTest = 'https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA';
              fetch(factsheetUrl)
                .then((response) => response.json())
                .then((response) => {
                  // setResults(response.data[0]);
                  // console.log(response.data[0].properties["general-advice"])
                  // console.log(response)
                  const summary = `Also known as: ${response.data[0].properties.aliases.join(', ')}\n\n${
                    response.data[0].properties.summary}\n\n${
                    response.data[0].properties['general-advice']}\n\n${
                    response.data[0].dose_note}\n\n`
                    + `Included in the following categories: ${response.data[0].properties.categories.join(', ')}\n\n`
                    + `Detectible in drug tests for: ${response.data[0].properties.detection}\n\n`
                    + `Marquis reagent will react: ${response.data[0].properties.marquis}`;

                  let dosage = `${response.data[0].dose_note}\n\n${
                    response.data[0].properties['general-advice']}\n\n`;
                  const dosageTypes = Object.keys(response.data[0].formatted_dose);
                  dosageTypes.forEach((doseType) => {
                    dosage += `${doseType}\n`;
                    const dosageLevels = Object.keys(response.data[0].formatted_dose[doseType]);
                    dosageLevels.forEach((doseLevel) => {
                      dosage += `${doseLevel} - ${response.data[0].formatted_dose[doseType][doseLevel]}\n`;
                    });
                    dosage += '\n\n';
                  });

                  const timings = `Onset: ${response.data[0].formatted_onset.value} ${response.data[0].formatted_onset._unit}\n\n`
                    + `Duration: ${response.data[0].formatted_duration.value} ${response.data[0].formatted_duration._unit}\n\n`
                    + `After effects: ${response.data[0].formatted_aftereffects.value} ${response.data[0].formatted_aftereffects._unit}\n\n`;

                  let combos = '';
                  const otherDrugs = Object.keys(response.data[0].combos);
                  otherDrugs.forEach((drugName) => {
                    combos += `${drugName}: ${response.data[0].combos[drugName].status}`;
                    if (response.data[0].combos[drugName].note) {
                      combos += `\n${response.data[0].combos[drugName].note}`;
                    }
                    combos += '\n\n';
                  });

                  let links = '';
                  const linkTypes = Object.keys(response.data[0].links);
                  linkTypes.forEach((linkType) => {
                    links += `${linkType}\n`;
                    links += response.data[0].links[linkType];
                    links += '\n\n';
                  });

                  let sources = '\n\n';
                  response.data[0].sources._general.forEach((eachLink) => {
                    sources += `${eachLink}\n`;
                  });

                  links += sources;
                  setCONTENT([
                    { title: 'Summary', content: summary },
                    { title: 'Dosage', content: dosage },
                    { title: 'Timings', content: timings },
                    { title: 'Combos', content: combos },
                    { title: 'Links and sources', content: links },
                  ]);
                  setShouldShow(true);
                });
            }}
          >
            <Text style={styles.searchButton}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
        {shouldShow ? (
          <Accordion
            activeSections={activeSections}
          // for any default active section
            sections={CONTENT}
          // title and content of accordion
            touchableComponent={TouchableOpacity}
          // which type of touchable component you want
          // It can be the following Touchables
          // TouchableHighlight, TouchableNativeFeedback
          // TouchableOpacity , TouchableWithoutFeedback
            expandMultiple={multipleSelect}
          // Do you want to expand mutiple at a time or single at a time
            renderHeader={renderHeader}
          // Header Component(View) to render
            renderContent={renderContent}
          // Content Component(View) to render
            duration={400}
          // Duration for Collapse and expand
            onChange={setSections}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function ComboScreen() {
  const [drugA, setDrugA] = React.useState('');
  const [drugB, setDrugB] = React.useState('');
  const [shouldShow, setShouldShow] = React.useState(false);
  const [results, setResults] = React.useState({});

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Substance A name"
          onChangeText={(value) => setDrugA(value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Substance B name"
          onChangeText={(value) => setDrugB(value)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          const comboUrl = `https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=${drugA}&drugB=${drugB}`;
          // const comboUrlTest = 'https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=DXM&drugB=MDMA';
          // console.log(comboUrlTest)
          fetch(comboUrl)
            .then((response) => response.json())
            .then((response) => setResults(response.data[0].status))
            .then(() => setShouldShow(true));
        }}
      >
        <Text style={styles.searchButton}>
          Search
        </Text>
      </TouchableOpacity>
      {shouldShow ? (
        <View style={styles.container}>
          <Text style={styles.text}>{results}</Text>
        </View>
      ) : null}
    </View>
  );
}

function WikiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wiki Screen</Text>
    </View>
  );
}

function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Contact Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}

function AboutScreen() {
  const about = 'This app is created by TripSit, an organisation which helps to provide factual information about drugs and how to reduce the harms involved in using them. We also have an active IRC (internet relay chat) network where we provide tripsitting services, harm reduction advice, and general chat.\nhttp://www.tripsit.me/';
  const disclaimer = 'Although we have a team dedicated to keeping the information on this app up to date, it is not always possible to provide entirely accurate information on the safety level of drugs. The information here should be used as guidelines only, and it is important to do your own research from multiple sources before ingesting a substance. We also strongly advise using a testing kit and scales to ensure you are taking the correct dosage. These can both be bought online for reasonable prices.';
  const support = 'TripSit is a completely free service run by volunteers. If you wish to help out, feel free to join the IRC, follow and share our content on social media, or make a donation to keep the servers running.';
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.container} />
        <Text style={styles.text}>About TripSit</Text>
        <Text style={styles.text}>{about}</Text>
        <Text style={styles.text}>Disclaimer</Text>
        <Text style={styles.text}>{disclaimer}</Text>
        <Text style={styles.text}>Support TripSit</Text>
        <Text style={styles.text}>{support}</Text>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://expo.dev');
            }}
          >
            <Image source={facebookImage} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://expo.dev');
            }}
          >
            <Image source={redditImage} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://expo.dev');
            }}
          >
            <Image source={twitterImage} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleOpenWithWebBrowser('https://expo.dev');
            }}
          >
            <Image source={bitcointImage} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const colorBlack = '#fff';
const colorWhite = '#000';
const colorPurple = '#4B0082';

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colorBlack,
  },
  container: {
    flex: 1,
    backgroundColor: colorWhite,
    alignItems: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    // backgroundColor: 'blue',
    width: '50%',
    padding: 20,
    borderRadius: 5,
  },
  searchButton: {
    backgroundColor: colorPurple,
    // width: '50%',
    // height: 40,
    padding: 15,
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
    color: colorBlack,
    alignSelf: 'center',
  },
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  text: {
    fontSize: 20,
    color: colorBlack,
    alignSelf: 'center',
  },
  header: {
    backgroundColor: colorBlack,
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colorWhite,
  },
  content: {
    padding: 20,
    backgroundColor: colorBlack,
  },
  active: {
    backgroundColor: colorWhite,
    color: colorBlack
  },
  inactive: {
    backgroundColor: colorWhite,
    color: colorBlack
  },
});

export default App;
