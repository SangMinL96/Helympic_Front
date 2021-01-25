import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native';
import logo from '../../Image/logo.png';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../component/TextInput';
import Toast from 'react-native-toast-message';
import { Icon } from '@99xt/first-born';
import { LOGIN_USER } from './Query';
import { useMutation } from '@apollo/react-hooks';
import { useLogIn } from '../../component/AuthProvider';
import { onUserInfo } from '../../component/utils';

export default function Login({ route, navigation }) {
  const [logLoading,setLogLoading]=useState(false)
  const [loginMt] = useMutation(LOGIN_USER);
  const { control, handleSubmit, setValue, errors, clearErrors } = useForm();
  const onLogin = useLogIn();

  useEffect(() => {
    // react-hook-form 유효성 검사에서 에러 발생시 에러메시지 출력
    if (Object.keys(errors).length >= 1) {
      console.log(errors);
      Toast.show({ text1: '빈칸을 확인해주세요.', type: 'error' });
      clearErrors();
    }
    // 회원 가입시 네비게이션을 통해 로그인 화면으로 넘어온후 발생되는 메시지 출력
    if (route?.params?.signUp === 'OK') {
      Toast.show({ text1: '성공적으로 회원가입 되었습니다. 로그인 해주세요.' });
      navigation.setParams({ signUp: '' });
    }
  }, [route, setValue, errors]);


    /**
   * 로그인 전송 함수
   * @param {Object} data  react-hook-form 로그인시 전송되는 인풋값
   */
  const onSubmit = async (data) => {
    setLogLoading(true)
    try {
      const rslt = await loginMt({ variables: { param: data } });
      const userInfo = rslt.data.user;
      if(userInfo){
        setLogLoading(false)
      }
     onLogin(userInfo);
    
      // navigation.navigate("Main")
    } catch (err) {}
  };

  return (
    <View>
      <Logo source={logo} />
      <Title>헬림픽</Title>
      <Icon name="heart" color="red" />
      <InputView>
        <TextInput control={control} label={'아이디'} name={'id'} rule={true} />
        <TextInput control={control} label={'비밀번호'} name={'pw'} pwType={true} rule={true} />
        <BtnBox>
          <Button
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{ width: '48%', marginTop: '5%' }}
            title="로그인"
            loading={logLoading}
            onPress={handleSubmit(onSubmit)}
          />
          <Button
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{ width: '48%', marginTop: '5%' }}
            title="회원가입"
            onPress={() => navigation.navigate('SignUp')}
          />
        </BtnBox>
      </InputView>
    </View>
  );
}

const View = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Logo = styled.Image``;
const InputView = styled.View`
  width: 70%;
`;
const BtnBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4b4b4b;
  margin-bottom: 20px;
`;
