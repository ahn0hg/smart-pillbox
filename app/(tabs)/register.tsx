import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { auth } from '../../firebaseConfig';
import { registerStyles as styles } from '../../styles/registerStyles';

// 약 데이터 타입 정의
type Medicine = {
  id: number;
  medicineName: string;
  pillboxNumber: number;
  alarmTime: string;
};

export default function RegisterScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [medicineName, setMedicineName] = useState('');
  const [pillboxNumber, setPillboxNumber] = useState('');
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [alarmTimeStr, setAlarmTimeStr] = useState('시간 선택');

  // --- 추가된 상태 관리 ---
  const [medicines, setMedicines] = useState<Medicine[]>([]); // 약 목록 저장
  const [loading, setLoading] = useState(true);

  // 화면 진입 시 약 목록 불러오기
  useEffect(() => {
    fetchMedicines();
  }, []);

  // --- [기능 추가] 약 목록 불러오는 함수 ---
  const fetchMedicines = async () => {
    try {
      let savedUserId = await AsyncStorage.getItem('userId');
      if (!savedUserId && auth.currentUser) {
        savedUserId = auth.currentUser.uid;
      }

      if (!savedUserId) return;

      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${baseUrl}/api/medicines/list/${savedUserId}`);
      
      if (response.status === 200) {
        setMedicines(response.data);
      }
    } catch (error) {
      console.error("약 목록 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const onTimeChange = (event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
      const hours = selectedDate.getHours().toString().padStart(2, '0');
      const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
      setAlarmTimeStr(`${hours}:${minutes}`);
    }
  };

  // --- 약 등록 함수 ---
  const handleRegister = async () => {
    const pNumber = parseInt(pillboxNumber);
    if (!medicineName || !pillboxNumber || alarmTimeStr === '시간 선택') {
      return Alert.alert("알림", "모든 정보를 입력해주세요.");
    }

    if (isNaN(pNumber) || pNumber < 1 || pNumber > 3) {
      return Alert.alert("알림", "약통 번호는 1번에서 3번까지만 가능합니다.");
    }

    try {
      let savedUserId = await AsyncStorage.getItem('userId');
      if (!savedUserId && auth.currentUser) {
        savedUserId = auth.currentUser.uid;
      }

      if (!savedUserId) {
        return Alert.alert("오류", "로그인 세션이 만료되었습니다.");
      }

      const baseUrl = process.env.EXPO_PUBLIC_API_URL;
      
      const response = await axios.post(`${baseUrl}/api/medicines/add`, {
        seniorId: savedUserId,
        medicineName: medicineName,
        pillboxNumber: pNumber,
        dosage: "1알",
        alarmTime: `${alarmTimeStr}:00` 
      });

      if (response.status === 200) {
        Alert.alert("성공", "약 등록이 완료되었습니다!");
        setModalVisible(false);
        setMedicineName('');
        setPillboxNumber('');
        setAlarmTimeStr('시간 선택');
        
        // 🟢 등록 성공 후 목록 새로고침
        fetchMedicines();
      }
    } catch (error) {
      console.error("약 등록 실패 상세:", error);
      Alert.alert("에러", "DB 등록에 실패했습니다.");
    }
  };

  // --- [기능 추가] 약 삭제 함수 ---
  const handleDeleteMedicine = (id: number) => {
    Alert.alert(
      "약 삭제",
      "정말 이 약을 삭제하시겠습니까?",
      [
        { text: "취소", style: "cancel" },
        { 
          text: "삭제", 
          style: "destructive", // iOS에서 빨간색으로 표시됨
          onPress: async () => {
            try {
              const baseUrl = process.env.EXPO_PUBLIC_API_URL;
              const response = await axios.delete(`${baseUrl}/api/medicines/${id}`);
              
              if (response.status === 200) {
                Alert.alert("알림", "삭제되었습니다.");
                fetchMedicines(); // 🟢 삭제 성공 시 목록을 다시 불러와 화면에서 없앰
              }
            } catch (error) {
              console.error("약 삭제 실패:", error);
              Alert.alert("에러", "삭제에 실패했습니다.");
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ScrollView 내부에 전체 콘텐츠를 감싸 스크롤바가 자연스럽게 생기도록 설정 */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>스마트 약통</Text>
        
        <View style={styles.mainCard}>
          <Text style={styles.cardTitle}>약 등록 / 검색</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.actionButton, styles.searchBtn]}>
              <MaterialCommunityIcons name="magnify" size={32} color="#1565C0" />
              <Text style={styles.searchText}>검색하기</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.registerBtn]}
              onPress={() => setModalVisible(true)}
            >
              <MaterialCommunityIcons name="camera-outline" size={32} color="#2E7D32" />
              <Text style={styles.registerText}>등록하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🟢 [변경 영역] 등록된 약 정보 표시 섹션 */}
        <View style={localStyles.listSection}>
          <Text style={localStyles.sectionMenuTitle}>📋 등록된 약 목록</Text>
          
          {medicines.length === 0 ? (
            <View style={styles.emptyState}>
              <MaterialCommunityIcons name="pill" size={60} color="#E0E0E0" />
              <Text style={styles.emptyText}>등록된 약 정보가 여기에 표시됩니다.</Text>
            </View>
          ) : (
            medicines.map((item) => (
              <View key={item.id} style={localStyles.medCard}>
                <View style={localStyles.medIconCircle}>
                  <MaterialCommunityIcons name="pill" size={24} color="#2E7D32" />
                </View>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={localStyles.medName}>{item.medicineName}</Text>
                  <Text style={localStyles.medSub}>약통 칸: {item.pillboxNumber}번 칸</Text>
                </View>
                <View style={localStyles.timeTag}>
                  <Text style={localStyles.timeText}>{item.alarmTime.substring(0, 5)}</Text>
                </View>

                {/* 🟢 [새로 추가된 쓰레기통 버튼] */}
                <TouchableOpacity 
                  style={{ padding: 10, marginLeft: 5 }} 
                  onPress={() => handleDeleteMedicine(item.id)}
                >
                  <MaterialCommunityIcons name="trash-can-outline" size={26} color="#E53935" />
                </TouchableOpacity>

              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* 모달 영역 (이전과 동일) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <Text style={localStyles.modalTitle}>💊 새 약 등록 (1~3번 칸)</Text>
            <TextInput style={localStyles.input} placeholder="약 이름" placeholderTextColor="#AAA" value={medicineName} onChangeText={setMedicineName} />
            <TextInput style={localStyles.input} placeholder="약통 번호 (1, 2, 3)" keyboardType="number-pad" value={pillboxNumber} onChangeText={(text) => setPillboxNumber(text.replace(/[^1-3]/g, ''))} />
            <TouchableOpacity style={localStyles.timeInput} onPress={() => setShowPicker(true)}>
              <Text style={{ fontSize: 16, color: alarmTimeStr === '시간 선택' ? '#AAA' : '#000' }}>⏰ {alarmTimeStr}</Text>
            </TouchableOpacity>
            {showPicker && <DateTimePicker value={date} mode="time" is24Hour={true} display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={onTimeChange} />}
            <View style={localStyles.modalButtons}>
              <TouchableOpacity style={localStyles.cancelBtn} onPress={() => setModalVisible(false)}><Text>취소</Text></TouchableOpacity>
              <TouchableOpacity style={localStyles.saveBtn} onPress={handleRegister}><Text style={{color: '#fff', fontWeight: 'bold'}}>DB 저장</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 20, padding: 25 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderBottomWidth: 1, borderColor: '#DDD', marginBottom: 20, padding: 10, fontSize: 16 },
  timeInput: { borderBottomWidth: 1, borderColor: '#DDD', marginBottom: 30, padding: 10 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: { flex: 1, padding: 15, alignItems: 'center' },
  saveBtn: { flex: 1, padding: 15, backgroundColor: '#2E7D32', borderRadius: 10, alignItems: 'center' },
  
  // 목록 스타일 추가
  listSection: { marginTop: 10, width: '100%', paddingHorizontal: 5 },
  sectionMenuTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  medCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 15, marginBottom: 12, borderWidth: 1, borderColor: '#ECECEC', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 2 },
  medIconCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  medName: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  medSub: { fontSize: 13, color: '#777', marginTop: 3 },
  timeTag: { backgroundColor: '#F1F3F9', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  timeText: { fontSize: 14, fontWeight: '600', color: '#1565C0' }
});