// src/chatfunction/useAlertHistory.ts
import { get, limitToLast, query, ref } from 'firebase/database';
import { useState } from 'react';
import { db } from '../../firebaseConfig';

export const useAlertHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async (targetUserId: string) => {
    setLoading(true);
    try {
      const historyRef = ref(db, `users/${targetUserId}/alertHistory`);
      // 최근 20개까지만 가져오기
      const recentQuery = query(historyRef, limitToLast(20));
      const snapshot = await get(recentQuery);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const list = Object.entries(data).map(([id, value]: any) => ({
          id,
          ...value,
          // 타임스탬프가 객체일 경우를 대비해 숫자로 변환
          timestamp: typeof value.timestamp === 'number' ? value.timestamp : Date.now()
        })).reverse();
        setHistory(list);
      }
    } catch (error) {
      console.error("로그 불러오기 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return { history, fetchHistory, loading };
};