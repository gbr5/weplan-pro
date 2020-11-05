import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import { useToast } from '../../hooks/toast';
import WindowContainer from '../WindowContainer';

import { List, Item } from './styles';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  stages?: IFunnelStageDTO[];
  handleSetSelectedStage: Function;
}

const SelectStageWindow: React.FC<IProps> = ({
  stages,
  handleSetSelectedStage,
}: IProps) => {
  const { addToast } = useToast();

  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>();

  const handleSelectStage = useCallback((props: IFunnelStageDTO) => {
    setSelectedStage(props);
  }, []);

  const handleConfirmStage = useCallback(() => {
    if (selectedStage === undefined) {
      addToast({
        type: 'error',
        title: 'Erro ao selecionar etapa do funil',
        description: 'Selecione uma etapa do funil e tente novamente.',
      });
    }
    handleSetSelectedStage(selectedStage);
  }, [addToast, selectedStage, handleSetSelectedStage]);
  return (
    <WindowContainer
      onHandleCloseWindow={() => setSelectedStage({} as IFunnelStageDTO)}
      containerStyle={{
        zIndex: 12,
        top: '0%',
        left: '10%',
        height: '100%',
        width: '60%',
      }}
    >
      <List>
        {stages &&
          stages.map(stage => {
            return (
              <Item type="button" onClick={() => handleSelectStage(stage)}>
                {stage.name}
                <MdAdd size={30} />
              </Item>
            );
          })}
        <button type="button" onClick={handleConfirmStage}>
          Confirmar
        </button>
      </List>
    </WindowContainer>
  );
};

export default SelectStageWindow;
