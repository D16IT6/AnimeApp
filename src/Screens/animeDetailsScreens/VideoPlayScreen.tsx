import React, { useState, useRef,useEffect } from "react";
import { Dimensions, TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Color } from "../../common/Colors";
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { NavagitonTop } from "../../common/component";
import fontFamily from "../../common/FontFamily";
import fontSizes from "../../common/FontSizes";
import { AuthNavigator, AuthRoutes, AuthScreenNavigationProps } from "../../navigations/AuthNavigator";

//"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
const VideoPlayScreen = ({route}:any) => {
    const{animeInfo}=route.params
    
    // console.log("id la"+parsedAnimeInfo.name)

    const navigation = useNavigation<AuthScreenNavigationProps>()

    const [clicked, setClicked] = useState(false)
    const [pause, setPause] = useState(false)
    const videoRef = useRef<Video>(null)
    const [progress, setProgress] = useState<{ currentTime: number; seekableDuration: number }>({ currentTime: 0, seekableDuration: 0 });
    const [fullScreen, setFullScreen] = useState(false)
    const [mute, setMute] = useState(false)
    const [lock,setLock]= useState(false)
    const format = (seconds: number) => {
        let mins = parseInt((seconds / 60).toString())
            .toString()
            .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    };

    const e = {
        onPressVideo: () => {
            setClicked(true)
            setTimeout(()=>{
                setClicked(false)
            },5000)
        },
        onPressBackWard: () => {
            videoRef.current?.seek(parseInt((progress.currentTime - 10).toString()))
            setProgress({ ...progress, "currentTime": progress.currentTime - 10 })
        },
        onPressForWard: () => {
            videoRef.current?.seek(parseInt((progress.currentTime + 10).toString()))
            setProgress({ ...progress, "currentTime": progress.currentTime + 10 })
        },
        onPressPause: () => {
            setPause(!pause)
        },
        onPressFullScreen: () => {
            if (fullScreen) {
                Orientation.lockToPortrait();//chieu ngang man hinh
            } else {
                Orientation.lockToLandscape();//chieu doc man hinh
            }
            setFullScreen(!fullScreen)
        },
        onPressMute: () => {
            setMute(!mute)
        },
        onPressLock:()=>{
            setLock(!lock)
        },
        EndVideo: () => {
            setPause(true)
        }
    }
    // console.log(progress)
    return <TouchableOpacity
        style={[styles.backgroundVideo, { height: fullScreen ? "100%" : 200 }]}
        onPress={e.onPressVideo}
        
    >
        <Video 
            source={{ uri: animeInfo.urlFilm }}   // Can be a URL or a local file.
            muted={mute}
            onProgress={(progress: any) => {
                setProgress(progress)
            }}
            style={[styles.backgroundVideo, { height: fullScreen ? "100%" : 200 }]}
            paused={pause}
            ref={videoRef}
            onEnd={() => {
                e.EndVideo()
            }}
            resizeMode="stretch"
        />
        {clicked&&!lock && (
            <TouchableOpacity style={[styles.backgroundVideo,
            styles.videoOverlay, { height: fullScreen ? "100%" : 200 }]}
            // onPress={e.onPressVideo}
            >
                <NavagitonTop OnPressArrowBack={() => { 
                    navigation.navigate(AuthRoutes.AnimeDetails,{animeInfo:animeInfo})
                }
                }
                    backgrourdColor={"rgba(0,0,0,0.3)"}
                    title="Đại chiến gà bay"
                    titleStyle={styles.titleVideo}
                ></NavagitonTop>

                <View style={[styles.duration,{bottom:fullScreen?70:40}]}>
                    <Text style={styles.timeVideo}>{format(progress.currentTime)}</Text>
                    <Slider
                        style={styles.durationTime}
                        minimumValue={0}
                        maximumValue={progress.seekableDuration}
                        minimumTrackTintColor={Color.PrimaryColor}
                        maximumTrackTintColor={Color.Gray}
                        thumbTintColor={Color.SecondaryColor}

                        value={progress.currentTime}
                        onSlidingComplete={(value) => {
                            videoRef.current?.seek(value)
                        }}
                    />
                    <Text style={styles.timeVideo}>{format(progress.seekableDuration)}</Text>
                </View>
                <View style={styles.actionBottom}>
                    <View style={styles.actionBottomLeft}>
                        <TouchableOpacity onPress={e.onPressLock}>
                        < MaterialIcons
                            name={"lock"}
                            size={fullScreen?30:20}
                            color={Color.SecondaryColor} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={e.onPressMute}>
                            < MaterialIcons
                                name={mute ? "volume-off" : "volume-up"}
                                size={fullScreen?30:20}
                                color={Color.SecondaryColor} />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.actionBottomCenter}>
                        <TouchableOpacity onPress={e.onPressBackWard}>
                        < MaterialIcons name="replay-10"
                            size={fullScreen?30:20}
                            color={Color.SecondaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e.onPressPause}
                    >
                        < MaterialIcons
                            name={pause ? "play-circle" : "pause-circle"}
                            size={fullScreen?30:20}
                            color={Color.SecondaryColor} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={e.onPressForWard}>
                        < MaterialIcons
                            name="forward-10"
                            size={fullScreen?30:20}
                            color={Color.SecondaryColor} />
                    </TouchableOpacity>
                    </View>
                    <View style={styles.actionBottomRight}>
                        <TouchableOpacity onPress={() => {
                        e.onPressFullScreen()
                    }}>
                        < MaterialIcons
                            name={fullScreen ? "fullscreen-exit" : "fullscreen"}  //fullscreen-exit
                            size={fullScreen?30:20}
                            color={Color.SecondaryColor} />
                    </TouchableOpacity>
                    </View>
                    
                    
                </View>
            </TouchableOpacity>
        )}
        {
            clicked&&lock&&(
                <TouchableOpacity style={[styles.backgroundVideo,
                    styles.videoOverlay, { height: fullScreen ? "100%" : 200 }]}>
                       <TouchableOpacity onPress={e.onPressLock}
                       style={styles.unLock}>
                        < MaterialIcons
                            name={"lock"}
                            size={fullScreen?30:20}
                            color={Color.PrimaryColor} />
                        </TouchableOpacity>
                </TouchableOpacity>
            )
        }
    </TouchableOpacity>
}

