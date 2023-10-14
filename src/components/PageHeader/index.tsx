import React, { useCallback, ReactNode, PropsWithChildren } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import BackIcon from '../../assets/images/icons/back.png';
import LogoImg from '../../assets/images/logo.png';
import { StackParamList } from '../../routes/AppStack';
import { Container, TopBar, Header, Title } from './styles';

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

export { PageHeader };
