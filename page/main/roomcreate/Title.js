import React, { useEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Title() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
       header:()=>{

       }
    });
  }, [navigation]);

  return (
    <View style={{flex:1,paddingTop:50}}>
      <Text>타이틀</Text>
    </View>
  );
}

export default Title;
