/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


const App = () => {
  return (
    <View>
      <Text style= {styles.text}>
        Hello World
      </Text>
    </View>
  )
}
//  const App = appNavigation

export { App };
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    backgroundColor: 'red',
    color:'white'
  }
}
);