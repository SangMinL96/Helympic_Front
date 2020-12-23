import React from "react";

import { Input, Button } from "react-native-elements";
import styled from "styled-components/native";
import logo from "../../Image/title.png";
import loginBg from "../../Image/LoginBg.jpg";
import { useForm, Controller } from "react-hook-form";
import InputController from "../../component/InputController";

export default function Login() {

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <LoginView>
      <LoginLogo source={logo} />
      <SubTitle>모여서 운동하면 재미있다!</SubTitle>
      <InputController control={control} label={"아이디"} icon={"user"} name={"id"} />
      <InputController control={control} label={"비밀번호"} icon={"lock"} name={"pw"} />
        
      <Button titleStyle={{color:"#d3d3d3",fontWeight:"bold"}} containerStyle={{width:"70%",marginTop:"5%"}}  title="로그인" onPress={handleSubmit(onSubmit)} />
    </LoginView>
  );
}

const LoginView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #2b2b2b;
`;
const LoginLogo = styled.Image`

`;
const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color:#797979;
  margin-bottom: 20px;
`;