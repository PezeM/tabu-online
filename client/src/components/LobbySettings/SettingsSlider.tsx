import React, { useState } from 'react';
import { Box, Grid, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react';

interface Props {
  defaultValue: number;
  min?: number;
  max?: number;
  step?: number;
  onChangeValue: (value: number) => void;
  valueTextTransformer?: (value: number) => string;
}

export const SettingsSlider = ({
  defaultValue,
  onChangeValue,
  min,
  max,
  step = 1,
  valueTextTransformer,
}: Props) => {
  const [value, setValue] = useState(defaultValue);

  const getDisplayText = () => {
    if (valueTextTransformer) {
      return valueTextTransformer(value);
    }

    return value;
  };

  return (
    <Grid templateColumns={['10fr 7fr', '10fr 4fr', '10fr 7fr', '10fr 5fr', '10fr 4fr']}>
      <Slider
        aria-label="slider-ex-1"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        step={step}
        onChangeEnd={v => onChangeValue(v)}
        onChange={v => setValue(v)}
      >
        <SliderTrack>
          <SliderFilledTrack bg={'blue.300'} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Box pl={[4, 6, 8]}>{getDisplayText()}</Box>
    </Grid>
  );
};