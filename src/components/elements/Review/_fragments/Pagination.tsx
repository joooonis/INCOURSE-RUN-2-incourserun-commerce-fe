import { Button, Flex } from '@chakra-ui/react';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Function;
}

function Pagination({ total, limit, page, setPage }: PaginationProps) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Flex py="30px" justifyContent="center" alignItems="center">
        {Array(numPages).map((_, index) => (
          <Button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            _hover={{ cursor: 'pointer' }}
            _selected={{ color: '#1A1A1A' }}
            {...TabStyle}
          >
            {index + 1}
          </Button>
        ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Flex>
    </>
  );
}

export default Pagination;

const TabStyle = {
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'gray.400',
};
