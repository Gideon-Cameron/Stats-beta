import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';

/**
 * Save user stats to Firestore
 * @param user Firebase authenticated user
 * @param category e.g. "strength", "endurance"
 * @param data full stat object (inputs + score + rank)
 */
export async function saveUserStats<T extends Record<string, any>>(
  user: User,
  category: string,
  data: T
) {
  if (!user) throw new Error('User not authenticated');
  const ref = doc(db, 'users', user.uid);
  await setDoc(ref, { [category]: data }, { merge: true });
}
