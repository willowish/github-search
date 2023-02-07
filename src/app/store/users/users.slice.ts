import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/app/model/users.model';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { fetchUsersByLogin } from 'src/app/store/users/users.thunk';

const usersAdapter = createEntityAdapter<User>();
type Pagination = {
  page: number;
};
type CustomState = {
  pagination: Record<string, number>
};
const initialState = usersAdapter.getInitialState<CustomState>({
  pagination: {}
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByLogin.fulfilled, (state, action: PayloadAction<User[]>) => {
        usersAdapter.setAll(state, action.payload);
      });
    builder
      .addCase(fetchRepositoriesByLogin.fulfilled, (state, action: PayloadAction<{page: number; login: string}>) => {
        state.pagination[action.payload.login] = action.payload.page;
      });
  }
});

export const { reducer: usersReducer } = usersSlice;
export const { selectAll: selectAllUsers } = usersAdapter.getSelectors();
