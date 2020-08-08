import React, { useState, useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { FormHandles } from '@unform/core';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem';
import {
  Container,
  List,
  SearchForm,
  Label,
  InputGroup,
  InputBlock,
  SubmitButton,
  SubmitButtonText,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsfiltersVisible] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsfiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  const handleSubmit = useCallback(async ({ subject, week_day, time }) => {
    try {
      const { data } = await api.get<Teacher[]>('classes', {
        params: {
          subject: subject.trim(),
          week_day: week_day.trim(),
          time: time.trim(),
        },
      });

      setTeachers(data);
      setIsfiltersVisible(false);
      loadFavorites();
    } catch (err) {
      Alert.alert('Ops! Alguma coisa deu errado, tente mais tarde!');
    }
  }, []);

  const loadFavorites = useCallback(() => {
    AsyncStorage.getItem('favorites').then(response => {
      if (response) {
        const favorited = JSON.parse(response);
        setFavorites(favorited.map((teacher: Teacher) => teacher.id));
      }
    });
  }, []);

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </BorderlessButton>
        }
      >
        {isFiltersVisible && (
          <SearchForm ref={formRef} onSubmit={handleSubmit}>
            <Label>Máteria</Label>
            <Input name="subject" placeholder="Qual a máteria?" />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input name="week_day" placeholder="Qual o dia?" />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input name="time" placeholder="Qual o horário?" />
              </InputBlock>
            </InputGroup>

            <SubmitButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <SubmitButtonText>Filtrar</SubmitButtonText>
            </SubmitButton>
          </SearchForm>
        )}
      </PageHeader>

      <List
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => (
          <TeacherItem
            key={teacher.id}
            teacher={teacher}
            favorited={favorites.includes(teacher.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default TeacherList;
