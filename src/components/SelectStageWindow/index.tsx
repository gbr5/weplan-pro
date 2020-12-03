import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { MdAdd } from 'react-icons/md';
import IFunnelStageDTO from '../../dtos/IFunnelStageDTO';
import { useToast } from '../../hooks/toast';
import WindowContainer from '../WindowContainer';

import { List, Item, ConfirmButton } from './styles';

interface IProps {
  // eslint-disable-next-line react/require-default-props
  stages: IFunnelStageDTO[];
  handleSetSelectedStage: Function;
  handleCloseWindow: Function;
  onHandleCloseWindow: MouseEventHandler;
}

const SelectStageWindow: React.FC<IProps> = ({
  stages,
  handleSetSelectedStage,
  handleCloseWindow,
  onHandleCloseWindow,
}: IProps) => {
  const { addToast } = useToast();

  const [selectedStage, setSelectedStage] = useState<IFunnelStageDTO>(
    {} as IFunnelStageDTO,
  );
  const [sortedStages, setSortedStages] = useState<IFunnelStageDTO[]>([]);

  const handleSelectStage = useCallback(
    (props: IFunnelStageDTO) => {
      if (selectedStage.name === props.name) {
        return setSelectedStage({} as IFunnelStageDTO);
      }
      return setSelectedStage(props);
    },
    [selectedStage],
  );

  const handleConfirmStage = useCallback(() => {
    if (selectedStage === undefined) {
      addToast({
        type: 'error',
        title: 'Erro ao selecionar etapa do funil',
        description: 'Selecione uma etapa do funil e tente novamente.',
      });
    }
    handleSetSelectedStage(selectedStage);
    handleCloseWindow();
  }, [addToast, selectedStage, handleSetSelectedStage, handleCloseWindow]);

  const handleSortStages = useCallback(
    (a: IFunnelStageDTO, b: IFunnelStageDTO) => {
      if (Number(a.funnel_order) > Number(b.funnel_order)) {
        return 1;
      }
      if (Number(a.funnel_order) < Number(b.funnel_order)) {
        return -1;
      }
      return 0;
    },
    [],
  );

  useEffect(() => {
    const stagesSorted = stages.sort(handleSortStages);
    setSortedStages(stagesSorted);
  }, [stages, handleSortStages]);

  return (
    <WindowContainer
      onHandleCloseWindow={onHandleCloseWindow}
      containerStyle={{
        zIndex: 14,
        top: '25%',
        left: '10%',
        height: '50%',
        width: '80%',
      }}
    >
      <List>
        {stages &&
          sortedStages.map(stage => {
            return (
              <Item
                isActive={selectedStage?.name === stage.name}
                type="button"
                onClick={() => handleSelectStage(stage)}
              >
                {stage.name}
                <MdAdd size={30} />
              </Item>
            );
          })}
        <ConfirmButton type="button" onClick={handleConfirmStage}>
          Confirmar
        </ConfirmButton>
      </List>
    </WindowContainer>
  );
};

export default SelectStageWindow;
