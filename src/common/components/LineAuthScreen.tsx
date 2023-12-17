import React from "react";
import { View, Text ,StyleSheet}  from "react-native";   

const LineAuthScreen =({title}:{title:string}) =>{
    return(
        <View style={styles.containerline}>
          <View style={styles.line} />
          <Text style={styles.textor}>{title}</Text>
          <View style={styles.line} />
        </View>
    )
}
const styles= StyleSheet.create({
    containerline: {
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEEEEE',
      },
      textor: {
        marginHorizontal: 10,
        fontSize: 18,
        color: '#000',
      },
})
 
export default LineAuthScreen