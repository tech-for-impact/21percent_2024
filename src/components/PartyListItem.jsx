// PartyListItem.jsx
import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';

function PartyListItem({ onPartyClick, party }) {
  // Set image URL
  const imageUrl = party.image
    ? `/src/assets/images/partyImages/${party.image[0]}`
    : null;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      alignSelf="stretch"
      borderRadius="lg"
      p="10px"
      gap="10px"
      onClick={() => onPartyClick(party)}
    >
      {/* Party Image */}
      <Box
        width="350px"
        height="135px"
        bg="gray.200"
        borderRadius="xl"
        overflow="hidden"
        shadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
        sx={{
          flexShrink: 0,
        }}
      >
        {party.image ? (
          <Image
            src={imageUrl}
            alt={`${party.name} 이미지`}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Text color="gray.500" textAlign="center" mt="30%">
            이미지 없음
          </Text>
        )}
      </Box>

      {/* Party Info */}
      <Flex
        flexDirection="row"
        px="13px"
        py="0px"
        justifyContent="space-between"
        alignItems="center"
        alignSelf="stretch"
      >
        <Flex flexDirection="column" alignItems="flex-start" gap="2px">
          <Flex alignItems="center" gap="8px">
            <Text fontSize="lg" fontWeight="bold" color="rgba(65, 20, 97, 1)">
              {party.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {new Date(party.date[0]).toLocaleString('ko-KR', {
                month: 'long',
                day: 'numeric',
              })}
            </Text>
          </Flex>
          <Text fontSize="md" color="black">
            {party.address}
          </Text>
        </Flex>
        <Flex flexDirection="column" w="25px" alignItems="center">
          <IconifyIcon
            icon="ant-design:star-outlined"
            style={{ color: 'black' }}
            width="25px"
            height="25px"
          />
          <Text textAlign="center" color="black">
            {party.favs}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PartyListItem;
