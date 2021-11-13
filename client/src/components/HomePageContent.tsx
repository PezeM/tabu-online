import React from 'react';
import { Grid, useMediaQuery } from '@chakra-ui/react';
import { LoginComponent } from '@/components/LoginComponents';
import { HomePageCarousel } from '@/components/HomePageCarousel';

interface Props {
  onSubmit: (username: string) => void;
  isLoading: boolean;
}

export const HomePageContent = ({ onSubmit, isLoading }: Props) => {
  const [isLowerThan1000] = useMediaQuery('(max-width: 1000px)');
  const gridTemplateColumns = isLowerThan1000 ? '1fr' : '3fr 2fr';

  return (
    <Grid gridTemplateColumns={gridTemplateColumns} alignItems={'center'}>
      <LoginComponent onSubmit={onSubmit} isLoading={isLoading} />
      {!isLowerThan1000 && <HomePageCarousel />}
    </Grid>
  );
};