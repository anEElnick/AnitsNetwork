import React from 'react';
import { View,Text,Button} from 'react-native';
import { Posts } from '../components/Context';

const Notifications = () =>{
    const pd = React.useContext(Posts);
    var ak = pd;
    console.log(ak);
    return (
       <View style={{flex:1}}>
        
        <View style={{ height:50 ,backgroundColor:'white' }}>
            <Text style={{fontWeight:'700',fontSize:30}}>  Notifications </Text>
        </View>
     </View>
   );
 }


 export default Notifications;