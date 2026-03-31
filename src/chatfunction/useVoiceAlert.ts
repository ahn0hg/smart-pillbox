// src/chatfunction/useVoiceAlert.ts
import { push, ref, serverTimestamp, set } from 'firebase/database';
import { Alert } from 'react-native';
import { auth, db } from '../../firebaseConfig';

export const useVoiceAlert = () => {
  const sendVoiceAlert = async (targetUser: any, message: string) => {
    if (!targetUser) return;

    try {
      // 1. 실시간 알림용 (어르신 앱 감지용 - 기존과 동일)
      const latestRef = ref(db, `users/${targetUser.id}/incomingAlert`);
      await set(latestRef, {
        message: message,
        senderName: auth.currentUser?.displayName || "보호자",
        timestamp: serverTimestamp(),
        status: 'new'
      });

      // 2. 기록 저장용 (로그 확인용 - 새로운 경로)
      const historyRef = ref(db, `users/${targetUser.id}/alertHistory`);
      const newLogRef = push(historyRef);
      await set(newLogRef, {
        message: message,
        senderName: auth.currentUser?.displayName || "보호자",
        timestamp: serverTimestamp(),
      });

      Alert.alert("전송 완료", "메시지가 기록되었습니다.");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return { sendVoiceAlert };
};