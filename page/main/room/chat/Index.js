import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import styled from "styled-components/native"
import Chatting from './Chatting';
import { useQuery,useMutation } from '@apollo/react-hooks';
import { GET_PROFILE } from './Query';


function Chat({ navigation,route }) {
const { data: userData,loading,refetch:userDataRf } = useQuery(GET_PROFILE, {
  fetchPolicy: 'network-only'
});

  useEffect(() => {
   
  }, []);

  return (
    <ChatScreen>
      <Chatting {...userData?.getProfile[0]} roomId={route.params.id}/>
    </ChatScreen>
  );
}

export default Chat;
const ChatScreen = styled.View`
  ${(props) => props.theme.screen};
  background-color: ${(props) => props.theme.backColor};
`;