import React, { useCallback } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Image } from 'react-native';

import BackIcon from '../../assets/images/icons/back.png';
import LogoImg from '../../assets/images/logo.png';
import { Container, TopBar, Title } from './styles';
import { useNavigation } from '@react-navigation/native';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  const { navigate } = useNavigation();
  const handleGoBack = useCallback(() => {
    navigate('Landing');
  }, []);

  return (
    <Container>
      <TopBar>
        <BorderlessButton onPress={handleGoBack}>
          <Image source={BackIcon} resizeMode="contain" />
        </BorderlessButton>

        <Image source={LogoImg} resizeMode="contain" />
      </TopBar>
      <Title>{title}</Title>
    </Container>
  );
};

export default PageHeader;
