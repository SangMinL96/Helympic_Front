import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { useLogOut } from '../../../component/AuthProvider';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import axios from 'axios';
const TEST_DD = gql`
  mutation room($test: String!) {
    room(test: $test) {
      rslt
    }
  }
`;

function Profile({ navigation }) {
  useEffect(() => {
   
  }, []);
  const [testMt] = useMutation(TEST_DD);


  const loginOut = useLogOut();
  return (
    <View>
      <Text onPress={() => testMt({ variables: { test: "342342" } })}>sdfsdafa</Text>
      <Text onPress={loginOut}>아웃</Text>
    </View>
  );
}

export default Profile;
