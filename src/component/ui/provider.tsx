import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { defaultSystem } from "@chakra-ui/react"

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
