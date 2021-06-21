import React from 'react';
import { View,Text,Image,Dimensions, Pressable, Modal,TextInput,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import { UserDetails } from './Context';
import { useEffect } from 'react/cjs/react.production.min';
const B = (props) => (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>);
const win = Dimensions.get('window');

const PostCard = ({item}) =>{ 
    const { usertoken ,name , profilepic }  = React.useContext(UserDetails);
    const [isLiked ,setIsLiked] = React.useState(false);
    const [visible ,setVisible] = React.useState(false);
    const [textboxh ,setTbh] = React.useState(50);
    const [comment,setComment] = React.useState("");
   // if(item.likes.includes(name)== true) setIsLiked(true);
  // console.log(item.comments[0]);
   
    const addComment = ()=>{
       if(comment == "") alert("Add comment");
       else {
       const com = {by:name,bypic:profilepic,comment:comment,time:firestore.Timestamp.fromDate(new Date())};
       item.comments.push(com);
       setComment("");
       firestore().collection('Posts').doc(item.id).update({comments:firestore.FieldValue.arrayUnion(com)}).then(()=>{
              console.log("comment added");
              
              
       });
      }
    }
    const addLike =()=>{
       setIsLiked(true);
       firestore().collection('Posts').doc(item.id).update({likes:firestore.FieldValue.arrayUnion(name)}).then(()=>{
              console.log("liked "+item.id);
              item.likes.push(name);
              
       })
    };
    const removeLike =()=>{
       setIsLiked(false);
       l = item.likes.filter(i => i != name);
              item.likes = l;
       firestore().collection('Posts').doc(item.id).update({likes:firestore.FieldValue.arrayRemove(name)}).then(()=>{
              console.log("liked "+item.id);
              
              
       })
    };
      
    

  
    return (
     <View style={{ flex: 1 ,backgroundColor: 'white',left:10,right:10, width: win.width-20, marginVertical:3,borderRadius: 15}}>
            <View style={{ height:55 ,flexDirection:'row' }}>
                  <Image source={{uri: item.postByPic}} resizeMode="cover" style={{position:'absolute',left:8,top:3,height:50,width:50,borderRadius:50/2   }} />
                  <View style={{position:'absolute',left:58,top:5}}>
                      <Text numberOfLines={1} style={{ width:win.width-45,fontSize:15}}><B> {item.postByname} </B></Text>
                      <Text > { item.postDateTime.toDate().toDateString() } </Text>
                  </View>
                 {// <Icon name="ios-bookmark-sharp"  size={40} style={{ position:'absolute',top:2,right:4}} />
                 }
            </View>
            
           
            <Text style={{ width:win.width-45,fontSize:15 ,marginBottom:0}}numberOfLines={1}>   {item.postData}</Text>
            {
                   item.postPic.length == 0 ? (<View style={{backgroundColor:"black",height:1}} />):
                   (<Image source={{uri:item.postPic[0]}} resizeMode="contain" style={{flex: 1,alignSelf:'stretch',width: win.width-20,height:300}} />)
            }
            
           <Text numberOfLines={1}>    Liked by <B>{item.likes.slice(0,3).join(',') } {item.likes.length >3 ? item.likes.length-3 + " others":""}</B> </Text>        
           
            <View style={{height:50,flexDirection:'row',marginHorizontal:3,marginVertical:3,borderTopWidth:0.5,marginTop:0}}>
                  
                  {
                   isLiked == true || item.likes.includes(name)== true ? (
                  <Pressable style={{flex:1,borderRadius:10,backgroundColor:"blue"}} onPress={()=>removeLike()}>
                          <View>
                          <Icon name="md-thumbs-up-sharp"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Like</Text>
                          </View>
                   </Pressable>) :(
                          <Pressable style={{flex:1,borderRadius:10}} onPress={()=>addLike()}>
                          <View>
                          <Icon name="md-thumbs-up-sharp"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Like</Text>
                          </View>
                   </Pressable>)
                  }
                   <Pressable style={{flex:1.2,borderRadius:10}} onPress={()=>setVisible(true)}>
                          <View >
                          <Icon name="ios-chatbubbles-sharp"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Comment</Text>
                          </View>
                   </Pressable>
                   {/*<Pressable style={{flex:1,borderRadius:10}} onPress={()=>alert("button pressed")}>
                          <View >
                          <Icon name="md-share-social"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Share</Text>
                          </View>
                   </Pressable>
              */}
            </View>
            <Modal
              transparent = {true}
              visible = {visible}
            >
              <View style = {{flex:1,width:win.width-10,backgroundColor:"lightgreen",margin:5,top:40,borderRadius:15}}> 
                     <Text style = {{fontSize:28,margin:10,fontWeight:"bold"}}>Comments</Text>
                     <Pressable onPress={()=>{setVisible(false)}} style={{position:'absolute',top:5,left:win.width-60}}>
                        <Icon name="close-circle-outline"  size={50} style={{}} />
                     </Pressable>
       
                     <View  style = {{height:60+textboxh,backgroundColor:"white"}}>
                            <Image source={{uri: item.postByPic}} resizeMode="cover" style={{position:'absolute',left:8,top:3,height:50,width:50,borderRadius:50/2   }} />
                            <Text style = {{fontSize:28,margin:10,fontWeight:"bold",position:'absolute',left:60}}>{name}</Text>
                            <Pressable onPress={()=>{addComment()}} style={{position:'absolute',top:5,left:win.width-60}}>
                            <Icon name="paper-plane-outline"  size={40} style={{}} />
                            </Pressable>
                            <View style={{ height:textboxh ,width:win.width-10,marginTop:20,position:"absolute",top:35}}>
                                   <TextInput
                                          multiline
                                          style = {{ height:textboxh,borderRadius:20,backgroundColor:"lightgrey",fontSize:20}}
                                          placeholder={'Add your comment...?'}
                                          value={comment}
                                          onChangeText={setComment}
                                          onContentSizeChange={(event) => {
                                          setTbh(event.nativeEvent.contentSize.height)}}
                                   />
                            </View>
                     </View>
                     <View style={{height:500,borderRadius:20,marginTop:0,flexDirection:"row" }}> 
                                   
                                   {
                                          item.comments.length == 0 ? (
                                                 <View>
                                                 <Text multi line style={{fontSize:70,color:"grey"}}>        NO COMMENTS</Text>
                                                 <Text multi line style={{fontSize:70,color:"grey"}}>       YET</Text>
                                                 </View>
                                          ):(
                                                 <FlatList  
                                                 data={ item.comments}
                                                 vertical
                                                 keyExtractor={ item1 => item1.name}
                                                 renderItem={(item1)=>{
                                                        return (
                                                        <View style={{ height:100 ,flexDirection:'row',backgroundColor:"white",borderRadius:10, margin:5 }}>
                                                               {
                                                                     // console.log("item in comment:"+JSON.stringify(item1))
                                                               }
                                                               <Image source={{uri:item1.item.bypic}} resizeMode="cover" style={{position:'absolute',left:8,top:3,height:50,width:50,borderRadius:50/2   }} />
                                                               <View style={{position:'absolute',left:58,top:5}}>
                                                               <Text numberOfLines={1} style={{ width:win.width-45,fontSize:15}}><B> {item1.item.by} </B></Text>
                                                               <Text > { item1.item.time.toDate().toDateString() } </Text>
                                                               </View>
                                                               <View style={{position:"absolute",top:50, height:3,backgroundColor:"black"}}/>
                                                               <Text multiline style={{position:"absolute",top:50,width:win.width-10,margin:5}}> { item1.item.comment } </Text>
                                                        </View>
                                                        );
                                                 }}       
                                                 />
                                          )
                                   }
                                   
                            </View>
              </View>
            </Modal>
            
       </View>
   );
 }


 export default PostCard;