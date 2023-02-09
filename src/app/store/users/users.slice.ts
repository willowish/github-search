import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadingStatus } from 'src/app/model/loadingStatus.model';
import { Pagination } from 'src/app/model/pagination.model';
import { User } from 'src/app/model/users.model';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { RootState } from 'src/app/store/store';
import { fetchUsersByLogin } from 'src/app/store/users/users.thunk';

const usersAdapter = createEntityAdapter<User>();

type UserSliceState = {
  pagination: Record<string, Pagination>;
  loadingStatus: LoadingStatus;
  searchTerm: string;
};
const initialState = usersAdapter.getInitialState<UserSliceState>({
  pagination: {},
  loadingStatus: LoadingStatus.IDLE,
  searchTerm: '',
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersByLogin.pending, (state, action) => {
        state.loadingStatus = LoadingStatus.LOADING;
        state.searchTerm = action.meta.arg;
      });
    builder.addCase(fetchUsersByLogin.rejected, (state) => {
      state.loadingStatus = LoadingStatus.FAILED;
    });
    builder
      .addCase(fetchUsersByLogin.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loadingStatus = LoadingStatus.SUCCEEDED;
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
