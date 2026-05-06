import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import GeneralMain from '../components/GeneralMain';
import SeniorMain from '../components/SeniorMain';

export default function MainEntry() {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // DB에서 설정값 관리
    const modeRef = ref(db, `users/${user.uid}/settings/isSimpleMode`);
    const unsubscribe = onValue(modeRef, (snapshot) => {
      setIsSimpleMode(snapshot.val() || false); 
    });

    return () => unsubscribe();
  }, []);

  if (isSimpleMode === null) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  // 모드에 따라 컴포넌트만 교체
  return isSimpleMode ? <SeniorMain /> : <GeneralMain />;
}



