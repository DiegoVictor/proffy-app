import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: #8257e5;
  flex: 1;
  justify-content: center;
  padding: 40px;
`;

export const Content = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 32px;
  line-height: 37px;
  max-width: 180px;
`;

export const Description = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  line-height: 26px;
  margin-top: 24px;
  max-width: 240px;
`;

export const OkButton = styled(TouchableOpacity)`
  align-items: center;
  background-color: #04d361;
  border-radius: 8px;
  height: 58px;
  justify-content: center;
  margin: 40px 0px;
`;

export const OkButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
`;
