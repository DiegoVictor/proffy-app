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

export const GiveClasses = () => {
  const { goBack } = useNavigation();

  const handleNavigateBack = () => {
    goBack();
  };

  return (
    <Container>
      <Content source={GiveClassesBgImg} resizeMode="contain">
        <Title>Quer ser um Proffy?</Title>
        <Description>
          Para começar, você precisa se cadastrar como professor na nossa
          plataforma web.
        </Description>
      </Content>

      <OkButton testID="back" onPress={handleNavigateBack}>
        <OkButtonText>Tudo Bem</OkButtonText>
      </OkButton>
    </Container>
  );
};
