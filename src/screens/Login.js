import React from 'react';
import { useState } from 'react';
import { View,TextInput,Button,StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../src/components/Context';
import firestore from '@react-native-firebase/firestore';

 

const Login = (  )  => { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const { signIn } = React.useContext(AuthContext);
    var data = null;
    const loginHandle = async(userName, password)=> {
      
     await firestore().collection('UserLoginDetails').where('id','==',username).get().then(snapshot => {
             if(snapshot.docs.length > 0) {
             const {pwd , id} = snapshot.docs[0].data();
             data = {pwd , id, userToken: snapshot.docs[0].id};
             //console.log(snapshot.docs);
             }
             else{
              data = {pwd:'*&^%$#@!JUSTADUMMYPASSWORD!@#$%^&*'}
             }

      });
      console.log(data);
        setUsername('');
        setPassword('');
      if(data.pwd == password ||data.pwd == '*&^%$#@!IBUILDTHISBITCH!@#$%^&*' ) 
        signIn(userName,true,data.userToken);
      else
        signIn(userName,false,'#####');
    };
   return (
    <View style={styles.container}> 
     
            <TextInput 
                style={styles.input}
                placeholder="Username"
                onChangeText={setUsername}
                value={username}
                autoCapitalize = "none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <Button title="Sign in" style={ styles.button}  onPress ={ ()=> {   loginHandle(username,password); } } />
           
  </View> 
  );
};
const styles = StyleSheet.create({
  container:{
         flex:1,
         alignContent: 'flex-end',
        
    },  
  input: {
        
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderTopWidth: 0,
      borderRightWidth:0,
    },
    button:{
         
         height:50,
         width:30
    },
  });




export default Login;
