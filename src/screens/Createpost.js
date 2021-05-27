import React from 'react';
import { View,Text,Button} from 'react-native';

import { AuthContext } from '../../src/components/Context';

const Search = () =>{
  const { signOut } = React.useContext(AuthContext);
    return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text>Search</Text>
       <Button title="Sign Out" onPress ={ ()=> {signOut()} } />
     </View>
   );
 }


 export default Search;