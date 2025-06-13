import { strengthRankThresholds, StrengthTest, Rank } from '../data/strengthRankThresholds';

export function calculateStrengthRank(test: StrengthTest, value: number): Rank {
  const thresholds = strengthRankThresholds[test];

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
 