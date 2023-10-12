import React, { useCallback, useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
import api from '../../services/api';
import { StackParamList } from '../../routes/AppStack';

type NavigateProps = NativeStackScreenProps<StackParamList>['navigation'];

const Landing: React.FC = () => {
  const { navigate } = useNavigation<NavigateProps>();
  const [totalConnections, setTotalConnections] = useState(0);

  const handleNavigationToGiveClassesPage = useCallback(() => {
    navigate('GiveClasses');
  }, [navigate]);

  const handleNavigationToStudyClassesPage = useCallback(() => {
    navigate('Study');
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('connections');
      setTotalConnections(data.total);
    })();
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
        Total de {totalConnections} conexões já realizadas{' '}
        <Image source={HeartIcon} />
      </TotalConnections>
    </Container>
  );
};

export { Landing };
