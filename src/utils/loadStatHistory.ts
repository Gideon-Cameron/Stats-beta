import {
    collection,
    getDocs,
    query,
    orderBy,
  } from 'firebase/firestore';
  import { db } from '../lib/firebase';
  import { User } from 'firebase/auth';
  
  export type StatSnapshot<T> = T & {
    timestamp: number;
  };
  
  export async function loadStatHistory<T>(
    user: User,
    category: string
  ): Promise<StatSnapshot<T>[]> {
    if (!user) throw new Error('User not authenticated');
  
    const ref = collection(db, 'users', user.uid, 'stats', category, 'history');
    const q = query(ref, orderBy('timestamp', 'asc')); // oldest → newest
    const snapshot = await getDocs(q);
  
    const results: StatSnapshot<T>[] = [];
  
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.timestamp) {
        results.push(data as StatSnapshot<T>);
      }
    });
  
    return results;
  }
  