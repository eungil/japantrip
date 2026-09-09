# 오사카 가족여행 사이트

2026년 9월 23~26일, 어른 2 + 아이 2(36·70개월) 오사카 가족여행 일정 사이트.

- 배포: https://eungil.github.io/japantrip/
- 구조: 정적 HTML 한 장 (`index.html`). GitHub Pages(main / root)로 배포.

## 파일

| 파일 | 용도 |
|---|---|
| `index.html` | 배포본. 일정 페이지 + 맛집 지도 페이지 2개를 상단 버튼으로 전환 |
| `osaka-2026-map.kml` | Google My Maps 가져오기용. 37개 지점 |
| `HANDOFF.md` | 전체 컨텍스트 — 여행 사실관계, 일정 구조, 코드 구조, 버그 이력, 서술 원칙 |
| `.claude/` | 이 저장소에서 Claude Code로 작업할 때의 프로젝트 컨텍스트와 전용 에이전트 |

## 작업 방법

내용을 고치려면 `index.html`을 수정하고 커밋·푸시하면 1분쯤 뒤 Pages에 반영된다.
작업 전 **반드시 `HANDOFF.md`를 읽을 것** — 되돌리면 안 되는 설계 결정과 반복하면 안 되는 버그가 정리되어 있다.
