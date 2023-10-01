import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { setItem } from '../../utils/asyncStorage'
export default function ResetWelcome() {
  return (
    <View>
        <TouchableOpacity style={{
            width:50,
            height:50,
            backgroundColor:"green"
        }}
        onPress={()=>{
            setItem('welcomed','0')
        }}
        >
            
            <Text>Reset</Text>
        </TouchableOpacity>
      
    </View>
  )
}