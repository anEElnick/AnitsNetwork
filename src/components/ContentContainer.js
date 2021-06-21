import React, { useEffect } from 'react';
import {
  FlatList, RefreshControl, View,ActivityIndicator
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import PostCard from '../components/PostCard';

import { Posts } from '../components/Context';




export default (props) => {
  const  [posts,setPosts ]= React.useState(null);
  const  [loading,setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  //console.log(props.data);
  const fetchPosts = async() =>{

    try{
    var datas = [];
    if(props.data.profile == false){
      //console.log(props.data.tokens);
      var tok = [];
      props.data.tokens.forEach(element => {
        tok.push(element.usertoken);
      });
      await firestore().collection("Posts").orderBy("postDateTime", "desc").get().then((snapshot)=>{
        snapshot.docs.map((docs)=>{
          //console.log(docs.data());
          let d = docs.data();
          d.id = docs.id;
          if(tok.includes(d.postBy)){
          datas.push(d);
          }
        })
      });
    }else{
      await firestore().collection("Posts").where("postBy","==",props.data.token).get().then((snapshot)=>{
        snapshot.docs.map((docs)=>{
          //console.log(docs.data());
          let d = docs.data();
          d.id = docs.id;
          datas.push(d);
        })
       });
    }
    

    setPosts(datas);
    setLoading(false);

  }catch(e){
    console.log(e);
  }

  };
  

  React.useEffect(()=>{
    setLoading(true);
    fetchPosts();
  },[]);
  //console.log("datas");
  //console.log(posts);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    setTimeout(()=>{
      setRefreshing(false);
    },20)
    //wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <Posts.Provider value = {{ pd : posts }}>
    {
      
    loading==true ? ( 
      <View style={{flex:1}}>
          <ActivityIndicator color='#fff' size="large"  />
      </View>):(
    <FlatList 
      data={posts}
      keyExtractor={item => item.id}
      renderItem={object => <PostCard  item = {object.item}/>}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={()=><props.HeaderComponent />}
      refreshControl ={
        <RefreshControl 
             refreshing={refreshing}
             onRefresh ={onRefresh}
        />
      }
    />
    
    )
    }
    </Posts.Provider>
  );
};

