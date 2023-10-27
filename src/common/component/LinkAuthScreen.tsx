import React  from "react";
import { View, Text ,StyleSheet,TouchableOpacity}  from "react-native";   
import { Color } from "../Colors";
import fontFamily from "../FontFamily";
import fontSizes from "../FontSizes";
interface LinkAuthScreenProps {
    title:string,
    onPress:Function,
    textlink:string
}
const LinkAuthScreen:React.FC<LinkAuthScreenProps> =({title,onPress,textlink}) =>{
    return(
        <View style={styles.containerlink}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => {
            onPress()    
        }}>
          <Text style={styles.link}>{textlink}</Text>
        </TouchableOpacity>
        </View>
    )
}
const styles= StyleSheet.create({
    containerlink: {
        flexDirection:'row',
        justifyContent:'center',
      },
      title: {
        fontSize: fontSizes.h4,
        fontFamily: fontFamily.PrimaryFont,
        paddingHorizontal:6,
        color:"#9E9E9E"
      },
      link: {
        color: Color.PrimaryColor,
        fontSize: fontSizes.h4,
        fontFamily: fontFamily.PrimaryFont
      },
})
 
export default LinkAuthScreen