export default VideoPlayScreen

var styles = StyleSheet.create({
    backgroundVideo: {
        width: "100%"
    },
    videoOverlay: {
        backgroundColor: "rgba(0,0,0,0.3)",
         position: "absolute",
    },
    titleVideo:{
        color:Color.SecondaryColor,
        fontFamily:fontFamily.PrimaryFont,
        fontSize:20,
        fontWeight:'400',
        letterSpacing:0.2,
        paddingLeft:20
    },
    duration: {
        flexDirection: "row",
        width: "100%",
        position: "absolute",
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        height:"10%"
    },
    actionBottom:{
        paddingHorizontal:20,
        flexDirection:"row",
        position:"absolute",
        bottom:10,
        // backgroundColor:'green',
        width:"100%",
        height:"15%",
        alignItems:"center",
        justifyContent:"space-between"
    },
    timeVideo:{
        color:Color.SecondaryColor,
        fontFamily:fontFamily.PrimaryFont,
        fontSize:14,
        fontWeight:'700',
        letterSpacing:0.2
    },
    actionBottomCenter:{
        flexDirection:"row",
        width:"30%",
        justifyContent:"space-between"
    },
    actionBottomLeft:{
        flexDirection:"row",
        width:"15%",
        justifyContent:"space-around"
    },
    actionBottomRight:{
        flexDirection:"row",
        width:"15%",  
        justifyContent:"space-around"
    },
    durationTime:{
        flex:1,
    },
    unLock:{
        position:"absolute",
        bottom:"10%",
        left:"5%",
        backgroundColor:Color.SecondaryColor,
        padding:10,
        borderRadius:50
    }
});