import React, { useCallback } from 'react';
import { useCompanyContact } from '../../../hooks/companyContacts';
import { useEmployeeAuth } from '../../../hooks/employeeAuth';
import { useFunnel } from '../../../hooks/funnel';
import { useStageCard } from '../../../hooks/stageCard';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';
import WindowContainer from '../../WindowContainer';

import { Container } from './styles';

interface IProps {
  closeWindow: () => void;
}

const CreateComercialCard: React.FC<IProps> = ({ closeWindow }) => {
  const { employee } = useEmployeeAuth();
  const { selectedFunnel, getFunnels, selectFunnel, funnels } = useFunnel();
  const { createCard } = useStageCard();
  const { myEmployeeContact } = useCompanyContact();

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
      createCard({
        card_owner: employee.employeeUser.id,
        name,
        ownerName:
          myEmployeeContact && myEmployeeContact.id
            ? `${myEmployeeContact.name} ${myEmployeeContact.family_name}`
            : employee.employeeUser.name,
        stage_id: stage.id,
        stageName: stage.name,
        weplanEvent: false,
      });
      getFunnels();
      closeWindow();
    },
    [
      getFunnels,
      closeWindow,
      selectedFunnel,
      myEmployeeContact,
      createCard,
      employee,
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
