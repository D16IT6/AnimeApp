import React  from "react";
import { View, Text ,StyleSheet,TouchableOpacity}  from "react-native";   
import { PrimaryColor } from "../Colors";
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
        fontSize: 13,
        fontFamily: 'Urbanist',
        paddingHorizontal:6,
        color:"#9E9E9E"
      },
      link: {
        color: PrimaryColor,
        fontSize: 13,
        fontFamily: 'Urbanist'
      },
})
 
export default LinkAuthScreen