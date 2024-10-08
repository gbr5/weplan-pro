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
  const { createCompanyContact, companyContacts } = useCompanyContact();

  const [contactName, setContactName] = useState('');
  const [contactFamilyName, setContactFamilyName] = useState('');
  const [contactDescription, setContactDescription] = useState('');
  const [currentField, setCurrentField] = useState('name');

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

  const handleSubmit = useCallback(
    async (selectedContactType: string) => {
      try {
        const findByNameAndFamilyName = companyContacts.find(
          contact =>
            contact.name === contactName &&
            contact.family_name === contactFamilyName,
        );
        if (findByNameAndFamilyName) {
          setCurrentField('name');
          return addToast({
            type: 'error',
            title: 'Já existe um contato com o mesmo nome e sobrenome',
            description:
              'Altere o nome ou o sobrenome para adicionar um novo contato',
          });
        }
        createCompanyContact({
          name: contactName,
          family_name: contactFamilyName,
          description: contactDescription,
          company_contact_type: selectedContactType,
          weplanUser: false,
          isCompany: false,
        });
        addToast({
          type: 'success',
          title: 'Contato criado com sucesso',
          description: 'As Alterações já foram propagadas.',
        });
        return handleCloseWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar o contato.',
          description: 'Erro ao adicionar o contato, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [
      companyContacts,
      addToast,
      contactName,
      contactFamilyName,
      contactDescription,
      createCompanyContact,
      handleCloseWindow,
    ],
  );

  const handleCompanyContactType = useCallback(
    (e: string) => {
      handleSubmit(e);
    },
    [handleSubmit],
  );

  return (
    <WindowContainer
      onHandleCloseWindow={() => handleCloseWindow()}
      containerStyle={{
        zIndex: 30,
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
