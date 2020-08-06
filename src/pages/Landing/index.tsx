import React, { useCallback } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LandingImg from '../../assets/images/landing.png';
import StudyIcon from '../../assets/images/icons/study.png';
import HeartIcon from '../../assets/images/icons/heart.png';
import GiveClassesIcon from '../../assets/images/icons/give-classes.png';
import {
  Container,
  Banner,
  Title,
  TitleBold,
  ButtonsContainer,
  Button,
  ButtonText,
  TotalConnections,
} from './styles';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigationToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, [navigate]);

  const handleNavigationToStudyClassesPage = useCallback(() => {
    navigate('Study');
  }, []);

  return (
    <Container>
      <Banner source={LandingImg} resizeMode="contain" />

      <Title>
        Seja bem-vindo, {'\n'}
        <TitleBold>O que deseja fazer?</TitleBold>
      </Title>

      <ButtonsContainer>
        <Button color="primary" onPress={handleNavigationToStudyClassesPage}>
          <Image source={StudyIcon} />

          <ButtonText>Estudar</ButtonText>
        </Button>

        <Button color="secondary" onPress={handleNavigationToGiveClassesPage}>
          <Image source={GiveClassesIcon} />

          <ButtonText>Dar Aulas</ButtonText>
        </Button>
      </ButtonsContainer>

      <TotalConnections>
        Total de 285 conexões já realizadas <Image source={HeartIcon} />
      </TotalConnections>
    </Container>
  );
};

export default Landing;
