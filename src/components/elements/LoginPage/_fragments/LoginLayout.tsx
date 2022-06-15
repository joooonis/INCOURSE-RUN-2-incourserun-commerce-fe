import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import LoginHeader from './LoginHeader';

interface LoginLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const LoginLayout = ({
  //
  header = <LoginHeader />,
  footer,
  containerProps,
  content,
}: LoginLayoutProps) => {
  return (
    <>
      {header}
      <Container
        pt={LAYOUT.HEADER.HEIGHT}
        maxW={LAYOUT.SIZE.WIDTH}
        {...containerProps}
      >
        {content}
      </Container>
      {footer}
    </>
  );
};

export default LoginLayout;
