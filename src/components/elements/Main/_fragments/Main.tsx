import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { Box, Flex, Image, VStack, position } from '@chakra-ui/react';

import { setAuthHeader } from '@apis/_axios/instance';

import { getToken } from '@utils/localStorage/token';

function Main() {
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token.access) router.replace('/login');
    else setAuthHeader(token.access);
  }, []);
  return (
    <>
      <Box
        bgImage="/images/main/bg_intro.png"
        bgRepeat="no-repeat"
        bgSize="cover"
        h="782px"
        px="16px"
      >
        <Box {...TitleText} pt="160px">
          지속가능한 <br />
          클린&비건뷰티, 인코스런
        </Box>
        <Box {...SubText} pt="20px">
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
        <Box {...SubText} pos="absolute" right="30px" bottom="60px">
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
      <Flex
        bgColor="gray.100"
        h="1960px"
        px="16px"
        pos="relative"
        flexDir="column"
        alignItems="center"
      >
        <Box
          {...TitleText}
          color="primary.500"
          pt="80px"
          w="full"
          textAlign="center"
          pos="relative"
        >
          부풀려지는 가격 이제 그만!
        </Box>
        <Box {...SubText} w="full" textAlign="center" pt="20px">
          불합리한{' '}
          <span style={{ fontWeight: '700' }}>중간 유통 거품을 제거</span>
          한 <br />
          인코스런 만의 투명한 유통혁신
        </Box>
        <Flex pos="absolute" top="256px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            bg="#FF710B"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="/icons/svg/main/step1.svg" alt="step1" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.800"
            flexDir="column"
            alignItems="center"
            ml="10px"
          >
            <Box pos="relative">
              <Box fontWeight={700}> STEP 1</Box>
              <Box pos="absolute" left="-23px" top="1px">
                <Image src="/icons/svg/join/checked_line.svg" alt="check3" />
              </Box>
            </Box>
            <Box>제조공장의</Box>
            <Box>제조 및 개발비용</Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="446px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            border="2px solid #CBCED6"
            bg="#FFFFFF"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="/icons/svg/main/step2.svg" alt="step2" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.400"
            flexDir="column"
            alignItems="center"
            ml="10px"
          >
            <Box pos="relative">
              <Box fontWeight={700}> STEP 2</Box>
            </Box>
            <Box>물류 및 운송비용</Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="636px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            border="2px solid #CBCED6"
            borderRadius="50%"
            bg="#FFFFFF"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="/icons/svg/main/step3.svg" alt="step3" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.400"
            flexDir="column"
            alignItems="center"
            ml="26px"
          >
            <Box pos="relative">
              <Box fontWeight={700}> STEP 3</Box>
            </Box>
            <Box>결제 수수료</Box>
          </Flex>
        </Flex>
        <Flex pos="absolute" top="826px" left="75px" alignItems="center">
          <Box
            w="150px"
            h="150px"
            bg="#FF710B"
            borderRadius="50%"
            pos="relative"
            zIndex={100}
          >
            <Box pos="absolute" top="25px" left="25px">
              <Image src="/icons/svg/main/step4.svg" alt="step4" />
            </Box>
          </Box>
          <Flex
            {...StepText}
            color="gray.800"
            flexDir="column"
            alignItems="center"
            ml="26px"
          >
            <Box pos="relative">
              <Box fontWeight={700}> STEP 4</Box>
              <Box pos="absolute" left="-23px" top="1px">
                <Image
                  src="/icons/svg/join/checked_line.svg"
                  alt="checked_line"
                />
              </Box>
            </Box>
            <Box>소비자 가격</Box>
          </Flex>
        </Flex>
        <Box
          pos="absolute"
          top="373px"
          left="152px"
          h="489px"
          borderLeft="2px solid #CBCED6"
          zIndex={1}
        />
        <Box pos="absolute" top="999px" h="37px">
          <Image src="/icons/svg/main/divider.svg" alt="divider" />
        </Box>
        <Box h="840px"></Box>
        <Box {...StepText} fontWeight={700} color="primary.500" pt="20px">
          SAVE MONEY
        </Box>
        <Flex flexDir="column" pt="30px" textAlign="center" {...StepText}>
          <Box color="#FF7A00" fontWeight="700">
            * 온라인 직접 판매
          </Box>
          <Box>인코스런은 온라인으로만 직접판매하여,</Box>
          <Box>더 낮은 가격을 만들어냅니다.</Box>
        </Flex>
        <Box {...TitleText} fontWeight={400} pt="80px">
          이렇게 <span style={{ fontWeight: 700 }}>비교하세요!</span>
        </Box>
        <Flex flexDir="column" pt="20px" textAlign="center" {...SubText}>
          <Box>인코스런은 부담스러운</Box>
          <Box>
            영유아 화장품의{' '}
            <span
              style={{
                fontWeight: 700,
                position: 'relative',
                textDecoration: 'underline #FF710B 10px',
                textUnderlineOffset: '-10px',
              }}
            >
              가격거품을 제거해
            </span>
          </Box>
          <Box>
            <span
              style={{
                fontWeight: 700,
                position: 'relative',
                textDecoration: 'underline #FF710B 10px',
                textUnderlineOffset: '-10px',
              }}
            >
              투명한 가격
            </span>
            을 만들어 갑니다.
          </Box>
        </Flex>
      </Flex>

      <Box bgGradient="linear(to-r, #FF710B, #FFAB2E)" position="relative">
        <VStack w="100%" alignItems="center">
          <Box {...MoreInfoTitleText} pt="83px">
            인코스런에 대해 더 궁금하신가요?{' '}
          </Box>
          <Box {...MoreInfoSubText} pt="2px" textAlign="center">
            인스타그램을 방문하시면 더욱 다양한 <br />
            인코스런의 이야기를 확인하실 수 있어요!
          </Box>
          <Flex
            {...MoreInfoSubText}
            alignItems="center"
            pt="4px"
            pb="82px"
            fontWeight="700"
          >
            <Link href="https://www.instagram.com/incourse.run">
              <Flex cursor="pointer">
                <Image
                  pr="8px"
                  src="/icons/svg/instagram.svg"
                  alt="instagram"
                />
                INCOURSE.RUN
              </Flex>
            </Link>
          </Flex>
          <a href="#">
            <Box
              border="2px solid #1A1A1A"
              w="50px"
              h="50px"
              borderRadius="50%"
              position="fixed"
              right="16px"
              bottom="20px"
            >
              <Box
                position="absolute"
                width="12px"
                height="12px"
                left="50%"
                top="50%"
                transform="translate(-50%, -50%) rotate(45deg)"
                _before={{
                  content: '""',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  border: '2px solid #1A1A1A',
                  borderRight: 0,
                  borderBottom: 0,
                }}
                _after={{
                  content: '""',
                  height: '2px',
                  width: '16px',
                  backgroundColor: '#1A1A1A',
                  position: 'absolute',
                  transformOrigin: '0 100%',
                  transform: 'rotate(45deg)',
                }}
              ></Box>
            </Box>
          </a>
        </VStack>
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

const SubText = {
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

const MoreInfoTitleText = {
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '29px',
  color: 'white',
};

const MoreInfoSubText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
  color: 'white',
};

const StepText = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '28px',
};
