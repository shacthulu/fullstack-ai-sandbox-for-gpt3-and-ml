import { createTheme, MantineProvider, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

const font = "'Lexend', sans-serif";

const theme = createTheme({
  colorScheme: 'light',
  fontFamily: font,
  colors: {
    primary: '#2c3e50',
    secondary: '#fa7930ff',
    gray: '#f8f8f8',
    darkblue: '#364570ff',
    lightgreen: '#9cbec6ff',
  },
});

// Creating a custom H3 component
const H3 = ({ children }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Text size={isSmallScreen ? 'xl' : 'xxl'}>{children}</Text>
  );
};

// Creating a custom H4 component
const H4 = ({ children }) => {
  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  return (
    <Text size={isSmallScreen ? 'lg' : 'xl'}>{children}</Text>
  );
};

export { theme, H3, H4 };
