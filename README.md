# 자모야 모여라

`ㅂㅗㄱㅗㅅㅓ.pdf`와 같이 자음과 모음이 분리된 파일명을 `보고서.pdf`로 수정해 주는 CLI 도구입니다. 설치 없이 바로 사용할 수 있는 [웹사이트]도 제공합니다.

[웹사이트]: https://jamoya.one/

## 사전 준비

최신 Node.js LTS를 설치합니다. npm은 함께 설치됩니다. [다운로드](https://nodejs.org/ko/download)

- 윈도 인스톨러에선 'npm'과 'Add to PATH' 항목을 체크합니다.
- [nvm], [nvm-windows] 등의 버전 관리자를 사용해도 무관합니다.

[nvm]: https://github.com/nvm-sh/nvm
[nvm-windows]: https://github.com/coreybutler/nvm-windows

## 사용 방법

변환하고 싶은 파일(들)이 위치한 경로에서 터미널을 엽니다.

```bash
# 다음 명령어 중 하나를 실행합니다.
npx jamoya-one@latest # 읽기 전용 - NFD로 인코딩 된 파일을 안내합니다.
npx jamoya-one@latest --write # 쓰기 - 파일명을 NFC로 인코딩합니다.
```

다음 안내가 표시될 경우 `y`키를 눌러 패키지를 설치합니다.

```
Need to install the following packages:
  jamoya-one@x.x.x
Ok to proceed? (y)
```

## 부연 설명

- `.안녕`과 같이 파일명이 온점으로 시작할 경우 처리되지 않습니다.
- 현재 디렉터리 안의 파일(들)만 처리됩니다. 하위 경로는 제외됩니다.
