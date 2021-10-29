import { createIcon } from '@chakra-ui/react';

export const InputFieldIcon = createIcon({
  displayName: 'inputFieldIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
  },
  d: 'M3 17.4V6.6c0-.33137.26863-.6.6-.6h13.0789c.2006 0 .3879.10026.4992.26718l3.6 5.40002c.1344.2015.1344.4641 0 .6656l-3.6 5.4c-.1113.1669-.2986.2672-.4992.2672H3.6c-.33137 0-.6-.2686-.6-.6z',
});

export const PizzaSliceIcon = createIcon({
  displayName: 'pizzaSliceIcon',
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
  displayName: 'circleIcon',
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
  displayName: 'scaleIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  d: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
});

export const UserIcon = createIcon({
  displayName: 'userIcon',
  defaultProps: {
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M19.207 17.156l-3.824-1.91a1.051 1.051 0 01-.582-.945v-1.356a9.153 9.153 0 001.469-2.7c.562-.257.93-.815.93-1.444V7.199c0-.383-.145-.758-.4-1.05V4.022c.024-.222.11-1.53-.835-2.609C15.14.477 13.809 0 12 0c-1.809 0-3.14.477-3.965 1.41-.945 1.082-.86 2.39-.836 2.613v2.125A1.614 1.614 0 006.801 7.2v1.602c0 .484.219.941.597 1.242a8.36 8.36 0 001.403 2.895v1.324c0 .386-.211.742-.551.93l-3.57 1.945a3.606 3.606 0 00-1.88 3.168v1.297C2.8 23.5 8.817 24 12 24c3.184 0 9.2-.5 9.2-2.398v-1.22a3.583 3.583 0 00-1.993-3.226zm0 0"
    />,
  ],
});

export const CrownIcon = createIcon({
  displayName: 'crownIcon',
  defaultProps: {
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M23.055 9.004a.687.687 0 01-.016.2l-1.48 5.921a.673.673 0 01-.653.508l-8.879.047H3.141a.672.672 0 01-.653-.512l-1.48-5.945a.6.6 0 01-.02-.203 1.414 1.414 0 01.426-2.762 1.413 1.413 0 01.895 2.504l1.855 1.867a2.523 2.523 0 001.781.742c.79 0 1.54-.371 2.012-1L11 6.336a1.412 1.412 0 011-2.41c.777 0 1.414.633 1.414 1.414 0 .375-.152.719-.394.973l.003.003 3.024 4.047a2.518 2.518 0 003.789.274l1.867-1.867a1.413 1.413 0 111.352.234zm-1.64 8.781c0-.37-.302-.672-.677-.672H3.336c-.371 0-.676.301-.676.672v1.617c0 .371.305.672.676.672h17.402c.375 0 .676-.3.676-.672zm0 0"
    />,
  ],
});

export const RedoIcon = createIcon({
  displayName: 'redoIcon',
  defaultProps: {
    fill: 'transparent',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path key={1} d="M19 9.5H9c-.16153 0-4 0-4 4C5 18 8.70237 18 9 18h8" />,
    <path key={2} d="M15.5 13 19 9.5c-1.3668-1.36683-2.1332-2.13317-3.5-3.5" />,
  ],
});

export const ClockIcon = createIcon({
  displayName: 'clockIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [<path key={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />],
});

export const TeamIcon = createIcon({
  displayName: 'teamIcon',
  defaultProps: {
    fill: 'currentColor',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M9 9c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3-3-1.3-3-3zm3 5c-4.6 0-6 3.3-6 3.3V19h12v-1.7S16.6 14 12 14z"
    />,
    <circle key={2} cx="18.5" cy="8.5" r="2.5" />,
    <path
      key={3}
      d="M18.5 13c-1.2 0-2.1.3-2.8.8 2.3 1.1 3.2 3 3.2 3.2v.1H23v-1.3c0-.1-1.1-2.8-4.5-2.8z"
    />,
    <circle key={4} cx="18.5" cy="8.5" r="2.5" />,
    <path
      key={5}
      d="M18.5 13c-1.2 0-2.1.3-2.8.8 2.3 1.1 3.2 3 3.2 3.2v.1H23v-1.3c0-.1-1.1-2.8-4.5-2.8z"
    />,
    <g key={6}>
      <circle key={1} cx="5.5" cy="8.5" r="2.5" />
      <path
        key={2}
        d="M5.5 13c1.2 0 2.1.3 2.8.8-2.3 1.1-3.2 3-3.2 3.2v.1H1v-1.3c0-.1 1.1-2.8 4.5-2.8z"
      />
    </g>,
  ],
});

export const CardIcon = createIcon({
  displayName: 'cardIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    />,
  ],
});

