import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

import Login from './src/screens/Login';
import AddUserScreen from './src/screens/AddUserScreen';
import Loading from './src/screens/Loading';
import BottomNavigation from './src/components/BottomNavigation'

import { AuthContext } from './src/components/Context';
import EditProfile from './src/screens/EditProfile';



const Stack = createStackNavigator();
const StackNavigator = () => {
    return  (
      <Stack.Navigator initialRouteName="Login">
         <Stack.Screen  name ="Login"       component={ Login }        />
      </Stack.Navigator>
    );
};



const App = ()  => {
  //const [isLoading ,setIsLoading] = React.useState(true);
  //const [userToken, setUserToken] = React.useState(null);
  const initialLoginState = {
    isLoading:true,
    userName:null,
    userToken:null,
    isFirstLogin:false
  };
  const loginReducer = (prevState , action )=>{
              switch( action.type ) {
                case 'FIRST_LOGIN':
                  return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                    isFirstLogin: true
                  };
                case 'RETRIVE_TOKEN':
                    return {
                      ...prevState,
                      userToken: action.token,
                      isLoading: false
                    };
                case 'LOGIN':
                    return {
                      ...prevState,
                      userName:  action.id,
                      userToken: action.token,
                      isLoading:false,
                      isFirstLogin: false
                    };
                case 'LOGOUT':
                    return {
                      ...prevState,
                      userName: null,
                      userToken: null,
                      isLoading:false
                    };
                case 'LOGINAE':
                  return {
                    ...prevState,
                    isFirstLogin: false
                  }
              }
  };
  
  const [loginState , dispatch] = React.useReducer(loginReducer , initialLoginState);


  const authContext =  React.useMemo(()=>({
           signIn:async(userName, isloggedin, usertoken)=> {
             if(isloggedin == true){
                 var firstTimelogin = false;
                 await firestore().collection('UserDetails').doc(usertoken).get().then(snapshot => {
                    firstTimelogin = snapshot.exists;
                    console.log(snapshot);
                });
                console.log(firstTimelogin);

                if(!firstTimelogin) {
                  dispatch({type:'FIRST_LOGIN',id: userName,token:usertoken,isFirstLogin:true});
                }
                else{
                      try {
                        await AsyncStorage.setItem('userToken',usertoken);
                      } catch (e) {
                        // saving 
                      }
                      dispatch({type:'LOGIN',id: userName,token:usertoken});
                   }
             
              }else{
                alert("Invalid Username or Password");
                }
           },
           signOut:async()=> {
            try {
              await AsyncStorage.removeItem('userToken');
            } catch (e) {
              // saving 
            }
            dispatch({type:'LOGOUT'});
          },
          signInAE:async( data )=> {
             await firestore().collection('UserDetails').doc(loginState.userToken).set(data);
             console.log(loginState.userToken);
             dispatch({type:'LOGINAE'});
          }    
  }),[]);

  useEffect(()=>{
    setTimeout(async()=>{
      let userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // saving 
      }
      dispatch({type:'RETRIVE_TOKEN',token:userToken});},1000);
  },[]);


  if( loginState.isLoading ){
    return (
      <Loading />
    );
   
  }
 
  return (
    <AuthContext.Provider value={authContext}>
      { loginState.isFirstLogin ? <EditProfile /> : (
                <NavigationContainer>
                {loginState.userToken !== null ?( <BottomNavigation />):(<StackNavigator />)}
                </NavigationContainer>
                )}
   </AuthContext.Provider>
  );
  
};


export default App;
