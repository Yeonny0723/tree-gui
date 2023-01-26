# :: ThorDrive 트리 GUI 과제

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

## 실행

```bash
> yarn start
```

```bash
> npm run start
```

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
```
