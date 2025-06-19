import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';
import { GlobalStatSummary, StatCategory } from '../types/StatCategory';
import { Rank } from '../data/flexibilityRankThresholds'; // Keep this if Rank is not centralized

const statCategories: StatCategory[] = [
  'strength',
  'endurance',
  'speed',
  'skill',
  'flexibility',
];

export async function loadGlobalRanks(user: User): Promise<GlobalStatSummary[]> {
  const promises = statCategories.map(async (category): Promise<GlobalStatSummary> => {
    const ref = doc(db, 'users', user.uid, 'stats', category);
    const snapshot = await getDoc(ref);
    const data = snapshot.data();

    const globalRank = (data?.globalRank ?? 'E') as Rank;

    return {
      category,
      globalRank,
    };
  });

  return Promise.all(promises);
}
