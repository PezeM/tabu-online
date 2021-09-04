import { Select } from '@chakra-ui/react';
import React from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const fontScaleOptions = ['70%', '80%', '90%', '100%', '110%', '120%', '130%', '140%'];

export const ChangeFontScaleSelect = () => {
  const [value, setValue] = useLocalStorage('text-scale', '100%');

  const changeFontScale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  return (
    <Select value={value} onChange={changeFontScale}>
      {fontScaleOptions.map(option => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </Select>
  );
};
