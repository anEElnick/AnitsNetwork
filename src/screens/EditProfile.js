import React from 'react';
import {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { AuthContext } from '../../src/components/Context';




const EditProfile = () => {
  const [name,setName] = useState('');
  const [yoj ,setYOJ] = useState('');

  const { signInAE } = React.useContext(AuthContext);
  const saveHandle = async( data )=> {
    console.log(data);
    signInAE( data );
  };
  return (
    <View style={{ flex: 1 }}>
    <View style={{ height:130 }}>
         <View style={{ flex:2}}>
                   <ImageBackground source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}} style={styles.coverimage} >
                   </ImageBackground>
         </View>
         <View style = { styles.MainContainer }>
             <Image source={{uri : 'https://reactnativecode.com/wp-content/uploads/2018/01/2_img.png'}}
                 style={{width: 130, height: 130, borderRadius: 120/2}} />
         </View>
    </View>
    <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Name'}
              value={name}
              onChangeText={setName}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Email'}
              value={name}
              onChangeText={setName}
          />
          
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={name}
              onChangeText={setName}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add User'
            onPress={()=>{}} 
            color="#19AC52"
          />
        </View>
      </ScrollView>
      
    </View>
   
  </View>
    
  );
};

const styles = StyleSheet.create(
  {
    coverimage: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
      
    },
    MainContainer:
    {
      position:'absolute',
      top:30,
      alignSelf:'center',
      flex: 1,
      margin: 5,
      paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    textstyle:{
      fontSize:16,
      fontWeight:'600'
    },
    container: {
      flex: 1,
      padding: 35
    },
    inputGroup: {
      flex: 1,
      padding: 0,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    preloader: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center'
    }
   
  });


export default EditProfile;

