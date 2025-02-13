import React from "react"
import {
    View,
    Text,
    StyleSheet,//Responsible for styling components
    useColorScheme,//useing color mode in mobile
} from 'react-native'

function AppPro():JSX.Element{
    const isDarkMode= useColorScheme()==='dark'

    return(
        <View style={styling.container}>
            <Text style={isDarkMode ? styling.whiteText : styling.darkText}>
                Hello World
            </Text>
        </View>
    )
}

const styling= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'flex-end',//left to right
        justifyContent:'flex-start',//top to bottom
        
    },
    whiteText:{
        color:"#fff",
    },
    darkText:{
        color:"#000",
    }
})
export default AppPro;