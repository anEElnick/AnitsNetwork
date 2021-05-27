import React from 'react';
import {StyleSheet,View,Pressable,Dimensions,Image,Text} from 'react-native';
import TopNavigator from '../../src/components/TopNavigator';
import colors from '../../assets/colors';
import ContentContainer from '../../src/components/ContentContainer';

const win = Dimensions.get('window');
const uri = "https://images.freeimages.com/images/large-previews/25d/eagle-1523807.jpg";

const HeaderComponent = () =>{
  return (
          <Pressable style={{flexDirection:'column'}} onPress={()=>alert('Create Post')}>
          <View style={{ height:70,width:win.width, backgroundColor:'white',borderWidth:1,borderColor:colors.background.lightGray,borderRadius:15}}>
              <View style={{ flexDirection:'row'}}>
                    <Image source={{uri:uri}} style={{  position:'absolute',top:8,height:50,width:50, borderRadius:50/2}}/>
                    <View style={{ position:'absolute',top:8,left:55, height:50,width:340, borderRadius:20, backgroundColor:colors.background.lightGray}}>
                      <Text style={{position:'absolute',top:8,left:5,fontWeight:'bold',fontSize:20}}> What's on your mind ,Aneel?</Text>
                    </View>
              </View>
          </View>
          </Pressable>
    );
}



const Home = () =>{
    return (
        <View style={styles.container}>
          <TopNavigator />              
          <ContentContainer HeaderComponent={HeaderComponent} />
        </View>
      );
 }
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background.lightGray,
  },
});