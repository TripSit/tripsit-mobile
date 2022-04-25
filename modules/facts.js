import * as React from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
} from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import * as allDrugData from "../assets/data/drug_db_combined.json";
import * as combinedData from "../assets/data/drug_db_combined.json";
import SearchableDropdown from "react-native-searchable-dropdown";
// For the collapseable view on the Facts page
import Accordion from "react-native-collapsible/Accordion";
// For the animation of Collapse and Expand on the accordian
import * as Animatable from "react-native-animatable";
const logger = console

// For each dictionary in the allDrugData list, find the "name" key and add it to a list of index-title pairs
const drugNames = Object.keys(allDrugData).map((key, index) => {
  // console.log(allDrugData[key]["name"] + allDrugData[key]["url"])
  // console.log(allDrugData[key]["summary"])
  return {
    id: index,
    name: allDrugData[key]["name"],
  };
});

// Okay this is stupid, but I'm not sure how to do it better
// We pop out the last element of the array, because the above MAP function adds an 'undefined' element to the array
// I have no idea why it does this, but it does
drugNames.pop();

// console.log(drugNames)

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
      animation={isActive ? "bounceIn" : undefined}
      style={styles.text}
    >
      {section.content}
    </Animatable.Text>
  </Animatable.View>
);

function FactsScreen() {
  const [CONTENT, setCONTENT] = React.useState([]);
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

  function getDrugInfo(drugName) {
    // console.log("starting getDrugInfo with parameter: " + drugName)
    // loop through allDrugData to find the drugName
    var drugData = {};
    // console.debug("all drug data length is: " + Object.keys(allDrugData).length)

    for (var i = 0; i < Object.keys(allDrugData).length; i++) {
      // console.debug("i is: " + i)
      // console.debug("allDrugData[i]['name'] is: " + allDrugData[i]['name'])
      if (allDrugData[i]["name"] == drugName) {
        // console.debug("found drugName: " + drugName)
        drugData = allDrugData[i];
        break;
      }
    }

    // console.debug(drugData)
    // console.debug(drugData['aliases'])

    var summary = drugData["name"] + "\n\n";
    if (drugData["aliases"]) {
      // turn aliases into a string with each alias on a new line
      var aliasString = "";
      for (var i = 0; i < drugData["aliases"].length; i++) {aliasString += drugData["aliases"][i] + "\n";}
      summary += "Also known as: \n" + aliasString + "\n";
    }
    if (drugData["summary"]) {summary += drugData["summary"] + "\n\n";}
    if (drugData["classes"]) {
      if (drugData["classes"]["chemical"]) {summary += "Chemical Class: \n" + drugData["classes"]["chemical"] + "\n\n";}
      if (drugData["classes"]["psychoactive"]) {summary +="Psychoactive Class: \n" + drugData["classes"]["psychoactive"] + "\n\n";}
    }
    if (drugData["reagents"]) {summary += "Reagent test results: \n" + drugData["reagents"] + "\n\n";}
    if (drugData["toxicity"]) {summary += "Toxicity: \n" + drugData["toxicity"] + "\n\n";}
    if (drugData["addictionPotential"]) {summary +="Addiction Potential: \n" + drugData["addictionPotential"] + "\n\n";}
    // if (drugData["url"]){summary += "Links: \n" + drugData["url"] + "\n" + drugData["experiencesUrl"]}
    // if (drugData["experiencesUrl"]){summary += "\n" + drugData["experiencesUrl"]}

    var dosage = "";
    for (var i = 0; i < drugData["roas"].length; i++) {
      // console.log(drugData["roas"][i].name)
      dosage += drugData["roas"][i].name + " Dosage\n";
      if (drugData["roas"][i].bioavailability) {dosage +="Bioavailability: " + drugData["roas"][i].bioavailability + "\n";}
      if (drugData['roas'][i].dosage) {
        for (var j = 0; j < drugData["roas"][i].dosage.length; j++) {
          if (j == 0) {
            if (drugData["roas"][i].dosage[j].note) {dosage += "Note: " + drugData["roas"][i].dosage[j].note + "\n";}
          }
          dosage += drugData["roas"][i].dosage[j].name + ": " + drugData["roas"][i].dosage[j].value + "\n";
        }
      }
      if (drugData['roas'][i].duration) {
        dosage += "\n" + drugData["roas"][i].name + " Duration" + "\n";
        for (var j = 0; j < drugData["roas"][i].duration.length; j++) {
          if (j == 0) {
            if (drugData["roas"][i].duration[j].note) {dosage += "Note: " + drugData["roas"][i].duration[j].note + "\n";}
          }
          // console.log(drugData["roas"][i].duration[j].name + ": " + drugData["roas"][i].duration[j].value)
          dosage += drugData["roas"][i].duration[j].name + ": " + drugData["roas"][i].duration[j].value + "\n";}
      }
      dosage += "\n";
    }

    let tolerance = '';
    if (drugData['tolerance']) {
        tolerance += '\nTolerance' + '\n';
        if (drugData['tolerance'].full) {tolerance += 'Full: ' + drugData['tolerance'].full + '\n';}
        if (drugData['tolerance'].half) {tolerance += 'Half: ' + drugData['tolerance'].half + '\n';}
        if (drugData['tolerance'].zero) {tolerance += 'Zero: ' + drugData['tolerance'].zero + '\n';}
        if (drugData['crossTolerances']) {tolerance += 'Cross Tolerances:\n' + drugData['crossTolerances'] + '\n';}
    }

    dosage += tolerance;

    var combos = "";
    var danger_section = "";
    var unsafe_section = "";
    var caution_section = "";
    var decrease_section = "";
    var nosyn_section = "";
    var synergy_section = "";
    var unknown_section = "";

    if (drugData["interactions"]) {
      // For each interaction status, make a list of those names
      var interactions = drugData["interactions"];
      for (let i = 0; i < interactions.length; i++) {
        if (interactions[i].status == 'Dangerous') {
            danger_section += interactions[i].name + '\n';
            if (interactions[i].note) {danger_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Unsafe') {
            unsafe_section += interactions[i].name + '\n';
            if (interactions[i].note) {unsafe_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Caution') {
            caution_section += interactions[i].name + '\n';
            if (interactions[i].note) {caution_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Low Risk & Decrease') {
            decrease_section += interactions[i].name + '\n';
            if (interactions[i].note) {decrease_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Low Risk & No Synergy') {
            nosyn_section += interactions[i].name + '\n';
            if (interactions[i].note) {nosyn_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Low Risk & Synergy') {
            synergy_section += interactions[i].name + '\n';
            if (interactions[i].note) {synergy_section += 'Note: ' + interactions[i].note + '\n';}
        }
        else if (interactions[i].status == 'Unknown') {
            unknown_section += interactions[i].name + '\n';
            if (interactions[i].note) {unknown_section += 'Note: ' + interactions[i].note + '\n';}
        }
      }

      if (danger_section   != '') {combos += "Dangerous Interactions:\n"  + danger_section + "\n";}
      if (unsafe_section   != '') {combos += "Unsafe Interactions:\n"     + unsafe_section + "\n";}
      if (caution_section  != '') {combos += "Caution Interactions:\n"    + caution_section + "\n";}
      if (decrease_section != '') {combos += "Decrease Interactions:\n"   + decrease_section + "\n";}
      if (nosyn_section    != '') {combos += "No Synergy Interactions:\n" + nosyn_section + "\n";}
      if (synergy_section  != '') {combos += "Synergy Interactions:\n"    + synergy_section + "\n";}
      if (unknown_section  != '') {combos += "Unknown Interactions:\n"    + unknown_section + "\n";}
    }

    // Update the CONTENT being displayed
    var content = [];
    if (summary != "") {
      content.push({ title: "Summary", content: summary });
    }
    if (dosage != "") {
      content.push({ title: "Dosage", content: dosage });
    }
    if (combos != "") {
      content.push({ title: "Interactions", content: combos });
    }
    setCONTENT(content);

    // Finally, display the bottom section
    setShouldShow(true);
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <View style={[styles.container]}>
        <View
          style={[styles.section, Platform.select({ ios: { zIndex: 100 } })]}
        >
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                // console.log(item.name)
                getDrugInfo(item.name);
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: "#ddd",
                borderColor: "#bbb",
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: "#222" }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={drugNames}
              resetValue={false}
              textInputProps={{
                placeholder: "Search substance here!",
                underlineColorAndroid: "transparent",
                style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  backgroundColor: "#ffffff",
                },
              }}
              listProps={{
                nestedScrollEnabled: true,
              }}
            />
          </View>
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
    </SafeAreaView>
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
    // padding: 20,
  },
  logo: {
    width: 305,
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
    height: 60,
    width: 60,
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
  scrollContainer: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 50,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 3,
  },
  section: {
    marginBottom: 40,
  },
});

module.exports = { FactsScreen };
