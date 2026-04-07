import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { registerStyles as styles } from '../../styles/registerStyles';

export default function RegisterScreen() {
  
  // 버튼 클릭 시 작동할 가짜 함수 (나중에 기능 구현)
  const handlePress = (type: string) => {
    Alert.alert("알림", `${type} 기능은 준비 중입니다!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.headerTitle}>스마트 약통</Text>

        {/* 메인 조작 카드 */}
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>약 등록 / 검색</Text>
          
        <View style={styles.buttonRow}>
          {/* 검색하기 버튼 */}
          <TouchableOpacity style={[styles.actionButton, styles.searchBtn]}>
            <MaterialCommunityIcons name="magnify" size={32} color="#1565C0" />
            <Text style={styles.searchText}>검색하기</Text>
          </TouchableOpacity>

          {/* 등록하기 버튼 */}
          <TouchableOpacity style={[styles.actionButton, styles.registerBtn]}>
            <MaterialCommunityIcons name="camera-outline" size={32} color="#2E7D32" />
            <Text style={styles.registerText}>등록하기</Text>
          </TouchableOpacity>
        </View>

        </View>

        {/* 나중에 데이터가 보일 영역 (현재는 빈 공간) */}
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="pill" size={60} color="#E0E0E0" />
          <Text style={styles.emptyText}>등록된 약 정보가 여기에 표시됩니다.</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}