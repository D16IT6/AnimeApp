import { View, Text,TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import { removeItem, setItem } from '../../utils/asyncStorage'
import { useNavigation } from '@react-navigation/native'
import { AuthScreenNavigationProps } from "../../navigations/AuthNavigator"
import { AuthRoutes } from '../../navigations/AuthNavigator'
import useCustomNavigation from '../../common/components/useCustomNavigation';

export default function ResetWelcome() {
  const navigation = useNavigation<AuthScreenNavigationProps>();
  const handleReset = async ()=>{
    await removeItem('welcomed')
    navigation.push(AuthRoutes.ResetWelcome);
  }
  
  return (
    <View>
        <TouchableOpacity style={{
            width:50,
            height:50,
            backgroundColor:"green"
        }}
        onPress={handleReset}
        >
            
            <Text>Reset</Text>
        </TouchableOpacity>
      
    </View>
  )
}