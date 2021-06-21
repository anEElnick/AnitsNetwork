import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Dimensions,
} from 'react-native';
import images from '../../assets/images';
import IconButton from './IconButton';






const TopNavigator = ( { navigation }) => {
 
  return (
    <SafeAreaView style={styles.container}>
      <View style = {{ flexDirection:'row', alignItems:'flex-start'}} >
       <View style = {{flex:1, alignItems:'flex-start' }}>
         <Image 
          source={images.logos.logo}
          style={styles.logo}
          resizeMode="stretch"
        />
       </View>
        <View style={{flex:1, alignItems:'flex-end'}}>
          <IconButton
            style={styles.icons}
            name="chatbubbles-sharp"
            size={36}
            color="black"
            onPress = {() => alert("this is implemented in future versions")}         />
        </View> 
      </View>
    </SafeAreaView>
  );
};

export default TopNavigator;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    height:40,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
 
  logo: {
    width: 300,
    height: 40,
    top: 0,
  },
  icons: {
    marginHorizontal: 10,
  },
});