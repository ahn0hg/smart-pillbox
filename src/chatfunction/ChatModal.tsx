import React, { useState } from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';
// styles 경로는 프로젝트 구조에 맞춰 수정하세요 (예: ../../styles/chatStyles)
import { chatStyles as styles } from '../../styles/chatStyles';

interface Props {
  visible: boolean;
  onClose: () => void;
  users: any[];
  onSend: (user: any, msg: string) => void;
}

export const ChatModal = ({ visible, onClose, users, onSend }: Props) => {
  //console.log("모달 현재 visible 상태:", visible); // ← 이 로그가 찍히는지 보세요.
  // 1. 에러 원인: selectedUser 상태가 정의되지 않았음
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 2. 에러 원인: phrases 배열이 정의되지 않았음
  const phrases = ["약 드실 시간이에요", "물을 많이 드세요", "식사 거르지 마세요"];

  // 3. 에러 원인: handleClose 함수가 정의되지 않았음
  const handleClose = () => {
    setSelectedUser(null); // 선택 상태 초기화
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          
          {/* 헤더 영역 */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {selectedUser ? "문구 선택" : "대상 선택"}
            </Text>
            <TouchableOpacity onPress={handleClose}>
              <Text style={{ color: 'red', fontSize: 20, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>

          {/* 본문 영역: 대상 선택 or 문구 선택 */}
          {!selectedUser ? (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id.toString()} // keyExtractor 추가 권장
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.userItem} 
                  onPress={() => setSelectedUser(item)}
                >
                  <Text style={styles.userItemText}>{item.name} 님</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.phraseContainer}>
              {phrases.map((msg) => (
                <TouchableOpacity 
                  key={msg} 
                  style={styles.phraseBtn} 
                  onPress={() => { 
                    onSend(selectedUser, msg); 
                    handleClose(); 
                  }}
                >
                  <Text style={styles.phraseText}>{msg}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};