// rnfe
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import FancyCard from './Components/FancyCard'


const App = () => {
  return (
    <SafeAreaView style={style.overall}>
        <FancyCard/>

    </SafeAreaView>
  )
}
const style=StyleSheet.create({
  overall:{
    flex:1,
    backgroundColor:'black',
  }
})
export default App