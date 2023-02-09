import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRepositoriesByLogin = createAsyncThunk(
  'repositories/fetchRepositoriesByLogin',
  async ({ login, page = 1 }: {login: string; page?: number}) => {
    const responsesPerPage = 10;
    const response = await fetch(`https://api.github.com/users/${login}/repos?page=${page}&per_page=${responsesPerPage}`, {
        headers: {
            'Authorization': `Token ${import.meta.env.VITE_GITHUB_TOKEN}`
        }
    });
    const data = await response.json();

    return {
        data,
        page,
        login,
        hasMore: data.length === responsesPerPage
    };
  }
);
