import { Box, Flex, Heading } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box p={4} shadow={'sm'}>
      <Flex>
        <Heading>Github Checker</Heading>
      </Flex>
    </Box>
  );
};
