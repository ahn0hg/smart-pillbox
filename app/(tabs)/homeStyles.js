import { Platform, StatusBar, StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  /* 헤더 스타일 */
  header: {
    flexDirection: 'row',
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
  /* 카드 요약 영역 */
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
    marginHorizontal: 4,
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
  },
  /* 하단 콘텐츠 영역 */
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
  },
  /* 약 등록 카드 */
  registrationCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  regTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  cameraBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F9FAFB'
  },
});