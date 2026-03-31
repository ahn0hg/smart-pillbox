import { Platform, StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollContent: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 26, // 조금 더 크게 키웠습니다.
    fontWeight: 'bold',
    color: '#1A73E8', // 스마트 약통 메인 블루
    marginBottom: 24,
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20, // 조금 더 둥글게 변경
    padding: 24,
    marginBottom: 20,
    // 그림자 효과 강화
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  
  // 공통 버튼 베이스
  actionButton: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },

  // 🔍 검색하기 전용 (파랑 테마)
  searchBtn: {
    backgroundColor: '#F0F7FF', // 아주 연한 파랑
    borderColor: '#D1E4FF',     // 연한 파랑 테두리
  },
  searchText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1565C0',           // 진한 파랑 글씨
    marginTop: 12,
  },

  // 📷 등록하기 전용 (초록 테마)
  registerBtn: {
    backgroundColor: '#F1FBF2', // 아주 연한 초록
    borderColor: '#D5EAD8',     // 연한 초록 테두리
  },
  registerText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#2E7D32',           // 진한 초록 글씨
    marginTop: 12,
  },

  emptyState: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  emptyText: {
    color: '#999',
    fontSize: 15,
    marginTop: 12,
  }
});