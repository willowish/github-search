import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsersByLogin = createAsyncThunk(
  'users/fetchUsersByLogin',
  async (login: string) => {
    const response = await fetch(`https://api.github.com/search/users?q=${login}&per_page=5`);
    const data = await response.json();
    console.log({data});

    return data.items;
  }
);
