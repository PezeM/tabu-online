import { createIcon } from '@chakra-ui/react';

export const GithubIcon = createIcon({
  displayName: 'GithubIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
  },
});

export const InputFieldIcon = createIcon({
  displayName: 'InputFieldIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
  },
  d: 'M3 17.4V6.6c0-.33137.26863-.6.6-.6h13.0789c.2006 0 .3879.10026.4992.26718l3.6 5.40002c.1344.2015.1344.4641 0 .6656l-3.6 5.4c-.1113.1669-.2986.2672-.4992.2672H3.6c-.33137 0-.6-.2686-.6-.6z',
});

export const PizzaSliceIcon = createIcon({
  displayName: 'PizzaSliceIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path key={1} d="M14 9.01l.01-.01111M8 8.01l.01-.01111M8 14.01l.01-.0111" />,
    <path key={2} d="M6 19L2.23626 3.0041c-.10539-.44792.31189-.84288.75335-.71304L19 7" />,
    <path
      key={3}
      d="M22.198 8.42467c.2344-.93764-.3357-1.88777-1.2733-2.12218-.9377-.23441-1.8878.33567-2.1222 1.27331-.3919 1.56738-1.901 4.0483-4.2272 6.3745-2.301 2.301-5.14816 4.1939-7.96858 4.8448-.94175.2173-1.52901 1.1569-1.31168 2.0986.21732.9418 1.15694 1.529 2.09869 1.3117 3.67967-.8491 7.08247-3.2063 9.65647-5.7802 2.5487-2.5488 4.5396-5.5679 5.1478-8.00053z"
    />,
  ],
});

export const CircleIcon = createIcon({
  displayName: 'CircleIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  d: 'M12 22c5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10C6.47715 2 2 6.47715 2 12c0 5.5228 4.47715 10 10 10z',
});

export const ScaleIcon = createIcon({
  displayName: 'ScaleIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  d: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
});


