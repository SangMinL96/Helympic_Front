import React from 'react';

import { Input, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import logo from '../../Image/logo.png';
import loginBg from '../../Image/LoginBg.jpg';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../component/TextInput';

export default function Login({ navigation }) {
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LoginView>
      <LoginLogo source={logo} />
      <SubTitle>모여서 운동하면 재미있다!</SubTitle>
      <TextInput control={control} label={'아이디'} icon={'user'} name={'id'} />
      <TextInput control={control} label={'비밀번호'} icon={'lock'} name={'pw'} />
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
    </LoginView>
  );
}

const LoginView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LoginLogo = styled.Image``;
const BtnBox = styled.View`
  width: 70%;
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
