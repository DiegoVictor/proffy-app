import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef<any>(null);

  const { fieldName, registerField, defaultValue } = useField(name);

  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      clearValue(ref) {
        ref.value = '';
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextInput
      ref={inputRef}
      keyboardAppearance="dark"
      defaultValue={defaultValue}
      placeholderTextColor="#c1bccc"
      onChangeText={value => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
};

export default Input;
