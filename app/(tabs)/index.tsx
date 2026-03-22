// 탭기능
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

// ★ 스타일 파일 불러오기
import { globalStyles as styles } from './styles';

import ChatScreen from './ChatScreen';
import GuardScreen from './GuardScreen';
import HomeScreen from './HomeScreen';
import SettingScreen from './SettingScreen';

export default function App() {
  const [mainTab, setMainTab] = useState('홈');
  const [isGuardian, setIsGuardian] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1 }}>
        {mainTab === '홈' && <HomeScreen />}
        {mainTab === '채팅' && <ChatScreen />}
        {mainTab === '보호자' && <GuardScreen />}
        {mainTab === '설정' && <SettingScreen />}
      </View>

      <View style={styles.bottomBar}>
        <TabButton name="홈" icon="home" current={mainTab} setTab={setMainTab} />
        <TabButton name="채팅" icon="chat" current={mainTab} setTab={setMainTab} />
        {isGuardian && <TabButton name="보호자" icon="shield-check" current={mainTab} setTab={setMainTab} />}
        <TabButton name="설정" icon="cog" current={mainTab} setTab={setMainTab} />
      </View>
    </SafeAreaView>
  );
}

// 공통 탭 버튼 컴포넌트
interface TabButtonProps {
  name: string;
  icon: any;
  current: string;
  setTab: (name: string) => void;
}

function TabButton({ name, icon, current, setTab }: TabButtonProps) {
  const active = current === name;
  return (
    <TouchableOpacity style={styles.bottomBtn} onPress={() => setTab(name)}>
      <MaterialCommunityIcons 
        name={active ? icon : `${icon}-outline`} 
        size={26} 
        color={active ? "#5C6BC0" : "#A0A0A0"} 
      />
      <Text style={[styles.bottomText, active && { color: "#5C6BC0", fontWeight: 'bold' }]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}