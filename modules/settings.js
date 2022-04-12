import * as React from 'react';
// React elements to use
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

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

function SettingsScreen() {
    // const [allDrugInfo, setallDrugInfo] = React.useState([]);
    // Initialize the database
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Settings Screen</Text>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            // console.log("Starting DB update")
            // Create the table if it does not exist
            // console.log("Dropping table")
            // db.transaction((tx) => {
            //   tx.executeSql('DROP TABLE IF EXISTS drugs');
            // });
            // console.log("Creating table")
            // db.transaction((tx) => {
            //   tx.executeSql(
            //     'CREATE TABLE IF NOT EXISTS drugs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, info TEXT)'
            //   );
            // });
            // console.log("Fetching data")
            fetch('https://tripbot.tripsit.me/api/tripsit/getAllDrugs')
              .then((response) => response.json())
              .then((response) => {
                // var allDrugInfo = response.data[0]
                // console.log(Object.keys(allDrugInfo).length)
                // console.log(allDrugInfo['dxm'])
  
                // db.transaction((tx) => {
                //   tx.executeSql(
                //     'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
                //     ["dxm","allDrugInfo['dxm'].toString()"],
                //     (tx, results) => {
                //       // console.log(results)
                //     }
                //   );
                // })
  
                // // TODO: Use this for the search auto-suggest
                // Object.keys(allDrugInfo).forEach((drugName) => {
                //   // console.log(allDrugInfo[drugName].name)
                //   db.transaction((tx) => {
                //     tx.executeSql(
                //       'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
                //       [drugName,allDrugInfo[drugName].toString()],
                //       (tx, results) => {
                //         // console.log(results)
                //       }
                //     );
                //   })
                // });
                // console.log("DB Updated")
                Alert.alert(
                  'Alert',
                  'DB updated!'
                )
              });
          }}
        >
          <Text style={styles.buttonText}>
            Update database
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

module.exports = { SettingsScreen };