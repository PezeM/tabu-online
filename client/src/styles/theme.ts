import { extendTheme, ThemeComponentProps, ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const fontWeights = {
  normal: 400,
  medium: 600,
  bold: 700,
};

const fonts = {
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
};

const textVariants = {
  emphasis: (props: ThemeComponentProps) => ({
    color: mode('teal.500', 'cyan.200')(props),
  }),
  description: (props: ThemeComponentProps) => ({
    color: mode('gray.800', 'gray.400')(props),
  }),
  accent: (props: ThemeComponentProps) => ({
    color: mode('black.400', 'cyan.200')(props),
  }),
  accentAlternative: (props: ThemeComponentProps) => ({
    color: mode('#595959', '#A6A6A6')(props),
  }),
};

export const theme = extendTheme({
  config,
  colors,
  fontWeights,
  fonts,
  textVariants,
  components: {
    Link: {
      baseStyle: props => ({
        color: mode('teal.500', 'cyan.200')(props),
      }),
      variants: {
        ...textVariants,
        description: (props: ThemeComponentProps) => ({
          color: mode('gray.800', 'gray.400')(props),
          _hover: {
            color: mode('teal.500', 'cyan.200')(props),
            textDecoration: 'none',
          },
        }),
      },
    },
    Text: {
      variants: textVariants,
    },
    Heading: {
      variants: textVariants,
    },
    Divider: {
      variants: {
        solid: props => ({
          borderColor: mode('gray.800', 'gray.400')(props),
          marginLeft: 'auto',
          marginRight: 'auto',
        }),
      },
    },
  },
});
