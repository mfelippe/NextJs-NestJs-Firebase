import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as serviceAccount from '../../serviceAccountKey.json';

initializeApp({
  //@ts-ignore
  credential: cert(serviceAccount),
});

export const db = getFirestore();
