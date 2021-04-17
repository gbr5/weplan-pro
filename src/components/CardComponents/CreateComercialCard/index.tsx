import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import { useFunnel } from '../../../hooks/funnel';
import { useHomeController } from '../../../hooks/homeController';
import { useStageCard } from '../../../hooks/stageCard';
import { trimCardName } from '../../../utils/trimCardName';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
}

const CreateComercialCard: React.FC<IProps> = ({ closeWindow }) => {
  const history = useHistory();
  const { selectPage } = useHomeController();
  const { selectedFunnel, getFunnels, selectFunnel, funnels } = useFunnel();
  const { createCard } = useStageCard();
  const { selectedContact } = useCompanyContact();
  const { selectedCompanyEmployee } = useCompanyEmployee();

  useCallback(() => {
    if (
      selectedFunnel &&
      (!selectedFunnel.id ||
        (selectedFunnel.name && selectedFunnel.name !== 'Comercial'))
    ) {
      const findComercialFunnel = funnels.filter(
        funnel => funnel.name === 'Comercial',
      )[0];
      selectFunnel(findComercialFunnel);
    }
  }, [selectFunnel, selectedFunnel, funnels]);

  const handleSubmit = useCallback(
    async (name: string) => {
      const stage = selectedFunnel.stages.filter(
        thisstage => thisstage.funnel_order === '1',
      )[0];
      await createCard({
        card_owner: selectedCompanyEmployee.employeeUser.id,
        name,
        ownerName:
          selectedContact && selectedContact.id
            ? `${selectedContact.name} ${selectedContact.family_name}`
            : selectedCompanyEmployee.employeeUser.name,
        stage_id: stage.id,
        stageName: stage.name,
        weplanEvent: false,
      });
      getFunnels();
      closeWindow();
      selectPage('Card');
      history.push(`/card/new/${trimCardName(name)}`);
    },
    [
      getFunnels,
      history,
      closeWindow,
      selectedFunnel,
      createCard,
      selectedCompanyEmployee,
      selectedContact,
      selectPage,
    ],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 17,
        top: '10%',
        left: '5%',
        height: '80%',
        width: '90%',
      }}
    >
      <Container>
        <h2>Qual o nome do negócio?</h2>
        <CreateInlineFormField
          defaultValue=""
          isFirst
          isLast
          isRequired
          placeholder="Nome do card"
          previousComponent={closeWindow}
          handleOnSubmit={(e: string) => handleSubmit(e)}
        />
      </Container>
    </WindowContainer>
  );
};

export default CreateComercialCard;
