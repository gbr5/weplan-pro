import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import WindowContainer from '../../WindowContainer';
import { useStageCard } from '../../../hooks/stageCard';

import { Container, SubContainer } from './styles';
import ConfirmationWindow from '../../GeneralComponents/ConfirmationWindow';
import CardResultContractValueForm from '../CardResultContractValueForm';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';
import { useHomeController } from '../../../hooks/homeController';

interface IProps {
  closeWindow: () => void;
}

const CreateComercialCardResults: React.FC<IProps> = ({ closeWindow }) => {
  const history = useHistory();
  const { createComercialCardResults, selectedCard } = useStageCard();
  const { selectPage } = useHomeController();
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [contract_value, setContractValue] = useState(0);
  const [createResultsSection, setCreateResultsSection] = useState(1);

  const handleIsSuccessful = useCallback((e: boolean) => {
    setIsSuccessful(e);

    !e && setCreateResultsSection(3);
    e && setCreateResultsSection(2);
  }, []);

  const handleContractValue = useCallback((e: number) => {
    setContractValue(e);

    setCreateResultsSection(3);
  }, []);

  const handleNote = useCallback(
    async (note: string) => {
      await createComercialCardResults({
        card_id: selectedCard.id,
        contract_value,
        isSuccessful,
        note,
      });
      selectPage('Comercial');
      history.push('/funnel/comercial');
      closeWindow();
    },
    [
      closeWindow,
      contract_value,
      isSuccessful,
      createComercialCardResults,
      selectedCard,
      history,
      selectPage,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 15,
        top: '5%',
        left: '5%',
        height: '90%',
        width: '90%',
      }}
    >
      <Container>
        {createResultsSection === 1 && (
          <ConfirmationWindow
            closeWindow={closeWindow}
            firstButtonFunction={() => handleIsSuccessful(true)}
            firstButtonLabel="Ganho"
            secondButtonLabel="Perdido"
            secondButtonFunction={() => handleIsSuccessful(false)}
            message="Qual o resultado do negócio?"
            zIndex={16}
          />
        )}
        {createResultsSection === 2 && (
          <CardResultContractValueForm
            defaultValue={String(contract_value)}
            closeWindow={closeWindow}
            handleContractValue={(e: number) => handleContractValue(e)}
          />
        )}
        {createResultsSection === 3 && (
          <SubContainer>
            <strong>Deixe um comentário</strong>
            <CreateInlineFormField
              isFirst
              isLast
              isRequired
              placeholder=""
              previousComponent={closeWindow}
              defaultValue=""
              handleOnSubmit={(e: string) => handleNote(e)}
            />
          </SubContainer>
        )}
      </Container>
    </WindowContainer>
  );
};

export default CreateComercialCardResults;
