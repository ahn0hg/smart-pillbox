// src/chatfunction/useAlertListener.ts
import * as Speech from 'expo-speech';
import { onValue, ref, update } from 'firebase/database';
import { useEffect } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';

export const useAlertListener = () => {
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const alertRef = ref(db, `users/${user.uid}/incomingAlert`);

    const unsubscribe = onValue(alertRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data && data.status === 'new') {
        // 1. TTS 음성 출력
        Speech.speak(data.message, { language: 'ko', rate: 0.9 });

        // 2. 알림창 팝업
        Alert.alert(
          data.senderName || "알림", 
          data.message,
          [{ 
            text: "확인", 
            onPress: () => {
              // 확인을 누르면 상태를 'read'로 변경하여 중복 방지
              update(alertRef, { status: 'read' });
            } 
          }]
        );
      }
    });

    return () => unsubscribe();
  }, []);
};