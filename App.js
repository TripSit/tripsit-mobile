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
import Autocomplete from 'react-native-autocomplete-input';

// Images
import logo from './assets/logo.jpg';
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TripSit's Factsheet Search" component={FactsScreen} />
        <Stack.Screen name="TripSit's Combo Search" component={ComboScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  // Set the display of the status bar to false
  const [displayStatusBar] = React.useState(false);
  return (
    <View style={styles.container}>
      {/* StatusBar is hidden on this page, which hides it on all other pages */}
      <StatusBar hidden={displayStatusBar} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Test');
        }}
      >
        <Image source={logo} style={styles.logo} />
      </TouchableOpacity>
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
          <TouchableOpacity onPress={() => navigation.navigate('TripSit\'s Combo Search')} style={styles.button}>
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

function FactsScreen() {
  // Value that you're searching for
  const [searchValue, setSearchValue] = React.useState('');
  // Controls the bottom section of the page that displays info
  // Only activates when you tap "Search"
  const [shouldShow, setShouldShow] = React.useState(false);
  // Allow the user to open multiple sections
  const [multipleSelect] = React.useState(true);
  // Creates a blank array for the active sessions
  const [activeSections, setActiveSections] = React.useState([]);

  const setSections = (sections) => {
    // Sets the active sessions
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  const [CONTENT, setCONTENT] = React.useState([
    // Create the scaffolding
    { title: 'Summary', content: 'summary' },
    { title: 'Dosage', content: 'dosage' },
    { title: 'Timings', content: 'timings' },
    { title: 'Combos', content: 'combos' },
    { title: 'Links and sources', content: 'links' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Substance name"
          onChangeText={(value) => setSearchValue(value)}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            const factsheetUrl = `https://tripbot.tripsit.me/api/tripsit/getDrug?name=${searchValue}`;
            // const factsheetUrlTest = 'https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA';
            fetch(factsheetUrl)
              .then((response) => response.json())
              .then((response) => {
                // Create the different text sections from the response
                // We process the data here after the promise is complete
                // After the data is built we display/replace the CONTENT

                // TODO: Make these conditional based on if there's value.
                // EG: If the "dose_note" doesn't exist, don't display "unknown"
                const aliases = `Also known as: ${response.data[0].properties.aliases.join(', ')}`;
                const summaryInfo = `\n\n${response.data[0].properties.summary}`;
                const generalAdvice = `\n\n${response.data[0].properties['general-advice']}`;
                const doseNote = `\n\n${response.data[0].dose_note}`;
                const categories = `\n\nIncluded in the following categories: ${response.data[0].properties.categories.join(', ')}`;
                const detection = `\n\nDetectible in drug tests for: ${response.data[0].properties.detection}`;
                const reagent = `\n\nMarquis reagent will react: ${response.data[0].properties.marquis}`;

                const summary = aliases
                  + summaryInfo
                  + generalAdvice
                  + doseNote
                  + categories
                  + detection
                  + reagent;

                let dosage = '';
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
                // TODO: Make these clickable
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

                // Update the CONTENT being displayed
                setCONTENT([
                  { title: 'Summary', content: summary },
                  { title: 'Dosage', content: dosage },
                  { title: 'Timings', content: timings },
                  { title: 'Combos', content: combos },
                  { title: 'Links and sources', content: links },
                ]);
                // Finally, display the bottom section
                setShouldShow(true);
              });
          }}
        >
          <Text style={styles.buttonText}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {shouldShow ? (
          <Accordion
            // Define how you want to interact with the accordian
            // It can be the following Touchables
            // TouchableHighlight, TouchableNativeFeedback
            // TouchableOpacity , TouchableWithoutFeedback
            touchableComponent={TouchableOpacity}
            // Title of sections and the 'content that will be displayed
            sections={CONTENT}
            // Get a list of currenly open sections, starts at []
            activeSections={activeSections}
            // When you interact, it adds that section to the activeSections list
            onChange={setSections}
            // Do you want to expand multiple sections at the same time? True
            expandMultiple={multipleSelect}
            // Header Component(View) to render
            renderHeader={renderHeader}
            // Content Component(View) to render
            renderContent={renderContent}
            // How quickly the sections expand in ms. 0 for instant
            duration={400}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}

function ComboScreen() {
  // Define objects to hold search data
  const [drugA, setDrugA] = React.useState('');
  const [drugB, setDrugB] = React.useState('');
  // Much like Factsheets, the results only display after you search
  const [shouldShow, setShouldShow] = React.useState(false);
  // Define object to store results
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
        style={styles.searchButton}
        onPress={() => {
          const comboUrl = `https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=${drugA}&drugB=${drugB}`;
          // const comboUrlTest = 'https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=DXM&drugB=MDMA';
          fetch(comboUrl)
            .then((response) => response.json())
            .then((response) => setResults(response.data[0].status))
            .then(() => setShouldShow(true));
        }}
      >
        <Text style={styles.buttonText}>
          Search
        </Text>
      </TouchableOpacity>
      {shouldShow ? (
        <View style={styles.container}>
          <Text style={styles.buttonText}>{results}</Text>
        </View>
      ) : null}
    </View>
  );
}

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

function SettingsScreen() {
  // const [allDrugInfo, setallDrugInfo] = React.useState([]);
  // Initialize the database
  const db = SQLite.openDatabase('db.tripsit');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings Screen</Text>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log("Starting DB update")
          // Create the table if it does not exist
          console.log("Dropping table")
          // db.transaction((tx) => {
          //   tx.executeSql('DROP TABLE IF EXISTS drugs');
          // });
          console.log("Creating table")
          // db.transaction((tx) => {
          //   tx.executeSql(
          //     'CREATE TABLE IF NOT EXISTS drugs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, info TEXT)'
          //   );
          // });
          console.log("Fetching data")
          fetch('https://tripbot.tripsit.me/api/tripsit/getAllDrugs')
            .then((response) => response.json())
            .then((response) => {
              var allDrugInfo = response.data[0]
              console.log(Object.keys(allDrugInfo).length)
              console.log(allDrugInfo['dxm'])

              db.transaction((tx) => {
                tx.executeSql(
                  'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
                  ["dxm","allDrugInfo['dxm'].toString()"],
                  (tx, results) => {
                    console.log(results)
                  }
                );
              })

              // TODO: Use this for the search auto-suggest
              // Object.keys(allDrugInfo).forEach((drugName) => {
              //   console.log(allDrugInfo[drugName].name)
              //   // db.transaction((tx) => {
              //   //   tx.executeSql(
              //   //     'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
              //   //     [drugName,allDrugInfo[drugName].toString()],
              //   //     (tx, results) => {
              //   //       console.log(results)
              //   //     }
              //   //   );
              //   // })
              // });
              console.log("DB Updated")
              // Alert.alert(
              //   'Alert',
              //   'DB updated!'
              // )
            });
        }}
      >
        <Text style={styles.buttonText}>
          Download database for offline use
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT name, info FROM drugs WHERE name='dxm'",
              [],
              (tx, results) => {
                console.log(results.rows)
                Alert.alert(
                  'Alert',
                  'test'
                );
              }
            );
          });
        }}
      >
        <Text style={styles.buttonText}>
          Get Data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log("Get All Data")
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM drugs', null,
              (txObj, { rows: { _array } }) => {
                Alert.alert(
                  'Alert Title',
                  _array.toString()
                );
              },
              (txObj, error) => {
                Alert.alert(
                  'Alert Title',
                  error.toString()
                );
              }
            );
          });
        }}
      >
        <Text style={styles.buttonText}>
          Get all data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log("Add data")
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
              ["dxm","info"]
            );
          });
        }}
      >
        <Text style={styles.buttonText}>
          Add new data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log("Delete table")
          db.transaction((tx) => {
            tx.executeSql(
              'DROP TABLE IF EXISTS drugs',
              []
              );
          });
          console.log("Deleted table")
        }}
      >
        <Text style={styles.buttonText}>
          Delete table
        </Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          console.log("Create table")
          db.transaction(tx => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
            )
          })
          console.log("create table finished")
        }}
      >
        <Text style={styles.buttonText}>
          Create table
        </Text>
      </TouchableOpacity> */}
    </View>
  );
}

