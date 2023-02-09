import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { repositoriesReducer } from 'src/app/store/repositories/repositories.slice';
import { usersReducer } from 'src/app/store/users/users.slice';


const rootReducer = combineReducers({
  users: usersReducer,
  repositories: repositoriesReducer
})


export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
