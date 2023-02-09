import { createAsyncThunk } from '@reduxjs/toolkit';
import { GithubApiService } from 'src/app/services/githubApiService';

export const fetchRepositoriesByLogin = createAsyncThunk(
  'repositories/fetchRepositoriesByLogin',
  async ({ login, page = 1 }: {login: string; page?: number}) => {
    const responsesPerPage = 10;
    const repositories = await GithubApiService.fetchUserRepos(login, page, responsesPerPage);

    return {
        data: repositories,
        page,
        login,
        hasMore: repositories.length === responsesPerPage
    };
  }
);
