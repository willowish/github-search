import { extendTheme } from '@chakra-ui/react';
import { accordionTheme } from 'src/app/config/accordionTheme';

export const theme = extendTheme({
  components: {
    Accordion: { ...accordionTheme },
  }
});
