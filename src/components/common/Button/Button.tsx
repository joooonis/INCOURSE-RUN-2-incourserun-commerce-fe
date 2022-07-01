import { Button } from '@chakra-ui/react';

interface PrimaryButtonProps {
  children: string | JSX.Element;
}

const PrimaryButton = ({ children, ...props }: PrimaryButtonProps) => {
  return (
    <Button {...ButtonStyle} colorScheme="primary" {...props}>
      {children}
    </Button>
  );
};

export default PrimaryButton;

const ButtonStyle = {
  w: 'full',
  h: '50px',
  borderRadius: '25px',
  size: 'sd',
  py: '12px',
};
