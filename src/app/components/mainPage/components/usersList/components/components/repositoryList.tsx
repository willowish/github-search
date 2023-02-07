import React, { useEffect } from 'react';

import { StarIcon } from '@chakra-ui/icons';
import { Center, Flex, Text } from '@chakra-ui/react';
import { selectRepositoriesByLogin } from 'src/app/store/repositories/repositories.slice';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { useAppDispatch, useAppSelector } from 'src/app/store/store';

type Props = {
  userLogin: string;
};
export const RepositoryList: React.FC<Props> = ({ userLogin }) => {
  const repositories = useAppSelector((state) => selectRepositoriesByLogin(userLogin)(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRepositoriesByLogin({ login: userLogin, page: 1 }));
  }, []);

  return (
    <Flex flexDir={'column'} pl={2} maxH={500} overflow={'auto'} gap={3}>
      {repositories.map((repository) => (
        <Flex w="100%" key={repository.id} background={'gray.300'} paddingX={4} paddingY={2}>
          <Flex w="100%" justifyContent={'space-between'}>
            <Text fontWeight={'semibold'}>{repository.name}</Text>
            <Flex gap={2}>
              {repository.stargazers_count}
              <StarIcon />
            </Flex>
            {repository.description}
          </Flex>
        </Flex>
      ))}
      {repositories.length === 0 && (
        <Center opacity={'0.5'} justifyContent={'center'}>
          No repositories
        </Center>
      )}
    </Flex>
  );
};
