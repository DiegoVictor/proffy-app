import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import GiveClassesBgImg from '../../assets/images/give-classes-background.png';
import {
  Container,
  Content,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

const GiveClasses = () => {
  const { goBack } = useNavigation();

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <Container>
      <Content source={GiveClassesBgImg} resizeMode="contain">
        <Title>Quer ser um Proffy?</Title>
        <Description>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Description>
      </Content>

      <OkButton onPress={handleNavigateBack}>
        <OkButtonText>Tudo Bem</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default GiveClasses;
