import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import * as allDrugData from "../assets/data/drug_db_combined.json";
import * as combo_definitions from "../assets/data/combo_definitions.json";
import SearchableDropdown from "react-native-searchable-dropdown";
// const logger = require('./utils/logger.js');
// const PREFIX = require('path').parse(__filename).name;
const PREFIX = "combo";

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
// The above function adds an undefined element because that's how the JSON file is imported, for some reason
// TODO - JSON UNDEFINED ISSUE
drugNames.pop();

// console.log(drugNames)
var drug_a = "";
var drug_b = "";

function ComboScreen() {
  // Define objects to hold search data
  const [drugA, setDrugA] = React.useState("");
  const [drugB, setDrugB] = React.useState("");
  // Much like Factsheets, the results only display after you search
  const [shouldShow, setShouldShow] = React.useState(false);
  // Define object to store results
  const [results, setResults] = React.useState({});

  function getDrugCombo() {
    // console.log("started combo!")
    // console.log("drug_a is: " + drug_a)
    // console.log("drug_b is: " + drug_b)
    var comboData = "";
    if (drug_a != "" && drug_b != "") {
    // console.log("both drugs are set!");
      for (var i = 0; i < Object.keys(allDrugData).length; i++) {
        // TODO - JSON UNDEFINED ISSUE - Same as above
        if (!!allDrugData[i]) {
          // console.debug("allDrugData[i]['name'] is: " + allDrugData[i]['name'])
          if (allDrugData[i]["name"] == drug_a) {
          // console.debug("found drug_a: " + drug_a);
            drugData = allDrugData[i];
            if (!!allDrugData[i]["interactions"]) {
            // console.debug(`${drug_a} interactions: ${allDrugData[i]["interactions"].length}`);
              for (var j = 0; j < allDrugData[i]["interactions"].length; j++) {
              // console.debug(`Interaction ${j} is: ${allDrugData[i]["interactions"][j]["name"]}`);
                if (allDrugData[i]["interactions"][j]["name"] == drug_b) {
                  const status = allDrugData[i]["interactions"][j]["status"];
                // console.debug(`Found interaction with ${drug_b}: ${status}`);
                  // Loop through combo_definitions and find the object where "status" is equal to result
                  for (
                    var k = 0;
                    k < Object.keys(combo_definitions).length;
                    k++
                  ) {
                    if (combo_definitions[k]["status"] == status) {
                    // console.debug(`Found combo_defs: ${combo_definitions[k]["status"]}`);
                      const definition = combo_definitions[k]["definition"];
                    // console.debug(`Definition: ${definition}`);
                      const emoji = combo_definitions[k]["emoji"];
                    // console.debug(`Emoji: ${emoji}`);
                      const color = combo_definitions[k]["color"];
                    // console.debug(`Color: ${color}`);
                      const output = `${emoji}  ${status} ${emoji}`;
                      comboData = `${output}\n\n${definition}`;
                    // console.debug(`Output: ${output}`);
                      setResults(comboData);
                      setShouldShow(true);
                      break;
                    }
                  }
                  break;
                }
              }
              if (comboData == "") {
                setResults(
                  "Interaction data not found between " +
                    drug_a +
                    " and " +
                    drug_b
                );
                setShouldShow(true);
                break;
              }
            } else {
              setResults("Interaction data not found for " + drug_a);
              setShouldShow(true);
              break;
            }
          }
        }
      }
    }
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                // console.log(item.name)
                drug_a = item.name;
                setDrugA(item.name);
                getDrugCombo();
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
          <View>
            <SearchableDropdown
              onItemSelect={(item) => {
                // console.log(item.name)
                drug_b = item.name;
                setDrugB(item.name);
                getDrugCombo();
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
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{drugA}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{drugB}</Text>
          </TouchableOpacity>
        </View>
        {shouldShow ? (
          <View style={styles.container}>
            <Text style={styles.buttonText}>{results}</Text>
          </View>
        ) : null}
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

module.exports = { ComboScreen };
