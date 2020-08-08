import styled from 'styled-components/native';
import { Form } from '@unform/mobile';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  background-color: #f0f0f7;
  flex: 1;
`;

export const List = styled.ScrollView`
  margin-top: -40px;
`;

export const SearchForm = styled(Form)`
  margin-bottom: 24px;
`;

export const Label = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
`;

export const InputGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const InputBlock = styled.View`
  width: 48%;
`;

export const SubmitButton = styled(RectButton)`
  align-items: center;
  background-color: #04d361;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  height: 56px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
`;
