import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ★ 추가
import axios from 'axios'; // ★ 추가
import { onValue, ref, update } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Linking, Modal, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native'; // ★ ActivityIndicator 추가
import { Colors } from '../../constants/Colors';
import { auth, db } from '../../firebaseConfig';
import { useAlertHistory, useAlertListener } from '../../src/chatfunction';
import { seniorHomeStyles as styles } from '../../styles/seniorHomeStyles';

// ★ 약 데이터 타입 정의
type Medicine = {
  id: number;
  medicineName: string;
  pillboxNumber: number;
  alarmTime: string;
};

export default function SeniorHomeScreen() {
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  
  // 기존 정적 상태 대신, 동적으로 계산된 약 정보를 저장할 상태
  const [nextMedicine, setNextMedicine] = useState<Medicine | null>(null); 
  const [medLoading, setMedLoading] = useState(true);

  const [isBluetoothConnected, setIsBluetoothConnected] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const [historyVisible, setHistoryVisible] = useState(false);
  const { history, fetchHistory, loading } = useAlertHistory();
  const [protectorPhone, setProtectorPhone] = useState('');
  useAlertListener();
  
  // 1. 잠금 상태 리스너
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const lockRef = ref(db, `users/${user.uid}/settings/isLocked`);
    const unsubscribe = onValue(lockRef, (snapshot) => {
      if (snapshot.exists()) setIsLocked(snapshot.val());
    });
    return () => unsubscribe();
  }, []);

  // 2. 보호자 전화번호 로드
  useEffect(() => {
    const getPhone = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const baseUrl = process.env.EXPO_PUBLIC_API_URL; 
          if (!baseUrl) return;

          const response = await fetch(`${baseUrl}/api/protector-phone/${user.uid}`);
          if (response.ok) {
            const data = await response.json();
            const phone = data.protectorPhone || data.phoneNumber;
            if (phone) setProtectorPhone(phone);
          }
        }
      } catch (error) {
        console.error("보호자 번호 로드 중 네트워크 오류:", error);
      }
    };
    getPhone();
  }, []);

  // 3. 시간 업데이트 (1분마다)
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

  // ★ 4. [신규] 다가오는 복약 시간 계산 로직
  useEffect(() => {
    const fetchNextMedicine = async () => {
      try {
        let savedUserId = await AsyncStorage.getItem('userId');
        if (!savedUserId && auth.currentUser) {
          savedUserId = auth.currentUser.uid;
        }
        if (!savedUserId) return;

        const baseUrl = process.env.EXPO_PUBLIC_API_URL;
        const response = await axios.get(`${baseUrl}/api/medicines/list/${savedUserId}`);
        const medicines: Medicine[] = response.data;
        
        if (medicines.length === 0) {
          setNextMedicine(null);
          setMedLoading(false);
          return;
        }

        const now = new Date();
        const currentTimeString = now.toTimeString().split(' ')[0]; 
        const sortedMeds = [...medicines].sort((a, b) => a.alarmTime.localeCompare(b.alarmTime));
        const upcomingMed = sortedMeds.find((med) => med.alarmTime > currentTimeString);

        setNextMedicine(upcomingMed || sortedMeds[0]); // 오늘 없으면 내일 첫 약
      } catch (error) {
        console.error("다음 약 계산 실패:", error);
      } finally {
        setMedLoading(false);
      }
    };

    fetchNextMedicine();
  }, []);

  // 버튼 액션 핸들러들
  const handleSirenPress = () => {
    Alert.alert("긴급 호출", "119에 전화하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { text: "전화하기", onPress: () => Linking.openURL('tel:119').catch(() => Alert.alert("오류", "전화 앱을 열 수 없습니다.")) }
    ]);
  };

  const handleCallPress = () => {
    if (protectorPhone) {
      Linking.openURL(`tel:${protectorPhone}`).catch(() => Alert.alert("오류", "전화 앱을 열 수 없습니다."));
    } else {
      Alert.alert("알림", "연결된 보호자 번호가 없습니다.");
    }
  };

  const toggleLock = () => {
    const user = auth.currentUser;
    if (!user) return;
    const nextLockState = !isLocked;
    update(ref(db, `users/${user.uid}/settings`), { isLocked: nextLockState });
    Alert.alert(nextLockState ? "화면 잠금" : "잠금 해제", nextLockState ? "홈 화면 외 다른 탭 이동이 제한됩니다." : "이제 다른 탭으로 이동할 수 있습니다.");
  };

  const handlePressBell = () => {
    const user = auth.currentUser;
    if (user) {
      fetchHistory(user.uid);
      setHistoryVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F7FF" />

      <View style={styles.statusBar}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{dateStr}</Text>
          <Text style={styles.timeText}>{timeStr}</Text>
        </View>

        <View style={styles.iconGroup}>
          <IconBtn name="bell-outline" isAlert onPress={handlePressBell} />
          <IconBtn name="bluetooth" isConnected={isBluetoothConnected} />
          <TouchableOpacity onPress={toggleLock} activeOpacity={0.7} style={styles.statusIconCircle}>
            <MaterialCommunityIcons name={isLocked ? "lock" : "lock-open-variant-outline"} size={22} color={isLocked ? Colors.danger : "#555"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ★ [수정됨] 복약 정보 카드 (정적 데이터 -> 동적 데이터 연동) */}
      <View style={styles.infoCard}>
        {medLoading ? (
          <ActivityIndicator size="large" color="#1A73E8" style={{ marginTop: 40 }} />
        ) : nextMedicine ? (
          <>
            <View style={styles.cardHeader}>
              <Text style={styles.labelLarge}>
                ⏰ {nextMedicine.alarmTime.substring(0, 5)}
              </Text>
              <View style={styles.medicineNameTag}>
                <Text style={styles.medicineName}>{nextMedicine.medicineName}</Text>
              </View>
            </View>
            <View style={styles.pillCountContainer}>
              <Text style={styles.pillCount}>
                {nextMedicine.pillboxNumber < 10 ? `0${nextMedicine.pillboxNumber}` : nextMedicine.pillboxNumber}
              </Text>
              <Text style={styles.unitText}>번 칸 열기</Text>
            </View>
          </>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <MaterialCommunityIcons name="check-circle-outline" size={50} color="#9E9E9E" />
            <Text style={{ marginTop: 10, fontSize: 18, color: '#9E9E9E' }}>등록된 약이 없습니다.</Text>
          </View>
        )}
      </View>

      <View style={styles.bottomActionArea}>
        <TouchableOpacity style={[styles.hugeCircleBtn, styles.callBtn]} activeOpacity={0.8} onPress={handleCallPress}>
          <FontAwesome5 name="phone-alt" size={65} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.hugeSirenBtn, styles.sirenBtn]} activeOpacity={0.8} onPress={handleSirenPress}>
          <MaterialCommunityIcons name="alert-octagon" size={85} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* --- 전송 기록 모달 --- */}
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

function IconBtn({ name, isConnected, isAlert, onPress }: any) {
  let iconColor = '#555';
  if (isConnected) iconColor = Colors.primary;
  if (isAlert) iconColor = Colors.danger;
  return (
    <TouchableOpacity style={styles.statusIconCircle} activeOpacity={0.7} onPress={onPress}>
      <MaterialCommunityIcons name={name} size={22} color={iconColor} />
    </TouchableOpacity>
  );
}