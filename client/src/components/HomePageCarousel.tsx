import React from 'react';
import Slider from 'react-slick';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import videoConference from '../assets/webp/video-conference.webp';
import tool from '../assets/webp/tool.webp';
import consultation from '../assets/webp/consultation.webp';
import win from '../assets/webp/win.webp';

interface Props {
  img: string;
  description?: string;
  header?: string;
}

const SliderContent = ({ img, description, header }: Props) => {
  return (
    <Flex alignItems={'center'} flexDirection={'column'} pb={[2, 4, 6]}>
      <Image src={img} />
      <Heading size={'md'} fontWeight={'700'}>
        {header?.toUpperCase()}
      </Heading>
      <Text pt={2} variant={'description'} textAlign={'center'}>
        {description}
      </Text>
    </Flex>
  );
};

export const HomePageCarousel = () => {
  const { t } = useTranslation();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    autoplaySpeed: 3000,
    autoplay: false,
  };

  return (
    <Box
      maxWidth={['10vw', '20vw', '30vw', '35vw']}
      mr={[2, 4, 8]}
      borderRadius={8}
      border={'3px solid rgba(0,0,0,.1)'}
      height={'full'}
    >
      <Heading color={'teal.200'} textAlign={'center'} size={'lg'} pt={[1, 2, 3]}>
        {t('ui.howToPlay')}
      </Heading>
      <Slider {...settings}>
        <SliderContent
          img={videoConference}
          header={t('instruction.howToPlay.header')}
          description={t('instruction.howToPlay.description')}
        />
        <SliderContent
          img={tool}
          header={t('instruction.settings.header')}
          description={t('instruction.settings.description')}
        />
        <SliderContent
          img={consultation}
          header={t('instruction.consultation.header')}
          description={t('instruction.consultation.description')}
        />
        <SliderContent
          img={win}
          header={t('instruction.win.header')}
          description={t('instruction.win.description')}
        />
      </Slider>
    </Box>
  );
};
