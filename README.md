# 오사카 가족여행 사이트

2026년 9월 23~26일, 어른 2 + 아이 2(36·70개월) 오사카 가족여행 일정 사이트.

- 배포: https://eungil.github.io/japantrip/
- 구조: 정적 HTML 한 장 (`index.html`). GitHub Pages(main / root)로 배포.

## 파일

| 파일 | 용도 |
|---|---|
| `index.html` | 배포본. 일정 페이지 + 맛집 지도 페이지 2개를 상단 버튼으로 전환 |
| `data/itinerary.json` · `data/food.json` | 일정·맛집 카드 데이터 (편집 대상) |
| `data/SCHEMA.md` | 데이터 편집 가이드 |
| `scripts/build.mjs` | 데이터를 `index.html`에 인라인 |
| `osaka-2026-map.kml` | Google My Maps 가져오기용. 37개 지점 |
| `HANDOFF.md` | 전체 컨텍스트 — 여행 사실관계, 일정 구조, 코드 구조, 버그 이력, 서술 원칙 |
| `.claude/` | 이 저장소에서 Claude Code로 작업할 때의 프로젝트 컨텍스트와 전용 에이전트 |

## 작업 방법

- **일정·맛집 내용 수정**: `data/*.json` 을 고치고 `node scripts/build.mjs` → 커밋·푸시.
  규칙은 `data/SCHEMA.md`
- **레이아웃·지도·그 외**: `index.html` 직접 수정 → 커밋·푸시

작업 전 **반드시 `HANDOFF.md`를 읽을 것** — 되돌리면 안 되는 설계 결정과 반복하면 안 되는 버그가 정리되어 있다.
