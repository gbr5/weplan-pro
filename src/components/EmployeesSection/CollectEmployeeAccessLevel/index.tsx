import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { useCompanyEmployee } from '../../../hooks/companyEmployee';
import Button from '../../Button';
import SelectField from '../../FormComponents/SelectField';

interface IProps {
  previousStep: () => void;
  nextStep: () => void;
}

interface IFormParams {
  accessLevel: string;
}

const CollectEmployeeAccessLevel: React.FC<IProps> = ({
  nextStep,
  previousStep,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { selectEmployeeAccessLevel, accessLevelTypes } = useCompanyEmployee();

  const handleSubmit = useCallback(
    (e: IFormParams) => {
      selectEmployeeAccessLevel(Number(e.accessLevel));
      nextStep();
    },
    [nextStep, selectEmployeeAccessLevel],
  );
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <strong>Defina o nível de acesso que o colaborador terá</strong>
      <SelectField
        isSearchable={false}
        defaultValue={accessLevelTypes[0]}
        name="accessLevel"
        options={accessLevelTypes}
      />
      <section>
        <Button type="button" onClick={() => previousStep()}>
          Anterior
        </Button>
        <Button type="submit">Próximo</Button>
      </section>
    </Form>
  );
};

export default CollectEmployeeAccessLevel;
