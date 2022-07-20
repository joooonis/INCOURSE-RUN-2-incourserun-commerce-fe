import React, { useState } from 'react';

import { Button, Flex } from '@chakra-ui/react';

interface PaginationProps {
  total: number;
  limit: number;
  page: number;
  setPage: Function;
}

function Pagination({ total, limit, page, setPage }: PaginationProps) {
  const numPages = Math.ceil(total / limit);
  const pageIndexComparsion = (num: number) => {
    if (num % 5 == 0) return Math.ceil((num - 1) / 5);
    else return Math.ceil(num / 5);
  };
  return (
    <>
      <Flex py="30px" justifyContent="center" alignItems="center">
        <Button
          onClick={() => setPage(page - 1)}
          display={page === 1 ? 'none' : 'block'}
          variant="ghost"
        >
          &lt;
        </Button>
        {Array(numPages)
          .fill(0)
          .map((_, index) => {
            return (
              <Button
                variant="ghost"
                key={index}
                onClick={() => setPage(index + 1)}
                _hover={{ cursor: 'pointer' }}
                color={page == index + 1 ? '#1A1A1A' : 'gray.400'}
                display={
                  pageIndexComparsion(page) == pageIndexComparsion(index + 1)
                    ? 'block'
                    : 'none'
                }
                {...TabStyle}
              >
                {index + 1}
              </Button>
            );
          })}
        <Button
          onClick={() => setPage(page + 1)}
          display={page === numPages ? 'none' : 'block'}
          variant="ghost"
        >
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
};
