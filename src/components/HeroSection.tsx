import React from 'react';
import { Box, Container, Text} from '@chakra-ui/react';

const HeroSection = () => {
  return (
    <Box bgImg={"url('/hero-bg.jpg')"}
    bgSize="cover"
    bgPos="center"
    bgRepeat="no-repeat"
    w="100%"
    h="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    flexDirection="column"
    px={4}
    py={20}
    color="white">
      <Container maxW="7xl" textAlign="center">
        < Text fontSize={{ base: "xl", md: "4xl" }}  style={{fontWeight: 'bold', lineHeight: '1.2', textTransform: 'uppercase'}} as="h1" mb={4}>
          Stay Ahead Of The Curve: Stay Informed With Our Blog For The Latest Industry Insight
        </Text>
        <Text fontSize={{ base: "md", md: "lg" }} color={"gray.400"} mb={8}>
          Insights that inspire success: uncover a wealth of knowledge by staying updated.
        </Text>
      </Container>
    </Box>
  );
};

export default HeroSection;