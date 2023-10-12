import React, { useState, useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useFocusEffect } from '@react-navigation/native';

import { PageHeader } from '../../components/PageHeader';
import { TeacherItem } from '../../components/TeacherItem';
import { Input } from '../../components/Input';
import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem';
import { getValidationErrors } from '../../utils/getValidationErrors';
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

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  const handleSubmit = useCallback(
    async ({ subject, week_day, time }: Record<string, string>) => {
      try {
        const schema = Yup.object().shape({
          subject: Yup.string().required('Este campo é obrigatório'),
          week_day: Yup.string().required('Este campo é obrigatório'),
          time: Yup.string().required('Este campo é obrigatório'),
        });

        const data = {
          subject: subject,
          week_day: week_day,
          time: time,
        };

        await schema.validate(data, { abortEarly: false });

        const response = await api.get<Teacher[]>('classes', {
          params: data,
        });

        setTeachers(response.data);
        setIsFiltersVisible(false);
        loadFavorites();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        } else {
          Alert.alert('Ops! Alguma coisa deu errado, tente mais tarde!');
        }
      }
    },
    [],
  );

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
          <TouchableOpacity onPress={handleToggleFiltersVisible}>
            <Feather name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
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

export { TeacherList };
