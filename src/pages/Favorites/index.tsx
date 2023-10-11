import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { Container, List } from './styles';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Teacher[]>([]);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favorited = JSON.parse(response);
        setFavorites(favorited);
      }
    });
  }, []);

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader title="Meus proffys favoritos" />

      <List
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((favorite: Teacher) => (
          <TeacherItem key={favorite.id} teacher={favorite} favorited={true} />
        ))}
      </List>
    </Container>
  );
};

export { Favorites };
