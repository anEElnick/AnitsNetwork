import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect} from 'react';

import Login from './src/screens/Login';
import AddUserScreen from './src/screens/AddUserScreen';
import Loading from './src/screens/Loading';
import BottomNavigation from './src/components/BottomNavigation'

import { AuthContext, UserDetails } from './src/components/Context';
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
  
  const initialLoginState = {
    isLoading:true,
    userName:null,
    userToken:null,
    isFirstLogin:false,
    data:null
  };
  const loginReducer = (prevState , action )=>{
              switch( action.type ) {
                case 'FIRST_LOGIN':
                  //console.log("in reducer "+action.token);
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
                  };

                case 'SETUSERDATA':
                  return {
                    ...prevState,
                    data:action.data
                  }
              }
  };
  
  const [loginState , dispatch] = React.useReducer(loginReducer , initialLoginState);


  const authContext =  React.useMemo(()=>({
           signIn:async(userName, isloggedin, usertoken)=> {
             if(isloggedin == true){
                    var firstTimelogin = false;
                    var UserData=null;
                    await firestore().collection('UserDetails').doc(usertoken).get().then(snapshot => {
                        firstTimelogin = snapshot.exists;
                        if(snapshot.exists == true) UserData = snapshot.data();
                        
                        console.log("in app.js 96 "+snapshot.data());
                    });
                    
                    console.log(firstTimelogin);  
                    try{
                        await AsyncStorage.setItem('userToken',usertoken);
                    } catch (e) {
                          // saving 
                    } 
                    if(!firstTimelogin) {
                    
                      dispatch({type:'FIRST_LOGIN',id: userName,token:usertoken,isFirstLogin:true});
                    }else{
                          dispatch({type:'SETUSERDATA',data:UserData});
                          dispatch({type:'LOGIN',id: userName,token:usertoken});
                         
                        }
                  }else{
                    alert("Invalid Username or Password");
                  }
           },
           signOut:async()=> {
            try {
              await AsyncStorage.removeItem('userToken');
              //dispatch({type:'SETUSERDATA',data:null});
            } catch (e) {
              // saving 
            }
            dispatch({type:'LOGOUT'});
          },
          signInAE:async( data )=> {
             const userToken = await AsyncStorage.getItem('userToken');
             await firestore().collection('UserDetails').doc(userToken).set(data);
             alert("Data Updated");
             dispatch({type:'SETUSERDATA',data:data});
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
      var UserData={};
      await firestore().collection('UserDetails').doc(userToken).get().then(snapshot => {
          UserData = snapshot.data();
          console.log("in App.js 145 "+snapshot.data());
      });
      dispatch({type:'SETUSERDATA',data:UserData});
      dispatch({type:'RETRIVE_TOKEN',token:userToken});},1000);
  },[]);

  if( loginState.isLoading ){
    return (
      <Loading />
    );
   
  }
 
  

  console.log("in app "+ loginState.data );
  console.log("in app "+ loginState.userToken);
  return (
    <UserDetails.Provider value={loginState.data}>
    <AuthContext.Provider value={authContext}>
      { loginState.isFirstLogin ? <EditProfile /> : (
                <NavigationContainer>
                {loginState.userToken !== null ?( <BottomNavigation />):(<StackNavigator />)}
                </NavigationContainer>
                )}
   </AuthContext.Provider>
   </UserDetails.Provider>
  );
  
};


export default App;
