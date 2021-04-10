import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import WindowContainer from '../WindowContainer';
import { useToast } from '../../hooks/toast';

import { ContactTypeButton, Container } from './styles';
import Input from '../Input';
import { useCompanyContact } from '../../hooks/companyContacts';

interface IFormDTO {
  name: string;
  family_name: string;
  description: string;
}

interface IProps {
  closeWindow: Function;
}

const CreateCompanyCustomerForm: React.FC<IProps> = ({
  closeWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { createCompanyContact } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);

  const [weplanUser, setWeplanUser] = useState(false);
  const [isCompany, setIsCompany] = useState(false);

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        createCompanyContact({
          name: data.name,
          family_name: data.family_name,
          description: data.description,
          company_contact_type: 'Customer',
          weplanUser,
          isCompany,
        });

        addToast({
          type: 'success',
          title: 'Cliente criado com sucesso',
          description: 'As Alterações já foram propagadas.',
        });
        closeWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar cliente.',
          description: 'Erro ao adicionar cliente, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [addToast, closeWindow, weplanUser, isCompany, createCompanyContact],
  );

  const inputStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <WindowContainer
      onHandleCloseWindow={() => closeWindow()}
      containerStyle={{
        zIndex: 20,
        top: '5%',
        left: '20%',
        height: '90%',
        width: '60%',
      }}
    >
      <Container>
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
            <h3>Sobrenome do cliente</h3>
            <Input
              name="name"
              containerStyle={inputStyle}
              placeholder="Nome completo do cliente"
            />
          </div>
          <div>
            <h3>Descrição</h3>
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
      </Container>
    </WindowContainer>
  );
};

export default CreateCompanyCustomerForm;
