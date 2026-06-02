const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

// ★ 추가: AI 채팅/요약 라우터 모듈
const { registerAiChatRoutes } = require('./aiChat');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 데이터베이스 연결 성공!');
});

app.get('/', (req, res) => {
  res.send('스마트 약통 서버가 정상 작동 중입니다!');
});

// 1. 회원가입 API
app.post('/api/signup', (req, res) => {
  const { uid, userId, password, name, phone, role } = req.body; 
  const query = 'INSERT INTO users (uid, userId, password, name, phone, role) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [uid, userId, password, name, phone, role], (err, result) => {
    if (err) return res.status(500).json({ message: 'DB 저장 실패', error: err.message });
    res.status(201).json({ message: '회원가입 성공!' });
  });
});

// 2. 로그인 API
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  const query = 'SELECT * FROM users WHERE userId = ? AND password = ?';
  db.query(query, [userId, password], (err, results) => {
    if (err) return res.status(500).json({ message: '서버 오류' });
    if (results.length > 0) res.status(200).json({ message: '로그인 성공', user: results[0] });
    else res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
  });
});

// 3. 전화번호로 사용자 검색 API
app.get('/api/users/search/:phone', (req, res) => {
  const phone = req.params.phone;
  // ★ 중요: 프론트에서 실제 UID가 필요하므로 uid를 컬럼에 추가했습니다.
  const query = 'SELECT uid, userId, name, role, phone FROM users WHERE phone = ?';
  db.query(query, [phone], (err, results) => {
    if (err) return res.status(500).json({ message: '서버 오류' });
    if (results.length > 0) res.status(200).json(results[0]);
    else res.status(404).json({ message: '사용자를 찾을 수 없음' });
  });
});

// 4. 보호자-환자 관계 등록 API
app.post('/api/relation', (req, res) => {
  const { protectorId, seniorId, relationType } = req.body;
  
  console.log("1️⃣ [관계 등록 시작] 데이터 확인:", { protectorId, seniorId, relationType });

  // 필수 데이터가 없을 경우 즉시 응답 (무한 로딩 방지)
  if (!protectorId || !seniorId) {
    console.log("❌ 데이터 부족: protectorId나 seniorId가 없습니다.");
    return res.status(400).json({ message: '데이터가 부족합니다.' });
  }

  // 1단계: 기존 관계 삭제
  const deleteQuery = 'DELETE FROM relations WHERE seniorId = ?';
  console.log("2️⃣ [삭제 진행 중...] seniorId:", seniorId);

  db.query(deleteQuery, [seniorId], (err, deleteResult) => {
    if (err) {
      console.error("❌ 1단계 삭제 중 에러 발생:", err);
      return res.status(500).json({ message: '기존 관계 삭제 실패', error: err.message });
    }

    console.log("3️⃣ [삭제 완료] 새 관계 등록 시작...");

    // 2단계: 새로운 관계 저장
    const insertQuery = 'INSERT INTO relations (protectorId, seniorId, relationType) VALUES (?, ?, ?)';
    db.query(insertQuery, [protectorId, seniorId, relationType], (err, result) => {
      if (err) {
        console.error("❌ 2단계 등록 중 에러 발생:", err);
        return res.status(500).json({ message: '관계 저장 실패', error: err.message });
      }
      
      console.log("4️⃣ [등록 완료] 모든 작업 성공!");
      // ★ 이 응답이 있어야 앱의 로딩이 멈춥니다!
      return res.status(201).json({ message: '관계 등록이 완료되었습니다.' });
    });
  });
});

// 5. 어르신 ID로 보호자 전화번호 조회 API (맨 아래 app.listen 위로 이동)
app.get('/api/protector-phone/:seniorId', (req, res) => {
  const { seniorId } = req.params;
  const query = `
    SELECT u.phone 
    FROM users u
    JOIN relations r ON u.uid = r.protectorId
    WHERE r.seniorId = ?
  `;
  db.query(query, [seniorId], (err, results) => {
    if (err) return res.status(500).json({ message: '서버 오류', error: err.message });
    if (results.length > 0) res.status(200).json({ phoneNumber: results[0].phone });
    else res.status(404).json({ message: '연결된 보호자 번호가 없습니다.' });
  });
});

// 약 등록 API
app.post('/api/medicines/add', (req, res) => {
  const { seniorId, medicineName, pillboxNumber, dosage, alarmTime } = req.body;
  
  // 방금 만드신 medicines_settings 테이블에 데이터를 넣는 쿼리입니다.
  const sql = `INSERT INTO medicines_settings (seniorId, medicineName, pillboxNumber, dosage, alarmTime) 
               VALUES (?, ?, ?, ?, ?)`;
  
  db.query(sql, [seniorId, medicineName, pillboxNumber, dosage, alarmTime], (err, result) => {
    if (err) {
      console.error("❌ 약 등록 에러:", err);
      return res.status(500).json({ message: "DB 저장에 실패했습니다." });
    }
    console.log("💊 약 등록 완료! 대상 어르신:", seniorId);
    res.status(200).json({ 
      message: "약 등록 성공!", 
      medicineId: result.insertId 
    });
  });
});

