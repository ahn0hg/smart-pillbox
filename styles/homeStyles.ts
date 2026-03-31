import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export const homeStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  scrollContent: { 
    padding: 20, 
    paddingTop: Platform.OS === 'android' ? 60 : 50 
  },
  // 상단 하이라이트 카드
  alertCard: { 
    backgroundColor: Colors.primary, 
    borderRadius: 24, 
    padding: 24, 
    marginBottom: 25, 
    elevation: 8, // 안드로이드 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  alertHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 15 
  },
  alertHeaderText: { 
    color: Colors.white, 
    fontSize: 14,
    fontWeight: '500'
  },
  tag: { 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 6 
  },
  tagText: { 
    color: Colors.white, 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  medTitle: { 
    color: Colors.white, 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 6 
  },
  medTime: { 
    color: 'rgba(255,255,255,0.8)', 
    fontSize: 15 
  },
  whiteBtn: { 
    backgroundColor: Colors.white, 
    borderRadius: 12, 
    padding: 15, 
    alignItems: 'center', 
    marginTop: 20 
  },
  blueBtnText: { 
    color: Colors.primary, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  // 복약 현황 섹션
  statusSection: { 
    backgroundColor: Colors.white, 
    borderRadius: 24, 
    padding: 20, 
    elevation: 2 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: Colors.textMain 
  },
  badge: { 
    backgroundColor: Colors.danger, 
    paddingHorizontal: 8, 
    paddingVertical: 2, 
    borderRadius: 10 
  },
  badgeText: { 
    color: Colors.white, 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  progressContainer: { 
    marginBottom: 25 
  },
  progressLabel: { 
    fontSize: 13, 
    color: Colors.textSub, 
    marginBottom: 8 
  },
  progressBg: { 
    height: 10, 
    backgroundColor: '#F0F0F0', 
    borderRadius: 5 
  },
  progressFill: { 
    height: 10, 
    backgroundColor: '#333', 
    borderRadius: 5 
  },
  // 리스트 아이템
  itemRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 18, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F8F8F8' 
  },
  lateRow: { 
    backgroundColor: '#FFF9F9', 
    borderRadius: 12, 
    paddingHorizontal: 10  
  },
  itemName: { 
    fontSize: 17, 
    fontWeight: '600', 
    color: Colors.textMain 
  },
  itemTime: { 
    color: Colors.textSub, 
    fontSize: 14, 
    marginTop: 2 
  },
  lateWarnText: { 
    color: Colors.danger, 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginTop: 4 
  },
  confirmBtn: { 
    backgroundColor: Colors.danger, 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 10 
  },
  confirmBtnText: { 
    color: Colors.white, 
    fontWeight: 'bold' 
  },
  // ... 기존 코드에 추가
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: '#0A0A1F', // 아주 어두운 네이비/블랙
  },
  segmentText: {
    fontSize: 14,
    color: '#666',
  },
  activeSegmentText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#F4F7FF', // 전체 배경과 맞춤
  },
  dateContainer: {
    flexDirection: 'column',
  },
  dateText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
  },
  statusIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});