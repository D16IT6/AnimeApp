import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Color } from '../Colors';
import fontFamily from '../FontFamily';

const data = [
  { label: 'Sesion 1', value: '1' },
  { label: 'Sesion 2', value: '2' },
  
];
const {width,height}=Dimensions.get("window")
const DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
         iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Sesion2' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item:any) => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width:width*0.3,
    marginRight:20,justifyContent:'center'
  },
  dropdown: {
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    // borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 18,
    color:Color.PrimaryColor,
    fontFamily:fontFamily.PrimaryFont,
    fontWeight:"600"
  },
  selectedTextStyle: {
    fontSize: 18,
    color:Color.PrimaryColor,
    fontFamily:fontFamily.PrimaryFont,
    fontWeight:"600"
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  itemTextStyle:{
    fontSize: 18,
    color:Color.PrimaryColor,
    fontFamily:fontFamily.PrimaryFont,
    fontWeight:"600"
  }
});