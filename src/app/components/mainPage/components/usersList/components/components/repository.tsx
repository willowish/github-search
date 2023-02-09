import React from 'react';

import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Repository as RepositoryModel } from 'src/app/model/repository.model';
import { getCompactValue } from 'src/app/utils/getCompactValue';

type Props = {
  repository: RepositoryModel;
};
export const Repository: React.FC<Props> = ({ repository }) => {
  return (
    <Flex w="100%" background={'gray.300'} mb={2} paddingX={4} paddingY={2} h={120} flexDir={'column'} gap={1}>
      <Flex w="100%" justifyContent={'space-between'} alignItems={'center'}>
        <Box fontWeight={'semibold'}>{repository.name}</Box>
        <Flex gap={1} alignSelf={'flex-end'} alignItems={'center'} fontSize={'0.9em'}>
          <Flex>{getCompactValue(repository.stargazers_count)}</Flex>
          <StarIcon />
        </Flex>
      </Flex>
      {repository.description
        ? <Text noOfLines={3}>{repository.description}</Text>
        : <Text opacity={0.5} fontStyle={'italic'}>No description available</Text>
      }
    </Flex>
  );
};
