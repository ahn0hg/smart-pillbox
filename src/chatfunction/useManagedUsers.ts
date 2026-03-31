// src/chatfunction/useManagedUsers.ts
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';

export const useManagedUsers = () => {
  const [managedUsers, setManagedUsers] = useState<any[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const usersRef = ref(db, `users/${user.uid}/managedUsers`);
    
    return onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.entries(data).map(([id, value]: any) => ({ id, ...value }));
        setManagedUsers(list);
      }
    });
  }, []);

  return managedUsers;
};