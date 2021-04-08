import React from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import MenuButton from '../../components/MenuButton';

import { Container, Body } from './styles';

const SettingsPage: React.FC = () => {
  return (
    <Container>
      <Header />
      <MenuButton />

      <Body>
        <h1>Configurações</h1>
        <Button type="button">Comercial</Button>
      </Body>
    </Container>
  );
};

export default SettingsPage;
