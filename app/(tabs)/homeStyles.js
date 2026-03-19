import { Platform, StatusBar, StyleSheet } from 'react-native';

// index.tsx에서 쓸 수 있도록 'export'를 붙여서 밖으로 내보냅니다.
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB', // 배경색 (연한 파스텔 블루)
    //안드로이드면 상태바 높이
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 20,
  },
  /* 헤더 스타일 */
  header: {
    flexDirection: 'row', // 가로 배치
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBox: {
    backgroundColor: '#8A2BE2', // 보라색 배경
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  /* 카드 스타일 */
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4, // 카드 사이 간격
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  cardValueSmall: {
    fontSize: 14,
    color: '#999',
  },
  /* 탭 메뉴 스타일 */
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E9ECEF',
    borderRadius: 20,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  /* 콘텐츠 스타일 */
  contentContainer: {
    flex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  emptyBox: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#888',
    marginTop: 12,
    fontSize: 15,
  }
});