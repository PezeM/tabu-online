import React, { lazy, Suspense } from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import { MainSkeleton } from '@/components/Skeletons/MainSkeleton';

const HomePageCarousel = lazy(() =>
  import('@/components/HomePageCarousel').then(module => ({ default: module.HomePageCarousel })),
);

const LoginComponent = lazy(() =>
  import('@/components/LoginComponents').then(module => ({ default: module.LoginComponent })),
);

interface Props {
  onSubmit: (username: string) => void;
  isLoading: boolean;
  displayPasswordInput: boolean;
  isPasswordRequired: boolean;
}

export const HomePageContent = ({
  onSubmit,
  isLoading,
  displayPasswordInput,
  isPasswordRequired,
}: Props) => {
  const [isLowerThan1000] = useMediaQuery('(max-width: 1000px)');
  const gridTemplateColumns = isLowerThan1000 ? '1fr' : '3fr 2fr';

  return (
    <Grid gridTemplateColumns={gridTemplateColumns} alignItems={'center'}>
      <LoginComponent
        onSubmit={onSubmit}
        isLoading={isLoading}
        displayPasswordInput={displayPasswordInput}
        isPasswordRequired={isPasswordRequired}
      />
      {!isLowerThan1000 && (
        <Suspense fallback={<MainSkeleton />}>
          <HomePageCarousel />
        </Suspense>
      )}
    </Grid>
  );
};
