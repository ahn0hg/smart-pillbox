import { MaterialCommunityIcons } from '@expo/vector-icons'; // 이 줄을 추가하세요!
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChatModal, useManagedUsers, useVoiceAlert } from '../../src/chatfunction';
import { chatStyles as styles } from '../../styles/chatStyles';

export default function ChatScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const managedUsers = useManagedUsers();
  const { sendVoiceAlert } = useVoiceAlert();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.headerTitle}>채팅</Text></View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 1. AI 건강 상담사 */}
        <TouchableOpacity style={[styles.menuButton, styles.mainButton]} activeOpacity={0.8}>
          <View style={styles.iconWrapper}>
            <View style={styles.mainIconCircle}>
              <MaterialCommunityIcons name="robot-happy-outline" size={32} color="#2196F3" />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>AI 건강 상담사</Text>
            <Text style={styles.subText}>건강 상담 및 약 정보 제공</Text>
          </View>
        </TouchableOpacity>

        {/* 2. 상담 기록 보기 */}
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: '#FDF7FF', borderColor: '#F3E5F5' }]}
        >
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="history" size={26} color="#9C27B0" />
          </View>
          <Text style={[styles.buttonText, { color: '#9C27B0' }]}>상담 기록 보기</Text>
        </TouchableOpacity>

        {/* 3. 문의하기 */}
        <TouchableOpacity 
          style={[styles.menuButton, { backgroundColor: '#F1FBF2', borderColor: '#E8F5E9' }]}
        >
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="help-circle-outline" size={26} color="#2E7D32" />
          </View>
          <Text style={[styles.buttonText, { color: '#2E7D32' }]}>문의하기</Text>
        </TouchableOpacity>


        <TouchableOpacity 
            style={[styles.menuButton, { backgroundColor: '#EEF6FF' }]}
            onPress={() => {
              console.log("버튼 클릭됨!"); // ← 터미널에 이 로그가 찍히는지 확인하세요
              setModalVisible(true);
            }}
          >
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="volume-high" size={26} color="#0D47A1" />
            </View>
            <Text style={[styles.buttonText, { color: '#0D47A1' }]}>음성 메시지 보내기</Text>
          </TouchableOpacity>
      </ScrollView>

      <ChatModal 
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        users={managedUsers}
        onSend={sendVoiceAlert}
      />
    </SafeAreaView>
  );
}