import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../hooks/toast';

import { Container } from './styles';
import api from '../../services/api';
import Input from '../Input';
import ICompanyContactDTO from '../../dtos/ICompanyContactDTO';

interface IFormDTO {
  whatsapp: string;
  phone: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

interface IProps {
  company_contact: ICompanyContactDTO;
  handleCloseWindow: Function;
  updateCompanyContacts: Function;
}

const CreateCompanyContactInfoForm: React.FC<IProps> = ({
  company_contact,
  handleCloseWindow,
  updateCompanyContacts,
}: IProps) => {
  const { addToast } = useToast();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        if (data.phone !== '' || undefined || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Telefone',
            info: data.phone,
          });
        }
        if (data.whatsapp !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Whatsapp',
            info: data.whatsapp,
          });
        }
        if (data.email !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Email',
            info: data.email,
          });
        }
        if (data.address !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Address',
            info: data.address,
          });
        }
        if (data.facebook !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Facebook',
            info: data.facebook,
          });
        }
        if (data.instagram !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Instagram',
            info: data.instagram,
          });
        }
        if (data.linkedin !== '' || undefined) {
          await api.post(`company/contacts/info`, {
            company_contact_id: company_contact.id,
            info_type: 'Linkedin',
            info: data.linkedin,
          });
        }

        updateCompanyContacts();
        handleCloseWindow();
        return addToast({
          type: 'success',
          title: 'Informações do contato criadas com sucesso',
          description: 'As alterações já foram propagadas.',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao adicionar as informações do contato.',
          description:
            'Erro ao adicionar as informações do contato, tente novamente.',
        });

        throw new Error(err);
      }
    },
    [addToast, handleCloseWindow, updateCompanyContacts, company_contact],
  );

  const inputStyle = {
    width: '100%',
    height: '40px',
  };

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <div>
            <h3>Telefone</h3>
            <Input
              name="phone"
              containerStyle={inputStyle}
              placeholder="Número de telefone com DDD"
            />
          </div>
          <div>
            <h3>Whatsapp</h3>
            <Input
              name="whatsapp"
              containerStyle={inputStyle}
              placeholder="Whatsapp"
            />
          </div>
          <div>
            <h3>Email</h3>
            <Input
              name="email"
              containerStyle={inputStyle}
              placeholder="email"
            />
          </div>
        </div>
        <div>
          <div>
            <h3>Linkedin</h3>
            <Input
              name="linkedin"
              containerStyle={inputStyle}
              placeholder="Linkedin"
            />
          </div>
          <div>
            <h3>Facebook</h3>
            <Input
              name="facebook"
              containerStyle={inputStyle}
              placeholder="Facebook"
            />
          </div>
          <div>
            <h3>Instagram</h3>
            <Input
              name="instagram"
              containerStyle={inputStyle}
              placeholder="Instagram"
            />
          </div>
        </div>
        <div>
          <h3>Endereço</h3>
          <Input
            name="address"
            containerStyle={inputStyle}
            placeholder="Endereço"
          />
        </div>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
};

export default CreateCompanyContactInfoForm;
