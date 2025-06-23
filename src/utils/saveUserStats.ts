import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from 'firebase/auth';

export async function saveUserStats<T extends Record<string, unknown>>(
  user: User,
  category: string,
  data: T & { averageScore: number; globalRank: string }
) {
  if (!user) throw new Error('User not authenticated');

  // 1. Save current stat object
  const ref = doc(db, 'users', user.uid);
  await setDoc(ref, { [category]: data }, { merge: true });

  // 2. Prepare history path
  const historyRef = collection(db, 'users', user.uid, 'stats', category, 'history');

  // 3. Get the latest snapshot (if any)
  const q = query(historyRef, orderBy('timestamp', 'desc'), limit(1));
  const snapshot = await getDocs(q);
  const latest = snapshot.docs[0]?.data() as (T & { timestamp: number }) | undefined;

  const now = Date.now();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  const isTooSoon = latest && now - latest.timestamp < oneWeek;
  const isSame = latest && JSON.stringify(latest) === JSON.stringify({ ...data, timestamp: latest.timestamp });

  if (!isTooSoon && !isSame) {
    await addDoc(historyRef, {
      ...data,
      timestamp: now,
    });
  }
}
