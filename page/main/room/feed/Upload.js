import React, { useState } from 'react';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { UPLOAD_URL } from '../../../../config';
import Toast from 'react-native-toast-message';
import { useMutation } from '@apollo/react-hooks';
import { SAVE_ROOM_VIDEO } from './Query';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native';


function Upload({id,refetch}) {
    const [loading,setLoading]=useState(false)
  const [roomVideoMt] = useMutation(SAVE_ROOM_VIDEO);
  /**
   * 엑스포 이미지 픽커
   */
  let openImagePickerAsync = async () => {
    try {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('카메라 앨범에 액세스할 수 있는 권한이 필요합니다!');
        return;
      }

      const name = `video_${new Date().valueOf()}`;
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Videos'
      });
      const formData = new FormData();
      formData.append('video', { name, type: 'video/mp4', uri: pickerResult.uri });
      setLoading(true);
      const rslt = await axios.post(`${UPLOAD_URL}video/upload`, formData, null);
      if (rslt?.data === 'OK') {
        const rslt = await roomVideoMt({ variables: { param:{video:name,roomId:id} } });
        if (rslt?.data?.saveRoomVideo?.rslt === 'OK') {
            refetch()
          setLoading(false);
          Toast.show({ text1: '성공적으로 동영상 등록 하였습니다.' });
        }
      }
    } catch (err) {}
  };

  return (
        <Button
        buttonStyle={{ backgroundColor: '#9b9b9b',width:"100%" }}
        icon={<Icon name="movie-filter-outline" size={15} color="#0FF" />}
        onPress={openImagePickerAsync}
        loading={loading}
        title="동영상 등록"
        titleStyle={{ marginHorizontal: 5 }}
      />
  );
}

export default Upload;

// const videoStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../data/video/'); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리

//     },
//     filename: function (req, file, cb) {

//       cb(null, file.originalname + '.mp4'); // cb 콜백함수를 통해 전송된 파일 이름
//     }
//   });
//   const video = multer({ storage: videoStorage });

// app.get('/video', function (req, res) {
//     res.sendFile(path.resolve(__dirname, `../data/video/${req.query.fn}.mp4`));
//   });

//   app.post('/video/upload', video.single('video'), async (req, res, next) => {
//     try {
//       return res.send('OK');
//     } catch (err) {}
//   });
