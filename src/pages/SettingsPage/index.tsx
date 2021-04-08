import React, { useCallback } from 'react';
import Button from '../../components/Button';
import Header from '../../components/Header';
import MenuButton from '../../components/MenuButton';
import IFunnelDTO from '../../dtos/IFunnelDTO';
import { useFunnel } from '../../hooks/funnel';
import { useHomeController } from '../../hooks/homeController';

import { Container, Body } from './styles';

const SettingsPage: React.FC = () => {
  const { selectPage } = useHomeController();
  const { selectFunnel, funnels } = useFunnel();

  const handleFunnelSettings = useCallback(
    (e: IFunnelDTO) => {
      console.log(e);
      selectFunnel(e);
      const funnelPage = `${e.name}Settings`;
      console.log(funnelPage);
      selectPage(funnelPage);
    },
    [selectFunnel, selectPage],
  );

  return (
    <Container>
      <Header />
      <MenuButton />

      <Body>
        <h1>Configurações</h1>

        <section>
          <h2>Áreas</h2>
          {funnels
            .filter(funnel => funnel.name === 'Comercial')
            .map(funnel => {
              return (
                <Button
                  key={funnel.id}
                  onClick={() => handleFunnelSettings(funnel)}
                  type="button"
                >
                  {funnel.name}
                </Button>
              );
            })}
        </section>
      </Body>
    </Container>
  );
};

export default SettingsPage;
