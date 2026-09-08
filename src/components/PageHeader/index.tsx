import React, { ReactNode, PropsWithChildren } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../..';
import { Container, Header, TopBar, Title } from './styles';
import BackIcon from '../../assets/images/icons/back.png';
import LogoImg from '../../assets/images/logo.png';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

type NavigateProps = NativeStackScreenProps<StackParamList>['navigation'];

export const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation<NavigateProps>();
  const handleGoBack = () => {
    navigate('Landing');
  };

  return (
    <Container>
      <TopBar>
        <TouchableOpacity testID="back" onPress={handleGoBack}>
          <Image source={BackIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Image source={LogoImg} resizeMode="contain" />
      </TopBar>

      <Header>
        <Title>{title}</Title>

        {headerRight}
      </Header>

      {children}
    </Container>
  );
};
