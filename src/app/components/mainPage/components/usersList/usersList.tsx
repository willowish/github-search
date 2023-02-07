import React from 'react';

import { Accordion } from '@chakra-ui/react';
import { User } from 'src/app/components/mainPage/components/usersList/components/user';
import { useAppSelector } from 'src/app/store/store';
import { selectAllUsers } from 'src/app/store/users/users.slice';

export const UsersList: React.FC = () => {
  const users = useAppSelector((state) => selectAllUsers(state.users));

  return (
    <Accordion allowMultiple minW={'320px'}>
      {
        users.map(user => {
          return <User key={user.id} user={user} />
        })
      }
    </Accordion>
  );
};
