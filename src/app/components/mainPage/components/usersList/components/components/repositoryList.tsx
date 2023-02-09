import React, { useCallback, useEffect } from 'react';

import { Center, Flex, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import { Repository } from 'src/app/components/mainPage/components/usersList/components/components/repository';
import { selectRepositoriesByLogin } from 'src/app/store/repositories/repositories.slice';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { useAppDispatch, useAppSelector } from 'src/app/store/store';
import { selectPaginationForUser } from 'src/app/store/users/users.slice';

type Props = {
  userLogin: string;
};

export const RepositoryList: React.FC<Props> = ({ userLogin }) => {
  const pagination = useAppSelector((state) => selectPaginationForUser(userLogin)(state));
  const repositories = useAppSelector((state) => selectRepositoriesByLogin(userLogin)(state));
  const dispatch = useAppDispatch();

  useEffect(() => {
    const shouldFetchInitialData = !pagination;
    shouldFetchInitialData && dispatch(fetchRepositoriesByLogin({ login: userLogin, page: 1 }));
  }, []);

  const loadNextPage = useCallback(() => {
    dispatch(fetchRepositoriesByLogin({ login: userLogin, page: pagination.page + 1 }));
  }, [pagination])

  // lack of pagination indicates that we are still loading data
  if (!pagination) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (repositories.length === 0) {
    return (
      <Center>
        No repositories found
      </Center>
    );
  }

  return (
    <Flex flexDir={'column'} pl={2} maxH={500} pr={1} overflowY={'auto'} gap={3}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadNextPage}
        hasMore={pagination.hasMore}
        loader={<Center><Spinner /></Center>}
        useWindow={false}
      >
        {repositories.map((repository) => (
          <Repository key={repository.id} repository={repository} />
        ))}
      </InfiniteScroll>
    </Flex>
  );
};
