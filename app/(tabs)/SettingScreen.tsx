//설정 탭

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingScreen() {
  const [ledEnabled, setLedEnabled] = useState(true);
  const [buzzerEnabled, setBuzzerEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>설정</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>약통 알림 설정</Text>
        <View style={styles.row}>
          <Text>스마트폰 알람</Text>
          <Switch value={buzzerEnabled} onValueChange={setBuzzerEnabled} />
        </View>
        <View style={styles.row}>
          <Text>LED 불빛 알림</Text>
          <Switch value={ledEnabled} onValueChange={setLedEnabled} />
        </View>
        <View style={styles.row}>
          <Text>부저 소리 알림</Text>
          <Switch value={buzzerEnabled} onValueChange={setBuzzerEnabled} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>계정 연결</Text>
        <Text style={styles.linkText}>보호자 앱 연동하기</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#5C6BC0', marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
  linkText: { color: '#5C6BC0', textDecorationLine: 'underline' }
});