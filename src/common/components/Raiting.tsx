import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Icon from "react-native-vector-icons/AntDesign"
import { Color } from '../Colors';
import ButtonAuthScreen from './ButtonAuthScreen';
import Screen from '../../utils/screenInformation';
import fontFamily from '../FontFamily';

type StarProps = {
    size: number,
    name: string,
    onPress?: () => void
}
const Star = (props: StarProps) => {
    const { size,
        name,
        onPress
    } = props
    return <TouchableOpacity onPress={onPress}>
        <Icon name={name} size={size} color={Color.PrimaryColor}></Icon>
    </TouchableOpacity>
}
type RaitingProps={
    totalRaiting:number|undefined
    scrollTo: (destination: number) => void,
}
const Raiting = memo((props:RaitingProps) => {
    const{totalRaiting,
        scrollTo
    }=props
    const [defaultRaiting, setDefaultRating] = useState<number>(2)
    const maxRaiting:number[] =[1, 2, 3, 4, 5]
    console.log(totalRaiting)

    console.log(defaultRaiting)
    const handlePressStar = useCallback((item:number) => {
        setDefaultRating(item)
    }, [])
    const handlePressCancel=()=>{
        Alert.alert("Thông báo",`Bạn có chắc chắn muốn thoát `, [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Đồng ý',
              onPress:() => {
                scrollTo(0);
              },
            },
          ],
          { cancelable: false })
    
    } 
    const handlePressSubmit=()=>{
        Alert.alert("Thông báo",`Bạn có chắc chắn muốn lưu Đánh giá ${defaultRaiting} sao`, [
            {
              text: 'Hủy',
              style: 'cancel',
            },
            {
              text: 'Đồng ý',
              onPress:() => {
                scrollTo(0);
              },
            },
          ],
          { cancelable: false })
    }
    return (
        <View style={styles.containerRaiting}>
            <Text style={styles.titleRaiting}>Đưa ra đánh giá</Text>
            <View style={styles.contentTotalRaiting}>
                <View style={styles.textRaiting}>
                    <Text style={styles.totalRaiting}>{totalRaiting}</Text>
                    <Text style={styles.maxRaiting}>/5</Text>
                </View>
                <View style={styles.contentRaiting}>
                {maxRaiting.map((item,index) => {
                    return (<Star
                        key={index}
                        size={15}
                        name={item<=(totalRaiting ?? 0)?"star":"staro"}           
                    ></Star>)
                })}
                 </View>
                <Text style={styles.totalUserRaiting}>( 600 người )</Text>
            </View>
            <View style={styles.contentRaiting}>
                {maxRaiting.map((item,index) => {
                    return (<Star
                        key={index}
                        size={30}
                        name={item<=defaultRaiting?"star":"staro"}
                        onPress={()=>handlePressStar(item)}
                    ></Star>)
                })}
            </View>
            <View style={styles.btnContainer}>
                <ButtonAuthScreen
                    title="Cancel"
                    onPressBtn={() => { handlePressCancel()}}
                    styleBtn={styles.btnCancel}
                    styleTitle={styles.titleCancel}
                ></ButtonAuthScreen>
                <ButtonAuthScreen
                    title="Lưu"
                    onPressBtn={() => { handlePressSubmit() }}
                    styleBtn={styles.btnSubmit}
                ></ButtonAuthScreen>
            </View>

        </View>
    )
});
export default Raiting;

const styles = StyleSheet.create({
    containerRaiting: {
        backgroundColor: Color.SecondaryColor,
        width: "100%",
        height: Screen.height * 0.35
    },
    titleRaiting: {
        color: Color.Black,
        fontSize: 30,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: '700',
        textAlign: "center",
        marginHorizontal: 10,
        paddingVertical: 10,
    },
    contentTotalRaiting: {
        justifyContent: "center",
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#EEEEEE",
        paddingVertical: 10,
        marginHorizontal: 20
    },
    totalRaiting: {
        color: Color.Black,
        fontSize: 48,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: '700',
        textAlign: "center",
        textAlignVertical: 'center',

    },
    maxRaiting: {
        color: "#616161",
        fontSize: 20,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: '700',
        textAlignVertical: 'center',

    },
    totalUserRaiting: {
        color: "#424242",
        fontSize: 15,
        fontFamily: fontFamily.PrimaryFont,
        fontWeight: '500',
        textAlignVertical: 'center',
    },
    textRaiting: {
        flexDirection: "row",
    },
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    btnCancel: {
        width: Screen.width / 3,
        height: 50,
        backgroundColor: "#E6F9ED"
    },
    titleCancel: {
        color: Color.PrimaryColor
    },
    btnSubmit: {
        width: Screen.width / 3,
        height: 50,
    },
    contentRaiting: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center"
    }
})