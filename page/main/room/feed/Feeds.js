import { Video } from 'expo-av';
import React, { useState } from 'react';
import styled from 'styled-components/native';
import VideoPlayer from 'expo-video-player';
import { ScrollView } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useQuery, useMutation } from '@apollo/react-hooks';
import * as ScreenOrientation from 'expo-screen-orientation';
import Upload from './Upload';
import { GET_ROOM_VIDEO, SAVE_LIKE } from './Query';
import { UPLOAD_URL } from '../../../../config';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, TouchableOpacity } from 'react-native';

function Feeds({ name, id }) {
  const { data, loading, refetch } = useQuery(GET_ROOM_VIDEO, {
    variables: { roomId: id },
    fetchPolicy: 'network-only'
  });
  console.log(data)
  const [likeMt] = useMutation(SAVE_LIKE);
  const onDelLike = async (videoId) => {
    try {
      const rslt = await likeMt({ variables: { type: 'del', videoId } });

      if (rslt?.data?.saveLike?.rslt === 'OK') {
        refetch();
      }
    } catch (err) {}
  };
  const onSaveLike = async (videoId) => {
    try {
      const rslt = await likeMt({ variables: { type: 'save', videoId } });

      if (rslt?.data?.saveLike?.rslt === 'OK') {
        refetch();
      }
    } catch (err) {}
  };

  return (
    <FeedsView>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0059ff" />
        </View>
      ) : (
        <>
          <ScrollView style={{ flex: 1, width: '100%',paddingBottom:10 }}>
            <View style={{margin:10 }}>
              <Text style={{ textAlign:"center",fontWeight: 'bold', fontSize: 20 }}>3대 측정 동영상</Text>
            </View>
            {data?.getRoomVideo ?data?.getRoomVideo?.map((item, index) => (
              <VideoView  key={index}>
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
                {item.checked === 1 ? (
                  <Button
                    buttonStyle={{ height: 50 }}
                    icon={<Icon name="heart" size={25} color="red" />}
                    onPress={() => onDelLike(item.videoId)}
                    title="좋아요"
                  />
                ) : (
                  <Button
                    buttonStyle={{ height: 50 }}
                    icon={<Icon name="heart-outline" size={25} color="red" />}
                    onPress={() => onSaveLike(item.videoId)}
                    title="좋아요"
                  />
                )}
              </VideoView>
            )):<Text style={{textAlign:"center"}}>동영상이 존재하지 않습니다. 등록해주세요.</Text>}
         
          </ScrollView>
          <Upload id={id} refetch={refetch} />
        </>
      )}
    </FeedsView>
  );
}

export default Feeds;
const FeedsView = styled.View`
 
  flex: 1;
`;
const VideoView = styled.View`
  height: 380px;
  margin-bottom: 25px;
  margin-top: 18px;
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
const LikeBtn = styled.View`
  border: 1px solid #dddddd;
  padding: 11px;
  background-color: #dddddd;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
