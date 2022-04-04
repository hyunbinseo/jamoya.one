# 자모야 모여라

## 2줄 요약

- `ㅂㅗㄱㅗㅅㅓ.pdf` 👉 `보고서.pdf`
- 프로그램 다운로드 없이 웹에서 간편하게

https://user-images.githubusercontent.com/47051820/160055676-7c5f326b-cd72-4322-8150-488fae25ee00.mp4

## 도구 특징

변환 작업은 웹 브라우저 내에서 진행됩니다.

- 사용자가 제공한 파일은 외부(서버)로 전송되지 않습니다.
- 동영상과 같은 대용량 파일도 빠르게 변환할 수 있습니다.

변환된 파일은 다운로드 형식으로 제공됩니다.

- 폴더를 변환할 경우, 수정된 파일은 개별 다운로드 됩니다.
- 웹사이트의 `(여러) 파일 다운로드` 권한을 허용해 주세요.

macOS에서 파일을 변환한 뒤 공유해도 됩니다.

- 변환된 파일 이름은 윈도우 운영체제에서 정상 표시됩니다.
- 게시글, 이메일, LMS 등에 파일을 첨부할 때 활용합니다.

## 작동 원리

사용자가 제공한 파일의 이름만 `NFC` [유니코드 정규화 방식으로 변경](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)한 뒤 다운로드하는 방식입니다.

```javascript
anchor.download = file.name.normalize("NFC");
```

## 기술 배경

macOS 등에서 한글로 된 파일 이름을 설정할 경우, 윈도우 운영체제에서 자소가 분리되어 표시됩니다.

> Mac OS 에서는 NFD(Normalization Form Canonical Decomposition) 방식을 사용하고, Windows 에서는 NFC(Normalization Form Canonical Composition) 방식을 사용합니다.
>
> Mac OS 에서는 "한글.docx" 라고 이름을 지으면, 내부적으로 "ㅎㅏㄴㄱㅡㄹ.docx" 로 풀어서 유니코드를 저장해 놓고 이것을 보여줄 때 "한글.docx" 이라고 조합해서 보여줍니다. 반면 Windows 에서는 "한글.docx"이라고 파일명을 지으면 실제로 "한글.docx"으로 조합된 글자의 유니코드를 저장합니다.

[파일명의 한글자모가 분해되어 보여지는 현상 (Unicode NFD), Microsoft 기술 문서](https://docs.microsoft.com/ko-kr/archive/blogs/spsofficesupportko/%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9D%98-%ED%95%9C%EA%B8%80%EC%9E%90%EB%AA%A8%EA%B0%80-%EB%B6%84%ED%95%B4%EB%90%98%EC%96%B4-%EB%B3%B4%EC%97%AC%EC%A7%80%EB%8A%94-%ED%98%84%EC%83%81-unicode-nfd)

국가 표준 [KS X 1026-1](https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSX1026-1)에 따르면 응용 프로그램은 현대 한글의 글자 마디를 완성형으로 처리해야 합니다.

> 현대한글 글자마디는 한글 음절(Hangul Syllables) 영역인 `U+AC00` ~ `U+D7A3`의 11,172자를 사용한다. 응용 프로그램의 외부와 자료를 보내고 받을 때는 반드시 완성형 한글 글자마디로 처리해야 한다. 자료를 보내고 받는 방법에는 클립보드(clipboard) 입출력, 파일 입출력, 통신 프로토콜을 통한 입출력 등 가능한 모든 정보 교환 방법이 포함된다.

[정보기술 - 국제문자부호계(UCS) - 한글 - 제1부 : 정보교환용 한글 처리지침, 국가표준인증 통합정보시스템](https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSX1026-1)

## 추가 자료

> Old Korean characters are represented by a series of conjoining jamos. While the Unicode Standard allows for two L, V, or T characters as part of a syllable, KS X 1026-1 only allows single instances. Implementations that need to conform to KS X 1026-1 can tailor the default rules in _Section 3.1  [Default Grapheme Cluster Boundary Specification](https://unicode.org/reports/tr29/#Default_Grapheme_Cluster_Table)_ accordingly.

[Hangul Syllable Boundary Determination, Unicode® Standard Annex #29](https://unicode.org/reports/tr29/#Hangul_Syllable_Boundary_Determination)
