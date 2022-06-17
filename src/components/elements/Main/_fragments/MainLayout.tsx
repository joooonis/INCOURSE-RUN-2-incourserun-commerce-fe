import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const Layout = ({
  //
  header = <Header />,
  footer = <Footer />,
  containerProps,
  content,
}: LayoutProps) => {
  return (
    <>
      {header}
      <Container {...containerProps} px={0} maxW={LAYOUT.SIZE.WIDTH}>
        {content}
      </Container>
      {footer}
    </>
  );
};

export default Layout;
