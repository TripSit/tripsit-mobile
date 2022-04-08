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

module.exports = { FactsScreen };