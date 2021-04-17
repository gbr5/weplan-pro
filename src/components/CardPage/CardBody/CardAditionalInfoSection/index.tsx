import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useStageCard } from '../../../../hooks/stageCard';
import { trimCardName } from '../../../../utils/trimCardName';
import CardCustomersDashboard from './CardCustomersDashboard';
import CardNotesDashboard from './CardNotesDashboard';
import CardTaskDashboard from './CardTaskDashboard';

import { Container, MenuHeader, MenuBooleanButton } from './styles';

const CardAditionalInfoSection: React.FC = () => {
  const location = useLocation();

  const { selectedCard } = useStageCard();

  const [taskSection, setTaskSection] = useState(false);
  const [notesSection, setNotesSection] = useState(true);
  const [participantsSection, setParticipantsSection] = useState(false);
  const [appointmentsSection, setAppointmentsSection] = useState(false);
  const [filesSection, setFilesSection] = useState(false);
  const [customersSection, setCustomersSection] = useState(false);

  const closeAllSections = useCallback(() => {
    setTaskSection(false);
    setParticipantsSection(false);
    setAppointmentsSection(false);
    setFilesSection(false);
    setNotesSection(false);
    setCustomersSection(false);
  }, []);

  const handleTaskSection = useCallback(() => {
    closeAllSections();
    setTaskSection(true);
  }, [closeAllSections]);
  const handleCustomersSection = useCallback(() => {
    closeAllSections();
    setCustomersSection(true);
  }, [closeAllSections]);

  const handleNotesSection = useCallback(() => {
    closeAllSections();
    setNotesSection(true);
  }, [closeAllSections]);
  const handleAppointmentsSection = useCallback(() => {
    closeAllSections();
    setAppointmentsSection(true);
  }, [closeAllSections]);
  const handleFilesSection = useCallback(() => {
    closeAllSections();
    setFilesSection(true);
  }, [closeAllSections]);

  const handleNewCard = useCallback(() => {
    const params = location.pathname.includes(
      `/card/new/${trimCardName(selectedCard.name)}`,
    );
    if (params) {
      handleCustomersSection();
    }
  }, [location, handleCustomersSection, selectedCard]);

  useEffect(() => {
    handleNewCard();
  }, [handleNewCard]);

  return (
    <Container>
      <MenuHeader>
        <MenuBooleanButton
          type="button"
          isActive={!!notesSection}
          onClick={handleNotesSection}
        >
          Notas
        </MenuBooleanButton>
        <MenuBooleanButton
          type="button"
          isActive={!!customersSection}
          onClick={handleCustomersSection}
        >
          Clientes
        </MenuBooleanButton>
        <MenuBooleanButton
          type="button"
          isActive={!!taskSection}
          onClick={handleTaskSection}
        >
          Tarefas
        </MenuBooleanButton>
        <MenuBooleanButton
          type="button"
          isActive={!!appointmentsSection}
          onClick={handleAppointmentsSection}
        >
          Reuniões
        </MenuBooleanButton>
        <MenuBooleanButton
          type="button"
          isActive={!!filesSection}
          onClick={handleFilesSection}
        >
          Arquivos
        </MenuBooleanButton>
      </MenuHeader>
      {!!taskSection && <CardTaskDashboard />}
      {!!customersSection && (
        <CardCustomersDashboard openNotesSection={handleNotesSection} />
      )}
      {!!notesSection && <CardNotesDashboard />}
      {!!participantsSection && (
        <>
          <h1>ParticipantsSection</h1>
          <h1>ParticipantsSection</h1>
          <h1>ParticipantsSection</h1>
          <h1>ParticipantsSection</h1>
        </>
      )}
      {!!appointmentsSection && (
        <>
          <h1>AppointmentsSection</h1>
          <h1>AppointmentsSection</h1>
          <h1>AppointmentsSection</h1>
          <h1>AppointmentsSection</h1>
        </>
      )}
      {!!filesSection && (
        <>
          <h1>FilesSection</h1>
          <h1>FilesSection</h1>
          <h1>FilesSection</h1>
          <h1>FilesSection</h1>
        </>
      )}
    </Container>
  );
};

export default CardAditionalInfoSection;
