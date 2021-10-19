import * as React from 'react';
//React elements to use
import { Alert, ScrollView, TextInput, Image, StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
//Honestly idk, i think this is standard
import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
//Both below are for navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//I thought i needed this for navigation, probably not needed anymore
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from '@react-navigation/native';

//import for the collapsible/Expandable view
import Collapsible from 'react-native-collapsible';
//import for the Accordion view
import Accordion from 'react-native-collapsible/Accordion';
//import for the animation of Collapse and Expand
import * as Animatable from 'react-native-animatable';


// Images
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
import facebook_image from './assets/facebook.png'
import reddit_image from './assets/reddit.png'
import twitter_image from './assets/twitter.png'
import bitcoin_image from './assets/bitcoin.png'

// https://docs.expo.dev/tutorial/

const Stack = createNativeStackNavigator();

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
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="Facts" component={FactsScreen}/>
        <Stack.Screen name="Combos" component={ComboScreen}/>
        <Stack.Screen name="Wiki" component={WikiScreen}/>
        <Stack.Screen name="Contact" component={ContactScreen}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
        <Stack.Screen name="About" component={AboutScreen}/>
        <Stack.Screen name="FactResults" component={FactsResultsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <Image source={logo} style={styles.logo} /> 

      <View>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.doubleButton}>
            <Image source={chat_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Facts')} style={styles.button}>
            <Image source={factsheets_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Facts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Combos')} style={styles.button}>
            <Image source={combinations_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Combos</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Wiki')} style={styles.button}>
            <Image source={wiki_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Wiki</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.button}>
            <Image source={contact_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Contact</Text>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.button}>
            <Image source={settings_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.button}>
            <Image source={about_image} style={styles.icon} /> 
            <Text style={styles.buttonText}>About</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
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

function FactsScreen({ navigation, route }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [results, setResults] = React.useState({})
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        TripSit's Factsheet Search
      </Text>
      <View style={{
        flexDirection:"row", 
      }}>
        <TextInput
          style={styles.input}
          placeholder={"Substance name"}
          onChangeText={(value) => setSearchValue(value)}
          // value={searchValue}
          // onSubmitEditing={searchValue => Search({navigation, searchValue})}
          // onSubmitEditing={() => navigation.navigate('FactResults', {searchValue})}
          // onSubmitEditing={() => factSearchFunction({navigation, searchValue})}
        />
        <TouchableOpacity 
          onPress={() => {
            // console.log("searchValue: " + searchValue)
            var factsheetUrl = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=" + searchValue
            var factsheetUrlTest = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA"
            // console.log(factsheetUrlTest)
            fetch(factsheetUrl)
              .then((response) => response.json())
              // // .then(response => {setResults({response})})
              // .then(console.log("Response:"))
              // .then(console.log(response))
              .then((response) => navigation.navigate('FactResults', {results: response}))
              // .then(() => navigation.navigate('FactResults', {results: "test123123123"}))
          }}
          >
          <Text style={styles.searchButton}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FactsResultsScreen({ navigation, route }) {
  const { results } = route.params;
  // console.log(results)
  // console.log(results.data[0].dose_note)
  // console.log(results.data[0].aliases)

  const summary = "Also known as: " + results.data[0].properties.aliases.join(", ") + "\n\n" +
    results.data[0].properties.summary + "\n\n" +
    results.data[0].properties["general-advice"] + "\n\n" +
    results.data[0].dose_note + "\n\n" +
    "Included in the following categories: " + results.data[0].properties.categories.join(", ") + "\n\n" +
    "Detectible in drug tests for: " + results.data[0].properties.detection + "\n\n" +
    "Marquis reagent will react: " + results.data[0].properties.marquis
  
  let dosage = results.data[0].dose_note + "\n\n" + 
    results.data[0].properties["general-advice"] + "\n\n"
  const dosage_types = Object.keys(results.data[0].formatted_dose)
  dosage_types.forEach(doseType => {
    dosage += doseType + "\n"
    const dosage_levels = Object.keys(results.data[0].formatted_dose[doseType])
    dosage_levels.forEach(doseLevel => {
      dosage += doseLevel + " - " + results.data[0].formatted_dose[doseType][doseLevel] + "\n" 
    })
    dosage += "\n\n"
  })

  let timings = "Onset: " + results.data[0].formatted_onset['value'] + " " + results.data[0].formatted_onset['_unit'] + "\n\n" +
    "Duration: " + results.data[0].formatted_duration['value'] + " " + results.data[0].formatted_duration['_unit'] + "\n\n" +
    "After effects: " + results.data[0].formatted_aftereffects['value'] + " " + results.data[0].formatted_aftereffects['_unit'] + "\n\n"

  let combos = ""
  const other_drugs = Object.keys(results.data[0].combos)
  other_drugs.forEach(drugName => {
    combos += drugName + ": " + results.data[0].combos[drugName].status
    if (results.data[0].combos[drugName].note) {
      combos += "\n" + results.data[0].combos[drugName].note
    }
    combos += "\n\n"
  })

  let links = "wiki"
  const link_types = Object.keys(results.data[0].links)
  link_types.forEach(linkType => {
    links += linkType + "\n"
    links += results.data[0].links[linkType]
    links += "\n\n"
  })

  let sources = "\n\n"
  results.data[0].sources._general.forEach(eachLink =>{
    sources += eachLink + "\n"
  })


  links += sources

  const [collapsed, setCollapsed] = React.useState(true);
  const [multipleSelect, setmultipleSelect] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState([]);
  const [CONTENT, setCONTENT] = React.useState([
    { title: 'Summary', content: summary,},
    { title: 'Dosage', content: dosage,},
    { title: 'Timings', content: timings,},
    { title: 'Combos', content: combos,},
    { title: 'Links and sources', content: links,},
  ]);

  const toggleExpanded = () => {
    //Toggling the state of single Collapsible
    setCollapsed(!collapsed);
  };

  const renderHeader = (section, _, isActive) => {
    //Accordion Header view
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  const renderContent = (section, _, isActive) => {
    //Accordion Content view
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text
          animation={isActive ? 'bounceIn' : undefined}
          style={{ textAlign: 'center'}}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };
  
  const setSections = (sections) => {
    //setting up a active section state
    setActiveSections(sections.includes(undefined) ? [] : sections);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.text}>
            You searched for: {results.data[0].name}
          </Text>
        </View>

        <Accordion
          activeSections={activeSections}
          //for any default active section
          sections={CONTENT}
          //title and content of accordion
          touchableComponent={TouchableOpacity}
          //which type of touchable component you want
          //It can be the following Touchables
          //TouchableHighlight, TouchableNativeFeedback
          //TouchableOpacity , TouchableWithoutFeedback
          expandMultiple={multipleSelect}
          //Do you want to expand mutiple at a time or single at a time
          renderHeader={renderHeader}
          //Header Component(View) to render
          renderContent={renderContent}
          //Content Component(View) to render
          duration={400}
          //Duration for Collapse and expand
          onChange={setSections}
          //setting the state of active sections
        />
      </ScrollView>
    </View>
  );
}

function ComboScreen({ navigation, route }) {
  const [drugA, setDrugA] = React.useState("");
  const [drugB, setDrugB] = React.useState("");
  const [shouldShow, setShouldShow] = React.useState(false);
  const [results, setResults] = React.useState({})

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row"}}>
        <TextInput
          style={styles.input}
          placeholder={"Substance A name"}
          onChangeText={(value) => setDrugA(value)}
        />
        <TextInput
          style={styles.input}
          placeholder={"Substance B name"}
          onChangeText={(value) => setDrugB(value)}
        />
      </View>
      <TouchableOpacity 
        onPress={() => {
          var comboUrl = "https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=" + drugA + "&drugB=" + drugB
          var comboUrlTest = "https://tripbot.tripsit.me/api/tripsit/getInteraction?drugA=DXM&drugB=MDMA"
          // console.log(comboUrlTest)
          fetch(comboUrl)
            .then((response) => response.json())
            .then((response) => setResults(response.data[0].status))
            .then(() => setShouldShow(true))
        }}>
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
  const [shouldShow, setShouldShow] = React.useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wiki Screen</Text>
      <Button
        title="Hide/Show Component"
        onPress={() => setShouldShow(!shouldShow)}
      />
      {shouldShow ? (
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png',
          }}
          style={{width: 250, height: 250}}
        />
      ) : null}
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
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>About TripSit</Text>
        <Text style={styles.text}>This app is created by TripSit, an organisation which helps to provide factual information about drugs and how to reduce the harms involved in using them. We also have an active IRC (internet relay chat) network where we provide tripsitting services, harm reduction advice, and general chat.\nhttp://www.tripsit.me/</Text>
        <Text style={styles.text}>Disclaimer</Text>
        <Text style={styles.text}>Although we have a team dedicated to keeping the information on this app up to date, it is not always possible to provide entirely accurate information on the safety level of drugs. The information here should be used as guidelines only, and it is important to do your own research from multiple sources before ingesting a substance. We also strongly advise using a testing kit and scales to ensure you are taking the correct dosage. These can both be bought online for reasonable prices.</Text>
        <Text style={styles.text}>Support TripSit</Text>
        <Text style={styles.text}>TripSit is a completely free service run by volunteers. If you wish to help out, feel free to join the IRC, follow and share our content on social media, or make a donation to keep the servers running.</Text>
        <View style={{flexDirection:"row"}}>
            <Image source={facebook_image} style={styles.icon} />
            <Image source={reddit_image} style={styles.icon} />
            <Image source={twitter_image} style={styles.icon} /> 
            <Image source={bitcoin_image} style={styles.icon} /> 
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff'
  },
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
  searchButton: {
    backgroundColor: 'purple',
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
    color: '#fff',
    alignSelf: 'center'
  },
  icon: {
    height: 60,
    width: 60,
    alignSelf: 'center'
  },
  text: {
    fontSize: 20,
    color: '#fff',
    alignSelf: 'center'
  },
  header: {
    backgroundColor: '#fff',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: '#000'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    // backgroundColor: '#000',
    // color: '#fff'
  },
  inactive: {
    // backgroundColor: '#000',
    // color: '#fff'
  },
});

export default App;