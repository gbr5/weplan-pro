import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import WindowContainer from '../WindowContainer';
import { useToast } from '../../hooks/toast';

import { ContactTypeButton, Container } from './styles';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import Input from '../Input';
import CreateCompanyContactInfoForm from '../CreateCompanyContactInfoForm';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';

interface IFormDTO {
  name: string;
  description: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  updateCompanyContacts: Function;
  setSelectedCustomer: Function;
}

const CreateCompanyCustomerForm: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  updateCompanyContacts,
  setSelectedCustomer,
}: IProps) => {
  const { addToast } = useToast();
  const { company } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const [weplanUser, setWeplanUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const [companyContact, setCompanyContact] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        const response = await api.post(`company/contacts`, {
          company_id: company.id,
          name: data.name,
          description: data.description,
          company_contact_type: 'Customer',
          weplanUser,
          isCompany,
        });

        setCompanyContact(response.data);
        setSelectedCustomer(response.data);

        updateCompanyContacts();
        setContactInfo(true);

        return addToast({
          type: 'success',
          title: 'Cliente criado com sucesso',
          description: 'As Alterações já foram propagadas.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar cliente.',
          description: 'Erro ao adicionar cliente, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [
      addToast,
      company,
      updateCompanyContacts,
      weplanUser,
      isCompany,
      setSelectedCustomer,
    ],
  );

  const inputStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 20,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      <Container>
        {!contactInfo ? (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h3>Nome do cliente</h3>
              <Input
                name="name"
                containerStyle={inputStyle}
                placeholder="Nome completo do cliente"
              />
            </div>
            <div>
              <h3>Nome do cliente</h3>
              <Input
                name="description"
                containerStyle={inputStyle}
                placeholder="Descrição"
              />
            </div>
            <div>
              <div>
                <strong>É um usuário WePlan?</strong>
                <ContactTypeButton
                  isActive={weplanUser}
                  onClick={() => setWeplanUser(true)}
                  type="button"
                >
                  Sim
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={!weplanUser}
                  onClick={() => setWeplanUser(false)}
                  type="button"
                >
                  Não
                </ContactTypeButton>
              </div>
              <div>
                <strong>É uma empresa?</strong>
                <ContactTypeButton
                  isActive={isCompany}
                  onClick={() => setIsCompany(true)}
                  type="button"
                >
                  Sim
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={!isCompany}
                  onClick={() => setIsCompany(false)}
                  type="button"
                >
                  Não
                </ContactTypeButton>
              </div>
            </div>
            <button type="submit">Salvar</button>
          </Form>
        ) : (
          <CreateCompanyContactInfoForm
            company_contact={companyContact}
            handleCloseWindow={handleCloseWindow}
            updateCompanyContacts={updateCompanyContacts}
          />
        )}
      </Container>
    </WindowContainer>
  );
};

export default CreateCompanyCustomerForm;
