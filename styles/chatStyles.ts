import { StyleSheet } from 'react-native';

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 25,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 16, // 버튼 사이 간격
  },

  // 공통 버튼 베이스
  menuButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1.2,
    // 그림자 효과 (입체감)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 4.65,
    elevation: 3,
  },

  // AI 상담사 전용 (가장 큰 버튼)
  mainButton: {
    paddingVertical: 28,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#E1E9FF',
  },

  iconWrapper: {
    marginRight: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // AI 로봇 아이콘 배경원
  mainIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EBF3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },

  subText: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },

  // 화살표 아이콘 (필요시 우측에 배치)
  chevron: {
    opacity: 0.3,
  },

  // ★ 아래 모달 관련 스타일들을 추가해 주세요 ★
modalOverlay: {
  flex: 1, // 화면 전체 차지
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // 배경을 더 어둡게 해서 티가 나게 해보세요!
  justifyContent: 'center',
  alignItems: 'center',
  // 만약 absolute를 쓴다면 아래처럼
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},
  modalContent: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    // 그림자 효과
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  userItemText: {
    fontSize: 18,
    color: '#333',
  },
  phraseContainer: {
    gap: 12, // 문구 버튼 사이 간격
    marginTop: 10,
  },
  phraseBtn: {
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#333',
    borderRadius: 12,
    alignItems: 'center',
  },
  phraseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },


});