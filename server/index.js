const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

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
  const { userId, password, name, phone, role } = req.body;
  const query = 'INSERT INTO users (userId, password, name, phone, role) VALUES (?, ?, ?, ?, ?)';
  
  db.query(query, [userId, password, name, phone, role], (err, result) => {
    if (err) {
      console.error("❌ MySQL 에러 상세:", err);
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

// 4. 보호자-환자 관계 등록 API (★ 새로 추가됨)
app.post('/api/relation', (req, res) => {
  const { protectorId, seniorId, relationType } = req.body;
  
  // MySQL에 relations 테이블이 있어야 합니다. (id, protectorId, seniorId, type, createdAt 등)
  const query = 'INSERT INTO relations (protectorId, seniorId, relationType) VALUES (?, ?, ?)';
  
  db.query(query, [protectorId, seniorId, relationType], (err, result) => {
    if (err) {
      console.error("❌ 관계 저장 에러:", err);
      // 만약 테이블이 아직 없다면 에러가 날 수 있습니다.
      return res.status(500).json({ message: '관계 저장 실패', error: err.message });
    }
    console.log("✅ 관계 등록 완료!");
    res.status(201).json({ message: '관계 등록 성공!' });
  });
});

app.listen(port, () => {
  console.log(`🚀 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});