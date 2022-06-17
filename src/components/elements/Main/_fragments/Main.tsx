import React from 'react';

import { Box, BoxProps, Flex, Image } from '@chakra-ui/react';

interface MainProps extends BoxProps {}

function Main({ ...basisProps }: MainProps) {
  return (
    <>
      <Box
        bgImage="/images/main/bg_intro.png"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="100vh"
        px="16px"
      >
        <Box {...TitleText} pt="160px">
          지속가능한 <br />
          클린&비건뷰티, 인코스런
        </Box>
        <Box {...DeatilText} pt="20px">
          자연과 사람에게 <br />
          책임질 수 있는 지속 가능한 <br />
          제품을 만듭니다.
        </Box>
      </Box>
      <Box bgColor="#FFFCEF" h="782px" px="16px" pos="relative">
        <Image
          src="/images/main/item0.png"
          w="244px"
          style={{ position: 'absolute', top: '20px', left: '30px' }}
        />
        <Image
          src="/images/main/item1.png"
          w="236px"
          style={{ position: 'absolute', top: '160px', right: '0px' }}
        />
        <Image
          src="/images/main/item2.png"
          w="175px"
          style={{ position: 'absolute', top: '305px', left: '0px' }}
        />
        <Box
          {...TitleText}
          pos="absolute"
          top="481px"
          right="36px"
          _before={{
            content: '""',
            display: 'block',
            width: '2px',
            height: '18px',
            backgroundColor: 'primary.500',
            position: 'absolute',
            bottom: '16px',
            left: '-20px',
          }}
          _after={{
            content: '""',
            display: 'block',
            height: '2px',
            width: '18px',
            backgroundColor: 'primary.500',
            position: 'absolute',
            bottom: '24px',
            left: '-28px',
          }}
        >
          불합리한 유통구조 <br />
          과도한 패키징 <br />
          과장된 광고
        </Box>
        <Box {...DeatilText} pos="absolute" right="30px" bottom="60px">
          부풀려지는 가격은 이제 그만! <br />
          <span style={{ color: '#FF7A00', fontWeight: '700' }}>인코스런</span>
          은 가격거품을 제거한 <br />
          착한소비를 위해 태어났습니다.
        </Box>
      </Box>
      <Box bgColor="#FFFCEF" h="430px" px="16px" py="65px" pos="relative">
        <Image src="/images/main/ellipse0.png" style={{ margin: '0 auto' }} />
        <Image
          src="/images/main/ellipse1.png"
          style={{
            width: '77px',
            position: 'absolute',
            bottom: '132px',
            left: '22px',
          }}
        />
        <Box
          {...TitleText}
          position="absolute"
          top="calc(50% - 38px)"
          left="calc(50% - 90px)"
          textAlign="center"
        >
          <Box>
            <span>이제 </span>
            <Box _before={Dot} display="inline-block" position="relative">
              합
            </Box>
            <Box _before={Dot} display="inline-block" position="relative">
              리
            </Box>
            <Box _before={Dot} display="inline-block" position="relative">
              적
            </Box>
            으로
            <br />
            지갑을 지키세요!
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Main;

const TitleText = {
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: '38px',
};

const DeatilText = {
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '29px',
};

const Dot = {
  content: '""',
  display: 'block',
  width: '8px',
  height: '8px',
  backgroundColor: 'primary.500',
  borderRadius: '50%',
  position: 'absolute',
  top: '-7px',
  left: 'calc(50% - 4px)',
};
