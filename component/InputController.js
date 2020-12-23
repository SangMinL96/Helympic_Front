import React from 'react';
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import {  Controller } from "react-hook-form";
function InputController({control,label,name,icon}){

 return (
 <Controller
    control={control}
    render={({ onChange, onBlur, value }) => (
      <Input
        onChangeText={(value) => onChange(value)}
        value={value}
        containerStyle={{ width: "70%" }}
        inputStyle={{ color: "#b6b6b6" }}
        placeholderTextColor={"#b6b6b6"}
        placeholder={label}
        leftIcon={<Icon name={icon} size={24} color="#8b8b8b" />}
      />
    )}
    name={name}
    defaultValue=""
    // rules={{ required: true }}
  />
  );
}

export default InputController;