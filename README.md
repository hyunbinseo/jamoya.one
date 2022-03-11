# 파일 이름 자소 분리 해결 도구

## 작동 원리

모든 변환 작업은 서버와의 통신 없이 이루어집니다.

1. 문제가 되는 파일(들)을 선택하거나 끌어다 놓습니다.
2. 웹 브라우저에서 개별 파일의 이름과 내용을 불러옵니다.
3. 파일 이름의 자소가 분리되어 표시되지 않도록 변환합니다.
4. 개별 파일의 내용을 변환된 파일 이름으로 다운로드합니다.

## 기술 배경

macOS에서 저장한 파일의 이름은 윈도우 운영체제에서 자소가 분리됩니다.

> Mac OS 에서는 NFD(Normalization Form Canonical Decomposition) 방식을 사용하고, Windows 에서는 NFC(Normalization Form Canonical Composition) 방식을 사용합니다. 둘 다 표준이어서 어느 한쪽의 잘못이라고 지목할 수 없는 문제 입니다.
>
> Mac OS 에서는 "한글.docx" 라고 이름을 지으면, 내부적으로 "ㅎㅏㄴㄱㅡㄹ.docx" 로 풀어서 유니코드를 저장해 놓고 이것을 보여줄 때 "한글.docx" 이라고 조합해서 보여줍니다. 반면 Windows 에서는 "한글.docx"이라고 파일명을 지으면 실제로 "한글.docx"으로 조합된 글자의 유니코드를 저장합니다.

[파일명의 한글자모가 분해되어 보여지는 현상 (Unicode NFD), Microsoft 기술 문서](https://docs.microsoft.com/ko-kr/archive/blogs/spsofficesupportko/%ED%8C%8C%EC%9D%BC%EB%AA%85%EC%9D%98-%ED%95%9C%EA%B8%80%EC%9E%90%EB%AA%A8%EA%B0%80-%EB%B6%84%ED%95%B4%EB%90%98%EC%96%B4-%EB%B3%B4%EC%97%AC%EC%A7%80%EB%8A%94-%ED%98%84%EC%83%81-unicode-nfd)
