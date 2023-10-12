import React, { useCallback, useState } from 'react';
import { Image, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HeartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import UnfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import WhatsAppIcon from '../../assets/images/icons/whatsapp.png';
import { formatValue } from '../../utils/formatValue';
import {
  Container,
  Profile,
  Avatar,
  ProfileInfo,
  Name,
  Subject,
  Bio,
  Footer,
  Price,
  PriveValue,
  ButtonsContainer,
  FavoriteButton,
  ContactButton,
  ContactButtonText,
} from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  subject: string;
  cost: number;
  name: string;
  avatar: string;
  whatsapp: string;
  bio: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);
  const handleLinkToWhatsApp = useCallback(async () => {
    try {
      await Promise.all([
        api.post('connections', { user_id: teacher.id }),
        Linking.openURL(
          `http://api.whatsapp.com/send?phone=${teacher.whatsapp}`,
        ),
      ]);
    } catch (err) {
      Alert.alert('Ops! Alguma coisa deu errado, tente novamente!');
    }
  }, []);

  const handleToggleFavorite = useCallback(async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    const favorites = [];

    if (storedFavorites) {
      favorites.push(...JSON.parse(storedFavorites));
    }

    if (isFavorited) {
      const favoriteIndex = favorites.findIndex(
        (teacherItem: Teacher) => teacherItem.id === teacher.id,
      );
      favorites.splice(favoriteIndex, 1);
      setIsFavorited(false);
    } else {
      favorites.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  }, []);

  return (
    <Container>
      <Profile>
        <Avatar
          source={{
            uri: teacher.avatar,
          }}
        />

        <ProfileInfo>
          <Name>{teacher.name}</Name>
          <Subject>{teacher.subject}</Subject>
        </ProfileInfo>
      </Profile>

      <Bio>{teacher.bio}</Bio>

      <Footer>
        <Price>
          Preço/hora {'   '}
          <PriveValue>{formatValue(teacher.cost)}</PriveValue>
        </Price>

        <ButtonsContainer>
          <FavoriteButton
            favorited={isFavorited}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={UnfavoriteIcon} />
            ) : (
              <Image source={HeartOutlineIcon} />
            )}
          </FavoriteButton>

          <ContactButton onPress={handleLinkToWhatsApp}>
            <Image source={WhatsAppIcon} />
            <ContactButtonText>Entrar em contato</ContactButtonText>
          </ContactButton>
        </ButtonsContainer>
      </Footer>
    </Container>
  );
};

export { TeacherItem };
