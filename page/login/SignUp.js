import React, { useEffect, useLayoutEffect, useState } from 'react';

import { Input, Button } from 'react-native-elements';
import styled from 'styled-components/native';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../component/TextInput';
import logo from '../../Image/logo.png';
import {
  emailValid,
  emailErr,
  lengthValid,
  lengthErr,
 
  pwValid,
  pwErr,
  lengthPt,
  pwPt,
  emailPt,
  
} from '../../component/Validate';
import { SAVE_USER, ID_CHECK, NAME_CHECK } from './Query';
import { useMutation } from '@apollo/react-hooks';
import Toast from 'react-native-toast-message';
import SelectInput from '../../component/SelectInput';
export default function SignUp({ navigation }) {
  const [checkState, setCheckState] = useState({ id: false, name: false });
  const { control, handleSubmit, errors, clearErrors, getValues } = useForm();
  const [addMt] = useMutation(SAVE_USER);
  const [idCheckMt] = useMutation(ID_CHECK);
  const [nameCheckMt] = useMutation(NAME_CHECK);

  useEffect(() => {
       // react-hook-form 유효성 검사에서 에러 발생시 에러메시지 출력
    if (Object.keys(errors).length >= 1) {
  
      Toast.show({ text1: '빈칸 및 형식을 확인해주세요.', type: 'error' });
      if (!errors.id) {
       // 아이디 중복 체크
        setCheckState((props) => ({ ...props, id: false }));
      }
      if (!errors.name) {
       // 닉네임 중복 체크
        setCheckState((props) => ({ ...props, name: false }));
      }
      clearErrors();
    }
   
  }, [errors]);

   /**
   * 회원가입 전송 함수
   * @param {Object} data  react-hook-form 로그인시 전송되는 인풋값
   */
  const onSubmit = async (data) => {
    if (checkState.id === true && checkState.name === true) {
      try {
        const rslt = await addMt({ variables: { param: data } });
        console.log(rslt)
        if (rslt?.data?.signUpUser?.rslt === 'OK') {
          navigation.navigate('Login', { id: data.id, signUp: 'OK' });
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      Toast.show({ text1: '아이디 및 닉네임 중복 확인해주세요.', type: 'info' });
    }
  };
   /**
   * 아이디 및 닉네임 중복확인시 db와 비교하여 중복 여부 확인
   * @param {String} type 아이디, 닉네임 분류하여 중복 확인
   */
  const onInputCheck = async (type) => {
    try {
      if (type === 'id') {
        const rslt = await idCheckMt({ variables: { id: getValues('id') } });
        if (rslt?.data?.idCheck?.rslt === 'NG') {
          Toast.show({ text1: '중복된 아이디가 존재합니다.', type: 'error' });
          setCheckState((props) => ({ ...props, id: false }));
        }
        if (rslt?.data?.idCheck?.rslt === 'OK') {
          Toast.show({ text1: '사용가능한 아이디 입니다.' });
          setCheckState((props) => ({ ...props, id: true }));
        }
      }
      if (type === 'name') {
        const rslt = await nameCheckMt({ variables: { name: getValues('name') } });
        if (rslt?.data?.nameCheck?.rslt === 'NG') {
          Toast.show({ text1: '중복된 닉네임이 존재합니다.', type: 'error' });
          setCheckState((props) => ({ ...props, name: false }));
        }
        if (rslt?.data?.nameCheck?.rslt === 'OK') {
          Toast.show({ text1: '사용가능한 닉네임 입니다.' });
          setCheckState((props) => ({ ...props, name: true }));
        }
      }
    } catch (err) {
      console.dir(err);

      setCheckState((props) => ({ ...props, id: false, name: false }));
    }
  };

  return (
    <SignUpView>
      <SignUpTitle>회원가입</SignUpTitle>
      <InputView>
        <InputBox>
          <TextInput
            control={control}
            label={'아이디'}
            name={'id'}
            valid={lengthValid}
            errMsg={lengthErr}
            rule={true}
            pt={lengthPt}
          />
          <InputBtn onPress={(ev) => onInputCheck('id')}>
            <InputText>중복 확인</InputText>
          </InputBtn>
        </InputBox>
        <TextInput
          control={control}
          label={'비밀번호'}
          name={'pw'}
          pwType={true}
          valid={pwValid}
          errMsg={pwErr}
          rule={true}
          pt={pwPt}
        />
       
        <TextInput
          control={control}
          label={'이메일'}
          name={'eml'}
          valid={emailValid}
          errMsg={emailErr}
          rule={true}
          pt={emailPt}
        />
        <InputBox>
          <TextInput control={control} label={'닉네임'} name={'name'} rule={true} />
          <InputBtn onPress={() => onInputCheck('name')}>
            <InputText>중복 확인</InputText>
          </InputBtn>
        </InputBox>
       <SelectInput    label={'생년월일'} control={control}  name={'age'} />
        <Button
          titleStyle={{ fontWeight: 'bold' }}
          containerStyle={{ marginTop: '5%' }}
          title="회원가입"
          onPress={handleSubmit(onSubmit)}
        />
      </InputView>
      {/* <Toastify setToast={setToast} /> */}
    </SignUpView>
  );
}

const SignUpView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const LoginLogo = styled.Image``;
const InputView = styled.View`
  width: 70%;
`;
const SignUpTitle = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #707070;

  margin-bottom: 20px;
`;

const InputBox = styled.View`
  position: relative;
`;

const InputBtn = styled.TouchableOpacity`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 3%;
  top: 22px;
  width: 52px;
  background-color: #3498db;
  height: 20px;
  border-radius: 10px;
`;
const InputText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: white;
`;
