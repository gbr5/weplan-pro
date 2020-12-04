import React from 'react';
import { Document } from 'react-pdf';

import { Container } from './styles';

interface IProps {
  totalPages: number;
  file: File;
}

const PDFViewPage: React.FC<IProps> = ({ file, totalPages }: IProps) => {
  console.log(totalPages);
  return (
    <Container>
      <Document file={file} />
    </Container>
  );
};

export default PDFViewPage;
