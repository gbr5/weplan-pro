import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import ICreateContactPageCampaignDTO from '../../../../../dtos/ICreateContactPageCampaignDTO';
import { useContactPage } from '../../../../../hooks/contactPages';
import Button from '../../../../Button';
import Input from '../../../../Input';

import { Container } from './styles';

interface IProps {
  closeForm: Function;
}

const AddCampaign: React.FC<IProps> = ({ closeForm }) => {
  const { createContactPageCampaign } = useContactPage();
  const formRef = useRef<FormHandles>(null);

  const handleCreateCampaign = useCallback(
    (e: ICreateContactPageCampaignDTO) => {
      createContactPageCampaign({
        cta_label: e.cta_label,
        message: e.message,
        name: e.name,
        url: e.url,
      });
      closeForm();
    },
    [createContactPageCampaign, closeForm],
  );

  return (
    <Form onSubmit={handleCreateCampaign} ref={formRef}>
      <Container>
        <span>
          <button type="button" onClick={() => closeForm()}>
            <FiTrash2 size={24} />
          </button>
        </span>
        <h3>Criar Campanha</h3>
        <section>
          <strong>Dê um nome</strong>
          <p>Este nome é apenas interno</p>
          <Input name="name" />
        </section>
        <section>
          <strong>Mensagem curta</strong>
          <p>Máximo de 40 caractéres!</p>
          <Input name="message" />
        </section>
        <section>
          <strong>Texo do botão (Curto)</strong>
          <p>O mais indicado é um verbo como, cadastrar, comprar ...</p>
          <Input name="cta_label" />
        </section>
        <section>
          <strong>Link da Campanha</strong>
          <Input name="url" />
        </section>
        <Button type="submit">Criar</Button>
      </Container>
    </Form>
  );
};

export default AddCampaign;
