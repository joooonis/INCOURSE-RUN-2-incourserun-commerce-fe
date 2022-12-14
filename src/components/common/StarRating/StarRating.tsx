import { HStack, Image } from '@chakra-ui/react';

interface StarRatingProps {
  starRating: number;
  upStar?: any;
  downStar?: any;
  width?: string;
}

function StarRating({
  starRating,
  upStar,
  downStar,
  width = '10px',
}: StarRatingProps) {
  const rendering = () => {
    const result = [];
    for (let i = 0; i < starRating; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star.svg"
          w={width}
          alt={String(i)}
          onClick={downStar}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    for (let i = starRating; i < 5; i++) {
      result.push(
        <Image
          key={i}
          src="/icons/svg/review/star_gray.svg"
          w={width}
          alt={String(i)}
          onClick={upStar}
          _hover={{ cursor: 'pointer' }}
        />,
      );
    }
    return result;
  };
  return (
    <HStack spacing="6px" justify="center">
      {rendering()}
    </HStack>
  );
}

export default StarRating;
