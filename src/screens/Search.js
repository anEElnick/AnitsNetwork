import React from 'react';
import { View,Text,TextInput, Dimensions,Pressable,FlatList,Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../src/components/Context';
import firestore from '@react-native-firebase/firestore';

const win = Dimensions.get('window');
const Search = ({navigation}) =>{
 const [searchfor,setSearchfor] = React.useState("");
 const [users,setUsers] = React.useState([]);
 var USERS=[];
 const searchUsers = async() =>{
  var datas = [];
   try{
     if(searchfor[0]!='3'){
      
        await firestore().collection("UserDetails").where("name",'<=',searchfor).get().then((snapshot)=>{
          snapshot.docs.map((docs)=>{
            //console.log(docs.data());
            let d = docs.data();
            d.id = docs.id;
            datas.push(d);
          })
        });
        //setUsers(datas);
      }else{
        await firestore().collection("UserDetails").where("rollno",'>=',searchfor).get().then((snapshot)=>{
          snapshot.docs.map((docs)=>{
            //console.log(docs.data());
            let d = docs.data();
            d.id = docs.id;
            datas.push(d);
          })
        });
       // setUsers(datas);
    }
    setUsers(datas);
   }catch(e){
     console.log(e);
   }

 };

    return (
      <View style={{flex:1}}>
        
      <View style={{ height:50 ,backgroundColor:'white' }}>
          <Text style={{fontWeight:'700',fontSize:30}}>  Search</Text>
      </View>
      <TextInput style = {{ top:10,width:win.width-50, height:50,borderRadius:20,backgroundColor:"lightgrey",fontSize:20}}
        placeholder={'Search for user'}
        value={searchfor}
        onChangeText={setSearchfor}
      />
      <Pressable onPress={()=>{searchUsers()}} style={{position:'absolute',top:60,left:win.width-50}}>
        <Icon name="search-sharp"  size={45} style={{}} />
      </Pressable>
      <View style={{margin:10}}>
      {
            users.length == 0 ? (
                    <View>
                    <Text multi line style={{fontSize:70,color:"grey"}}>        NO</Text>
                    <Text multi line style={{fontSize:70,color:"grey"}}>     USERS</Text>
                    <Text multi line style={{fontSize:70,color:"grey"}}>     FOUND</Text>
                    </View>
            ):(
                    <FlatList  
                    data={ users }
                    vertical
                    keyExtractor={ item1 => item1.name}
                    renderItem={(item1)=>{
                          return (
                            <View>
                            <Pressable onPress = {()=>{navigation.navigate('UserProfile',item1.item)}}>
                                <View style={{ height:70 ,flexDirection:'row',backgroundColor:"lightgreen",borderRadius:10, marginTop:8 }}>
                                        <Image source={{uri:item1.item.profilepic}} resizeMode="cover" style={{position:'absolute',left:8,top:3,height:60,width:60,borderRadius:50/2   }} />
                                        <Text numberOfLines={1} style={{left:80,fontWeight:"bold",fontSize:35,fontStyle:'italic'}}>{item1.item.name} </Text>
                                        <Text numberOfLines={1} style={{position:'absolute',top:35, left:75,fontWeight:"bold",fontSize:20}}>{item1.item.CollegeName} || {item1.item.branch} || {item1.item.section} </Text>
                                </View>
                            </Pressable>
                          </View>
                          );
                    }}       
                    />
            )
        }
      </View>
  </View>
   );
 }


 export default Search;