function TestScreen() {
  const [drugs, setDrugs] = React.useState(['a', 'b', 'c']);
  const [filderedDrugs, setFilteredDrugs] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState({});
  // const db = SQLite.openDatabase('db.tripsit');

  React.useEffect(() => {
    fetch('https://tripbot.tripsit.me/api/tripsit/getallDrugInfo')
      .then((res) => res.json())
      .then((json) => {
        // const { results: films } = json.data[0];
        setDrugs(json.data[0]);
        // setting the data in the films state
      })
      .catch((e) => {
        Alert.alert(
          'Alert',
          e.toString()
        );
      });
  }, []);

  const findDrug = (query) => {
    // method called everytime when we change the value of the input
    if (query) {
      // making a case insensitive regular expression to get similar value from the drug json
      const regex = new RegExp(`${query.trim()}`, 'i');
      // setting the filtered drug array according the query from the input
      // TODO: Figure this out, i have no idea why this doesn't want to work
      // setFilteredDrugs(drugs.filter((drug) => drug.search(regex) >= 0));
      // setFilteredDrugs(drugs);
      // setFilteredDrugs(drugs.filter((drug) => drug === 'dxm'));
      // setFilteredDrugs(drugs.filter((drug) => drug.length > 4));
      
      // setFilteredDrugs(drugs.filter((drug) => drug.includes('dxm')));
      setFilteredDrugs(drugs
        .filter(Boolean)
        .filter(drug => drug.toLowerCase().replace(/\-/g, '')
          .includes(query.trim().toLowerCase().replace(/\-/g, ''))));
    } else {
      // if the query is null then return blank
      setFilteredDrugs([]);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainer}
            // data to show in suggestion
          data={filderedDrugs}
            // default value if you want to set something in input
          defaultValue={
              JSON.stringify(selectedValue) === '{}' ? '' : selectedValue
            }
            /* onchange of the text changing the state of the query which will trigger
            the findDrug method to show the suggestions */
          onChangeText={(text) => findDrug(text)}
          placeholder="Enter the drug title"
          renderItem={({ item }) => (
            // you can change the view you want to show in suggestion from here
            <TouchableOpacity
              onPress={() => {
                setSelectedValue(item);
                setFilteredDrugs([]);
              }}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

function AboutScreen() {
  const about = 'This app is created by TripSit, an organisation which helps to provide factual information about drugs and how to reduce the harms involved in using them. We also have an active IRC (internet relay chat) network where we provide tripsitting services, harm reduction advice, and general chat.\nhttp://www.tripsit.me/';
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
      </ScrollView>
    </View>
  );
}

const color = {
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
    backgroundColor: color.white,
  },
  container: {
    flex: 1,
    backgroundColor: color.black,
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
    backgroundColor: color.purple,
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
    color: color.white,
    alignSelf: 'center',
  },
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  text: {
    fontSize: 16,
    color: color.white,
  },
  header: {
    backgroundColor: color.purple,
    padding: 10,
  },
  aboutHeaderText: {
    fontSize: 20,
    color: color.white,
    alignSelf: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: color.white,
  },
  content: {
    padding: 20,
  },
  active: {
    backgroundColor: color.black,
  },
  inactive: {
    backgroundColor: color.black,
  },
});

const renderHeader = (section, _, isActive) => (
  // Function for displaying the header
  <Animatable.View
    duration={400}
    style={[styles.header, isActive ? styles.active : styles.inactive]}
    transition="backgroundColor"
  >
    <Text style={styles.headerText}>{section.title}</Text>
  </Animatable.View>
);

const renderContent = (section, _, isActive) => (
  // Function for displaying the content
  <Animatable.View
    duration={400}
    style={[styles.content, isActive ? styles.active : styles.inactive]}
    transition="backgroundColor"
  >
    <Animatable.Text
      animation={isActive ? 'bounceIn' : undefined}
      style={styles.text}
    >
      {section.content}
    </Animatable.Text>
  </Animatable.View>
);

const Stack = createNativeStackNavigator();

// Initialize the database
const db = SQLite.openDatabase('db.tripsit');

function handleOpenWithWebBrowser(url) {
  // This allows opening of links in the web browser
  // It's at the top level so any page can use this function
  WebBrowser.openBrowserAsync(url);
}

export default App;

// TODO: to allow searching by nickname