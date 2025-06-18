import { flexibilityRankThresholds, FlexibilityTest } from '../data/flexibilityRankThresholds';
import { Rank } from '../data/flexibilityRankThresholds';

export function calculateFlexibilityRank(test: FlexibilityTest, value: number): Rank {
  const thresholds = flexibilityRankThresholds[test];
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
