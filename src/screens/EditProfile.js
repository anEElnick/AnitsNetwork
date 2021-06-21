import React, { useEffect } from 'react';
import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  ScrollView,
  Platform,
  Text,
  ActivityIndicator
} from 'react-native';
import storage from '@react-native-firebase/storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext,UserDetails} from '../../src/components/Context';
import {Pressable} from 'react-native';



const EditProfile = () => {
  
  const data  = React.useContext(UserDetails);
  var inititalProfileState = data;
  console.log("in edit context data: "+data);
  if(data == null){
       inititalProfileState = {
               name:"",
               YearOfJoining:'',
               branch:'',
               section:'',
               CollegeName:'ANITS',
               SchoolName:'',
               InterCollegeName:'',
               LivesIn:'',
               bgpic:'',
               profilepic:'',
               Following:[],
               Followers:[],
               posts:[]
       };
  }else{
    inititalProfileState = {
      name:data.name,
      YearOfJoining:data.YearOfJoining,
      branch:data.branch,
      section:data.section,
      CollegeName:data.CollegeName,
      SchoolName:data.SchoolName,
      InterCollegeName:data.InterCollegeName,
      LivesIn:data.LivesIn,
      bgpic:data.bgpic,
      profilepic:data.profilepic,
      Following:[],
      Followers:[],
      posts:[]
   };

  }

  const [state,setState] = useState(inititalProfileState);
  const [uploading,setUploading]= useState(false);
  const [transferred,setTransferred]= useState(0);
  const { signInAE } = React.useContext(AuthContext);

  const saveHandle = async( data )=> {
    console.log(data);
    signInAE(data);

  };
  
  const takePicFromLib = async(data) =>{
    var imageurl="";
    try{
       await ImagePicker.openPicker({cropping: true}).then(image => {
         console.log(image);
         const imageUri = Platform.OS ==='ios' ? image.sourceURL : image.path;
         //setState({...state,profilepic:});
         console.log(imageUri);
         imageurl = imageUri;
       });
      }
    catch(e){
      console.log(e);
      return;
    }
    let filename =  "Images/"+Date.now() + '.jpg';
    var picurl="";
    setUploading(true);
    setTransferred(0);
    console.log("pic dATA:"+filename);
    const task = storage().ref(filename).putFile(imageurl);
    
    task.on('state_changed', taskSnapshot => {
      console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
    
      setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100);
    
    });
    
    task.then(async() => {
      setUploading(false);
      console.log('Image uploaded to the bucket!');
      picurl = await storage().ref(filename).getDownloadURL();
      if(data.picfor == "Profile") setState({...state,profilepic:picurl});
      else setState({...state,bgpic:picurl})
      console.log(picurl);
      
    });

    
  };
  

  return (
    <View style={{ flex: 1 }}>
    <View style={{ height:130 }}>
        <View style={{ flex:2}}>
          <Pressable style={{flex:1}} onPress={()=>takePicFromLib({picfor:"BG"})} >
              <View style={{flex:1}}>
                {
                state.bgpic == '' ?( <ImageBackground source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}} style={styles.coverimage} ></ImageBackground>)
                :(<ImageBackground source={{uri : state.bgpic}} style={styles.coverimage} ></ImageBackground>)
                }
              </View>
          </Pressable>
        </View>
         <View style = { styles.MainContainer }>
        { uploading ? (
           <View style={{width: 130, height: 130, borderRadius: 120/2}}>
              <Text> {transferred} % Completed </Text>
              <ActivityIndicator color="blue" size="large" ></ActivityIndicator>
            </View>
          ):(
         <Pressable  onPress={()=>takePicFromLib({picfor:"Profile"})} >
             {state.profilepic == '' ? <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}} style={{width: 130, height: 130, borderRadius: 120/2}} /> :
                    <Image source={{uri : state.profilepic}} style={{width: 130, height: 130, borderRadius: 120/2}} />   
             }
         </Pressable>
        )}
         </View>
         
    </View>
    <View style={{ flex: 1 }}>
    <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={state.name}
              onChangeText={e => setState({ ...state,name:e})}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Year Of Joining'}
              value={state.YearOfJoining}
              onChangeText={e => setState({ ...state,YearOfJoining:e})}
          />
          
        </View> 
        <View style={{...styles.inputGroup,flexDirection:"row"}}>
          <View style={{flex:1,borderRightWidth:1,borderRightColor:"lightgrey"}}>
          <TextInput
              placeholder={'Branch'}
              value={state.branch}
              onChangeText={e => setState({ ...state,branch:e})}
          />
          </View>
          <View style={{flex:1}}>
           <TextInput
              placeholder={'Section'}
              value={state.section}
              onChangeText={e => setState({ ...state,section:e})}
          />
          </View>
        </View>        
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'College Name'}
              value={state.CollegeName}
              onChangeText={e => setState({ ...state,CollegeName:e})}
          />
          
        </View> 
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Inter College Name'}
              value={state.InterCollegeName}
              onChangeText={e => setState({ ...state,InterCollegeName:e})}
          />
          
        </View> 
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'School Name'}
              value={state.SchoolName}
              onChangeText={e => setState({ ...state,SchoolName:e})}
          />
          
        </View> 
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Lives In'}
              value={state.LivesIn}
              onChangeText={e => setState({ ...state,LivesIn:e})}
          />
          
        </View>  
        <View style={styles.button}>
          <Button
            title='Submit'
            onPress={()=>{saveHandle(state)}} 
            color="#19AC52"
          />
        </View>
      </KeyboardAwareScrollView>
      
    </View>
   
  </View>
    
  );
 
};
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
    },
    container: {
      flex: 1,
      padding: 35
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
   
  });


export default EditProfile;
