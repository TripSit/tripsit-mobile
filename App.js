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
        <Stack.Screen name="FactSearch" component={FactSearchScreen}/>
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


function FactsScreen({ navigation }) {
  const [searchValue, setSearchValue] = React.useState("");
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
          onSubmitEditing={() => factSearchFunction({navigation, searchValue})}
        />
        <TouchableOpacity 
          // onPress={() => factSearchFunction({searchValue})}
          onPress={() => {
            console.log("searchValue: " + searchValue)
            var factsheetUrl = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=" + searchValue
            var factsheetUrlTest = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA"
            console.log(factsheetUrl)
            navigation.navigate('FactResults')
          }}
          // onPress={() => navigation.navigate('FactResults', {searchValue})}
          >
          <Text style={styles.searchButton}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function FactSearchScreen(searchValue) {
  // console.log(searchValue)
  // const { searchValue } = route.params
  // console.log("start getSubstanceInfo" + {searchValue})
  // const nav = useNavigation()
  // nav.navigate('FactResults')

  // var factsheetUrl = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=" + searchValue
  var factsheetUrl = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA"
  console.log(factsheetUrl)

  // var CONTENT = []
  // let [CONTENT, setCONTENT] = React.useState([]);
  // const [quote, setQuote] = React.useState('')
  // let [CONTENT, setCONTENT] = React.useState([
  //   {
  //     title: 'Aliases',
  //     content: "",
  //   },
  //   {
  //     title: 'Summary',
  //     content: '',
  //   },
  //   {
  //     title: 'Categories',
  //     content:'',
  //   },
  //   {
  //     title: 'General Advice',
  //     content:'',
  //   },
  //   {
  //     title: 'Dose Note',
  //     content:'',
  //   },
  //   {
  //     title: 'Dosage',
  //     content:'',
  //   },
  //   {
  //     title: 'Timing',
  //     content:'',
  //   },
  //   {
  //     title: 'Aftereffects',
  //     content:'',
  //   },
  //   {
  //     title: 'Combos',
  //     content:'',
  //   },
  //   {
  //     title: 'Links',
  //     content:'',
  //   },
  //   {
  //     title: 'Sources',
  //     content:'',
  //   },
  // ]);

  // try {

  //   // let response = await fetch(factsheetUrl);
  //   // let json = await response.json();
  //   console.log("starting fetch")
  //   fetch(factsheetUrl)
  //     .then(response => response.json())
  //     .then(response => {
  //       console.log(response.data[0].dose_note)
  //       // setQuote(response.data[0].dose_note)
  //       // setCONTENT(
  //       //   [
  //       //     {
  //       //       title: 'Aliases',
  //       //       content: response.data[0].dose_note,
  //       //     },
  //       //     {
  //       //       title: 'Summary',
  //       //       content: 'omg',
  //       //     },
  //       //     {
  //       //       title: 'Categories',
  //       //       content:'hello',
  //       //     },
  //       //     {
  //       //       title: 'General Advice',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Dose Note',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Dosage',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Timing',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Aftereffects',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Combos',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Links',
  //       //       content:'',
  //       //     },
  //       //     {
  //       //       title: 'Sources',
  //       //       content:'',
  //       //     },
  //       //   ]
  //       // )
  //     })
  //     .then(navigation.navigate('FactResults'))
  // } catch (error) {
  //   console.error(error)
  // }
  return(
    <View style={styles.container}>
      <Text style={styles.text}>
        Chat Screen
      </Text>
    </View>
  )
}

function factSearchFunction({ navigation, searchValue}) {
  const nav = useNavigation();
  // const navi = 
  console.log("searchValue: " + searchValue)
  var factsheetUrl = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=" + searchValue
  var factsheetUrlTest = "https://tripbot.tripsit.me/api/tripsit/getDrug?name=MDMA"
  console.log(factsheetUrl)
  // FactsResultsScreen()
  nav.navigate('FactResults')
  // props.navigation.navigate('FactResults');
  // withNavigation('FactResults')
}

function FactsResultsScreen() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [multipleSelect, setmultipleSelect] = React.useState(true);
  const [activeSections, setActiveSections] = React.useState([]);

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

    let [CONTENT, setCONTENT] = React.useState([
    {
      title: 'Aliases',
      content: "",
    },
    {
      title: 'Summary',
      content: '',
    },
    {
      title: 'Categories',
      content:'',
    },
    {
      title: 'General Advice',
      content:'',
    },
    {
      title: 'Dose Note',
      content:'',
    },
    {
      title: 'Dosage',
      content:'',
    },
    {
      title: 'Timing',
      content:'',
    },
    {
      title: 'Aftereffects',
      content:'',
    },
    {
      title: 'Combos',
      content:'',
    },
    {
      title: 'Links',
      content:'',
    },
    {
      title: 'Sources',
      content:'',
    },
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={toggleExpanded}>
          <View style={styles.text}>
            <Text style={styles.text}>Results</Text>
            {/*Heading of Single Collapsible*/}
          </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed}>
          <View>
            <Text style={styles.text}>
              You searched for:
            </Text>
          </View>
          </Collapsible>

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


function ComboScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Combo Screen</Text>
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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About Screen</Text>
    </View>
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