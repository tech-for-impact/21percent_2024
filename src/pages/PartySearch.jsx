import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex, Text } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import PartyListBottomSheet from '../components/PartyListBottomSheet';
import { partyListData } from '../data/partyListData';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import PartySearchBottomSheet from '../components/PartySearchBottomSheet';

function PartySearch() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [center, setCenter] = useState({
    lat: 36.370379109284,
    lng: 127.36265917051,
  });
  const [myLocation, setMyLocation] = useState(null);
  // changing bottom sheet...
  const [open, setOpen] = useState(true);

  const handlePartyClick = (party) => {
    setSelectedParty(party);
    setIsExpanded(true);
  };

  const goToCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        // 현재 위치 가져오기
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        // 위치 설정
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };
        setCenter(newCenter);
        setMyLocation(newCenter);
      } catch (error) {
        console.error('현재 위치를 가져올 수 없습니다.', error);
        alert('현재 위치를 가져올 수 없습니다. 위치 접근 권한을 확인해주세요.');
      }
    } else {
      alert('위치 정보가 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <>
      {/* <Flex direction="column" height="100vh" position="relative">
      {!isExpanded && (
        <Header
          user={user}
          title="파티 찾기"
          subtitle={`Welcome, ${user ? user.name : 'Guest'}!`}
        />
      )}
      <Box
        flex="1"
        width="100%"
        position="relative"
        zIndex="1"
        paddingBottom="10vh"
        top="-5vh"
      >
        <KakaoMap
          partyListData={partyListData}
          handlePartyClick={handlePartyClick}
          center={center}
          myLocation={myLocation}
        />
      </Box>
    </Flex> */}
      <Box
        flex="1"
        width="100%"
        height="100%"
        position="absolute"
        paddingBottom="10vh"
        top="-5vh"
      >
        <KakaoMap
          partyListData={partyListData}
          handlePartyClick={handlePartyClick}
          center={center}
          myLocation={myLocation}
        />
      </Box>
      <PartySearchBottomSheet />
      {/* moved bottom sheet to here. Aware of similar component names!! */}
    </>
  );
}

export default PartySearch;
