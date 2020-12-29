import React, { useEffect } from 'react';

import { Input, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../component/TextInput';
import logo from '../../Image/logo.png';
export default function SignUp({ navigation }) {
  useEffect(() => {
    navigation.setOptions({});
  }, [navigation]);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <SignUpView>
      <SignUpTitle>회원가입</SignUpTitle>
      <TextInput control={control} label={'아이디'} icon={'user'} name={'ID'} />
      <TextInput control={control} label={'비밀번호'} icon={'lock'} name={'PW'} />
      <TextInput control={control} label={'이메일'} icon={'lock'} name={'EML'} />
      <TextInput control={control} label={'휴대폰 번호'} icon={'lock'} name={'HP'} />

      <Button
        titleStyle={{ fontWeight: 'bold' }}
        containerStyle={{ width: '70%', marginTop: '5%' }}
        title="회원가입"
        onPress={() => navigation.navigate('SignUp')}
      />
    </SignUpView>
  );
}

const SignUpView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LoginLogo = styled.Image``;

const SignUpTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #707070;
  margin-bottom: 20px;
`;
