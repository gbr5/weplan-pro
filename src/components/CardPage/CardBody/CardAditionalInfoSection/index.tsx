import React, { useCallback, useState } from 'react';
import IStageCardDTO from '../../../../dtos/IStageCardDTO';
import CardNotesDashboard from './CardNotesDashboard';
import CardTaskDashboard from './CardTaskDashboard';

import { Container, MenuHeader, MenuLine, MenuBooleanButton } from './styles';

interface IProps {
  card: IStageCardDTO;
}

const CardAditionalInfoSection: React.FC<IProps> = ({ card }) => {
  const [taskSection, setTaskSection] = useState(true);
  const [notesSection, setNotesSection] = useState(false);
  const [historySection, setHistorySection] = useState(false);
  const [participantsSection, setParticipantsSection] = useState(false);
  const [appointmentsSection, setAppointmentsSection] = useState(false);
  const [filesSection, setFilesSection] = useState(false);

  const closeAllSections = useCallback(() => {
    setTaskSection(false);
    setHistorySection(false);
    setParticipantsSection(false);
    setAppointmentsSection(false);
    setFilesSection(false);
    setNotesSection(false);
  }, []);

  const handleTaskSection = useCallback(() => {
    closeAllSections();
    setTaskSection(true);
  }, [closeAllSections]);

  const handleNotesSection = useCallback(() => {
    closeAllSections();
    setNotesSection(true);
  }, [closeAllSections]);
  const handleHistorySection = useCallback(() => {
    closeAllSections();
    setHistorySection(true);
  }, [closeAllSections]);
  const handleAppointmentsSection = useCallback(() => {
    closeAllSections();
    setAppointmentsSection(true);
  }, [closeAllSections]);
  const handleFilesSection = useCallback(() => {
    closeAllSections();
    setFilesSection(true);
  }, [closeAllSections]);

  return (
    <>
      <Container>
        <MenuHeader>
          <MenuBooleanButton
            type="button"
            isActive={!!taskSection}
            onClick={handleTaskSection}
          >
            Tarefas
          </MenuBooleanButton>
          <MenuLine />
          <MenuBooleanButton
            type="button"
            isActive={!!notesSection}
            onClick={handleNotesSection}
          >
            Anotações
          </MenuBooleanButton>
          <MenuLine />
          <MenuBooleanButton
            type="button"
            isActive={!!historySection}
            onClick={handleHistorySection}
          >
            Histórico
          </MenuBooleanButton>
          <MenuLine />
          <MenuBooleanButton
            type="button"
            isActive={!!appointmentsSection}
            onClick={handleAppointmentsSection}
          >
            Reuniões
          </MenuBooleanButton>
          <MenuLine />
          <MenuBooleanButton
            type="button"
            isActive={!!filesSection}
            onClick={handleFilesSection}
          >
            Arquivos
          </MenuBooleanButton>
        </MenuHeader>
        {!!taskSection && <CardTaskDashboard card={card} />}
        {!!notesSection && <CardNotesDashboard card={card} />}
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
    </>
  );
};

export default CardAditionalInfoSection;
