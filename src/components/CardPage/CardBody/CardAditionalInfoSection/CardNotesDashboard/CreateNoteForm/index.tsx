import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { MdSend } from 'react-icons/md';

import { Container } from './styles';
import { useStageCard } from '../../../../../../hooks/stageCard';
import formatTextArea from '../../../../../../utils/formatTextArea';

interface IFormParams {
  note: string;
}

const CreateNoteForm: React.FC = () => {
  const { createCardNote } = useStageCard();
  const formRef = useRef<FormHandles>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [rows, setRows] = useState(2);

  const handleChange = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      const numberOfRows = formatTextArea({ textArea });

      setRows(numberOfRows);
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    const note = textAreaRef.current?.value;
    if (note) {
      createCardNote(note);
    }
  }, [createCardNote]);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Container>
        <textarea
          name="note"
          onChange={handleChange}
          ref={textAreaRef}
          cols={30}
          rows={rows}
        />
        <button type="submit">
          <MdSend size={24} />
        </button>
      </Container>
    </Form>
  );
};

export default CreateNoteForm;
