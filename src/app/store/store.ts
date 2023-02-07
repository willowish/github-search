import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { repositoriesReducer } from 'src/app/store/repositories/repositories.slice';
import { usersReducer } from 'src/app/store/users/users.slice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    repositories: repositoriesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
