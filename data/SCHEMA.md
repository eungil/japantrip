# 데이터 파일 편집 가이드

일정과 맛집 카드는 이 폴더의 JSON에서 렌더링됩니다.
`index.html`의 카드 HTML을 직접 고치지 마세요 — 빌드하면 덮어씁니다.

## 편집 → 배포 흐름

1. `data/itinerary.json` 또는 `data/food.json` 수정
2. `node scripts/build.mjs` 실행 (JSON을 `index.html` 안에 인라인)
3. `git add -A && git commit && git push` → 1~2분 뒤 https://eungil.github.io/japantrip/ 반영

`build.mjs`는 JSON이 깨져 있으면 거기서 멈춥니다. 커밋 전에 꼭 한 번 실행.
문자열 안에 `</script>` 는 넣지 마세요 (인라인 스크립트가 깨짐).
`<b>...</b>` 강조는 됩니다. 따옴표는 `\"` 로 이스케이프.

## itinerary.json

```
meta: { title, sub:[줄1,줄2,줄3], flights:[{code,route,time}], flightMemo }
days: [ 하루 객체 ]
```

### 하루 객체
| 필드 | 의미 |
|---|---|
| `id` | `p1`~`p4` (탭 전환에 쓰임, 바꾸지 말 것) |
| `cvar` | 날짜색 CSS 변수 `--d1`~`--d4` |
| `tab` | `{ n: "9/23", w: "수 · 도착" }` — 상단 탭 라벨 |
| `title` | 날짜 제목 (dayhead h2) |
| `intro` | 날짜 요약 문단 |
| `flag` | (선택) 주황 경고 박스. `<b>` 가능 |
| `stops` | 타임라인 항목 배열 |
| `alt` | (선택) 하단 대체안 박스 배열 |

### stops 항목 — 둘 중 하나
**일반 카드**
```json
{ "time": "13:20", "card": {
  "title": "제목",
  "badges": [{ "b": "must", "t": "17시 마감", "sm": true }],
  "jp": "黒門市場",
  "hi": true,
  "blocks": [ ... ]
}}
```
- `badges[].b`: `kid`(초록) `must`(빨강) `rsv`(보라). `sm:true` = 작은 글씨
- `jp`: 탭하면 일본어가 복사되는 버튼. 없으면 생략
- `hi:true`: 카드에 빨간 테두리 (승차권 구매처럼 절대 놓치면 안 되는 것)

**이동 구간**
```json
{ "time": "08:30", "move": {
  "segs": [
    { "pill": "사카이스지선", "c": "#8A5326", "t": "니혼바시 → 사카이스지혼마치", "dur": "4분", "note": "호텔에서 도보 5분" }
  ],
  "sum": "<b>08:30 출발 → 09:15경 도착.</b> 여유 45분"
}}
```
- `c`: (선택) 노선색. 알약과 글자에 적용
- `note`: (선택) dur 뒤에 ` · note` 로 붙음
- `sum`: (선택) 세그먼트 아래 날짜색 굵은 요약줄
- `time` 은 빈 문자열 `""` 가능 (열차 안 등)

### blocks 항목 — 한 종류씩
| | |
|---|---|
| `{ "p": "문단 <b>강조</b>" }` | 본문 문단 |
| `{ "ul": ["항목1", "항목2"] }` | 불릿 목록 |
| `{ "tip": "회색 팁 박스" }` | 팁 박스 (`<b>`는 날짜색) |
| `{ "money": "어른 ¥800 · 미취학 무료" }` | 점선 요금 태그 |

### alt 항목
```json
{ "lead": "여유가 남으면", "leadc": "#B01C1C", "title": "제목",
  "border": "#E0B9B4", "bg": "#FFFBFA", "blocks": [ ... ] }
```
`leadc` `border` `bg` 는 선택 (붉은 경고 박스용). 기본은 점선 회색.

## food.json

```
groups: [ { area, title, cards:[ 카드 ] } ]
footer: "하단 안내문 <br> 가능"
```

- `area`: `난바` `도톤보리` `나라` `공항` — **`index.html`의 `<div class="group" data-area="…">` 와 일치해야 함.** 새 지역을 추가하려면 index.html에도 빈 `<div class="group" data-area="새지역"></div>` 와 지역 필터 칩을 추가해야 함
- 지도 핀(`MAPDATA`)은 별도입니다 — 가게를 추가하면 `index.html`의 `MAPDATA` 에도 좌표를 넣어야 지도에 뜸

### 카드
| 필드 | 의미 |
|---|---|
| `name` | 가게 이름 |
| `cat` | 종류. 필터 칩과 매칭됨 (`우동` `라멘` `소바` `돈가스` `규카츠` `카레` `타코야키` `오코노미야키` `당고·디저트` `커피` `빵` `솥밥` `푸드코트`). 새 종류는 index.html 칩에도 추가 |
| `jpname` | `일본어명 · 주소` |
| `meta` | `[{ "t": "도보 3분" }, { "t": "수요일 휴무", "rest": true }]` — `rest:true` 면 빨간 글씨 |
| `desc` | 설명 문단. `<b>` 가능 |
| `kid` | `[{ "level": "good", "html": "<b>아이 동반 ◎</b> …" }]`. level: `good`(초록) `bad`(붉음) `""`(회색). 여러 개 가능 |
| `gm` | 구글맵 검색어 (일본어 권장). 링크는 자동 생성 |

## transit.json

일정 탭 맨 끝 "교통" 패널(`#ptr`)에서 렌더링됩니다. 지금은 `{}` (빈 객체) 플레이스홀더 — 채우면 자동으로 뜹니다.

```
{
  "title": "오사카 교통",
  "intro": "부제 (선택)",
  "payment": { "heading": "교통카드 결제", "blocks": [ ...위 blocks 항목과 동일한 p/ul/tip/money... ] },
  "lines": { "heading": "지하철 노선", "items": [
    { "name": "미도스지선", "jp": "御堂筋線", "color": "#E5171F", "desc": "설명 문단", "stops": ["난바","신사이바시","우메다"] }
  ]}
}
```

- `payment.blocks`는 itinerary.json의 `blocks`와 완전히 같은 문법 (`p`/`ul`/`tip`/`money`)
- `lines.items[].color`는 실제 노선 색(hex) 권장 — 카드 왼쪽 테두리와 배지에 그대로 씀
- `title`이 없으면(빈 객체) "내용을 준비 중입니다" 플레이스홀더가 뜸
