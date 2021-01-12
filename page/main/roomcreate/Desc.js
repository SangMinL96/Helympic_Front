import React, { useEffect } from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Desc() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <HeaderBackButton
          {...props}
          onPress={() =>navigation.navigate('Tebs')}
        />
      ),
      headerRight: () => (
        <TouchableOpacity  onPress={() =>navigation.navigate('HashTag')}>
          <Text>다음</Text>
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  return (
    <View>
      <Text>설명</Text>
    </View>
  );
}

export default Desc;
