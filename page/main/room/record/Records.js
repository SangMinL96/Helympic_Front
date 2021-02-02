import { Video } from 'expo-av';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import VideoPlayer from 'expo-video-player';
import { ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_RECORD_VIDEO } from './Query';
import { UPLOAD_URL } from '../../../../config';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, Image, TouchableOpacity } from 'react-native';

function Records({ name, id }) {
  const { data, loading } = useQuery(GET_RECORD_VIDEO, {
    variables: { roomId: id },
    fetchPolicy: 'network-only'
  });
  console.log(data);
  return (
    <RecordsView>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <>
          {data?.getRecordVideo ? (
            <ScrollView style={{ flex: 1, width: '100%', paddingBottom: 10 }}>
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#363636' }}>이번주 명예의 전당</Text>
              </View>
              {data?.getRecordVideo?.map((item, index) => (
                <VideoView key={index}>
                  <RankingView ranking={index}>
                    {index === 0 ? (
                      <Image source={require(`../../../../Image/first.png`)} />
                    ) : index === 1 ? (
                      <Image source={require(`../../../../Image/second.png`)} />
                    ) : (
                      <Image source={require(`../../../../Image/third.png`)} />
                    )}
                  </RankingView>
                  <VideoPlayer
                    height={280}
                    textStyle={{ fontSize: 13, color: '#e9e9e9' }}
                    showFullscreenButton={false}
                    videoProps={{
                      shouldPlay: false,
                      resizeMode: Video.RESIZE_MODE_CONTAIN,
                      source: {
                        uri: item.video ? `${UPLOAD_URL}video/?fn=${item.video}` : null
                      }
                    }}
                    inFullscreen={true}
                  />
                  <ListItem containerStyle={{ backgroundColor: '#f8f8f8', padding: 10 }}>
                    <RoomAvatar
                      resizeMode="cover"
                      source={{ uri: item.avatar ? `${UPLOAD_URL}image/?fn=${item.avatar}` : null }}
                    />
                    <ListItem.Content>
                      <DtlBoldText>{item?.name}</DtlBoldText>
                      <DtlText>{item?.id}</DtlText>
                    </ListItem.Content>
                    <LikeView>
                      <Icon name="heart" size={25} color="red" />
                      <Text style={{ color: 'gray' }}>{item.vCount}</Text>
                    </LikeView>
                  </ListItem>
                </VideoView>
              ))}
            </ScrollView>
          ) : (
            <View>
              <Text>해당 방에 동영상이 없어 순위를 정할 수 없습니다.</Text>
            </View>
          )}
        </>
      )}
    </RecordsView>
  );
}

export default Records;
const RecordsView = styled.View`
  flex: 1;
`;
const VideoView = styled.View`
  height: 400px;
  margin-bottom: 25px;
  margin-top: 10px;
  background-color: #f8f8f8;
`;
const DtlText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
`;
const DtlBoldText = styled.Text`
  font-size: 13.5px;
  font-weight: bold;
`;
const RoomAvatar = styled.Image`
  border-radius: 20px;
  width: 50px;
  height: 50px;
  background-color: #d1d8e0;
  /* background-color: ${(props) => props.theme.darkGreyColor}; */
`;
const LikeView = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const RankingView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.ranking === 0 ? '#cea324' : props.ranking === 1 ? '#9F9D9E' : '#DCA680')};
`;
