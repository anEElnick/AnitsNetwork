import React from 'react';
import { View,Text,StyleSheet,Image, ImageBackground,Dimensions, Pressable} from 'react-native';
import { AuthContext } from '../../src/components/Context';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentContainer from '../../src/components/ContentContainer';

const win = Dimensions.get('window');
const B = (props) => (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>);
data = {
  college:"Anits",
  inter:"Sri chaitanya",
  school:'jnv',
  Livesin:'Vishaka',
  from:"plkd"
}
const HeaderComponent =({data}) =>{
   return (
      <View style={{backgroundColor:'white',top:2,height:120,width:win.width-20,borderRadius:10,left:10,right:10}}>
          <View style={{left:10, flexDirection:'row'}}>
           <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Studies at <B>{data.college}</B> </Text>
          </View>
          <View style={{left:10, flexDirection:'row'}}>
           <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Went to <B>{data.inter}</B>     </Text>
          </View>
          <View style={{left:10, flexDirection:'row'}}>
           <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Went to <B>{data.school}</B>    </Text>
          </View>
          <View style={{left:10, flexDirection:'row'}}>
           <Icon name="home"  size={18} /><Text style={styles.textstyle}> Lives in <B>{data.Livesin}</B>   </Text>
          </View>
          <View style={{left:10, flexDirection:'row'}}>
           <Icon name="location"  size={18} /><Text style={styles.textstyle}> From <B>{data.from}</B>          </Text>
          </View>     
       </View>   
   );
};

const Profile = ( { navigation } ) =>{
    const { signOut } = React.useContext(AuthContext);
    return (
     <View style={{ flex: 1 }}>
       <View style={{ flex: 3}}>
            <View style={{ flex:2}}>
                      <ImageBackground source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}} style={styles.coverimage} >
                      </ImageBackground>
            </View>
            <View style={{ flex: 1,backgroundColor:"white" }} />
            <Text  style={{ fontWeight:'bold',fontSize:22, position:'absolute', top:170,alignSelf:'center'}}> ANEEL KUMAR P.</Text>
            <View style = { styles.MainContainer }>
                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                    style={{width: 130, height: 130, borderRadius: 120/2}} />
            </View>
       </View>
       <View style={{height:50,flexDirection:'row',backgroundColor:"white" }}>
                <Pressable onPress={()=>alert('hii')} style={{ flex:1, backgroundColor:'pink',borderRadius:15, borderColor:'black',alignItems:'center'}}>
                      <Icon name="person-add"  size={25} />
                      <Text> Follow </Text>
                </Pressable>
                <Pressable onPress={()=>alert('hii')} style={{flex:1 ,backgroundColor:'yellow',borderRadius:15, borderColor:'black',alignItems:'center'}}>
                      <Icon name="paper-plane-sharp"  size={25} />
                      <Text> Message </Text>
                </Pressable>
                <Pressable onPress={()=> { navigation.navigate('EditProfile') }} style={{flex:1 ,backgroundColor:'green',borderRadius:15, borderColor:'black',alignItems:'center'}}>
                      <Icon name="create"  size={25} />
                      <Text> Edit </Text>
                </Pressable>
                <Pressable onPress={()=>alert('hii')} style={{flex:1 ,backgroundColor:'pink',borderRadius:15, borderColor:'black',alignItems:'center'}}>
                      <Icon name="ios-alert-circle"  size={25} />
                      <Text> Report </Text>
                </Pressable>
       </View>
       <View style={{ flex:7}}>
           {//<headerComponent data = {data}/>
           }
           <ContentContainer HeaderComponent={HeaderComponent} data = {data}/>
       </View >
     </View>
   );
 }


 

  
  const styles = StyleSheet.create(
  {
    coverimage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      
    },
    MainContainer:
    {
      position:'absolute',
      top:30,
      alignSelf:'center',
      flex: 1,
      margin: 5,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    textstyle:{
      fontSize:16,
      fontWeight:'600'
    }
   
  });

 export default Profile;