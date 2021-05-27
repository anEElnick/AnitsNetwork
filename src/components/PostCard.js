import React from 'react';
import { View,Text,Image,Dimensions, Pressable} from 'react-native';
import images from '../../assets/images';
import Icon from 'react-native-vector-icons/Ionicons';

const B = (props) => (<Text style={{fontWeight: 'bold'}}>{props.children}</Text>);
const win = Dimensions.get('window');

const PostCard = ({item}) =>{ 
    return (
     <View style={{ flex: 1 ,backgroundColor: 'white',left:10,right:10, width: win.width-20, marginVertical:3,borderRadius: 15}}>
            <View style={{ height:55 ,flexDirection:'row' }}>
                  <Image source={item.profile} resizeMode="cover" style={{position:'absolute',left:8,top:3,height:50,width:50,borderRadius:50/2   }} />
                  <View style={{position:'absolute',left:58,top:5}}>
                      <Text numberOfLines={1} style={{ width:win.width-45,fontSize:15}}><B> {item.username} </B>is with <B>{item.groups[0]}</B> and <B>{item.groups.length - 1}</B> others</Text>
                      <Text > { item.date } </Text>
                  </View>
                  <Icon name="ios-bookmark-sharp"  size={40} style={{ position:'absolute',top:2,right:4}} />
            </View>
            
           
            <Text style={{ width:win.width-45,fontSize:15 ,marginBottom:0}}numberOfLines={1}>   {item.text}</Text>
            <Image source={item.image} resizeMode="contain" style={{flex: 1,alignSelf:'stretch',width: win.width-20,height:618}} />
           <Text numberOfLines={1}>    Liked by <B>{item.likes.join(',') }</B> </Text>        
           
            <View style={{height:50,flexDirection:'row',marginHorizontal:3,marginVertical:3,borderTopWidth:0.5,marginTop:0}}>
                  <Pressable style={{flex:1,borderRadius:10}} onPress={()=>alert("button pressed")}>
                          <View>
                          <Icon name="md-thumbs-up-sharp"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Like</Text>
                          </View>
                   </Pressable>
                   <Pressable style={{flex:1.2,borderRadius:10}} onPress={()=>alert("button pressed")}>
                          <View >
                          <Icon name="ios-chatbubbles-sharp"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Comment</Text>
                          </View>
                   </Pressable>
                   <Pressable style={{flex:1,borderRadius:10}} onPress={()=>alert("button pressed")}>
                          <View >
                          <Icon name="md-share-social"  size={35} style={{ position:'absolute',top:5,left:15}} />
                          <Text style={{position:'absolute',top:13,left:55,fontWeight:'bold',fontSize:20}}>Share</Text>
                          </View>
                   </Pressable>
            </View>
            
            
       </View>
   );
 }


 export default PostCard;