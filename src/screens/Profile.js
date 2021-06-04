import React, { useContext } from 'react';
import { View,Text,StyleSheet,Image, ImageBackground,Dimensions, Pressable} from 'react-native';
import { AuthContext ,UserDetails} from '../../src/components/Context';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentContainer from '../../src/components/ContentContainer';

const win = Dimensions.get('window');
const B = (props) => (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>);





const Profile = ( { navigation } ) =>{
    const userData = useContext(UserDetails);
    data = userData;
    const { signOut } = useContext(AuthContext);

    const HeaderComponent =(props) =>{
      
       return (
         <View>
        <View style={{height:50,flexDirection:'row',backgroundColor:"white" }}>
        <Pressable onPress={()=>alert('hii')} style={{ flex:1, backgroundColor:'pink',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="person-add"  size={30} />
              <Text> Follow </Text>
        </Pressable>
        <Pressable onPress={()=>alert('hii')} style={{flex:1 ,backgroundColor:'yellow',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="paper-plane-sharp"  size={30} />
              <Text> Message </Text>
        </Pressable>
        <Pressable onPress={()=> { navigation.navigate('EditProfile') }} style={{flex:1 ,backgroundColor:'green',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="create"  size={30} />
              <Text> Edit </Text>
        </Pressable>
        <Pressable onPress={()=>{signOut()}} style={{flex:1 ,backgroundColor:'pink',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="ios-alert-circle"  size={30} />
              <Text> SignOut </Text>
        </Pressable>
    </View>
          <View style={{backgroundColor:'white',top:2,height:120,width:win.width,borderRadius:10,left:0,right:10}}>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Studies at <B>{data.CollegeName}</B> </Text>
              </View>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Went to <B>{data.InterCollegeName}</B>     </Text>
              </View>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Went to <B>{data.SchoolName}</B>    </Text>
              </View>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="home"  size={18} /><Text style={styles.textstyle}> Lives in <B>{data.LivesIn}</B>   </Text>
              </View>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="location"  size={18} /><Text style={styles.textstyle}> From <B>{data.From}</B>          </Text>
              </View>     
           </View> 
           </View>  
       );
    };
    





    return (
     <View style={{ flex: 1 }}>
       <View style={{ flex: 3}}>
            <View style={{ flex:3}}>
              {  userData.bgpic == ""? (
                      <ImageBackground source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}} style={styles.coverimage} >
                      </ImageBackground>
              ):(
                      <ImageBackground source={{uri : userData.bgpic}} style={styles.coverimage} >
                      </ImageBackground>
              )
              }
            </View>
            <View style={{ flex: 1,backgroundColor:"white" }} />
            <Text  style={{ fontWeight:'bold',fontSize:32, position:'absolute', top:150,alignSelf:'center'}}> {userData.name}</Text>
            <View style = { styles.MainContainer }>
              { userData.profilepic =="" ? (
                <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                    style={{width: 130, height: 130, borderRadius: 120/2}} />
              ):(
                <Image source={{uri : userData.profilepic}}
                    style={{width: 130, height: 130, borderRadius: 120/2}} />
              )
              }
            </View>
       </View>
       
       <View style={{ flex:8}}>
           <ContentContainer HeaderComponent={HeaderComponent} />
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
      top:65,
      alignSelf:"flex-start",
      flex: 1,
      margin: 5,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    textstyle:{
      fontSize:17,
      fontWeight:'600'
    }
   
  });

 export default Profile;