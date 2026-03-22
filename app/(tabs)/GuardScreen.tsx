// 보호자 전용 탭
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function GuardScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>보호자 모니터링</Text>
      <View style={{ backgroundColor: '#FFF', padding: 20, borderRadius: 15 }}>
        <Text style={{ color: '#5C6BC0', fontWeight: 'bold' }}>오늘 어르신 복약 현황</Text>
        <Text style={{ marginTop: 10, fontSize: 30 }}>80% 완료</Text>
      </View>
    </ScrollView>
  );
}