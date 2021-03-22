import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import ITitleMessageDTO from '../../../../dtos/ITitleMessageDTO';
import Button from '../../../Button';
import Input from '../../../Input';

import { Container } from './styles';

interface IProps {
  defaultTitleMessage?: ITitleMessageDTO;
  titleLabel: string;
  messageLabel: string;
  handleSubmit: Function;
}

const TitleMessageForm: React.FC<IProps> = ({
  handleSubmit,
  defaultTitleMessage,
  titleLabel,
  messageLabel,
}) => {
  const formRef = useRef<FormHandles>(null);
  const handleFormSubmit = useCallback(
    (e: ITitleMessageDTO) => {
      handleSubmit(e);
    },
    [handleSubmit],
  );

  const title = (defaultTitleMessage && defaultTitleMessage.title) || '';
  const titlePlaceholder = (title !== '' && title) || titleLabel;
  const message = (defaultTitleMessage && defaultTitleMessage.message) || '';
  const messagePlaceholder = (message !== '' && message) || messageLabel;

  return (
    <Form ref={formRef} onSubmit={handleFormSubmit}>
      <Container>
        <strong>{titleLabel}</strong>
        <Input
          name="title"
          defaultValue={title}
          placeholder={titlePlaceholder}
        />
        <strong>{messageLabel}</strong>
        <Input
          name="message"
          defaultValue={message}
          placeholder={messagePlaceholder}
        />
        <Button type="submit">Salvar</Button>
      </Container>
    </Form>
  );
};

export default TitleMessageForm;
