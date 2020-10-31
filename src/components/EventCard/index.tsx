import React, { memo } from 'react';

import { Container, EventDate } from './styles';

const EventCard: React.FC = () => {
  return (
    <Container>
      <div>
        <h1>nome do evento</h1>
      </div>
      <EventDate title="Nome do evento - TOOLTIP">
        <h3>data do evento</h3>
      </EventDate>
    </Container>
  );
};

export default memo(EventCard);
