import React from 'react';

import { Accordion, Center, Flex, Spinner, Text } from '@chakra-ui/react';
import { User } from 'src/app/components/mainPage/components/usersList/components/user';
import { LoadingStatus } from 'src/app/model/loadingStatus.model';
import { useAppSelector } from 'src/app/store/store';
import { selectAllUsers } from 'src/app/store/users/users.slice';

export const UsersList: React.FC = () => {
  const { searchTerm, loadingStatus } = useAppSelector((state) => state.users);
  const users = useAppSelector((state) => selectAllUsers(state.users));

  if (loadingStatus === LoadingStatus.LOADING) {
    return (
      <Center mt={10}>
        <Spinner size={'xl'} />
      </Center>
    );
  }

  if (loadingStatus === LoadingStatus.FAILED) {
    return (
      <Center mt={10}><Text>Unable to fetch users for "{searchTerm}"</Text></Center>
    );
  }

  if (users.length === 0 && loadingStatus === LoadingStatus.SUCCEEDED) {
    return (
      <Center mt={10}><Text>No users found for "{searchTerm}"</Text></Center>
    );
  }

  return (
    <Flex flexDir={'column'} gap={5} mt={3}>
      {searchTerm !== '' && <Text>Showing users for "{searchTerm}"</Text>}
      <Accordion allowMultiple minW={'320px'}>
        {users.map(user => <User key={user.id} user={user} />)}
      </Accordion>
    </Flex>
  );
};
