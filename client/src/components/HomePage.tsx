import React, { lazy } from 'react';
import { Grid } from '@chakra-ui/react';
import { HomePageHeader } from '@/components/HomePageHeader';

const HomePageContent = lazy(() =>
  import('@/components/HomePageContent').then(module => ({ default: module.HomePageContent })),
);

const HomePageFooter = lazy(() =>
  import('@/components/HomePageFooter').then(module => ({ default: module.HomePageFooter })),
);

interface Props {
  onSubmit: (username: string) => void;
  isLoading: boolean;
  displayPasswordInput?: boolean;
  isPasswordRequired?: boolean;
}

export const HomePage = React.memo(
  ({ onSubmit, isLoading, displayPasswordInput = true, isPasswordRequired = true }: Props) => {
    return (
      <Grid
        gridTemplateRows={'1fr auto 1fr'}
        gridRowGap={['1em', '2em', '3em']}
        p={4}
        height={'100%'}
      >
        <HomePageHeader />
        <HomePageContent
          onSubmit={onSubmit}
          isLoading={isLoading}
          displayPasswordInput={displayPasswordInput}
          isPasswordRequired={isPasswordRequired}
        />
        <HomePageFooter />
      </Grid>
    );
  },
);