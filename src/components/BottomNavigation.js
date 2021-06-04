import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Dimensions} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import colors from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../../src/screens/Home';
import EditProfile from '../../src/screens/EditProfile';
import CreatePost from '../../src/screens/Createpost';
import Profile from '../../src/screens/Profile';
import Search from '../../src/screens/Search';
import Notifications from '../../src/screens/Notifications';

const {width} = Dimensions.get('window');

const Stack = createStackNavigator();

const ProfileStack = () =>{
    return (
            <Stack.Navigator initialRouteName='Profile' headerMode='none' >
                <Stack.Screen  name='Profile' component={Profile}  />
                <Stack.Screen  name='EditProfile' component={EditProfile}  /> 
            </Stack.Navigator>    
          
    );
};

const Tab = createBottomTabNavigator();

export default () => {
  return (
       <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            showLabel: false,
            style: styles.container 
          }}
        >
            <Tab.Screen name="Home" component={Home} options={{
              tabBarIcon:() => ( 
                   <Icon name="ios-home"  size={35} />
              )
            }}/>
            <Tab.Screen name="Search" component={Search} options={{
              tabBarIcon:() => ( 
                   <Icon name="ios-search"  size={35} />
              )
            }}/>

            <Tab.Screen name="CreatePost" component={CreatePost} options={{
              tabBarIcon:() => ( 
                   <Icon name="add-circle-outline"  size={45} />
              )
            }}/>
            
            <Tab.Screen name="Notifications" component={Notifications} options={{
              tabBarIcon:() => ( 
                   <Icon name="notifications"  size={35} />
              )
            }}/>
            <Tab.Screen name="Profile" component={ProfileStack} options={{
              tabBarIcon:() => ( 
                   <Icon name="ios-person"  size={35} />
              )
            }} />
       </Tab.Navigator>
  );

};



  
const styles = StyleSheet.create({
  container: {
    position :'absolute',
    bottom:0,
    left: 1,
    right: 1,
    elevation:0,
    backgroundColor: '#ffffff',
    borderRadius:0,
    height:45,
  }
});
