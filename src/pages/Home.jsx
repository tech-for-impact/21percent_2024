import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import '@/styles/Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Swiper 기본 스타일
import Header from '../components/Layout/Header';
import PartyListItem from '../components/PartyListItem';
import { partyListData } from '../data/partyListData';

// dummy items
const clothingItems = ['글 1', '글 2', '글 3', '글 4'];

function Home() {
  return (
    <Flex direction="column" height="100vh" position="relative">
      <Header
        id="Home"
        title="안녕하세요, again님!"
        subtitle="21%와 함께 지금까지 물 2,000L를 절약했어요."
      />

      <Box className="home-page" bg="gray.100" minH="100vh" p={4}>
        {/* 상단 헤더 */}
        {/* 이전 헤더
        <Box bg="purple.400" borderRadius="md" p={4} color="white">
          <Text fontSize="2xl" fontWeight="bold">
            안녕 aGAIN! 👕
          </Text>
          <Text fontSize="sm">지금까지 6번의 교환으로 총 99L를 절약했어! :)</Text>
        </Box>
      */}

        {/* 옷 등록 영역 */}
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            주변에 이런 옷이 등록 됐어!
          </Text>
          {/* 수평 슬라이더 */}
          <Flex overflowX="auto" whiteSpace="nowrap" paddingBottom="10px">
            {clothingItems.map((item, index) => (
              <Box
                key={index}
                className="clothing-card"
                bg="blue.300"
                minWidth="150px"
                h="100px"
                borderRadius="md"
                textAlign="center"
                lineHeight="100px"
                fontWeight="bold"
                mr={4} // 박스 간격
              >
                {item}
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Swiper 슬라이더 */}
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            주변에 이런 옷이 등록 됐어!
          </Text>
          <Swiper spaceBetween={20} slidesPerView="auto" freeMode={true}>
            {clothingItems.map((item, index) => (
              <SwiperSlide key={index} style={{ width: '150px' }}>
                <Box
                  className="clothing-card"
                  bg="blue.300"
                  h="100px"
                  borderRadius="md"
                  textAlign="center"
                  lineHeight="100px"
                  fontWeight="bold"
                >
                  {item}
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        {/* 내 주변의 파티들 */}
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            내 주변의 파티들!
          </Text>
          <Flex direction="column" gap={4}>
            {partyListData.map((party, index) => (
              <Box
                key={index} // 각 항목에 고유한 key 값 지정
                className="party-card"
                bg="gray.200"
                p={4}
                borderRadius="md"
              >
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
      {/* 곧 열리는 파티들 */}
      <Box mt={6}>
        <Text fontSize="2xl" fontWeight="bold">
          곧 열리는 파티들
        </Text>
        <Flex direction="column">
          {partyListData.map((party) => (
            <PartyListItem
              key={party.id}
              onPartyClick={() => {}} // temporary empty function
              party={party}
            />
          ))}
        </Flex>
      </Box>
    </Flex>
  );
}

export default Home;
