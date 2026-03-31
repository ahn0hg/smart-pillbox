import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebaseConfig';
import { useAlertHistory, useAlertListener } from '../../src/chatfunction'; // ★ useAlertHistory 추가
import { seniorHomeStyles as styles } from '../../styles/seniorHomeStyles';

export default function SeniorHomeScreen() {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [medicineName, setMedicineName] = useState('치매약');
  const [pillboxNumber, setPillboxNumber] = useState(1);
  const [isBluetoothConnected, setIsBluetoothConnected] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  // 1. 로그 확인을 위한 상태와 훅
  const [historyVisible, setHistoryVisible] = useState(false);
  const { history, fetchHistory, loading } = useAlertHistory();

  useAlertListener();
  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const lockRef = ref(db, `users/${user.uid}/settings/isLocked`);
    const unsubscribe = onValue(lockRef, (snapshot) => {
      if (snapshot.exists()) setIsLocked(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  const toggleLock = () => {
    const user = auth.currentUser;
    if (!user) return;
    const nextLockState = !isLocked;
    update(ref(db, `users/${user.uid}/settings`), { isLocked: nextLockState });
    Alert.alert(
      nextLockState ? "화면 잠금" : "잠금 해제",
      nextLockState ? "홈 화면 외 다른 탭 이동이 제한됩니다." : "이제 다른 탭으로 이동할 수 있습니다."
    );
  };

  // ★ 벨 아이콘 클릭 시 실행될 함수
  const handlePressBell = () => {
    const user = auth.currentUser;
    if (user) {
      fetchHistory(user.uid); // 어르신 본인에게 온 알림 내역 조회
      setHistoryVisible(true);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FF" />

      <View style={styles.statusBar}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{dateStr}</Text>
          <Text style={styles.timeText}>{timeStr}</Text>
        </View>

        <View style={styles.iconGroup}>
          {/* ★ onPress 속성을 추가로 전달합니다 ★ */}
          <IconBtn name="bell-outline" isAlert onPress={handlePressBell} />
          <IconBtn name="bluetooth" isConnected={isBluetoothConnected} />
          
          <TouchableOpacity onPress={toggleLock} activeOpacity={0.7} style={styles.statusIconCircle}>
            <MaterialCommunityIcons 
              name={isLocked ? "lock" : "lock-open-variant-outline"} 
              size={22} 
              color={isLocked ? Colors.danger : "#555"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Text style={styles.labelLarge}>지금 열 칸</Text>
          <View style={styles.medicineNameTag}>
            <Text style={styles.medicineName}>{medicineName}</Text>
          </View>
        </View>
        <View style={styles.pillCountContainer}>
          <Text style={styles.pillCount}>{pillboxNumber < 10 ? `0${pillboxNumber}` : pillboxNumber}</Text>
          <Text style={styles.unitText}>번 칸 열기</Text>
        </View>
      </View>

      <View style={styles.bottomActionArea}>
        <TouchableOpacity style={[styles.hugeCircleBtn, styles.callBtn]} activeOpacity={0.8}>
          <FontAwesome5 name="phone-alt" size={65} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hugeSirenBtn, styles.sirenBtn]} activeOpacity={0.8}>
          <MaterialCommunityIcons name="alert-octagon" size={85} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* --- 전송 기록 모달 (어르신용) --- */}
      <Modal visible={historyVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', height: '70%', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ fontSize: 22, fontWeight: 'bold' }}>도착한 메시지 목록</Text>
              <TouchableOpacity onPress={() => setHistoryVisible(false)}>
                <MaterialCommunityIcons name="close" size={30} color="#333" />
              </TouchableOpacity>
            </View>

            {loading ? (
              <Text style={{ textAlign: 'center', marginTop: 20 }}>불러오는 중...</Text>
            ) : (
              <FlatList
                data={history}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
                    <Text style={{ fontSize: 19, fontWeight: '600', color: '#222' }}>{item.message}</Text>
                    <Text style={{ fontSize: 14, color: '#888', marginTop: 5 }}>{new Date(item.timestamp).toLocaleString()}</Text>
                  </View>
                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: '#bbb' }}>기록이 없습니다.</Text>}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ★ IconBtn 컴포넌트 수정: onPress를 인자로 받아 TouchableOpacity에 연결 ★
function IconBtn({ name, isConnected, isAlert, onPress }: any) {
  let iconColor = '#555';
  if (isConnected) iconColor = Colors.primary;
  if (isAlert) iconColor = Colors.danger;

  return (
    <TouchableOpacity 
      style={styles.statusIconCircle} 
      activeOpacity={0.7} 
      onPress={onPress} // 이 부분이 있어야 실제로 클릭이 작동합니다!
    >
      <MaterialCommunityIcons name={name} size={22} color={iconColor} />
    </TouchableOpacity>
  );
}