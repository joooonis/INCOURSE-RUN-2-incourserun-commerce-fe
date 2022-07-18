import React from 'react';

import { Container, ContainerProps } from '@chakra-ui/react';

import { LAYOUT } from '@constants/layout';

import JoinHeader from './JoinHeader';

interface JoinLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  containerProps?: ContainerProps;
}

const JoinLayout = ({
  //
  header = <JoinHeader />,
  footer,
  containerProps,
  content,
}: JoinLayoutProps) => {
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

export default JoinLayout;
