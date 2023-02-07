import React, { ChangeEvent, useState } from 'react';

import { Button, Flex, Input } from '@chakra-ui/react';
import { useAppDispatch } from 'src/app/store/store';
import { fetchUsersByLogin } from 'src/app/store/users/users.thunk';

export const UsersSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useAppDispatch();
  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const performSearch = () => {
    dispatch(fetchUsersByLogin(searchValue));
  }

  return (
    <Flex flexDir={'column'} gap={3}>
      <Input
        value={searchValue}
        alignSelf={'center'}
        placeholder={'Enter username'}
        onChange={onSearchChange}
      />
      <Button
        isDisabled={!searchValue.length}
        onClick={performSearch}
        colorScheme="blue"
      >
        Search
      </Button>
    </Flex>
  );
};
