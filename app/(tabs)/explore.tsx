// app/(tabs)/explore.tsx
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { exploreStyles as styles } from '../../styles/exploreStyles';

// 탭 버튼 전용 컴포넌트
function TabBtn({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <TouchableOpacity 
      style={{
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: isActive ? '#E8F0FE' : 'transparent',
      }}
    >
      <Text style={{ fontSize: 13, fontWeight: '600', color: isActive ? '#1976D2' : '#666' }}>{label}</Text>
    </TouchableOpacity>
  );
}

// 상단 요약 카드 전용 컴포넌트
function SummaryCard({ icon, value, unit, color }: { icon: string; value: string; unit: string; color: string }) {
  return (
    <View style={styles.summaryCard}>
      <MaterialCommunityIcons name={icon as any} size={28} color={color} />
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardUnit}>{unit}</Text>
    </View>
  );
}

export default function ExploreScreen() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* 1. 상단 요약 카드 섹션 */}
        <View style={styles.summaryRow}>
          <SummaryCard icon="calendar-check" value="7" unit="연속 복용" color="#2196F3" />
          <SummaryCard icon="trending-up" value="94%" unit="이번 달" color="#4CAF50" />
          <SummaryCard icon="trophy-outline" value="30" unit="완벽한 날" color="#FFC107" />
        </View>

        {/* 2. 복약 기록 차트 섹션 */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>복약 기록</Text>
            {/* 일간/주간/월간 탭 (이미지처럼 구현) */}
            <View style={{ flexDirection: 'row', backgroundColor: '#F1F3F4', borderRadius: 20, padding: 2 }}>
              <TabBtn label="일간" isActive={activeTab === 'daily'} />
              <TabBtn label="주간" isActive={activeTab === 'weekly'} />
              <TabBtn label="월간" isActive={activeTab === 'monthly'} />
            </View>
          </View>
          
          <Text style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>2026년 3월 25일 (오늘)</Text>
          
          {/* 차트 임시 영역 (나중에 라이브러리 추가 시 교체) */}
          <View style={styles.chartPlaceholder}>
            <MaterialCommunityIcons name="chart-bar" size={60} color="#DADCE0" />
            <Text style={styles.chartLabel}>여기에 실제 복약 차트가 들어갑니다</Text>
            <Text style={styles.chartLabel}>(예: 08:00, 12:00, 18:00 복약 여부)</Text>
          </View>
        </View>

        {/* 3. 이번 달 성과 섹션 */}
        <View style={styles.sectionCard}>
          <Text style={[styles.sectionTitle, { marginBottom: 15 }]}>이번 달 성과</Text>
          
          {/* 완벽한 복약 (노란색 상자) */}
          <View style={styles.achievementBox}>
            <FontAwesome5 name="award" size={24} color="#FFD700" />
            <View>
              <Text style={styles.achievementText}>완벽한 복약</Text>
              <Text style={{ fontSize: 12, color: '#7F6D00', marginLeft: 10, marginTop: 2 }}>7일 연속 달성 중!</Text>
            </View>
          </View>

          {/* 하단 미니 통계 카드 2개 */}
          <View style={styles.miniStatsRow}>
            <View style={styles.miniStatCard}>
              <Text style={[styles.miniStatValue, { color: '#1976D2' }]}>28</Text>
              <Text style={styles.miniStatLabel}>완료한 날</Text>
            </View>
            <View style={styles.miniStatCard}>
              <Text style={[styles.miniStatValue, { color: '#4CAF50' }]}>112</Text>
              <Text style={styles.miniStatLabel}>총 복용 횟수</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}