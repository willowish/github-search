import React from 'react';

import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';
import { RepositoryList } from 'src/app/components/mainPage/components/usersList/components/components/repositoryList';
import { User as UserModel } from 'src/app/model/users.model';

type Props = {
  user: UserModel;
};
export const User: React.FC<Props> = ({ user }) => {
    return (
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {user.login}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {isExpanded && <RepositoryList userLogin={user.login} />}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  }
;
