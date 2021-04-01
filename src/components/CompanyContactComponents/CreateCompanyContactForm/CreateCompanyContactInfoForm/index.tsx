import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useToast } from '../../../../hooks/toast';

import { Container } from './styles';
import Input from '../../../Input';
import { useCompanyContact } from '../../../../hooks/companyContacts';

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
  handleCloseWindow: Function;
}

const CreateCompanyContactInfoForm: React.FC<IProps> = ({
  handleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();
  const { getCompanyContacts, createCompanyContactInfo } = useCompanyContact();
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IFormDTO) => {
      try {
        if (data.phone !== '' || undefined || undefined) {
          createCompanyContactInfo({
            info_type: 'Telefone',
            info: data.phone,
          });
        }
        if (data.whatsapp !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Whatsapp',
            info: data.whatsapp,
          });
        }
        if (data.email !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Email',
            info: data.email,
          });
        }
        if (data.address !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Address',
            info: data.address,
          });
        }
        if (data.facebook !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Facebook',
            info: data.facebook,
          });
        }
        if (data.instagram !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Instagram',
            info: data.instagram,
          });
        }
        if (data.linkedin !== '' || undefined) {
          createCompanyContactInfo({
            info_type: 'Linkedin',
            info: data.linkedin,
          });
        }

        getCompanyContacts();
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
    [addToast, createCompanyContactInfo, handleCloseWindow, getCompanyContacts],
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
