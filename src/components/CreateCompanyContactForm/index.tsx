import React, { MouseEventHandler, useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import WindowContainer from '../WindowContainer';
import CreateCompanyContactInfoForm from '../CreateCompanyContactInfoForm';
import { useToast } from '../../hooks/toast';

import { ContactTypeButton, ContactTypeContainer, Container } from './styles';
import api from '../../services/api';
import Input from '../Input';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';
import { useEmployeeAuth } from '../../hooks/employeeAuth';

interface IFormDTO {
  name: string;
  description: string;
}

interface IProps {
  onHandleCloseWindow: MouseEventHandler;
  handleCloseWindow: Function;
  updateCompanyContacts: Function;
}

const CreateCompanyContactForm: React.FC<IProps> = ({
  onHandleCloseWindow,
  handleCloseWindow,
  updateCompanyContacts,
}: IProps) => {
  const { addToast } = useToast();
  const { employee } = useEmployeeAuth();
  const formRef = useRef<FormHandles>(null);

  const [company_contact_type, setCompanyContactType] = useState('');
  const [contactInfo, setContactInfo] = useState(false);
  const [weplanUser, setWeplanUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [companyContact, setCompanyContact] = useState<ICompanyContactDTO>(
    {} as ICompanyContactDTO,
  );

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        const response = await api.post(`company/contact`, {
          company_id: employee.company.id,
          name: data.name,
          description: data.description,
          company_contact_type,
          weplanUser,
          isCompany,
        });
        setCompanyContact(response.data);
        updateCompanyContacts();
        setContactInfo(true);
        return addToast({
          type: 'success',
          title: 'Contato criado com sucesso',
          description: 'As Alterações já foram propagadas.',
        });
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
      addToast,
      employee.company,
      updateCompanyContacts,
      company_contact_type,
      weplanUser,
      isCompany,
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
        zIndex: 100,
        top: '38%',
        left: '20%',
        height: '24%',
        width: '60%',
      }}
    >
      <Container>
        {!contactInfo ? (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              containerStyle={inputStyle}
              placeholder="Nome completo do contato"
            />
            <Input
              name="description"
              containerStyle={inputStyle}
              placeholder="Nome completo do contato"
            />
            <ContactTypeContainer>
              <div>
                <strong>Qual a categoria do contato?</strong>

                <ContactTypeButton
                  isActive={company_contact_type === 'Customer'}
                  type="button"
                  onClick={() => setCompanyContactType('Customer')}
                >
                  Cliente
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={company_contact_type === 'Supplier'}
                  type="button"
                  onClick={() => setCompanyContactType('Supplier')}
                >
                  Fornecedor
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={company_contact_type === 'Employee'}
                  type="button"
                  onClick={() => setCompanyContactType('Employee')}
                >
                  Colaborador
                </ContactTypeButton>
              </div>
              <div>
                <ContactTypeButton
                  isActive={company_contact_type === 'Outsourced'}
                  type="button"
                  onClick={() => setCompanyContactType('Outsourced')}
                >
                  Terceirizado
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={company_contact_type === 'Lawyer'}
                  type="button"
                  onClick={() => setCompanyContactType('Lawyer')}
                >
                  Advogado
                </ContactTypeButton>
                <ContactTypeButton
                  isActive={company_contact_type === 'Prospect'}
                  type="button"
                  onClick={() => setCompanyContactType('Prospect')}
                >
                  Prospect
                </ContactTypeButton>
              </div>
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
            </ContactTypeContainer>
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

export default CreateCompanyContactForm;
