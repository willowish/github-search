import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/app/model/users.model';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { RootState } from 'src/app/store/store';
import { fetchUsersByLogin } from 'src/app/store/users/users.thunk';

const usersAdapter = createEntityAdapter<User>();
type Pagination = {
  page: number;
  hasMore: boolean;
};
type CustomState = {
  pagination: Record<string, Pagination>
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
      .addCase(fetchRepositoriesByLogin.fulfilled, (state, action: PayloadAction<{page: number; login: string, hasMore: boolean}>) => {
        state.pagination[action.payload.login] = {
          page: action.payload.page,
          hasMore: action.payload.hasMore
        };
      });
  }
});

export const { reducer: usersReducer } = usersSlice;
export const { selectAll: selectAllUsers } = usersAdapter.getSelectors();

export const selectPaginationForUser = (login: string) => (state: RootState): Pagination => {
  return state.users.pagination[login];
}
