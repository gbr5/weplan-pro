import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useFunnel } from '../../../hooks/funnel';
import Header from '../../Header';
import MenuButton from '../../MenuButton';
import AddFunnelCardInfoField from '../AddFunnelCardInfoField';
import FunnelCardInfoFieldButton from '../FunnelCardInfoFieldButton';

import { Container, AddButton } from './styles';

const ComercialFunnelSettings: React.FC = () => {
  const { selectedFunnelCardInfoFields } = useFunnel();
  const [addField, setAddField] = useState(false);

  const handleAddField = useCallback((e: boolean) => {
    setAddField(e);
  }, []);
  return (
    <Container>
      <Header />
      <MenuButton />

      <h1>Configurações Comercial</h1>

      <section>
        <h2>Informações do Card</h2>
        <p>Defina as informações padrões que cada card terá</p>

        {selectedFunnelCardInfoFields.map(field => {
          return <FunnelCardInfoFieldButton field={field} key={field.id} />;
        })}

        {addField ? (
          <AddFunnelCardInfoField
            closeComponent={() => handleAddField(false)}
          />
        ) : (
          <AddButton type="button" onClick={() => handleAddField(!addField)}>
            <MdAdd size={64} />
          </AddButton>
        )}
      </section>
    </Container>
  );
};

export default ComercialFunnelSettings;
