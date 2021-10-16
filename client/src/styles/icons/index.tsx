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
