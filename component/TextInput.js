import React from 'react';
import { Input,Icon } from "@99xt/first-born";
import { Controller } from 'react-hook-form';
import styled from "styled-components/native"
import { View } from 'react-native';
function TextInput({ control, label, name,valid,errMsg,pwType,rule,pt,setInputValue }) {

  
  return (

    <Controller
      control={control}
      render={({ onChange }) => (
        <Input
          secureTextEntry={pwType || null}
          onChangeText={(value) => onChange(value)}
          placeholder={label}
          isValid={valid ||null} 
          errorMessage={errMsg}
         
        />
      )}
      name={name}
      defaultValue=""
      rules={{ required: rule ,pattern:pt }}
    />
   
    

  );
  
}

export default TextInput;

