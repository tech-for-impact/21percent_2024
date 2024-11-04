import React from 'react';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';

function PartyDetail({ party, onBack }) {
  // 파티 시작 및 종료 시간 포맷
  const startTime = new Date(party.date[0]);
  const endTime = new Date(party.date[1]);
  const formatTime = (date) => `${date.getHours()}시 ~ ${endTime.getHours()}시`;
  const imageUrl = party.image
    ? `/src/assets/images/partyImages/${party.image[0]}`
    : null;
  return (
    <Box px={4} pt={4} position="relative">
      {/* 파티 이미지 또는 기본 박스 */}
      <Box
        width="90%"
        height="200px"
        bg="gray.200"
        mx="auto"
        mb={4}
        borderRadius="lg"
        overflow="hidden" // 이미지가 박스 경계를 넘지 않도록 설정
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {imageUrl ? (
          <Image
            src={imageUrl} // 이미지 URL
            alt={`${party.name} 이미지`}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Text color="gray.500" fontSize="lg">
            이미지 없음
          </Text>
        )}
      </Box>

      {/* 파티 정보 */}
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500" mb="1">
          내 위치로부터 ・ {party.distance}km
        </Text>
        <Text fontSize="2xl" fontWeight="bold" mb="2">
          {party.name}
        </Text>
        <Text mb="2">⭐ {party.favs}</Text>
        <Text mb="1">{`${startTime.getMonth() + 1}월 ${startTime.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][startTime.getDay()]})`}</Text>
        <Text mb="1">{formatTime(startTime)}</Text>
        <Text mb="2">{party.address}</Text>
        <Text color="gray.500">{party.host[1]}님이 호스트</Text>
      </Box>

      {/* 버튼 */}
      <Flex direction="column" gap={2} mt="4">
        <Button colorScheme="purple">내 옷 등록하기</Button>
        <Button colorScheme="purple" variant="outline">
          등록된 옷 확인하기
        </Button>
      </Flex>
    </Box>
  );
}

export default PartyDetail;
