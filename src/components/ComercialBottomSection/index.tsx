import React from 'react';
import IStageCardDTO from '../../dtos/IStageCardDTO';
import ComercialActivityContainer from './ComercialActivityContainer';
import ComercialCardInfoContainer from './ComercialCardInfoContainer';

import { Main } from './styles';

interface IProps {
  selectedCard: IStageCardDTO;
}

const ComercialBottomSection: React.FC<IProps> = ({ selectedCard }: IProps) => {
  return (
    <Main>
      <ComercialCardInfoContainer selectedCard={selectedCard} />
      <ComercialActivityContainer />
    </Main>
  );
};

export default ComercialBottomSection;