// server/index.js 의 약 목록 조회 API 수정
app.get('/api/medicines/list/:seniorId', (req, res) => {
  const { seniorId } = req.params;
  
  console.log("======================================");
  console.log("🔍 [요청 들어옴] 약 목록 조회 대상 UID:", seniorId);
  console.log("======================================");
  
  const sql = `SELECT id, medicineName, pillboxNumber, alarmTime 
               FROM medicines_settings 
               WHERE seniorId = ? 
               ORDER BY alarmTime ASC`;
               
  db.query(sql, [seniorId], (err, results) => {
    if (err) {
      console.error("❌ DB 조회 에러 발생:", err);
      return res.status(500).json({ message: "DB 조회 실패" });
    }
    
    console.log("📦 [DB 조회 결과] 가져온 데이터 개수:", results.length);
    console.log("📊 데이터 내용:", results);
    console.log("======================================");
    
    res.status(200).json(results);
  });
});

// 약 삭제 API
app.delete('/api/medicines/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = "DELETE FROM medicines_settings WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("❌ 약 삭제 에러:", err);
      return res.status(500).json({ message: "DB 삭제 실패" });
    }
    console.log("🗑️ 약 삭제 완료! 약 ID:", id);
    res.status(200).json({ message: "삭제 완료" });
  });
});

db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 데이터베이스 연결 성공!');
});

// ★ 추가: AI 상담/요약 관련 라우트 등록 (db 연결 후)
registerAiChatRoutes(app, db);

app.get('/', (req, res) => {
  res.send('스마트 약통 서버가 정상 작동 중입니다!');
});

// 1. 회원가입 API
app.post('/api/signup', (req, res) => {
  const { uid, userId, password, name, phone, role } = req.body;
  const query = 'INSERT INTO users (uid, userId, password, name, phone, role) VALUES (?, ?, ?, ?, ?, ?)';

  db.query(query, [uid, userId, password, name, phone, role], (err, result) => {
    if (err) {
      console.error("❌ MySQL 에러:", err);
      return res.status(500).json({ message: 'DB 저장 실패', error: err.message });
    }
    res.status(201).json({ message: '회원가입 성공!' });
  });
});

// 2. 로그인 API
app.post('/api/login', (req, res) => {
  const { userId, password } = req.body;
  const query = 'SELECT * FROM users WHERE userId = ? AND password = ?';

  db.query(query, [userId, password], (err, results) => {
    if (err) return res.status(500).json({ message: '서버 오류' });

    if (results.length > 0) {
      res.status(200).json({ message: '로그인 성공', user: results[0] });
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다.' });
    }
  });
});

// 3. 전화번호로 사용자 검색 API
app.get('/api/users/search/:phone', (req, res) => {
  const phone = req.params.phone;
  const query = 'SELECT id, userId, name, role FROM users WHERE phone = ?';

  db.query(query, [phone], (err, results) => {
    if (err) return res.status(500).json({ message: '서버 오류' });
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: '사용자를 찾을 수 없음' });
    }
  });
});

// 4. 보호자-환자 관계 등록 API
app.post('/api/relation', (req, res) => {
  const { protectorId, seniorId, relationType } = req.body;
  const query = 'INSERT INTO relations (protectorId, seniorId, relationType) VALUES (?, ?, ?)';

  db.query(query, [protectorId, seniorId, relationType], (err, result) => {
    if (err) {
      console.error("❌ 관계 저장 에러:", err);
      return res.status(500).json({ message: '관계 저장 실패', error: err.message });
    }
    console.log("✅ 관계 등록 완료!");
    res.status(201).json({ message: '관계 등록 성공!' });
  });
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

// [4번 기능] 어르신 ID로 보호자 전화번호 조회 API
app.get('/api/protector-phone/:seniorId', (req, res) => {
  const { seniorId } = req.params;

  const query = `
    SELECT u.phone 
    FROM users u
    JOIN relations r ON u.uid = r.protectorId
    WHERE r.seniorId = ?
  `;

  db.query(query, [seniorId], (err, results) => {
    if (err) {
      console.error("❌ 보호자 번호 조회 에러:", err);
      return res.status(500).json({ message: '서버 오류', error: err.message });
    }

    if (results.length > 0) {
      res.status(200).json({ phoneNumber: results[0].phone });
    } else {
      res.status(404).json({ message: '연결된 보호자 번호가 없습니다.' });
    }
  });
});


// index.js 맨 밑부분
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 서버가 모든 네트워크 인터페이스에서 대기 중입니다!`);
});


