import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';
import { MdAdd, MdEdit } from 'react-icons/md';
import IContactPageCampaignDTO from '../../../../dtos/IContactPageCampaignDTO';
import { useContactPage } from '../../../../hooks/contactPages';
import Button from '../../../Button';
import Input from '../../../Input';
import AddCampaign from './AddCampaign';

import {
  Container,
  FormContainer,
  CampaignContainer,
  Campaign,
  CampaignButton,
  IsActive,
  NotActiveCampaigns,
  AddField,
} from './styles';

const CampaignSection: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {
    currentContactPage,
    updateContactPageCampaign,
    deleteContactPageCampaign,
  } = useContactPage();
  const [editCampaign, setEditCampaign] = useState(false);
  const [addCampaignForm, setAddCampaignForm] = useState(false);
  const [activeCampaign, setActiveCampaign] = useState(
    currentContactPage.campaigns.find(campaign => campaign.isActive),
  );

  const handleEditCampaignWindow = useCallback((e: boolean) => {
    setEditCampaign(e);
  }, []);

  const handleAddCampaignForm = useCallback((e: boolean) => {
    setAddCampaignForm(e);
  }, []);

  const handleUpdateCampaign = useCallback(
    (e: IContactPageCampaignDTO) => {
      updateContactPageCampaign({
        ...e,
        cta_label: e.cta_label,
        message: e.message,
        url: e.url,
        name: e.name,
        isActive: e.isActive,
      });
    },
    [updateContactPageCampaign],
  );

  const handleActiveContactPageCampaign = useCallback(
    (data: IContactPageCampaignDTO) => {
      if (data.isActive) {
        updateContactPageCampaign({
          ...data,
          isActive: !data.isActive,
        });
        return setActiveCampaign({} as IContactPageCampaignDTO);
      }
      if (!activeCampaign || (activeCampaign && !activeCampaign.id)) {
        updateContactPageCampaign({
          ...data,
          isActive: !data.isActive,
        });
        return setActiveCampaign(data);
      }
      if (data.id !== activeCampaign.id) {
        updateContactPageCampaign({
          ...activeCampaign,
          isActive: false,
        });
        updateContactPageCampaign({
          ...data,
          isActive: true,
        });
      }
      return setActiveCampaign(data);
    },
    [updateContactPageCampaign, activeCampaign],
  );

  const handleDeleteCampaign = useCallback(() => {
    deleteContactPageCampaign(currentContactPage.seo.id);
  }, [currentContactPage, deleteContactPageCampaign]);

  return (
    <Container>
      {currentContactPage && currentContactPage.seo && editCampaign && (
        <Form onSubmit={handleUpdateCampaign} ref={formRef}>
          <FormContainer>
            <span>
              <button
                type="button"
                onClick={() => handleEditCampaignWindow(false)}
              >
                <MdEdit size={24} />
              </button>
            </span>
            <section>
              <strong>Dê o melhor título de até 60 caractéres</strong>
              <p>
                Este título aparece na aba superior da página, e no topo de um
                resultado do Google
              </p>
              <Input defaultValue={currentContactPage.seo.title} name="title" />
            </section>
            <section>
              <strong>Agora a melhor descrição de até 130 caractéres</strong>
              <p>
                Assim como o título, a descição também aparece no snippet,
                resultado do Google, porém abaixo do título.
              </p>
              <Input
                defaultValue={currentContactPage.seo.description}
                name="description"
              />
            </section>
            <Button type="submit">Salvar</Button>
            <Button type="button" onClick={handleDeleteCampaign}>
              Deletar Campaign
            </Button>
          </FormContainer>
        </Form>
      )}
      {currentContactPage && currentContactPage.seo && !editCampaign && (
        <CampaignContainer>
          <h2>Campanha Ativa</h2>
          {activeCampaign && activeCampaign.id && (
            <Campaign>
              <CampaignButton type="button">
                <h3>{activeCampaign.name}</h3>
              </CampaignButton>
              <IsActive
                type="button"
                onClick={() => handleActiveContactPageCampaign(activeCampaign)}
              >
                <FiCheckSquare size={24} />
              </IsActive>
            </Campaign>
          )}
          <NotActiveCampaigns>
            <h2>Demais Campanhas</h2>
            {currentContactPage.campaigns
              .filter(campaign => !campaign.isActive)
              .map(campaign => {
                return (
                  <Campaign key={campaign.id}>
                    <CampaignButton type="button">
                      <h3>{campaign.name}</h3>
                    </CampaignButton>
                    <IsActive
                      type="button"
                      onClick={() => handleActiveContactPageCampaign(campaign)}
                    >
                      <FiSquare size={24} />
                    </IsActive>
                  </Campaign>
                );
              })}
          </NotActiveCampaigns>
          {addCampaignForm ? (
            <AddCampaign closeForm={() => handleAddCampaignForm(false)} />
          ) : (
            <AddField type="button" onClick={() => handleAddCampaignForm(true)}>
              <MdAdd size={32} />
            </AddField>
          )}
        </CampaignContainer>
      )}
      {currentContactPage &&
        (!currentContactPage.campaigns ||
          currentContactPage.campaigns.length <= 0) && (
          <AddCampaign closeForm={() => handleAddCampaignForm(false)} />
        )}
    </Container>
  );
};

export default CampaignSection;
