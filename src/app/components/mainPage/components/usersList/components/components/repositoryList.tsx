import React, { useCallback, useEffect, useState } from 'react';

import { Center, Flex, Spinner, useToast } from '@chakra-ui/react';
import { Action } from '@reduxjs/toolkit';
import InfiniteScroll from 'react-infinite-scroller';
import { Repository } from 'src/app/components/mainPage/components/usersList/components/components/repository';
import { LoadingStatus } from 'src/app/model/loadingStatus.model';
import { selectRepositoriesByLogin } from 'src/app/store/repositories/repositories.slice';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { useAppDispatch, useAppSelector } from 'src/app/store/store';
import { selectPaginationForUser } from 'src/app/store/users/users.slice';

type Props = {
  userLogin: string;
};

export const RepositoryList: React.FC<Props> = ({ userLogin }) => {
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.LOADING);

  const pagination = useAppSelector((state) => selectPaginationForUser(userLogin)(state));
  const repositories = useAppSelector((state) => selectRepositoriesByLogin(userLogin)(state));
  const dispatch = useAppDispatch();
  const toast = useToast();

  const checkForActionFail = (action: Action): void => {
    if (action.type === fetchRepositoriesByLogin.rejected.toString()) {
      const id = `fetchRepositoriesByLogin.failed${userLogin}`;
      !toast.isActive(id) && toast({
        id,
        title: `Unable to fetch repositories for ${userLogin}`,
        position: 'bottom',
        status: 'error',
        isClosable: true,
      });
      setLoadingStatus(LoadingStatus.FAILED);
    } else {
      setLoadingStatus(LoadingStatus.SUCCEEDED);
    }
  };

  useEffect(() => {
    !pagination && dispatch(fetchRepositoriesByLogin({
      login: userLogin,
      page: 1,
    })).then(checkForActionFail);
  }, []);


  const loadNextPage = useCallback(() => {
    setLoadingStatus(LoadingStatus.LOADING);
    dispatch(
      fetchRepositoriesByLogin({ login: userLogin, page: pagination.page + 1 })
    ).then(checkForActionFail);
  }, [pagination])

  if (loadingStatus === LoadingStatus.LOADING && !repositories.length) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  if (repositories.length === 0) {
    return (
      <Center>
        {
          loadingStatus === LoadingStatus.FAILED
            ? 'Unable to fetch repositories'
            : 'No repositories found'
        }
      </Center>
    );
  }

  return (
    <Flex flexDir={'column'} pl={2} maxH={500} pr={1} overflowY={'auto'} gap={3}>
      <InfiniteScroll
        pageStart={0}
        loadMore={loadNextPage}
        hasMore={pagination.hasMore && loadingStatus === LoadingStatus.SUCCEEDED}
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
