import React, { useState } from 'react';
import { View, TextInput, Animated, StyleSheet } from 'react-native';

const MyListScreen = () => {
  const [inputValue, setInputValue] = useState('');
  const [isForcus,setIsForcus]= useState(false)
  const translateY = new Animated.Value(isForcus ? -20 : 0);
  const fontSize = new Animated.Value(isForcus  ? 12 : 16);

  const handleInputChange = () => {
    setIsForcus(true)
    
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: isForcus ? -20 : 0,
        duration: 3000,
        useNativeDriver: false,
      }),
      Animated.timing(fontSize, {
        toValue: isForcus ? 12 : 16,
        duration: 3000,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const placeholderStyle = {
    transform: [{ translateY }],
    fontSize,
  };

  return (
    <View style={styles.inputWrapper}>
      <Animated.Text style={[styles.placeholder, placeholderStyle]}>
        Placeholder
      </Animated.Text>
      <TextInput
        value={inputValue}
        onChangeText={(text)=>{setInputValue(text)}}
        style={styles.input}
        onFocus={handleInputChange}
        onBlur={()=>{inputValue!==''?setIsForcus(true):setIsForcus(false)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 20,
    color: '#999',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    fontSize: 16,
  },
});


export default MyListScreen