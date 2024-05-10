import {StyleSheet, View, Text, } from "react-native"
import TabTwoScreen from './explore';
export default function HomeScreen() {

  return (
    
      <View style={styles.container}>
        <Text style={styles.text}>
          home cardapio
        </Text>
        <TabTwoScreen/>
      </View >
      
    
  )

  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }, text: {
      // color: 'white'
    }
  });