import React, { useCallback, ReactNode, PropsWithChildren } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import BackIcon from '../../assets/images/icons/back.png';
import LogoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import { Container, TopBar, Header, Title } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/AppStack';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

type NavigateProps = NativeStackScreenProps<StackParamList>['navigation'];

const PageHeader: React.FC<PropsWithChildren<PageHeaderProps>> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation<NavigateProps>();
  const handleGoBack = useCallback(() => {
    navigate('Landing');
  }, []);

  return (
    <Container>
      <TopBar>
        <TouchableOpacity onPress={handleGoBack}>
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

export { PageHeader };
