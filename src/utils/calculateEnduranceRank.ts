import { enduranceRankThresholds, EnduranceTest, Rank } from '../data/enduranceRankThresholds';

export function calculateEnduranceRank(test: EnduranceTest, value: number): Rank {
  const thresholds = enduranceRankThresholds[test];

  let matchedRank: Rank = 'E';

  for (const threshold of thresholds) {
    if (value >= threshold.min) {
      matchedRank = threshold.rank;
    } else {
      break;
    }
  }

  return matchedRank;
}
