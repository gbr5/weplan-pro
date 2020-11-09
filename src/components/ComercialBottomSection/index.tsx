import React from 'react';
import ComercialActivityContainer from './ComercialActivityContainer';
import ComercialCardInfoContainer from './ComercialCardInfoContainer';

import { Main } from './styles';

const ComercialBottomSection: React.FC = () => {
  return (
    <Main>
      <ComercialCardInfoContainer />
      <ComercialActivityContainer />
    </Main>
  );
};

export default ComercialBottomSection;
