import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { homeStyles as styles } from './homeStyles';

export default function HomeScreen() {
  const [homeTab, setHomeTab] = useState('오늘의 일정');

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* 헤더 부분 */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.iconBox}>
            <MaterialCommunityIcons name="pill" size={28} color="#FFF" />
          </View>
          <View>
            <Text style={styles.headerTitle}>스마트 복약지도</Text>
            <Text style={styles.headerSubtitle}>오늘도 건강을 챙기세요!</Text>
          </View>
        </View>
      </View>

      {/* 요약 카드 */}
      <View style={styles.summaryContainer}>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>오늘 남은 약</Text>
          <Text style={styles.cardValue}>2 <Text style={styles.cardValueSmall}>봉지</Text></Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardLabel}>전체 복용률</Text>
          <Text style={styles.cardValue}>80 <Text style={styles.cardValueSmall}>%</Text></Text>
        </View>
      </View>

      {/* ★ 탭 메뉴 (통계 추가) ★ */}
      <View style={styles.tabContainer}>
        {['오늘의 일정', '내 약 목록', '통계'].map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setHomeTab(t)}
            style={[styles.tabButton, homeTab === t && styles.tabActive]}
          >
            <Text style={[styles.tabText, homeTab === t && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 탭별 콘텐츠 */}
      <View style={styles.contentContainer}>
        {homeTab === '오늘의 일정' && (
          <View style={styles.emptyBox}>
            <MaterialCommunityIcons name="calendar-check" size={50} color="#EEE" />
            <Text style={styles.emptyText}>아직 등록된 일정이 없습니다.</Text>
          </View>
        )}

        {homeTab === '내 약 목록' && (
          <View style={styles.registrationCard}>
            <Text style={styles.regTitle}>새로운 약 등록</Text>
            <TouchableOpacity style={styles.cameraBox}>
              <MaterialCommunityIcons name="camera-plus" size={40} color="#5C6BC0" />
              <Text style={{ marginTop: 10, color: '#5C6BC0' }}>사진 촬영하여 등록하기</Text>
            </TouchableOpacity>
          </View>
        )}

        {homeTab === '통계' && (
          <View style={styles.registrationCard}>
            <Text style={styles.regTitle}>주간 복약 리포트</Text>
            <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>이번 주 복약 성공률은 85%입니다.</Text>
              {/* 여기에 나중에 그래프 라이브러리를 연결할 수 있습니다 */}
              <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'flex-end' }}>
                {[40, 70, 90, 100, 80, 50, 90].map((h, i) => (
                  <View key={i} style={{ width: 15, height: h * 0.5, backgroundColor: '#5C6BC0', marginHorizontal: 5, borderRadius: 3 }} />
                ))}
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}