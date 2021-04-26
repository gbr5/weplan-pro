import React, { useCallback, useEffect, useState } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import ITitleMessageDTO from '../../../../dtos/ITitleMessageDTO';
import { useForm } from '../../../../hooks/form';
import TitleMessageForm from '../TitleMessageForm';

import { Container, EditButton, SubContainer } from './styles';

const SuccessMessageContainer: React.FC = () => {
  const { currentForm, updateFormSuccessMessage } = useForm();
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [editSuccessMessage, setEditSuccessMessage] = useState(false);

  useEffect(() => {
    if (currentForm && currentForm.successMessage) {
      setTitle(currentForm.successMessage.title);
      setMessage(currentForm.successMessage.message);
    }
  }, [currentForm]);

  const handleEditFormSuccessMessage = useCallback(
    (e: ITitleMessageDTO) => {
      if (currentForm && currentForm.successMessage) {
        updateFormSuccessMessage({
          id: currentForm.successMessage.id,
          form_id: currentForm.id,
          title: e.title,
          message: e.message,
        });
        setEditSuccessMessage(false);
      }
    },
    [updateFormSuccessMessage, currentForm],
  );

  const handleEditSuccessMessage = useCallback((e: boolean) => {
    setEditSuccessMessage(e);
  }, []);

  return (
    <Container>
      <h2>Mensagem de sucesso</h2>
      <p>
        A mensagem de sucesso é exibida após a conclusão do formulário, caso a
        landing page não esteja ativa
      </p>
      {editSuccessMessage ? (
        <SubContainer>
          <EditButton
            type="button"
            onClick={() => handleEditSuccessMessage(false)}
          >
            <MdClose color="red" size={24} />
          </EditButton>
          <TitleMessageForm
            handleSubmit={(e: ITitleMessageDTO) =>
              handleEditFormSuccessMessage(e)
            }
            messageLabel="Mensagem"
            titleLabel="Título"
            defaultTitleMessage={{
              title,
              message,
            }}
          />
        </SubContainer>
      ) : (
        <SubContainer>
          <EditButton
            type="button"
            onClick={() => handleEditSuccessMessage(true)}
          >
            <MdEdit color="red" size={24} />
          </EditButton>
          <span>
            <h3>Título</h3>
            <p>{title}</p>
          </span>
          <span>
            <h3>Mensagem</h3>
            <p>{message}</p>
          </span>
        </SubContainer>
      )}
    </Container>
  );
};

export default SuccessMessageContainer;
