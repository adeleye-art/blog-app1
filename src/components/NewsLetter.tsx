"use client";

import { Box, Button, Heading, HStack, Input,  Text } from "@chakra-ui/react";

const NewsletterSection = () => {
  return (
    <Box
      bg="#5712441A" 
      py={10}
      px={6}
      rounded="lg"
      maxW="7xl"
      mx={"auto"}
      textAlign="left"
      mb={10}
    >
      {/* Section Heading */}
      <Heading fontWeight={"bold"} as="h2" size="xl" mb={2}>
        Sign Up for Our Newsletter
      </Heading>
      <Text fontSize="md" color="gray.600" mb={6}>
        Subscribe to receive our latest company updates
      </Text>

      {/* Subscription Form */}
      <HStack
        direction={{ base: "column", sm: "row" }}
        gapX={10}
        align="start"
        justify="start"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          size="md"
          focusRingColor="#571244"
          borderColor="#571244"
          rounded="md"
          maxW="5xl"
          px={4}
          outline={"1px solid #571244"}
          
        />
        <Button
          size="md"
          colorScheme="#571244"
          bg="#571244"
          color="white"
          p={3}
          _hover={{ bg: "purple.800" }}
          rounded="sm"
        >
          Subscribe
        </Button>
      </HStack>
    </Box>
  );
};

export default NewsletterSection;
