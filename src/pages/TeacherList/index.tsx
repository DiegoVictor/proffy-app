import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';
import PageHeader from '../../components/PageHeader';

const TeacherList: React.FC = () => {
  return (
    <Container>
      <PageHeader title="Proffys disponíveis" />
    </Container>
  );
};

export default TeacherList;
