import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Controller } from 'react-hook-form';
function TextInput({ control, label, name, icon, style }) {
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <Input
          style={{ ...style, fontSize: '0.95rem', marginLeft: '0.5em' }}
          onChangeText={(value) => onChange(value)}
          value={value}
          containerStyle={{ width: '70%' }}
          inputStyle={{ color: '#030303' }}
          placeholderTextColor={'#030303'}
          placeholder={label}
          leftIcon={<Icon name={icon} size={20} color="#2d2d35" />}
        />
      )}
      name={name}
      defaultValue=""
      // rules={{ required: true }}
    />
  );
}

export default TextInput;
