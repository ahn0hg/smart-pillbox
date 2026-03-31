import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { auth, db } from '../firebaseConfig'; // 설정 파일 경로 확인!

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  Text,
  TextInput, // ★ 중요: 이게 있어야 알림창이 뜹니다!
  TouchableOpacity,
  View
} from 'react-native';

export default function AuthScreen() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isGuardian, setIsGuardian] = useState(false);
  const [loading, setLoading] = useState(false); // 로딩 상태 추가
  const router = useRouter();

  const handleAuth = async () => {
    // 1. 버튼 눌림 확인 (터미널과 화면 둘 다)
    //console.log("버튼 클릭됨! 이메일:", email);
    //Alert.alert("확인", "버튼이 정상적으로 눌렸습니다!");
    
    if (!email || !password) {
      return Alert.alert("알림", "이메일과 비밀번호를 입력해주세요.");
    }

    setLoading(true);
    try {
      if (isLoginMode) {
        // --- 로그인 ---
        await signInWithEmailAndPassword(auth, email, password);
        router.replace('/(tabs)');
      } else {
        // --- 회원가입 ---
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // ... 가입 버튼 클릭 시 실행되는 함수 내부
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // 가입 성공 직후, 해당 유저의 UID를 이름으로 하는 폴더를 DB에 만듭니다.
          await set(ref(db, 'users/' + user.uid), {
            profile: {
              email: email,
              name: name,         // 입력받은 이름
              phone: phone,       // 입력받은 전화번호
              isGuardian: isGuardian, // true 또는 false
              createdAt: new Date().toISOString(), // 가입 시간 저장 (관리용)
            },
            settings: {
              pushEnabled: true,  // 초기값 설정
              buzzerEnabled: true,
              ledEnabled: true,
              ledLevel: 1
            }
          });

          console.log("회원 정보 DB 저장 완료!");
          router.replace('/(tabs)'); // 가입 후 메인으로 이동
        } catch (error) {
          console.error("DB 저장 중 에러:", error);
        }

        const user = userCredential.user;

        // DB 저장
        await set(ref(db, 'users/' + user.uid), {
          email, name, phone, isGuardian,
          createdAt: new Date().toISOString()
        });

        Alert.alert("성공", "회원가입 완료! 로그인 해주세요.");
        setIsLoginMode(true);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("에러 발생", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 아까 확인하신 그 글자 부분입니다! */}
      <Text style={styles.title}></Text>
      
      <TextInput 
        placeholder="이메일" 
        style={styles.input} 
        onChangeText={setEmail} 
        autoCapitalize="none" 
        keyboardType="email-address"
      />
      <TextInput 
        placeholder="비밀번호" 
        style={styles.input} 
        secureTextEntry 
        onChangeText={setPassword} 
      />

      {!isLoginMode && (
        <>
          <TextInput placeholder="이름" style={styles.input} onChangeText={setName} />
          <TextInput placeholder="전화번호" style={styles.input} onChangeText={setPhone} keyboardType="phone-pad" />
          <View style={styles.switchRow}>
            <Text>보호자이신가요?</Text>
            <Switch value={isGuardian} onValueChange={setIsGuardian} />
          </View>
        </>
      )}

      <TouchableOpacity 
        style={[styles.mainButton, { opacity: loading ? 0.7 : 1 }]} 
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isLoginMode ? '로그인하기' : '가입 완료'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)} style={{ marginTop: 20 }}>
        <Text style={styles.toggleText}>
          {isLoginMode ? "계정이 없으신가요? 회원가입" : "이미 계정이 있나요? 로그인"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 40, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 50, textAlign: 'center', color: '#1A73E8' },
  input: { borderBottomWidth: 1.5, borderColor: '#F0F0F0', marginBottom: 30, paddingVertical: 12, fontSize: 16 },
  mainButton: { backgroundColor: '#1A73E8', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  toggleText: { color: '#888', textAlign: 'center', fontSize: 15, marginTop: 10, textDecorationLine: 'underline' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 35 }
});