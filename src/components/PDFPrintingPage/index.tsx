import React from 'react';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

import { Container } from './styles';

interface IProps {
  totalPages: number;
  file: File;
}

const PDFPrintingPage: React.FC<IProps> = ({ file, totalPages }: IProps) => {
  return <Container />;
};

export default PDFPrintingPage;
