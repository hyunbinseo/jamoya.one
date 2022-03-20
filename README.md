# 파일 이름 자소 분리 해결 도구

`ㅍㅏㅇㅣㄹ ㅇㅣㄹㅡㅁ.pdf` 👉 `파일 이름.pdf`

## 도구 특징

- macOS에서 파일을 변환해도 됩니다. 윈도우 운영체제에서 파일 이름의 자소가 합쳐져 표시됩니다.
- 사용자가 제공한 파일은 서버에 전송되지 않습니다. 모든 변환 작업은 웹 브라우저 내에서 진행됩니다.
- 변환된 파일은 다운로드 방식으로 제공되므로, 웹 사이트에 `(여러) 파일 다운로드` 권한이 필요합니다.

## 작동 원리

사용자가 제공한 파일의 이름만 `NFC` [유니코드 정규화 방식으로 변경](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)한 뒤 다운로드하는 방식입니다.

```javascript
anchor.download = file.name.normalize("NFC");
```

## 기술 배경

macOS 등에서 한글로 된 파일 이름을 설정할 경우, 윈도우 운영체제에서 자소가 분리되어 표시됩니다.

> Mac OS 에서는 NFD(Normalization Form Canonical Decomposition) 방식을 사용하고, Windows 에서는 NFC(Normalization Form Canonical Composition) 방식을 사용합니다. 둘 다 표준이어서 어느 한쪽의 잘못이라고 지목할 수 없는 문제 입니다.
>
> Mac OS 에서는 "한글.docx" 라고 이름을 지으면, 내부적으로 "ㅎㅏㄴㄱㅡㄹ.docx" 로 풀어서 유니코드를 저장해 놓고 이것을 보여줄 때 "한글.docx" 이라고 조합해서 보여줍니다. 반면 Windows 에서는 "한글.docx"이라고 파일명을 지으면 실제로 "한글.docx"으로 조합된 글자의 유니코드를 저장합니다.

[파일명의 한글자모가 분해되어 보여지는 현상 (Unicode NFD), Microsoft 기술 문서](https://docs.microsoft.com/ko-kr/archive/blogs/spsofficesupportko/%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9D%98-%ED%95%9C%EA%B8%80%EC%9E%90%EB%AA%A8%EA%B0%80-%EB%B6%84%ED%95%B4%EB%90%98%EC%96%B4-%EB%B3%B4%EC%97%AC%EC%A7%80%EB%8A%94-%ED%98%84%EC%83%81-unicode-nfd)

## 추가 자료

- [정보기술 - 국제문자부호계(UCS) - 한글 - 제1부 : 정보교환용 한글 처리지침, 국가표준인증 통합정보시스템](https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSX1026-1)
- [Hangul Syllable Boundary Determination, Unicode® Standard Annex #29](https://unicode.org/reports/tr29/#Hangul_Syllable_Boundary_Determination)
