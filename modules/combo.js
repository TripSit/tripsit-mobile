import * as React from 'react';
// React elements to use
import {
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


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


module.exports = { ComboScreen };