import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useContactPage } from '../../../hooks/contactPages';
import CTAButton from './CTAButton';
import CTAButtonForm from './CTAButtonForm';

import { Container, AddButtonLink } from './styles';

const CTASection: React.FC = () => {
  const { currentContactPage } = useContactPage();
  const [addButtonLink, setAddButtonLink] = useState(false);

  const handleAddButtonLink = useCallback((e: boolean) => {
    setAddButtonLink(e);
  }, []);

  return (
    <Container>
      {currentContactPage &&
        currentContactPage.links &&
        currentContactPage.links.map(link => {
          return <CTAButton key={link.id} buttonLink={link} />;
        })}
      {addButtonLink && (
        <CTAButtonForm closeComponent={() => handleAddButtonLink(false)} />
      )}
      <AddButtonLink onClick={() => handleAddButtonLink(true)} type="button">
        <MdAdd size={64} />
      </AddButtonLink>
    </Container>
  );
};

export default CTASection;
