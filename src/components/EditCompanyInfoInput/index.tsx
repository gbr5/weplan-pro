import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';

import Input from '../Input';

import api from '../../services/api';

import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

interface ICompanyInformationDTO {
  user_id: string;
  userName: string;
  email: string;
  companyName: string;
  company_info_id: string;
  companyID: string;
  phone: number;
}

interface IPropsDTO {
  companyInformation: ICompanyInformationDTO;
  inputName: string;
  defaultValue: string;
  type: string;
  handleCloseWindow: Function;
  getCompanyInfo: Function;
}

const EditCompanyInfoInput: React.FC<IPropsDTO> = ({
  companyInformation,
  inputName,
  defaultValue,
  type,
  handleCloseWindow,
  getCompanyInfo,
}: IPropsDTO) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);
  const { updateUser } = useAuth();

  const inputHeight = { height: '40px' };

  const handleSubmit = useCallback(
    async (data: ICompanyInformationDTO) => {
      try {
        if (inputName === 'companyName') {
          await api.put('company-info', {
            name: data.companyName,
            company_id: companyInformation.companyID,
          });
        }
        if (inputName === 'companyID') {
          await api.put('company-info', {
            name: companyInformation.companyName,
            company_id: data.companyID,
          });
        }
        if (inputName === 'userName') {
          const response = await api.put('profile', {
            name: data.userName,
            email: companyInformation.email,
          });

          updateUser(response.data);
        }
        if (inputName === 'email') {
          const response = await api.put('profile', {
            name: companyInformation.userName,
            email: data.email,
          });

          updateUser(response.data);
        }
        if (inputName === 'phone') {
          await api.put(
            `profile/contact-info/${companyInformation.user_id}/phone`,
            {
              contact_info: data.phone,
            },
          );
        }

        addToast({
          type: 'success',
          title: 'Membro da festa adicionado com sucesso',
          description: 'Ele já pode visualizar as informações do evento.',
        });
        getCompanyInfo();
        handleCloseWindow();
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar membro da festa',
          description: 'Erro ao adicionar membro da festa, tente novamente.',
        });
        throw new Error(err);
      }
    },
    [
      addToast,
      handleCloseWindow,
      getCompanyInfo,
      inputName,
      companyInformation,
      updateUser,
    ],
  );

  const default_value = type === 'string' ? defaultValue : Number(defaultValue);

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name={inputName}
          type={type}
          defaultValue={default_value}
          containerStyle={inputHeight}
        />
        <button type="submit">Salvar</button>
        <button type="submit">Cancelar</button>
      </Form>
    </Container>
  );
};

export default EditCompanyInfoInput;
