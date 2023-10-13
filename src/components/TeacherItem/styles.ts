import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IStyledComponent } from 'styled-components';
import styled from 'styled-components/native';

interface FavoriteButtonProps extends TouchableOpacityProps {
  favorited: boolean;
}

export const Container = styled.View`
  background-color: #fff;
  border-color: #e6e6f0;
  border-radius: 8px;
  border-width: 1px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const Profile = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 24px;
`;

export const Avatar = styled.Image`
  background-color: #eee;
  border-radius: 32px;
  height: 64px;
  width: 64px;
`;

export const ProfileInfo = styled.View`
  margin-left: 16px;
`;

export const Name = styled.Text`
  color: #32264d;
  font-family: 'Archivo_700Bold';
  font-size: 20px;
`;

export const Subject = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  margin-top: 4px;
`;

export const Bio = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
  line-height: 24px;
  margin: 0px 24px;
`;

export const Footer = styled.View`
  align-items: center;
  background-color: #fafafc;
  margin-top: 24px;
  padding: 24px;
`;

export const Price = styled.Text`
  color: #6a6180;
  font-family: 'Poppins_400Regular';
  font-size: 14px;
`;

export const PriceValue = styled.Text`
  color: #8257e5;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const FavoriteButton: IStyledComponent<
  'native',
  FavoriteButtonProps
> = styled(TouchableOpacity)<FavoriteButtonProps>`
  align-items: center;
  background-color: ${props => (props.favorited ? '#e33d3d' : '#8257e5')};
  border-radius: 8px;
  justify-content: center;
  height: 56px;
  margin-right: 8px;
  width: 56px;
`;

export const ContactButton = styled(TouchableOpacity)`
  align-items: center;
  background-color: #04d361;
  border-radius: 8px;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  height: 56px;
  margin-right: 8px;
`;

export const ContactButtonText = styled.Text`
  color: #fff;
  font-family: 'Archivo_700Bold';
  font-size: 16px;
  margin-left: 16px;
`;
