import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import IFormSuccessMessageDTO from '../../dtos/IFormSuccessMessageDTO';
import api from '../../services/api';

import { Container, MessageContainer } from './styles';

interface IParams {
  id: string;
}

const FormSuccessPage: React.FC = () => {
  const [formSuccessMessage, setSuccessMessage] = useState(
    {} as IFormSuccessMessageDTO,
  );
  const { id } = useParams<IParams>();

  const handleGetFormSuccessMessage = useCallback(async () => {
    try {
      const response = await api.get<IFormSuccessMessageDTO>(
        `/form-success-message/${id}`,
      );
      setSuccessMessage(response.data);
    } catch (err) {
      throw new Error(err);
    }
  }, [id]);

  useEffect(() => {
    handleGetFormSuccessMessage();
  }, [handleGetFormSuccessMessage]);

  return (
    <Container>
      <MessageContainer>
        <h2>{formSuccessMessage.title}</h2>

        <p>{formSuccessMessage.message}</p>
      </MessageContainer>
    </Container>
  );
};
export default FormSuccessPage;
