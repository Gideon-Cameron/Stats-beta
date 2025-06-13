import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Rank, StrengthTest } from '../data/strengthRankThresholds';

const rankScale: Record<Rank, number> = {
  E: 1,
  D: 2,
  C: 3,
  B: 4,
  A: 5,
  S: 6,
  SS: 7,
  Mythic: 8,
};

type Props = {
  data: Record<StrengthTest, Rank>;
};

const RadarChart: React.FC<Props> = ({ data }) => {
  const indicators = Object.keys(data).map((key) => ({
    name: key.replace(/([A-Z])/g, ' $1'),
    max: 8,
  }));

  const values = Object.values(data).map((rank) => rankScale[rank]);

  const option = {
    tooltip: {
      trigger: 'item',
    },
    radar: {
      indicator: indicators,
      radius: '70%',
      splitNumber: 4,
    },
    series: [
      {
        name: 'Strength Profile',
        type: 'radar',
        areaStyle: {
          opacity: 0.2,
        },
        data: [
          {
            value: values,
            name: 'Your Rank',
          },
        ],
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default RadarChart;
