# 자모야 모여라

`ㅂㅗㄱㅗㅅㅓ.pdf`와 같이 자음과 모음이 분리된 파일명을 `보고서.pdf`로 수정해 주는 CLI 도구로, 윈도⋅리눅스⋅macOS를 모두 지원[^1]합니다. 설치 없이 바로 사용할 수 있는 [웹사이트]도 제공합니다.

[^1]: [npm] 패키지이므로 [Node.js]가 설치되는 모든 운영체제에서 사용할 수 있습니다.

[웹사이트]: https://jamoya.one/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/

## 배경 설명

macOS Finder 앱은 한국어 파일 이름을 NFD 방식으로 분해하여 (`ㄱ+ㅏ`) 기록합니다. 반면 윈도 등의 운영체제는 NFC 방식으로 결합하여 (`가`) 기록합니다. 그래서 맥에서 작업한 파일은 윈도에서 파일명의 자소가 분리되어 표시됩니다. 이를 해결하기 위해선 파일명을 NFC로 인코딩해야 합니다.

## 준비 사항

[Node.js]와 [npm]을 필요로 합니다. 최신 Node.js LTS 설치 파일을 다운로드해 설치합니다.

- (윈도) `Add to PATH`를 체크해야 합니다.
- [npm]은 Node.js 설치 시 함께 설치됩니다.
- [nvm] 등 버전 관리자를 활용해도 무관합니다.

[nvm]: https://github.com/nvm-sh/nvm

## 사용 방법

변환하고 싶은 파일(들)이 위치한 경로에서 터미널을 열고, 다음 명령어 중 하나를 실행합니다.

```bash
npx jamoya-one@latest # 읽기 전용 - NFD로 인코딩 된 파일을 안내합니다.
npx jamoya-one@latest --write # 쓰기 - 파일명을 NFC로 인코딩합니다.
```

다음 안내가 표시될 경우 `y`를 눌러 패키지를 설치합니다.

```
Need to install the following packages:
  jamoya-one@x.x.x
Ok to proceed? (y)
```

## 부연 설명

- 현재 디렉터리의 파일(들)만 처리됩니다. 하위 경로는 제외됩니다.
- 온점으로 시작하는 파일명은 처리되지 않습니다. (예: `.env`)
