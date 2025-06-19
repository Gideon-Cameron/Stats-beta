import { flexibilityRankThresholds, FlexibilityTest, Rank } from '../data/flexibilityRankThresholds';

export function calculateFlexibilityRank(test: FlexibilityTest, value: number): Rank {
  const thresholds = flexibilityRankThresholds[test];

  for (const threshold of thresholds) {
    if (value >= threshold.min) {
      return threshold.rank; // ✅ Return early once the correct rank is matched
    }
  }

  return 'E'; // Fallback – should not be reached
}