export const GlobeIcon = createIcon({
  displayName: 'globeIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12S6.07 1.25 12 1.25 22.75 6.07 22.75 12 17.93 22.75 12 22.75Zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75Z"
    />,
    <path
      key={2}
      d="M8.998 21.75h-1c-.41 0-.75-.34-.75-.75s.32-.74.73-.75a29.49 29.49 0 0 1 0-16.5.745.745 0 0 1-.73-.75c0-.41.34-.75.75-.75h1c.24 0 .47.12.61.31.14.2.18.45.1.68a27.948 27.948 0 0 0 0 17.53c.08.23.04.48-.1.68-.14.18-.37.3-.61.3ZM14.998 21.75a.745.745 0 0 1-.71-.99 27.948 27.948 0 0 0 0-17.53.749.749 0 1 1 1.42-.48 29.318 29.318 0 0 1 0 18.47c-.1.33-.4.53-.71.53Z"
    />,
    <path
      key={3}
      d="M12 17.2c-2.79 0-5.57-.39-8.25-1.18-.01.4-.34.73-.75.73s-.75-.34-.75-.75v-1c0-.24.12-.47.31-.61.2-.14.45-.18.68-.1a27.948 27.948 0 0 0 17.53 0 .75.75 0 0 1 .68.1c.2.14.31.37.31.61v1c0 .41-.34.75-.75.75s-.74-.32-.75-.73c-2.69.79-5.47 1.18-8.26 1.18ZM21 9.75c-.08 0-.16-.01-.24-.04a27.948 27.948 0 0 0-17.53 0c-.4.13-.82-.08-.95-.47-.12-.4.09-.82.48-.95a29.318 29.318 0 0 1 18.47 0c.39.13.61.56.47.95a.73.73 0 0 1-.7.51Z"
    />,
  ],
});

export const TextIcon = createIcon({
  displayName: 'textIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M2.67 7.17V5.35c0-1.15.93-2.07 2.07-2.07h14.52c1.15 0 2.07.93 2.07 2.07v1.82M12 20.72V4.11M8.06 20.72h7.88"
    />,
  ],
});

export const SoundIcon = createIcon({
  displayName: 'soundIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [<path key={1} d="M3 8.25v7.5m4.5-10v12.5m4.5-15v17.5m4.5-15v12.5m4.5-10v7.5" />],
});

export const ColorSwatchIcon = createIcon({
  displayName: 'colorSwatchIcon',
  defaultProps: {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  path: [
    <path
      key={1}
      d="M6 22.752c-.3 0-.62-.03-.94-.09-.17-.04-.32-.08-.47-.12-.17-.05-.33-.11-.48-.17-.04-.01-.07-.03-.1-.04a6.59 6.59 0 0 1-.92-.56c-.02-.01-.03-.03-.05-.04a3.79 3.79 0 0 1-.42-.38c-.14-.15-.24-.27-.35-.39-.23-.3-.42-.6-.59-.95-.02-.03-.03-.07-.04-.11-.06-.14-.11-.28-.15-.43-.06-.21-.1-.35-.13-.5-.07-.35-.1-.66-.1-.96v-13.5c0-1.91 1.34-3.25 3.25-3.25h3c1.91 0 3.25 1.34 3.25 3.25v13.49c0 1.24-.48 2.42-1.35 3.31-.16.16-.28.27-.39.36-.32.28-.73.53-1.17.71-.1.04-.22.09-.35.14-.49.15-1 .23-1.5.23Zm-1.26-1.75c.1.04.2.07.3.1l.33.09c.55.1 1.14.07 1.61-.09.07-.03.17-.06.26-.1.32-.13.58-.29.81-.48.1-.08.17-.15.24-.21.63-.65.96-1.45.96-2.3v-13.5c0-1.08-.67-1.75-1.75-1.75h-3c-1.08 0-1.75.67-1.75 1.75v13.49c0 .21.02.43.07.66.02.09.05.2.08.32.04.11.07.2.11.3.02.03.03.06.04.08.01.02.02.05.03.07.12.22.24.41.37.58.07.08.16.18.25.28.11.12.2.19.3.27.01.01.03.02.04.03.16.12.34.23.55.34.02.01.04.01.06.02.02.01.05.03.09.05Z"
    />,
    <path
      key={2}
      d="M19.5 22.752H6c-.41 0-.75-.34-.75-.75s.34-.75.75-.75c.35 0 .69-.05.98-.15.07-.03.17-.06.26-.1.32-.13.58-.29.81-.48.1-.08.17-.15.24-.21l6.84-6.83a.75.75 0 0 1 .53-.22h3.84c1.91 0 3.25 1.34 3.25 3.25v3c0 1.9-1.34 3.24-3.25 3.24Zm-10.04-1.5H19.5c1.08 0 1.75-.67 1.75-1.75v-3c0-1.08-.67-1.75-1.75-1.75h-3.53l-6.51 6.5Z"
    />,
    <path
      key={3}
      d="M4.81 22.568c-.07 0-.14-.01-.21-.03-.74-.22-1.42-.63-1.96-1.18-.54-.53-.95-1.21-1.17-1.95-.12-.4.1-.81.5-.93s.81.1.94.49a3.27 3.27 0 0 0 2.14 2.14c.39.12.61.54.49.94-.11.31-.41.52-.73.52Zm4.05-1.026a.754.754 0 0 1-.54-1.28c.6-.61.93-1.42.93-2.27v-9.66c0-.2.08-.39.22-.53l2.71-2.71c1.31-1.31 3.29-1.31 4.6 0l2.12 2.12c1.35 1.35 1.35 3.25 0 4.6l-9.51 9.5c-.15.16-.34.23-.53.23Zm1.89-12.89v9.19l7.09-7.08c.76-.76.76-1.71 0-2.48l-2.12-2.12c-.75-.75-1.73-.75-2.48 0l-2.49 2.49ZM6 19.75c-.96 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75Zm0-2c-.14 0-.25.11-.25.25 0 .28.5.28.5 0 0-.14-.11-.25-.25-.25Z"
    />,
  ],
});
