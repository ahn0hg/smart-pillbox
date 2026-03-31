// 실행 npx expo start w
// npx expo start --tunnel

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { onValue, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebaseConfig';

export default function TabLayout() {
  const [isLocked, setIsLocked] = useState(false);

  // DB에서 잠금 상태 실시간 감시
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const lockRef = ref(db, `users/${user.uid}/settings/isLocked`);
    return onValue(lockRef, (snap) => setIsLocked(snap.val() || false));
  }, []);

  // 잠금 시 클릭 가로채는 공통 함수
  const lockListener = (props: any) => (
    <TouchableOpacity 
      {...props} 
      onPress={(e) => {
        if (isLocked) {
          Alert.alert("화면 잠금", "자물쇠를 눌러 잠금을 해제해야 이동할 수 있습니다.");
        } else {
          props.onPress?.(e);
        }
      }} 
    />
  );

  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#000', 
      headerShown: false,
      tabBarStyle: { height: 90, paddingBottom: 10 }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: '약 등록',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="plus-circle-outline" size={28} color={color} />,
          tabBarButton: lockListener, // 잠금 적용
        }}
      />

      <Tabs.Screen
        name="explore" 
        options={{
          title: '통계',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chart-bar" size={28} color={color} />,
          tabBarButton: lockListener, // 잠금 적용
        }}
      />

      <Tabs.Screen
        name="chat" 
        options={{
          title: '채팅',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat-processing-outline" size={28} color={color} />
          ),
          tabBarButton: lockListener,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: '설정',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="cog" size={28} color={color} />,
          tabBarButton: lockListener, // 잠금 적용
        }}
      />
    </Tabs>
  );
} 