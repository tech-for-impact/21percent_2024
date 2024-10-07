// PartySearch.jsx
import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import PartyListBottomSheet from '../components/PartyListBottomSheet';

function PartySearch() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false); // BottomSheet의 확장 상태 관리

  return (
    <Flex direction="column" height="100vh" position="relative">
      {/* 헤더 - BottomSheet가 확장되지 않았을 때만 표시 */}
      {!isExpanded && (
        <Header
          title={`Welcome, ${user ? user.name : 'Guest'}!`}
          subtitle="내 주변의 파티를 찾아보세요"
        />
      )}

      {/* 카카오맵 */}
      <Box
        flex="1"
        width="100%"
        position="relative"
        zIndex="1"
        paddingBottom="20vh"
      >
        <KakaoMap />
      </Box>

      {/* BottomSheet */}
      <Box position="relative" zIndex="2">
        <PartyListBottomSheet
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
        />
      </Box>
    </Flex>
  );
}

export default PartySearch;
