import React from 'react';

import { Flex } from '@chakra-ui/react';
import { UsersList } from 'src/app/components/mainPage/components/usersList/usersList';
import { UsersSearch } from 'src/app/components/mainPage/components/usersSearch/usersSearch';

export const MainPage: React.FC = () => {
  return (
    <Flex
      justifyContent={'center'}
      py={5}
    >
      <Flex
        flexDir={'column'}
        w={['320px','480px', '640px', '800px']}
      >
        <UsersSearch />
        <UsersList />
      </Flex>
    </Flex>
  );
};
