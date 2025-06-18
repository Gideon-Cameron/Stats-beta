export type Rank =
  | 'E'
  | 'D'
  | 'C'
  | 'B'
  | 'A'
  | 'S'
  | 'SS'
  | 'Mythic';

export type FlexibilityTest =
  | 'frontSplit'
  | 'middleSplit'
  | 'pancake'
  | 'forwardFold'
  | 'shoulderFlex'
  | 'bridge'
  | 'quadStretch';

export const flexibilityRankThresholds: Record<FlexibilityTest, Record<string, Rank>> = {
  frontSplit: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  middleSplit: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  pancake: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  forwardFold: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  shoulderFlex: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  bridge: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
  quadStretch: {
    '0': 'E',
    '25': 'D',
    '40': 'C',
    '60': 'B',
    '75': 'A',
    '90': 'S',
    '95': 'SS',
    '100': 'Mythic',
  },
};
