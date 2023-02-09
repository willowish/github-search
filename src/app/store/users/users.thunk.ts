import { createAsyncThunk } from '@reduxjs/toolkit';
import { GithubApiService } from 'src/app/services/githubApiService';

export const fetchUsersByLogin = createAsyncThunk(
  'users/fetchUsersByLogin',
  async (login: string) => {
    return GithubApiService.fetchUsersByLogin(login);
  }
);
