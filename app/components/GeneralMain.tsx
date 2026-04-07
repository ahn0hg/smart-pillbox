import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAlertHistory, useAlertListener, useManagedUsers } from '../../src/chatfunction';
import { homeStyles as styles } from '../../styles/homeStyles';

export default function HomeScreen() {
  const [currentTab, setCurrentTab] = useState('복약현황');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [historyVisible, setHistoryVisible] = useState(false);

  const managedUsers = useManagedUsers();
  const { history, fetchHistory, loading } = useAlertHistory();
  
  useAlertListener();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const date = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일`;
      const time = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      setDateStr(date);
      setTimeStr(time);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(timer);
  }, []);

  // ★ 수정된 클릭 핸들러
  const handlePressBell = async () => {
    if (managedUsers && managedUsers.length > 0) {
      // 1. 모달을 먼저 띄웁니다 (사용자 반응성 우선)
      setHistoryVisible(true);
      // 2. 그 다음 데이터를 가져옵니다
      await fetchHistory(managedUsers[0].id);
    } else {
      Alert.alert("알림", "관리 중인 어르신이 없습니다.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FF" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.statusBar}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{dateStr}</Text>
            <Text style={styles.timeText}>{timeStr}</Text>
          </View>

          <View style={styles.iconGroup}>
            <TouchableOpacity 
              style={styles.statusIconCircle} 
              activeOpacity={0.5}
              onPress={handlePressBell} // 클릭 이벤트 연결 확인
            >
              <MaterialCommunityIcons name="bell-outline" size={22} color={Colors.danger} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.statusIconCircle} activeOpacity={0.5}>
              <MaterialCommunityIcons name="bluetooth" size={22} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- 기존 카드 및 탭 로직 (생략 없이 유지) --- */}
        <View style={styles.alertCard}>
          <View style={styles.alertHeader}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialCommunityIcons name="bell-outline" size={18} color="#FFF" />
              <Text style={styles.alertHeaderText}> 다음 복약</Text>
            </View>
            <View style={styles.tag}><Text style={styles.tagText}>아침</Text></View>
          </View>
          <Text style={styles.medTitle}>비타민 C</Text>
          <Text style={styles.medTime}>복용 시간: 09:00 | 1정</Text>
          <TouchableOpacity style={styles.whiteBtn}>
            <Text style={styles.blueBtnText}>복용 완료</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.segmentContainer}>
          {['복약현황', '재고확인', '알림내역'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={[styles.segmentButton, currentTab === tab && styles.activeSegment]}
              onPress={() => setCurrentTab(tab)}
            >
              <Text style={[styles.segmentText, currentTab === tab && styles.activeSegmentText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {currentTab === '복약현황' && (
          <View style={styles.statusSection}>
            <MedRow name="아스피린" time="08:00" isDone={true} />
            <MedRow name="비타민 C" time="09:00" isDone={false} isLate={true} />
          </View>
        )}
      </ScrollView>

      {/* --- ★ 모달 위치 확인: ScrollView 바깥, SafeAreaView 안쪽 끝 ★ --- */}
      <Modal 
        visible={historyVisible} 
        animationType="slide" 
        transparent={true}
        onRequestClose={() => setHistoryVisible(false)} // 안드로이드 뒤로가기 대응
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ 
            backgroundColor: 'white', 
            height: '75%', 
            borderTopLeftRadius: 25, 
            borderTopRightRadius: 25, 
            padding: 20,
            elevation: 5 // 안드로이드 그림자
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>가족 메시지 전송 기록</Text>
              <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                <MaterialCommunityIcons name="close" size={26} color="#333" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={{ marginTop: 30, alignItems: 'center' }}>
                <Text>기록을 불러오고 있습니다...</Text>
              </View>
            ) : (
              <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                    <Text style={{ fontSize: 17, fontWeight: '600', color: '#222' }}>{item.message}</Text>
                    <Text style={{ fontSize: 13, color: '#999', marginTop: 6 }}>
                      보낸 시간: {new Date(item.timestamp).toLocaleString()}
                    </Text>
                  </View>
                )}
                ListEmptyComponent={
                  <View style={{ marginTop: 60, alignItems: 'center' }}>
                    <Text style={{ color: '#BBB' }}>아직 전송한 기록이 없습니다.</Text>
                  </View>
                }
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function MedRow({ name, time, isDone, isLate }: any) {
  return (
    <View style={[styles.itemRow, isLate && !isDone && styles.lateRow]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialCommunityIcons 
          name={isDone ? "check-circle" : "alert-circle"} 
          size={26} 
          color={isDone ? "#4CAF50" : (isLate ? "#F44336" : "#CCC")} 
        />
        <View style={{marginLeft: 12}}>
          <Text style={styles.itemName}>{name}</Text>
          <Text style={styles.itemTime}>{time} • 1정</Text>
        </View>
      </View>
    </View>
  );
}