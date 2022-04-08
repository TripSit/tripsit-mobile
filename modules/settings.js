import * as React from 'react';
// React elements to use
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

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

function SettingsScreen() {
    // const [allDrugInfo, setallDrugInfo] = React.useState([]);
    // Initialize the database
    // const db = SQLite.openDatabase('db.tripsit');
    // return (
    //   <View style={styles.container}>
    //     <Text style={styles.text}>Settings Screen</Text>
    //     <TouchableOpacity
    //       style={styles.searchButton}
    //       onPress={() => {
    //         console.log("Starting DB update")
    //         // Create the table if it does not exist
    //         console.log("Dropping table")
    //         // db.transaction((tx) => {
    //         //   tx.executeSql('DROP TABLE IF EXISTS drugs');
    //         // });
    //         console.log("Creating table")
    //         // db.transaction((tx) => {
    //         //   tx.executeSql(
    //         //     'CREATE TABLE IF NOT EXISTS drugs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, info TEXT)'
    //         //   );
    //         // });
    //         console.log("Fetching data")
    //         fetch('https://tripbot.tripsit.me/api/tripsit/getAllDrugs')
    //           .then((response) => response.json())
    //           .then((response) => {
    //             var allDrugInfo = response.data[0]
    //             console.log(Object.keys(allDrugInfo).length)
    //             console.log(allDrugInfo['dxm'])
  
    //             db.transaction((tx) => {
    //               tx.executeSql(
    //                 'INSERT INTO drugs (name, info) VALUES (?,?) ON CONFLICT(name) DO UPDATE',
    //                 ["dxm","allDrugInfo['dxm'].toString()"],
    //                 (tx, results) => {
    //                   console.log(results)
    //                 }
    //               );
    //             })
  
    //             // TODO: Use this for the search auto-suggest
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

module.exports = { SettingsScreen };