import React, { useState,useRef } from "react";
import { Dimensions, TouchableOpacity,StyleSheet,Text, View, Alert } from "react-native";
import Video from 'react-native-video';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Color } from "../../common/Colors";
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import { NavagitonTop } from "../../common/component";
const anime = {
    url: ""
}
const { width, height } = Dimensions.get('window')
const VideoPlayScreen = () => {
    const [clicked, setClicked] = useState(false)
    const [pause,setPause]= useState(false)
    const videoRef = useRef(null)
    const [progress,setProgress] = useState(null)
    const [fullScreen,setFullScreen] =useState(false)
    const [mute,setMute] =useState(false)
    const format = (seconds) => {
        let mins = parseInt(seconds / 60)
          .toString()
          .padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
      };
      console.log(progress)
    return <TouchableOpacity
    style={[styles.backgroundVideo,{height:fullScreen?"100%":200}]}
        onPress={() => {
            setClicked(true)
            // setTimeout(()=>{
            //     setClicked(false)
            // },5000)
        }}
    >
        <Video source={{ uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" }}   // Can be a URL or a local file.
            //    ref={(ref) => {
            //      this.player = ref
            //    }}                                      // Store reference
            //    onBuffer={this.onBuffer}                // Callback when remote video is buffering
            //    onError={this.videoError}               // Callback when video cannot be loaded
            muted={mute}
            onProgress={(progress:any)=>{
                setProgress(progress)
            }}
            style={[styles.backgroundVideo,{height:fullScreen?"100%":200}]}
            paused={pause}
            ref={videoRef}
            onEnd={()=>{
                Alert.alert("Bạn đã xem hết video")
            }}
            
            resizeMode="stretch"
        />
        {clicked && (
            <TouchableOpacity style={[styles.backgroundVideo,
            styles.videoOverlay,{height:fullScreen?"100%":200}]}> 
            <NavagitonTop OnPressArrowBack={()=>{console.log("hhaa")} 

            }
            backgrourdColor={"rgba(0,0,0,0.3)"}
            title="Đại chiến gà bay"
            titleStyle={{color:Color.SecondaryColor}}
            ></NavagitonTop>
            <View style={{flexDirection:"row"}}> 
                
                <TouchableOpacity onPress={()=>{
                    // if(pause)
                    // {
                    //     // setProgress({...progress,"currentTime"})
                    // }
                    videoRef.current.seek(parseInt(progress.currentTime-10))
                    setProgress({...progress,"currentTime":progress.currentTime-10})
                }}>
                    < MaterialIcons name="replay-10" 
                    size={20} 
                    color={Color.SecondaryColor} />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{
                    setPause(!pause)
                }}
                >
                < MaterialIcons 
                    name={pause?"play-circle":"pause-circle"}
                    size={20} 
                    color={Color.SecondaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                     videoRef.current.seek(parseInt(progress.currentTime+10))
                     setProgress({...progress,"currentTime":progress.currentTime+10})
                }}>
                    < MaterialIcons 
                    name="forward-10" 
                    size={20} 
                    color={Color.SecondaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    if(fullScreen){
                        Orientation.lockToPortrait();//chieu ngang man hinh
                    } else{
                        Orientation.lockToLandscape();//chieu doc man hinh
                    }
                    setFullScreen(!fullScreen)
                }}>       
                    < MaterialIcons 
                    name={fullScreen?"fullscreen-exit":"fullscreen"}  //fullscreen-exit
                    size={20} 
                    color={Color.SecondaryColor} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    setMute(!mute)
                }}>
                    < MaterialIcons 
                    name={mute?"volume-off":"volume-up"} 
                    size={20} 
                    color={Color.SecondaryColor} />
                </TouchableOpacity>
                </View>   
                <View style={styles.duration}>
                    <Text>{format(progress.currentTime)}</Text>
                    <Slider
                    style={{width:"80%", height: 40}}
                    minimumValue={0}
                    maximumValue={progress.seekableDuration}
                    // minimumTrackTintColor="#FFFFFF"
                    // maximumTrackTintColor="#000000"
                    // thumbTintColor="yellow"
                    trackStyle={{
                        height: 5,
                        borderRadius: 5,
                        backgroundColor: 'gray', // Màu cho phần video đã tải
                      }}
                      thumbStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: 'green', // Màu cho phần video đã xem
                      }}
                      maximumTrackTintColor="red" // Màu cho phần video chưa xem
                    value={progress.currentTime}
                    onSlidingComplete={(value)=>{
                        videoRef.current.seek(value)
                    }}
                    />
                    <Text>{format(progress.seekableDuration)}</Text>
                </View>
            </TouchableOpacity>
        )}
    </TouchableOpacity>
}

export default VideoPlayScreen

var styles = StyleSheet.create({
    backgroundVideo: {
        width: "100%",
        backgroundColor:"green"
    },
    videoOverlay: {
        backgroundColor: "rgba(0,0,0,0.3)",
        position: "absolute",
        justifyContent: "center",
        alignItems: 'center',
        // flexDirection:"row"
    },
    duration:{
        flexDirection:"row",
        width:"100%",
        position:"absolute",
        bottom:20
    }
});