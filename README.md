# :: 파일 시스템 GUI

## 프로젝트 한줄 설명

유저 입력 커맨드에 따라 트리 그래프를 렌더링하는 GUI 애플리케이션입니다. 대표적으로 add, delete, move, change, link 다섯까지 액션을 조작합니다. 
•	add: 파일 및 폴더 추가 
•	delete: 파일 및 폴더 삭제 
•	move: 파일 및 폴더 이동
•	change: 파일 및 폴더 변경
•	link: 두 경로를 잇는 심볼릭 링크 생성


## Demo

https://user-images.githubusercontent.com/70524037/214858739-01d07ff8-870c-45fe-b395-2a34b454bd38.mp4


## 구현 기능

-  인풋 터미널
   -  add
   -  [x] 커맨드 패턴 체크
   -  [x] 추가하려는 파일 존재 여부 체크
   -  [x] 존재하지 않는 경로에 파일 추가시, 경로에 모든 파일이 추가됨 체크
   -  [x] 파일 내 파일/폴더 추가할 수 없도록 메시지
   -  delete
   -  [x] 커맨드 패턴 체크
   -  [x] 삭제하려는 파일 존재 여부 체크
   -  [x] 파일 삭제시 경로에 모든 파일이 삭제됨 체크
   -  link
   -  [x] 커맨드 패턴 체크
   -  [x] 연결하려는 파일 존재 여부 체크
   -  move
   -  [x] 커맨드 패턴 체크
   -  [x] 이동하려는 파일 존재 여부 체크
   -  chage
   -  [x] 커맨드 패턴 체크
   -  [x] 수정하려는 파일 존재 여부 체크
   -  [x] 파일 업데이트 시 경로에 모든 파일이 업데이트됨을 체크
-  그래프 트리
   -  [x] 깊이를 알 수 없는 컴포넌트 recursive 렌더링


## 프로젝트 폴더 설명

```
📦
├─ public
└─ src
   ├─ components // 페이지를 구성하는 컴포넌트
   │  ├─ Terminal
   │  └─ Tree
   ├─ hook // 상태 관리 훅
   ├─ page // 페이지 컴포넌트
   ├─ route // 라우트
   ├─ style // 스타일링
   └─ utils // 비즈니스 로직 관리

```


## 실행

```bash
> yarn install
> yarn start
```

```bash
> npm install
> npm run start
```


# 가정

재귀적으로* 발생할 수 있는 add, delete, change와 같은 커맨드에는 유저에게 한번 더 확인을 받도록 개발하였습니다. 
(*재귀적이란? 하위 경로 내 파일에도 동시 적용될 수 있음을 의미합니다)


## 테스팅 인풋

위 구현 기능을 모두 테스트 해보기 위한 테스팅 인풋입니다.

-  요구사항 인풋

```bash
    add directory /a
    add directory /b/a/c
    add file /b/b/k
    add file /b/b/m
    link /a /b/a/c/a
    move /b/b/m /a
    change /b/b hide
```

-  이어진 추가 테스팅 인풋

```bash
    hello
    > 존재하지 않는 커맨드입니다
    add dir /a
    > 커맨드 형식이 옳지 않습니다
    add file a
    > 커맨드 형식이 옳지 않습니다
    add file /a/m/k
    > 파일 내 파일 또는 폴더를 추가할 수 없습니다
    add file /a/m
    이미 존재하는 파일 또는 폴더명입니다
    delete /k
    > 유효하지않은 파일 또는 폴더 주소입니다
    add file /i
    add file /j
    link /i /j/i
    link /j/i /i/j
    > 파일이 서로를 연결하며 무한 심볼릭 루프가 생성됩니다. 원하시던 결과가 맞나요?
```
