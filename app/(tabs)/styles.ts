import { Platform, StatusBar, StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // 1. 전체 컨테이너
  container: { 
    flex: 1, 
    backgroundColor: '#F4F6FB', 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  
  // 2. 하단 탭 바 (흰색 바 부분)
  bottomBar: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    paddingVertical: 10, 
    borderTopWidth: 1, 
    borderColor: '#EEE', 
    paddingBottom: Platform.OS === 'ios' ? 25 : 10 
  },
  
  // 3. ★ 문제의 그 부분! ★ 탭 버튼 하나하나의 영역
  bottomBtn: { 
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  // 4. 하단 탭 글자 스타일
  bottomText: { 
    fontSize: 11, 
    color: '#A0A0A0', 
    marginTop: 4 
  }
});