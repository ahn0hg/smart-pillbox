import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors'; // 기존에 정의한 파란색 테마 색상 사용

export const seniorHomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FF', // 아주 연한 파란색 배경 (눈의 피로 감소)
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 50 : 20,
  },
  // 1. 상단 상태바 AREA
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#F4F7FF', // 연한 배경색
    zIndex: 10,                 // 다른 요소보다 위로 올림

  },
  dateText: {
    fontSize: 18, //폰트 사이즈
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15, // ★ 아이콘 사이 간격 확보
  },

  statusIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    // 부드러운 그림자 (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // 부드러운 그림자 (Android)
    elevation: 3,
  },
  
  // 2. 메인 약통 안내 카드 (★ 파란색 테마 적용)
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24, // 더 둥글게
    padding: 30,
    height: 380,
    justifyContent: 'space-between',
    marginBottom: 30,
    // 진한 그림자 (카드 강조)
    shadowColor: Colors.primary, // 파란색 그림자
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#E1E9FF', // 연한 파란색 테두리
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelLarge: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary, // 파란색 라벨
  },
  medicineNameTag: {
    backgroundColor: '#E1E9FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  pillCountContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillCount: {
    fontSize: 140, // 엄청 크게!
    fontWeight: '900',
    color: Colors.primary, // 거대 파란색 숫자
    letterSpacing: -5,
  },
  unitText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#333',
    marginTop: -20,
  },

  // 3. 하단 거대 버튼 Area
  bottomActionArea: {
    flexDirection: 'row',
    // space-around는 버튼 좌우에 균등한 공간을 배분합니다.
    justifyContent: 'space-around', 
    alignItems: 'center',
    // 화면 양끝에 너무 붙지 않도록 좌우 여백을 크게 줍니다 (★ 중요)
    paddingHorizontal: 30, 
    paddingVertical: 20,
    marginBottom: 40, // 바닥에서도 살짝 띄워줍니다.
  },
  
  // 거대 원형 버튼 (전화)
  hugeCircleBtn: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5CB85C',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  callBtn: {
    backgroundColor: '#5CB85C', // 연두색 (스케치 유지, 파란색과 잘 어울림)
  },
  // 거대 사이렌 버튼 (사각형 -> 원형으로 세련되게 변경 추천)
  hugeSirenBtn: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    elevation: 8,
    shadowColor: '#f00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  sirenBtn: {
    backgroundColor: Colors.danger, // 강력한 빨간색
  },

  // ★ 하얀색 동그라미 + 입체감 그림자 스타일 추가 ★
  statusIconCircle: {
    width: 45,                  // 동그라미 크기
    height: 45,
    borderRadius: 22.5,         // 크기의 절반 = 완벽한 원
    backgroundColor: '#FFFFFF', // 하얀색 배경
    justifyContent: 'center',   // 아이콘 중앙 정렬
    alignItems: 'center',
    
    // --- 그림자 스타일 (iOS & Web) ---
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,

    // --- 그림자 스타일 (안드로이드) ---
    elevation: 5,
  },
  // ★ 이 부분이 없어서 오류가 난 것입니다. 추가해주세요!
  dateContainer: {
    flexDirection: 'column', // 세로로 배치
    justifyContent: 'center',
  },

  timeText: {
    fontSize: 32, // 시간을 크게
    fontWeight: 'bold',
    color: '#333',
  },


});