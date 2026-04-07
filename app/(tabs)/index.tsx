import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebaseConfig';

// 밖으로 옮긴 컴포넌트들을 불러옵니다.
import GeneralMain from '../components/GeneralMain';
import SeniorMain from '../components/SeniorMain';

export default function MainEntry() {
  const [isSimpleMode, setIsSimpleMode] = useState<boolean | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // DB에서 실시간으로 모드 설정값 감시
    const modeRef = ref(db, `users/${user.uid}/settings/isSimpleMode`);
    const unsubscribe = onValue(modeRef, (snapshot) => {
      setIsSimpleMode(snapshot.val() || false); 
    });

    return () => unsubscribe();
  }, []);

  if (isSimpleMode === null) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  // 모드에 따라 컴포넌트만 교체해서 보여줌 (탭 바는 'index' 하나로 유지됨)
  return isSimpleMode ? <SeniorMain /> : <GeneralMain />;
}