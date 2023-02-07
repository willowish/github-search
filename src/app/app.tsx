import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { MainPage } from 'src/app/components/mainPage/mainPage';
import { Navbar } from 'src/app/components/navbar/navbar';
import { store } from 'src/app/store/store';

export function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <Navbar />
        <MainPage />
      </Provider>
    </ChakraProvider>
  );
}

export default App;

