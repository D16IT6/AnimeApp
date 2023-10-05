import React from "react";
import { Text, View, TouchableOpacity, ImageBackground, SafeAreaView, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AuthScreenNavigationProps, AuthRoutes } from "../../navigations/AuthNavigator";
import { backgroundImage } from "../../common/Images";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { Button } from 'react-native-elements';
import {WhiteCustom,PrimaryColor} from '../../common/Colors';
import { setItem } from "../../utils/asyncStorage";
const{width,height} =Dimensions.get('window')

interface DotComponentProps {
    selected: boolean;
    isLight: boolean;
  }

const WelcomeScreen = () => {
    const navigation = useNavigation<AuthScreenNavigationProps>();
    const handDone = () =>{
        navigation.navigate(AuthRoutes.ResetWelcome)
        setItem('welcomed','1');
    }
    const dotComponentUI :React.FC<DotComponentProps> = ({ isLight, selected }) => {
        let backgroundColor;
        let width;
        if (isLight) {
          backgroundColor = selected ? PrimaryColor : '#e0e0e0';
          width=selected?30:10;
        } else {
          backgroundColor = selected ? PrimaryColor : '#e0e0e0';
          width=selected?30:10;
        }
        return (         
            <View style={{width,height:10,borderRadius:50,backgroundColor,marginHorizontal:3}}>              
            </View>          
        );
      };
    const backgroundColor = (isLight:boolean) => (isLight ? '#fef3c7' : '#6d7594');
    const color = (isLight:boolean) => backgroundColor(!isLight);
    const Next =({isLight,...props}:{isLight:boolean})=>{
        return(
            <Button
            title={'Tiếp tục'}
            buttonStyle={{
                backgroundColor: backgroundColor(isLight),
              }}
              containerStyle={{
                marginHorizontal:10,
                marginVertical:5,
                width: width*0.25,
                backgroundColor: backgroundColor(isLight),
              }}
                titleStyle={{ color: color(isLight),fontSize:width*0.025}}
            {...props}
            
            />
        )
    }
    const Skip =({isLight,...props}:{isLight:boolean})=>{
        return(
        <Button
            title={'Bỏ qua'}
            buttonStyle={{
                backgroundColor: backgroundColor(isLight),
              }}
              containerStyle={{
                marginHorizontal:10,
                marginVertical:5,
                width: width*0.25,
                backgroundColor: backgroundColor(isLight),
              }}
                titleStyle={{ color: color(isLight),fontSize:width*0.025 }}
            {...props}
            
            />
        )
    }
    const doneButton = ({isLight,...props}:{isLight:boolean}) =>{
        return(
        <Button
            title={'Bắt Đầu'}
            buttonStyle={{
                backgroundColor: "#a78bfa",
              }}
              containerStyle={{
                marginHorizontal:10,
                marginVertical:5,
                width: width*0.25,
                backgroundColor: backgroundColor(isLight),
              }}
                titleStyle={{ color: color(isLight),fontSize:width*0.025 }}
            {...props}
            
            />
        )
    }
    return (
             <View style={styles.container}> 
                <Onboarding
                    onDone={handDone}
                    onSkip={handDone}
                    NextButtonComponent={Next}
                    SkipButtonComponent={Skip}
                    DoneButtonComponent={doneButton}
                    bottomBarHighlight={false}
                    DotComponent={dotComponentUI}
                    titleStyles={styles.title}
                    subTitleStyles={styles.subtitle}
                    containerStyles={{paddingHorizontal:10}}
                    pages={[
                        {
                            backgroundColor: '#6d7594',
                            image:(                        
                              <LottieView source={require("../../assets/animation/animation_anime.json") } style={styles.lottie} autoPlay loop></LottieView>                          
                            ),
                            title: 'AnimeFlix',
                            subtitle: 'Trải nghiệm thế giới anime tuyệt vời trên điện thoại di động của bạn',
                        },
                        {
                            backgroundColor: '#fef3c7',
                            image: (
                                <LottieView source={require("../../assets/animation/animation_listsearch.json")} style={styles.lottie} autoPlay loop />
                          ),
                            title: 'Tìm kiếm Anime',
                            subtitle: 'Khám phá và xem hàng ngàn bộ anime yêu thích của bạn',
                        },
                        {
                            backgroundColor: '#a78bfa',
                            image:(
                                <LottieView source={require("../../assets/animation/animation_listlike.json")} style={styles.lottie}  autoPlay loop />
                            ),
                            title: 'Danh sách yêu thích',
                            subtitle: 'Lưu trữ và quản lý danh sách anime yêu thích của bạn',
                        },
                    ]}
                />
             </View> 


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    lottie: {
        width: width*0.8,
        height: width*0.7
    },
    doneButton:{
        backgroundColor:'red'
    },
    title:{
         fontFamily:'Urbanist',fontSize:width*0.1
    },
    subtitle:{
         fontFamily:'Urbanist',fontSize:width*0.05
    }
})
export default WelcomeScreen
