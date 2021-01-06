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
export default function Login({ route, navigation }) {
  const [loginMt] = useMutation(LOGIN_USER);
  const { control, handleSubmit, setValue, errors, clearErrors } = useForm();
  const onLogin = useLogIn();

  useEffect(() => {
    if (Object.keys(errors).length >= 1) {
      console.log(errors);
      Toast.show({ text1: '빈칸을 확인해주세요.', type: 'error' });
      clearErrors();
    }
    if (route?.params?.signUp === 'OK') {
      Toast.show({ text1: '성공적으로 회원가입 되었습니다. 로그인 해주세요.' });
      navigation.setParams({ signUp: '' });
    }
  }, [route, setValue, errors]);

  const onSubmit = async (data) => {
    try {
      const rslt = await loginMt({ variables: { param: data } });
      const userInfo = rslt.data.user;

      onLogin(JSON.stringify(userInfo));
      // navigation.navigate("Main")
    } catch (err) {}
  };

  return (
    <LoginView>
      <LoginLogo source={logo} />
      <SubTitle>헬림픽</SubTitle>
      <Icon name="heart" color="red" />
      <InputView>
        <TextInput control={control} label={'아이디'} name={'id'} rule={true} />
        <TextInput control={control} label={'비밀번호'} name={'pw'} pwType={true} rule={true} />
        <BtnBox>
          <Button
            titleStyle={{ fontWeight: 'bold' }}
            containerStyle={{ width: '48%', marginTop: '5%' }}
            title="로그인"
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
    </LoginView>
  );
}

const LoginView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LoginLogo = styled.Image``;
const InputView = styled.View`
  width: 70%;
`;
const BtnBox = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #4b4b4b;
  margin-bottom: 20px;
`;
