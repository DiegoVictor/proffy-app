import React from 'react';

import { Container } from './styles';
import PageHeader from '../../components/PageHeader';

const Favorites: React.FC = () => {
  return (
    <Container>
      <PageHeader title="Meus proffys favoritos" />
    </Container>
  );
};

export default Favorites;
