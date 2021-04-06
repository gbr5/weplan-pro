import React, { useCallback } from 'react';
import { FiAtSign, FiUserCheck } from 'react-icons/fi';
import {
  MdFormatListBulleted,
  MdPersonPin,
  MdSettings,
  MdTrackChanges,
} from 'react-icons/md';
import { useFunnel } from '../../../hooks/funnel';
import { useHomeController } from '../../../hooks/homeController';

import { Container, IconContainer, Icon } from './styles';

const HomeDashboard: React.FC = () => {
  const iconsize = 64;
  const { selectPage } = useHomeController();
  const { selectFunnel, funnels } = useFunnel();

  const selectComercialKanban = useCallback(async () => {
    if (funnels) {
      const comercialFunnel = funnels.filter(
        funnel => funnel.name === 'Comercial',
      );
      selectFunnel(comercialFunnel[0]);
      selectPage('Comercial');
    }
  }, [selectFunnel, selectPage, funnels]);

  return (
    <Container>
      <IconContainer type="button" onClick={selectComercialKanban}>
        <Icon>
          <FiUserCheck size={iconsize} />
        </Icon>
        <h2>Clientes</h2>
      </IconContainer>
      <IconContainer type="button" onClick={() => selectPage('Tasks')}>
        <Icon>
          <MdTrackChanges size={iconsize} />
        </Icon>
        <h2>Tarefas</h2>
      </IconContainer>
      <IconContainer type="button" onClick={() => selectPage('Contacts')}>
        <Icon>
          <MdPersonPin size={iconsize} />
        </Icon>
        <h2>Contatos</h2>
      </IconContainer>
      <IconContainer type="button" onClick={() => selectPage('Forms')}>
        <Icon>
          <MdFormatListBulleted size={iconsize} />
        </Icon>
        <h2>Formulários</h2>
      </IconContainer>
      <IconContainer type="button" onClick={() => selectPage('E-Links')}>
        <Icon>
          <FiAtSign size={iconsize} />
        </Icon>
        <h2>e-Links</h2>
      </IconContainer>
      <IconContainer type="button" onClick={() => selectPage('Settings')}>
        <Icon>
          <MdSettings size={iconsize} />
        </Icon>
        <h2>Configurações</h2>
      </IconContainer>
    </Container>
  );
};

export default HomeDashboard;
