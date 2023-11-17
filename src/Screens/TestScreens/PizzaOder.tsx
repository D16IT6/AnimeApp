import React, { useState } from "react";
import{View ,Text, StyleSheet, ImageBackground,Image, Dimensions, TouchableOpacity, Alert} from "react-native"
import { Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
const {height,width} =Dimensions.get('window')


const PizzaOder =()=>{
    const [quantity,setQuantity] =useState(0)
    return(
        <SafeAreaView>
        <Image source={require('../../assets/images/nhung-quan-pizza-ngon-nhat-Ha-Noi-9.jpg') } style={styles.img}></Image>
        <View style={styles.containerShop}>
            <Text style={styles.nameShop}>Italian Supreme</Text>
            <Text style={styles.category}>Pizza Sauce,Tomato,Green Pepper,Black Oliver,Pizza Sauce,Tomato,Green Pepper,Black Oliver,Pizza Sauce,Tomato,Green Pepper,Black Oliver</Text>
        </View>
       
        <View style={styles.selectSize}>
            <Text style={styles.name}>Select Size</Text>
            <SelectSize 
             title='large 13.5"'
             price={19.99}
             ></SelectSize>
              <SelectSize 
             title='Small 9.5"'
             price={10.99}
             ></SelectSize>
              <SelectSize 
             title='Medium 11.5"'
             price={15.99}
             ></SelectSize>
        </View>
        <View style={styles.choose}>
            <Text style={styles.name} >Choose Add On</Text>
            <Choose
            title='Extra Cheese'
            price={1.00}
            ></Choose>
            <Choose
            title='Chicken'
            price={1.00}
            ></Choose>
            <Choose
            title='Pizza'
            price={1.00}
            ></Choose>
        </View>
        <View style={styles.addCart}>
            <View style={styles.quantity}>         
            <TouchableOpacity style={styles.containerMinus_Add}
            onPress={()=>{
                if(quantity!==0)
                {
                    setQuantity(quantity-1)
                }
                
            }}
            >
                    <FontAwesome name="minus" color={"#fff"} size={30}></FontAwesome>
                </TouchableOpacity>
                <Text style={{textAlign:'center',width:width*0.1,textAlignVertical:'center',fontSize:30,fontWeight:'bold'}}>{quantity.toString()}</Text>
                <TouchableOpacity style={[styles.containerMinus_Add,{marginLeft:0}]}
                 onPress={()=>{
                    setQuantity(quantity+1)
                }}>
                    <Ionicons name="add" color={"#fff"} size={30}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addCartButton}>
                <Text style={{color:'#fff',fontSize:20,}}>Add($29)</Text>
            </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>   
    )
}
interface selectSizeProps {
    title:string,
    price:Number,
}
const SelectSize:React.FC<selectSizeProps> = ({title, price}) =>{
    const[ischeck,setIsCheck]=useState(false)
    return(
        <View style={styles.containerChoose_select}>
           <TouchableOpacity style={[styles.radiobuton,{borderColor:ischeck?'green':"#a1a2a2"}]}
           onPress={()=>setIsCheck(!ischeck)}
           >
           <FontAwesome name="circle" color={ischeck?'green':'#fff'} size={22}/>
           </TouchableOpacity>
           <Text style={styles.title}>{title}</Text>
           <Text style={styles.price}>$ {price.toString()}</Text>
        </View>
    )
}
interface ChooseProps {
    title:string,
    price:Number,
}
const Choose:React.FC<ChooseProps>=({title,price})=>{
    const[ischeck,setIsCheck]=useState(false)
    return(
        <View style={styles.containerChoose_select}>
            <TouchableOpacity style={[styles.chooseButton,{backgroundColor:ischeck?'green':'#fff'}]}
            onPress={()=>{
               setIsCheck(!ischeck)
            }}
            >
            <AntDesign name="check" color={'white'} size={30}/>
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>$ {price.toString()}</Text>
        </View>
    )
}
const styles =StyleSheet.create({
    img:{
        height:height*0.3
    },
    radiobuton:{
        width:30,
        height:30,   
        borderWidth:2,
        borderRadius:20,
        marginHorizontal:10,  
        justifyContent:'center',
        alignItems:'center',
       
    },
    chooseButton:{
        width:30,
        height:30,
        borderWidth:1,
        borderColor:'#a1a2a2',
        borderRadius:5,
        marginHorizontal:10,
    },
    containerShop:{
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:10
    },
    nameShop:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    category:{
        fontSize:16,
        color:'#a1a2a2'
    },
    selectSize:{
        backgroundColor:'#eeeeee',
        height:height*0.2,
        marginBottom:20
    },
    choose:{
        backgroundColor:'#eeeeee',
        height:height*0.2,
    },
    name:{
        paddingLeft:10,
        height:50,
        color:'black',
        fontWeight:'bold',
        fontSize:20,
        textAlignVertical:'center'
    },
    containerChoose_select:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:'25%',
        borderWidth:0.5,
        borderBlockColor:'#a1a2a2',
        alignItems:'center'
    },
   title:{
        paddingLeft:20,
        color:'#848484',
        fontSize:20,
        textAlignVertical:'center'
   },
   price:{
    position:'absolute',
    color:'#a8ff58',
    fontSize:20,
    right:10,
    textAlignVertical:'center'
   },
   addCart:{
    marginTop:20,
    height:height*0.1,
    justifyContent:'center'
   },
   containerMinus_Add:{
    marginLeft:20,
    width: 60,
    height: 50,
    backgroundColor: '#545454',
    justifyContent: 'center',
    alignItems: 'center',
   },
   quantity:{
    flexDirection:'row'
   },
   addCartButton:{
    height:height*0.05,
    backgroundColor:"#82c544",
    width:width*0.3,
    right:20,
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5
   }
})

export default PizzaOder

