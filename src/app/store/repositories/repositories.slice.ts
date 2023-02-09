import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Repository } from 'src/app/model/repository.model';
import { fetchRepositoriesByLogin } from 'src/app/store/repositories/repositories.thunk';
import { RootState } from 'src/app/store/store';

const repositoryAdapter = createEntityAdapter<Repository>();
const initialState = repositoryAdapter.getInitialState();

const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositoriesByLogin.fulfilled, (state, action: PayloadAction<{data: Repository[], login: string}>) => {
        repositoryAdapter.addMany(state, action.payload.data.map((repository) => ({...repository, ownerLogin: action.payload.login})));
      });
  }
});

export const {reducer: repositoriesReducer} = repositoriesSlice;
export const {selectAll: selectAllRepositories} = repositoryAdapter.getSelectors();


export const selectRepositoriesByLogin = (login: string) => (state: RootState) => {
  const repositories = selectAllRepositories(state.repositories);
  return repositories.filter((repository) => repository.ownerLogin === login);
}
