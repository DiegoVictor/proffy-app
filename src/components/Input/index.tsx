import React from 'react';
import { TextInputProps } from 'react-native';
import { TextInput, Error } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ error, ...props }) => {
  return (
    <>
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#c1bccc"
        {...props}
      />
      {error && <Error>{error}</Error>}
    </>
  );
};
