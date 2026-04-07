import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const settingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingTop: Platform.OS === 'android' ? 60 : 50,
    paddingBottom: 40,
  },
  // 긴급 호출 버튼
  emergencyBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 8,
  },
  emergencyText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emergencySubText: {
    color: '#f50101',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 20,
  },
  // 섹션 카드
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  // 보호자 아이템
  guardianRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  guardianName: {
    fontSize: 16,
    fontWeight: '600',
  },
  guardianRelation: {
    fontSize: 12,
    color: '#888',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    borderRadius: 4,
    marginLeft: 6,
  },
  // 설정 스위치 열
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  settingSubLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  // 슬라이더 모사 (단순 뷰로 구현)
  sliderContainer: {
    marginTop: 10,
    marginBottom: 5,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderWidth: 2,
    borderColor: '#1A1A1A',
    position: 'absolute',
    right: '20%', // 80% 지점 표시
  },
  // 하단 저장 버튼
  saveBtn: {
    backgroundColor: '#0A0A1F',
    borderRadius: 8,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceStatusCard: {
    backgroundColor: '#F0F4FF', // 연한 파란색 배경
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  connectedText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  disconnectedText: {
    color: Colors.textSub,
    fontSize: 14,
  },
  // styles/settingStyles.ts 에 추가/수정
  connectMiniBtn: { 
    backgroundColor: '#0A0A1F', // 어두운 네이비색 (피그마 톤)
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 8,
    minWidth: 70, // 버튼 최소 너비 확보
    alignItems: 'center',
    justifyContent: 'center',
  },
  connectBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  connectedBtn: {
    backgroundColor: '#EEEEEE', // 연결 해제 시 연한 회색
  },
  connectedBtnText: {
    color: '#666666',
  },

  // styles/settingStyles.ts 추가분
  thresholdContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  thresholdLabel: { fontSize: 13, color: '#444', fontWeight: '500' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: { backgroundColor: '#E0E0E0', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  stepText: { marginHorizontal: 12, fontSize: 16, fontWeight: 'bold', color: Colors.primary },

});