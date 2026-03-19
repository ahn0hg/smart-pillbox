import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react'; // ★ useState가 추가되었습니다!
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'; // ★ TouchableOpacity 추가!
import { styles } from './homeStyles';

export default function App() {
  // ★ 1. 현재 선택된 탭을 기억하는 '상태(State)' 만들기 (기본값: '오늘의 일정')
  const [activeTab, setActiveTab] = useState('오늘의 일정');

  // ★ 2. 선택된 탭에 따라 아래에 보여줄 화면을 다르게 그려주는 함수
  const renderContent = () => {
    if (activeTab === '오늘의 일정') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.dateText}>2026년 3월 16일 월요일</Text>
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="clock-outline" size={48} color="#A0A0A0" />
            <Text style={styles.emptyText}>오늘 복용할 약이 없습니다</Text>
          </View>
        </View>
      );
    } else if (activeTab === '내 약 목록') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.dateText}>등록된 약 목록</Text>
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="pill" size={48} color="#A0A0A0" />
            <Text style={styles.emptyText}>아직 등록된 약이 없습니다</Text>
          </View>
        </View>
      );
    } else if (activeTab === '통계') {
      return (
        <View style={styles.contentContainer}>
          <Text style={styles.dateText}>주간 복약 통계</Text>
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="chart-bar" size={48} color="#A0A0A0" />
            <Text style={styles.emptyText}>통계 데이터가 아직 없습니다</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 헤더 영역 (변경 없음) */}
        <View style={styles.header}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="pill" size={24} color="#FFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>스마트 복약지도</Text>
            <Text style={styles.headerSubtitle}>건강한 복약 습관을 만들어보세요</Text>
          </View>
        </View>

        {/* 요약 카드 영역 (변경 없음) */}
        <View style={styles.summaryContainer}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>✔️ 복용 완료</Text>
            <Text style={styles.cardValue}>0<Text style={styles.cardValueSmall}>/0</Text></Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>🕒 예정</Text>
            <Text style={styles.cardValue}>0</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>📈 복약 순응도</Text>
            <Text style={styles.cardValue}>0%</Text>
          </View>
        </View>

        {/* ★ 3. 탭 메뉴 영역 (View -> TouchableOpacity로 변경) */}
        <View style={styles.tabContainer}>
          {/* 오늘의 일정 버튼 */}
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === '오늘의 일정' && styles.tabActive]} 
            onPress={() => setActiveTab('오늘의 일정')}
          >
            <Text style={activeTab === '오늘의 일정' ? styles.tabTextActive : styles.tabText}>
              📅 오늘의 일정
            </Text>
          </TouchableOpacity>

          {/* 내 약 목록 버튼 */}
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === '내 약 목록' && styles.tabActive]} 
            onPress={() => setActiveTab('내 약 목록')}
          >
            <Text style={activeTab === '내 약 목록' ? styles.tabTextActive : styles.tabText}>
              💊 내 약 목록
            </Text>
          </TouchableOpacity>

          {/* 통계 버튼 */}
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === '통계' && styles.tabActive]} 
            onPress={() => setActiveTab('통계')}
          >
            <Text style={activeTab === '통계' ? styles.tabTextActive : styles.tabText}>
              📊 통계
            </Text>
          </TouchableOpacity>
        </View>

        {/* ★ 4. 메인 콘텐츠 출력 (위에서 만든 함수 실행) */}
        {renderContent()}

      </ScrollView>
    </SafeAreaView>
  );
}