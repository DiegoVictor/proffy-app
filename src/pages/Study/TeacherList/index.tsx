import React, { useState, useCallback } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Feather } from '@react-native-vector-icons/feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { PageHeader } from '../../../components/PageHeader';
import { TeacherItem, Teacher } from '../../../components/TeacherItem';
import { Input } from '../../../components/Input';
import { api } from '../../../services/api';
import { getValidationErrors } from '../../../helpers/getValidationErrors';
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

export const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible(!isFiltersVisible);
  }, [isFiltersVisible]);

  const handleSubmit = async () => {
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
        const validationErrors = getValidationErrors(err);
        setErrors(validationErrors);
      } else {
        Alert.alert('Ops! Alguma coisa deu errado, tente mais tarde!');
      }
    }
  };

  const loadFavorites = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      const favorited = JSON.parse(favorites);
      setFavorites(favorited.map((teacher: Teacher) => teacher.id));
    }
  };

  useFocusEffect(() => {
    loadFavorites();
  });

  return (
    <Container>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <TouchableOpacity
            testID="show-filters"
            onPress={handleToggleFiltersVisible}
          >
            <Feather name="filter" size={20} color="#FFF" />
          </TouchableOpacity>
        }
      >
        {isFiltersVisible && (
          <SearchForm>
            <Label>Máteria</Label>
            <Input
              name="subject"
              placeholder="Qual a máteria?"
              error={errors.subject}
              value={subject}
              onChangeText={setSubject}
            />

            <InputGroup>
              <InputBlock>
                <Label>Dia da semana</Label>
                <Input
                  name="week_day"
                  placeholder="Qual o dia?"
                  error={errors.week_day}
                  value={week_day}
                  onChangeText={setWeekDay}
                />
              </InputBlock>

              <InputBlock>
                <Label>Horário</Label>
                <Input
                  name="time"
                  placeholder="Qual o horário?"
                  error={errors.time}
                  value={time}
                  onChangeText={setTime}
                />
              </InputBlock>
            </InputGroup>

            <SubmitButton
              testID="submit"
              onPress={async () => {
                await handleSubmit();
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
