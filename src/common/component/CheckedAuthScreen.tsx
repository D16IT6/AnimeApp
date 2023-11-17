import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions ,TouchableOpacity} from "react-native";
import { Color } from "../Colors";
import fontFamily from "../FontFamily";
import fontSizes from "../FontSizes";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome"

interface CheckedAuthScreenProps {
    onCheckedChange:Function
}
const CheckedAuthScreen:React.FC<CheckedAuthScreenProps> = ( {onCheckedChange})=>{
    const[isChecked,setIsChecked] = useState(false)
    const handleCheckedChange = () => {
        const newCheckedValue = !isChecked;
        setIsChecked(newCheckedValue);
        onCheckedChange(newCheckedValue);
      };
    return(
        <View style={styles.container}>
            <TouchableOpacity  onPress={handleCheckedChange}
            style={[styles.checkbox,{backgroundColor:isChecked?Color.PrimaryColor:Color.SecondaryColor}]}>      
               {
                isChecked&&(
                    <FontAwesomeIcons name="check" color={"#fff"} size={15}></FontAwesomeIcons>
                )
               }       
            </TouchableOpacity>
            <Text style={styles.title}>Nhớ tài khoản</Text>
        </View> 
    )
}
export default CheckedAuthScreen

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    checkbox:{
        width:25,
        height:25,
        borderWidth:3,
        borderColor:Color.PrimaryColor,
        borderRadius:7,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:10
    },
    title:{
        color:"#212121",
        fontWeight:'bold'
    }
})