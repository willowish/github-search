import { ChakraProvider } from '@chakra-ui/react';
import { Navbar } from 'src/app/components/navbar/navbar';

export function App() {
  return (
    <ChakraProvider>
      <Navbar/>
    </ChakraProvider>
  );
}

export default App;

