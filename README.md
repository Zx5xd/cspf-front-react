# 🐾 CSPF - 반려동물 가구를 위한 종합 케어 서비스 (Front-end)

> 반려동물 보호자와 법률·보험·병원 전문가를 연결하는 상담 예약 및 실시간 채팅 플랫폼 (Web 관리자 페이지)

<br>

## 🛠 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)

<br>

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 개발 기간 | 2023.03.04 ~ 2023.11.14 |
| 개발 인원 | 4인 팀 프로젝트 |

<br>

## ✨ 주요 기능

- **상담 대기 목록** : 전문가가 대기 중인 진료·상담 예약 내역 확인 및 수락/거부 처리
- **실시간 채팅** : Socket.io 기반 전문가(Web)↔클라이언트(APP) 실시간 메시지 송수신 및 이미지 첨부
- **유저 관리** : 전체 클라이언트·전문가 조회 및 계정 정보 수정
- **공지 관리** : 공지사항 작성·조회·수정
- **문의 관리** : 전체 문의 내역 확인 및 댓글을 통한 답변 처리
- **전문가 자격 심사** : 전문가 회원가입 요청 내역 확인 및 자격증 조회 후 승인/거부

<br>

## 🔥 트러블슈팅

### 1. 서버 간 데이터 전송 실패 (CORS)
**문제** : 다른 도메인/IP의 프론트엔드 서버와 백엔드 서버 간 데이터 교환 불가

**해결** : Front 및 Back-end 서버에 CORS 설정을 적용하여 다른 도메인 간 데이터 교환이 가능하도록 처리

---

### 2. WebSocket 데이터 교환 실패
**문제** : Socket.io를 통한 모바일 앱/웹 브라우저와 백엔드 서버 간 데이터 교환 불가

**해결** : 백엔드 서버에 웹소켓 게이트웨이 설정 및 CORS 옵션 credential 활성화. JWT 토큰 기반 사용자 인증 후 socket.io Auth 헤더에 JWT Token 설정하여 해결

<br>

## 📁 백엔드 Repository
- NestJS (Back-end): [cspf-back-Nest](https://github.com/Zx5xd/cspf-back-Nest)
