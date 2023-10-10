import styled from 'styled-components/native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IStyledComponent } from 'styled-components';

interface ButtonProps extends TouchableOpacityProps {
  color?: 'primary' | 'secondary';
}

export const Container = styled.View`
  background-color: #8257e5;
  flex: 1;
  justify-content: center;
  padding: 40px;
`;

export const Banner = styled.Image`
  width: 100%;
`;

export const Title = styled.Text`
  color: #fff;
  font-family: 'Poppins_400Regular';
  font-size: 20px;
  line-height: 30px;
  margin-top: 80px;
`;

export const TitleBold = styled.Text`
  font-family: 'Poppins_600SemiBold';
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 40px;
  justify-content: space-between;
`;

export const Button: IStyledComponent<'native', ButtonProps> = styled(
  TouchableOpacity,
)<ButtonProps>`
  background-color: ${props => {
    switch (props.color) {
      case 'primary':
        return '#9871f5';

      case 'secondary':
        return '#04d361';

      default:
        return '#333';
    }
  }};
  border-radius: 8px;
  height: 150px;
  justify-content: space-between;
  padding: 24px;
  width: 48%;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 20px;
`;

export const TotalConnections = styled.Text`
  color: #d4c2ff;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  line-height: 20px;
  margin-top: 40px;
  max-width: 140px;
`;
