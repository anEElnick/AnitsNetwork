import React from 'react';
import { View,Text,Button, TextInput,Pressable,Image, Dimensions, ScrollView,FlatList, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserDetails } from '../../src/components/Context';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';

const win = Dimensions.get('window');

const CreatePost = () =>{
  const data = React.useContext(UserDetails);
    var Post={
       postData:"",
       postBy:data.usertoken,
       postByname:data.name,
       postByPic:data.profilepic,
       postPic:[],
       postDateTime:firestore.Timestamp.fromDate(new Date()),
       likes:[],
       comments:[]
    };
  //console.log("data:"+JSON.stringify(initialstate));
    
  const [post ,setPost] = React.useState("");
  const [state,setState] = React.useState({postFile:null});
  const cancelPost = () =>{
    setState({...state,postFile:null});
    setPost("");
  }
  const takePicFromLib = async() =>{
      var imageurl=[];
      try{
          await ImagePicker.openPicker({ multiple:true, cropping: true}).then(image => {
            console.log(image);
            var n = 1;
            image.forEach(element => {
            const imageUri = Platform.OS ==='ios' ? element.sourceURL : element.path;
            imageurl.push({picname:n,pic: imageUri});
            n += 1;
            });
          
            console.log(imageurl);
            
          });
        
        }
      catch(e){
        console.log(e);
        return;
      }
      setState({...state,postFile:imageurl});
      
    };
    
  const uploadFile = async() =>{
    if(state.postFile != null){
      const promises = [];
      const prom =[];
      var list=[];
      var n = 0;
      setState({...state,Uploading:true});

      state.postFile.map((item) => {
        let filename =  "Images/"+Date.now();//'.jpg';
        var picurl="";
        n += 1;
        console.log("pic dATA:"+filename);
        const task = storage().ref(filename).putFile(item.pic);
        promises.push(task);
        task.on('state_changed', taskSnapshot => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
          //setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *100);
        
        },
        (error)=>{
          console.log(error)
        },
        async() => {
         const t =  storage().ref(filename).getDownloadURL();/*.then((url)=>{
           return url;
           //setPostpic((prevState) => [...prevState,url]);
           //list.push(url);
         });*/
          prom.push(t);
          setState({...state,num:n});
        });
    
        
      });
      Promise.all(promises)
      .then(()=>{
        Promise.all(prom).then((pd)=>{     
          console.log("all pics uploaded"+ JSON.stringify(pd));
        setState({...state,Uploading:false});
        Post.postPic = pd;
        Post.postData = post;
        console.log("DATA1:"+JSON.stringify(Post));
      
        firestore().collection('Posts').add(Post).then((docref)=>{
          firestore().collection('UserDetails').doc(data.usertoken).update({posts:firestore.FieldValue.arrayUnion(docref.id)});
          console.log("Post added");
          alert("Ur Post is Uploaded.......");
          cancelPost();
          //setState({...state,Uploading:false});
          
        });
        });
        
        
      });
    }else{
      Post.postData = post;
      console.log("DATA1:"+JSON.stringify(Post));
      firestore().collection('Posts').add(Post).then((docref)=>{
        firestore().collection('UserDetails').doc(data.usertoken).update({posts:firestore.FieldValue.arrayUnion(docref.id)});
        console.log("Post added");
        alert("Ur Post is Uploaded.......");
        cancelPost();
        //setState({...state,Uploading:false});
        
      });
    }
      
    };

  
 
  const Img = ({item})=> {

    return (
  <Image  source={{uri: item.pic}}  resizeMode="contain" style={{flex: 1,alignSelf:'stretch',width: win.width,height:500}}></Image> 
    )};
  
    return (
      state.Uploading == true ? (
             <View style={{flex:1,alignItems:'center'}}>
                <ActivityIndicator color='#fff' size="large"  />
                <Text> {state.num} pictures Uploaded of {state.postFile.length }</Text>
             </View>
      ):(
     <View style={{flex:1}}>
        
         <View style={{ height:50 ,backgroundColor:'white' }}>
             <Text style={{fontWeight:'700',fontSize:30}}>Create a Post</Text>
         </View>
         <View style={{ height:state.height ,marginTop:20}}>
         <TextInput
              multiline
              style = {{ height:state.height,borderRadius:20,backgroundColor:"lightgrey",fontSize:20}}
              placeholder={'What is in ur Mind...?'}
              value={post}
              onChangeText={e => setPost(e)}
              onContentSizeChange={(event) => {
                setState({ ...state,height: event.nativeEvent.contentSize.height })}}

          />
         </View>
          { state.postFile == null ?
                (<View style={{height:150 ,backgroundColor:'pink',borderRadius:20,marginTop:20,flexDirection:'column' }}>
                    <Text style = {{ flex:0.5, fontWeight:'700',fontSize:25,margin:10}}>Add Files</Text>
                    <View style = {{height:1,backgroundColor:"black"}}></View>
                    <View style={{flex:1,height:50}}>
                        <Pressable onPress={()=>{takePicFromLib()}} style={{flex:1 ,backgroundColor:'lightblue', borderColor:'black',alignItems:'center',flexDirection:'row'}}>
                            <Icon name="images"  size={50} style={{marginLeft:20}} />
                            <Text style={{fontSize:20,fontWeight:'600'}}> Add Image </Text>
                        </Pressable>
                    </View>
              {/*      <View style={{flex:1,height:50}}>
                        <Pressable onPress={()=>{takeVidFromLib}} style={{flex:1 ,backgroundColor:'yellow',borderRadius:10, borderColor:'black',alignItems:'center',flexDirection:'row'}}>
                            <Icon name="videocam"  size={50} style={{marginLeft:20}} />
                            <Text style={{fontSize:20,fontWeight:'600'}}>Add Video</Text>
                        </Pressable>
                    </View>
                    <View style={{flex:1,height:50}}>
                        <Pressable onPress={()=>{alert("hoii")}} style={{flex:1 ,backgroundColor:'lightgreen',borderRadius:10, borderColor:'black',alignItems:'center',flexDirection:'row'}}>
                            <Icon name="documents"  size={50} style={{marginLeft:20}} />
                            <Text style={{fontSize:20,fontWeight:'600'}}> Add Files </Text>
                        </Pressable>
                    </View>
          */}
                </View>):(
                    <View style={{height:500,backgroundColor:'white',borderRadius:20,marginTop:20,flexDirection:"row" }}> 
                       {
                         console.log("DATA:"+JSON.stringify(post))
                       }
                       <FlatList  
                              data={state.postFile}
                             horizontal
                             keyExtractor={ item => item.picname}
                            renderItem={Img}
                            showsHorizontalScrollIndicator={true}
                        />
                    
                    </View>
                )
          }
        
        <Pressable onPress={()=>{uploadFile()}} style={{position:'absolute',top:1,left:win.width-50}}>
              <Icon name="md-checkmark-outline"  size={45} style={{}} />
        </Pressable>
        <Pressable onPress={()=>{cancelPost()}} style={{position:'absolute',top:1,left:win.width-100}}>
              <Icon name="close-circle-outline"  size={45} style={{}} />
        </Pressable>
     </View>
      )

   );
 }


 export default CreatePost;