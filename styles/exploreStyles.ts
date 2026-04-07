// styles/exploreStyles.ts
import { Platform, StyleSheet } from 'react-native';

export const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // 아주 연한 회색 배경
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 60 : 30, // 상단 상태바 여백
    paddingBottom: 40,
  },
  // 1. 상단 요약 카드 섹션
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4, // 카드 사이 간격
    // 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // 그림자 (Android)
    elevation: 3,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  cardUnit: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  // 2. 메인 컨텐츠 카드 (복약 기록 & 성과)
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // 3. 차트 관련 스타일 (임시 구현)
  chartPlaceholder: {
    height: 220,
    backgroundColor: '#F1F3F4', // 차트 영역 표시용 배경
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  chartLabel: {
    fontSize: 12,
    color: '#999',
  },
  
  // 4. 하단 성과 요약 (노란색 상자)
  achievementBox: {
    backgroundColor: '#FFFDE7', // 연한 노란색
    borderWidth: 1,
    borderColor: '#FFF59D', // 조금 더 진한 노란색 테두리
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F6D00', // 진한 갈색/노란색 텍스트
    marginLeft: 10,
  },

  // 5. 하단 미니 통계 카드
  miniStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  miniStatCard: {
    flex: 1,
    backgroundColor: '#F8F9FA', // 연한 회색 배경
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  miniStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});