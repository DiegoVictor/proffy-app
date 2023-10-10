import { Image, TouchableOpacity } from 'react-native';

import BackIcon from '../../assets/images/icons/back.png';
import LogoImg from '../../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import { Container, TopBar, Header, Title } from './styles';

interface PageHeaderProps {
  title: string;
  headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
  const { navigate } = useNavigation();
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

export default PageHeader;
