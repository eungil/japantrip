#!/usr/bin/env node
/* data/*.json 을 index.html 안의 <script type="application/json"> 블록으로 인라인한다.
   왜 인라인인가: 일정 페이지가 기본 화면이라 fetch 지연/실패 시 빈 화면이 뜨고,
   file:// 로 열면 fetch 가 아예 막힌다. 인라인이면 항상 즉시, 오프라인에서도 뜬다.

   사용법:  node scripts/build.mjs
   data/itinerary.json 이나 data/food.json 을 고친 뒤 반드시 한 번 실행하고 커밋. */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = join(root, 'index.html');

function inline(html, id, jsonPath) {
  const raw = readFileSync(join(root, jsonPath), 'utf8');
  JSON.parse(raw); // 깨진 JSON이면 여기서 멈춘다
  const min = JSON.stringify(JSON.parse(raw));
  const re = new RegExp(`(<script type="application/json" id="${id}">)[\\s\\S]*?(</script>)`);
  if (!re.test(html)) throw new Error(`index.html 에 #${id} 블록이 없습니다`);
  return html.replace(re, `$1${min}$2`);
}

let html = readFileSync(htmlPath, 'utf8');
html = inline(html, 'itin-data', 'data/itinerary.json');
html = inline(html, 'food-data', 'data/food.json');
html = inline(html, 'transit-data', 'data/transit.json');
html = inline(html, 'shoppinglist-data', 'data/shoppinglist.json');
writeFileSync(htmlPath, html);
console.log('inlined data/itinerary.json + data/food.json + data/transit.json + data/shoppinglist.json → index.html');
