//채팅 탭
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="chat-processing-outline" size={80} color="#CCC" />
      <Text style={styles.text}>보호자와의 채팅 창입니다.</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { marginTop: 20, fontSize: 16, color: '#666' }
});