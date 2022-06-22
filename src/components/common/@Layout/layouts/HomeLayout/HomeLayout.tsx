import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import Footer from './Footer';
import Header from './Header';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const HomeLayout = ({
  //
  header = <Header />,
  footer = <Footer />,
  containerProps,
  content,
}: HomeLayoutProps) => {
  return (
    <>
      {header}
      <Container px={0} maxW={LAYOUT.SIZE.WIDTH} {...containerProps}>
        {content}
      </Container>
      {footer}
    </>
  );
};

export default HomeLayout;
