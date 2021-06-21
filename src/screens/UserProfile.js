import React, { useContext } from 'react';
import { View,Text,StyleSheet,Image, ImageBackground,Dimensions, Pressable} from 'react-native';
import { AuthContext ,UserDetails} from '../../src/components/Context';
import Icon from 'react-native-vector-icons/Ionicons';
import ContentContainer from '../../src/components/ContentContainer';
import firestore from '@react-native-firebase/firestore';

const win = Dimensions.get('window');
const B = (props) => (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>);





const UserProfile = ( { route, navigation } ) =>{
  const { usertoken ,name ,Followers ,Following }  = React.useContext(UserDetails);
    const [isFollowing,setIsFollowing] = React.useState(false);

    const userData = route.params;
    data = userData;
    
    const addFollow = ()=>{
        setIsFollowing(true);
        const ud = {name:name , usertoken:usertoken};
        data.Followers.push(ud);
        
        firestore().collection('UserDetails').doc(data.id).update({Followers:firestore.FieldValue.arrayUnion(ud)}).then(()=>{
                         console.log("following"); 
              });
        firestore().collection('UserDetails').doc(usertoken).update({Following:firestore.FieldValue.arrayUnion({usertoken:data.id,name:data.name})}).then(()=>{
                console.log("following"); 
     });

    };
    const unFollow = ()=>{
      setIsFollowing(false);
      const ud = {name:name , usertoken:usertoken};
      const l = data.Followers.filter((item) => item.usertoken != usertoken);
      data.Followers = l;
      

      firestore().collection('UserDetails').doc(data.id).update({Followers:firestore.FieldValue.arrayRemove(ud)}).then(()=>{
        console.log("unfollowed"); 
      });
      firestore().collection('UserDetails').doc(usertoken).update({Following:firestore.FieldValue.arrayRemove({usertoken:data.id,name:data.name})}).then(()=>{
        console.log("unfollowed");
      });

    };

    const found = data.Followers.find(function(data , index){
       if(data.usertoken == usertoken) return true;
    });
   // console.log("log:"+data.Followers.includes({usertoken:usertoken,name:name})+JSON.stringify(data.Followers));
    const HeaderComponent =(props) =>{
      
       return (
         <View>
        <View style={{height:50,flexDirection:'row',backgroundColor:"white" }}>
          {isFollowing == true || data.Followers.find(function(data , index){if(data.usertoken == usertoken) return true;})!= undefined ? (
            <Pressable onPress={()=>unFollow()} style={{ flex:1, backgroundColor:'pink',borderRadius:10, borderColor:'black',alignItems:'center'}}>
            <Icon name="person-add"  size={30} />
            <Text> UnFollow </Text>
           </Pressable>
          ):(
            <Pressable onPress={()=>addFollow()} style={{ flex:1, backgroundColor:'pink',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="person-add"  size={30} />
              <Text> Follow </Text>
           </Pressable>
          )}
        
        <Pressable onPress={()=>alert('This will be implemented in later versions..')} style={{flex:1 ,backgroundColor:'yellow',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="paper-plane-sharp"  size={30} />
              <Text> Message </Text>
        </Pressable>
        <Pressable onPress={()=> { }} style={{flex:1 ,backgroundColor:'green',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Text style={{fontSize:20,fontWeight:"700"}}>{data.Followers.length}</Text>
              <Text> Followers </Text>
        </Pressable>
        <Pressable onPress={()=>{alert("Our admin will take care of this issue...")}} style={{flex:1 ,backgroundColor:'pink',borderRadius:10, borderColor:'black',alignItems:'center'}}>
              <Icon name="ios-alert-circle"  size={30} />
              <Text> Report </Text>
        </Pressable>
    </View>
          <View style={{backgroundColor:'white',top:2,height:120,width:win.width,borderRadius:10,left:0,right:10}}>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="school-sharp"  size={18} /><Text style={styles.textstyle}> Studies at <B>{data.CollegeName} || {data.branch} || {data.section}</B> </Text>
              </View>
              <View style={{left:10, flexDirection:'row'}}>
               <Icon name="location"  size={18} /><Text style={styles.textstyle}> Year of Joining <B>{data.YearOfJoining}</B>          </Text>
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
       
       <View style={{ flex:8 ,paddingBottom:50}}>
           <ContentContainer HeaderComponent={HeaderComponent} data = {{"profile":true,"token":data.id}} />
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

 export default UserProfile;