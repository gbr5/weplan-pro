import React, { useCallback, useState } from 'react';
import IContactPageLinkDTO from '../../../../dtos/IContactPageLinkDTO';
import CTAButtonForm from '../CTAButtonForm';

import { Container, ButtonExample } from './styles';

interface IProps {
  buttonLink: IContactPageLinkDTO;
}

const CTAButton: React.FC<IProps> = ({ buttonLink }) => {
  const [editButton, setEditButton] = useState(false);

  const handleEditButtonLink = useCallback((e: boolean) => {
    setEditButton(e);
  }, []);

  return (
    <Container>
      {editButton ? (
        <CTAButtonForm
          buttonLink={buttonLink}
          closeComponent={() => handleEditButtonLink(false)}
        />
      ) : (
        <ButtonExample
          backgroundColor={buttonLink.background_color}
          color={buttonLink.text_color}
          type="button"
          onClick={() => handleEditButtonLink(true)}
        >
          {buttonLink.label}
        </ButtonExample>
      )}
    </Container>
  );
};

export default CTAButton;
