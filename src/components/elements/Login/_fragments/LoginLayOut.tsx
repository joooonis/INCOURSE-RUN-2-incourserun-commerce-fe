import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

interface LoginLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const LoginLayout = ({
  //
  header,
  footer,
  containerProps,
  content,
}: LoginLayoutProps) => {
  return (
    <>
      {header}
      <Container maxW={LAYOUT.SIZE.WIDTH} {...containerProps}>
        {content}
      </Container>
      {footer}
    </>
  );
};

export default LoginLayout;
