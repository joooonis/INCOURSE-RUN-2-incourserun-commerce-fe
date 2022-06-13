import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import Header from '../headers/Header';
import Footer from './Footer';

interface LayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const Layout = ({
  //
  header = <Header />,
  footer,
  containerProps,
  content,
}: LayoutProps) => {
  return (
    <>
      {header}
      <Container
        pt={LAYOUT.HEADER.HEIGHT}
        px={LAYOUT.SIZE.PADDING}
        {...containerProps}
        maxW={LAYOUT.SIZE.WIDTH}
      >
        {content}
      </Container>
      {footer}
    </>
  );
};

export default Layout;
