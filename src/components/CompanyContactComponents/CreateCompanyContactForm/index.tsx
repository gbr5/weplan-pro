import React, { useCallback, useState } from 'react';
import WindowContainer from '../../WindowContainer';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';
import { useCompanyContact } from '../../../hooks/companyContacts';
import CreateInlineFormField from '../../GeneralComponents/CreateInlineFormField';
import ContactTypeComponent from '../ContactTypeComponent';

interface IFormDTO {
  name: string;
  description: string;
}

interface IProps {
  handleCloseWindow: Function;
}

const CreateCompanyContactForm: React.FC<IProps> = ({
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { createCompanyContact } = useCompanyContact();

  const [contactName, setContactName] = useState('');
  const [contactFamilyName, setContactFamilyName] = useState('');
  const [contactDescription, setContactDescription] = useState('');
  const [companyContactType, setCompanyContactType] = useState('');
  const [currentField, setCurrentField] = useState('name');

  const handleSubmit = useCallback(async () => {
    try {
      createCompanyContact({
        name: contactName,
        family_name: contactFamilyName,
        description: contactDescription,
        company_contact_type: companyContactType,
        weplanUser: false,
        isCompany: false,
      });
      addToast({
        type: 'success',
        title: 'Contato criado com sucesso',
        description: 'As Alterações já foram propagadas.',
      });
      handleCloseWindow();
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao adicionar o contato.',
        description: 'Erro ao adicionar o contato, tente novamente.',
      });

      throw new Error(err);
    }
  }, [
    addToast,
    contactName,
    contactFamilyName,
    contactDescription,
    createCompanyContact,
    handleCloseWindow,
    companyContactType,
  ]);

  const handleCompanyContactType = useCallback(
    (e: string) => {
      setCompanyContactType(e);
      handleSubmit();
    },
    [handleSubmit],
  );

  const handleContactName = useCallback((e: string) => {
    setContactName(e);
    setCurrentField('familyName');
  }, []);

  const handleContactFamilyName = useCallback((e: string) => {
    setContactFamilyName(e);
    setCurrentField('description');
  }, []);

  const handleContactDescription = useCallback((e: string) => {
    setContactDescription(e);
    setCurrentField('contactType');
  }, []);

  const handleCurrentField = useCallback((e: string) => {
    setCurrentField(e);
  }, []);

  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 100,
        top: '28%',
        left: '5%',
        height: '54%',
        width: '90%',
      }}
    >
      <Container>
        <h1>Novo Contato</h1>

        {currentField === 'name' && (
          <CreateInlineFormField
            defaultValue={contactName}
            handleOnSubmit={(e: string) => handleContactName(e)}
            isFirst
            isLast={false}
            isRequired
            placeholder="Qual o nome do contato?"
            previousComponent={() => handleCloseWindow()}
          />
        )}
        {currentField === 'familyName' && (
          <CreateInlineFormField
            defaultValue={contactFamilyName}
            handleOnSubmit={(e: string) => handleContactFamilyName(e)}
            isFirst
            isLast={false}
            isRequired
            placeholder="Sobrenome"
            previousComponent={() => handleCurrentField('name')}
          />
        )}
        {currentField === 'description' && (
          <CreateInlineFormField
            defaultValue={contactDescription}
            handleOnSubmit={(e: string) => handleContactDescription(e)}
            isFirst
            isLast={false}
            isRequired={false}
            placeholder="Descrição (opcional)"
            previousComponent={() => handleCurrentField('familyName')}
          />
        )}
        {currentField === 'contactType' && (
          <ContactTypeComponent
            handleSubmit={(e: string) => handleCompanyContactType(e)}
          />
        )}
      </Container>
    </WindowContainer>
  );
};

export default CreateCompanyContactForm;
