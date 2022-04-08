/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Node } from "react"
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native"
import { Colors } from "react-native/Libraries/NewAppScreen"

function TestScreen() {
  const isDarkMode = useColorScheme() === "dark"

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  }

  return (
    <SafeAreaView style={[backgroundStyle, { flex: 1 }]}>
      <ScrollView
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}
      >
        <View style={[styles.container]}>
          <Text style={styles.title}>Autocomplete dropdown</Text>
          <View
            style={[styles.section, Platform.select({ ios: { zIndex: 100 } })]}
          >
            <Text style={styles.sectionTitle}>Local list</Text>
            <View>
              <AutocompleteDropdown
                clearOnFocus={false}
                closeOnBlur={true}
                initialValue={{ id: "2" }} // or just '2'
                onSelectItem={setSelectedItem}
                dataSet={[
                  { id: "1", title: "Alpha" },
                  { id: "2", title: "Beta" },
                  { id: "3", title: "Gamma" }
                ]}
              />
              <Text style={{ color: "#668", fontSize: 13 }}>
                Selected item: {JSON.stringify(selectedItem)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  container: {
    padding: 20
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 50
  },
  section: {
    marginBottom: 40
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 3
  }
})

module.exports = { TestScreen };