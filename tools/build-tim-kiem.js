// Dựng chỉ mục tra cứu toàn đảo → tim-kiem-data.js
// Chạy: node tools/build-tim-kiem.js   (chạy lại mỗi khi dữ liệu các đảo thay đổi)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { grab } = require('./_lit.js');
const ROOT = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const g = (f, n) => grab(rd(f), n);

// ---- nhãn trường (key → nhãn hiển thị) ----
const LBL = {
  k: 'Từ', word: 'Từ', kanji: 'Từ', w: 'Từ', fixw: 'Từ đúng', star_word: 'Từ ★', pattern: 'Mẫu', gram_pattern: 'Mẫu',
  r: 'Đọc', reading: 'Đọc', h: 'Đọc', synr: 'Đọc', fixr: 'Đọc', fixwr: 'Đọc', fixpr: 'Đọc', on: 'Âm On', kun: 'Âm Kun',
  v: 'Nghĩa', vi: 'Nghĩa', m: 'Nghĩa', meaning: 'Nghĩa', meaning_vn: 'Nghĩa', mean: 'Nghĩa', synv: 'Nghĩa', vn: 'Nghĩa', fixg: 'Nghĩa',
  j: 'Nghĩa Nhật', meaning_jp: 'Nghĩa Nhật',
  set: 'Cụm', sets: 'Cụm', set1: 'Cụm', co: 'Cụm', collocations: 'Cụm', okf: 'Cụm', fixp: 'Cụm sửa', setv: 'Nghĩa cụm',
  syn: 'Đồng nghĩa', sy: 'Đồng nghĩa', synonyms: 'Đồng nghĩa', syn_items: 'Đồng nghĩa',
  s: 'Câu', q: 'Câu', question: 'Câu', ex: 'Ví dụ', ej: 'Câu', text: 'Câu', full_sentence: 'Câu', jp: 'Câu', stem: 'Câu', ex_jp: 'Ví dụ',
  sv: 'Dịch', ev: 'Dịch', translate: 'Dịch', t: 'Dịch', ex_vn: 'Dịch',
  e: 'Giải thích', explain: 'Giải thích', exp_s: 'Giải thích', exp_r: 'Giải thích', note: 'Giải thích', confuse: 'Dễ nhầm', hint: 'Gợi ý',
  gram_explain: 'Ngữ pháp', nuance: 'Sắc thái', fixn: 'Giải thích', tip: 'Mẹo phân biệt',
  o: 'Đáp án', op: 'Đáp án', a: 'Đáp án', opts: 'Đáp án', options: 'Đáp án', answer: 'Đáp án', ans: 'Đáp án',
  hv: 'Hán Việt', hanviet: 'Hán Việt', wrong: 'Đáp án sai', wrong_explained: 'Đọc sai', breakdown: 'Chữ Hán', parts: 'Chữ Hán',
  passage: 'Bài đọc', fix: 'Sửa thành', choices: 'Đáp án', chain: 'Mạch ý', conn: 'Từ nối', char: 'Chữ Hán', trap: 'Bẫy', term: 'Thuật ngữ', tag: 'Nhãn', rep: 'Diễn đạt lại', target_word: 'Từ', target_set: 'Cụm', target_syn: 'Đồng nghĩa', target_meaning_vn: 'Nghĩa', target_reading: 'Đọc', target_hv: 'Hán Việt', sentence: 'Câu', correctExplain: 'Giải thích', correctExplainJp: 'Giải thích', vi_p2: 'Dịch', anchor: 'Mỏ neo', anchorWords: 'Mỏ neo', first: 'Câu đầu', last: 'Câu cuối', link: 'Liên kết', notes: 'Chú thích', why: 'Lý do', html: 'Câu', qhtml: 'Câu', trans: 'Dịch', kw: 'Từ khoá', kw_hint: 'Từ khoá', kw_loai: 'Từ khoá', main: 'Ý chính', option: 'Đáp án', passageHTML: 'Bài đọc', title: 'Tiêu đề', traps: 'Bẫy', label: 'Câu hỏi',
};
const SKIP = new Set(['id', 'type', 'sec', 'sub', 'group', 'order', 'round', 'audio', 'img', 'src', 'date', 'source', 'bai', 'kai', 'num_orig', 'no', 'correct', 'p']);
const KANA_KEYS = new Set(['r', 'reading', 'h', 'synr', 'fixr', 'fixwr', 'fixpr', 'on', 'kun', 'wrong']);

const clean = s => String(s)
  .replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
  .replace(/\r/g, '').replace(/[ \t]+/g, ' ').replace(/\n{2,}/g, '\n').trim();
const hasLetters = s => /[぀-ヿ一-鿿A-Za-zÀ-ỹ]/.test(s);

// gom mọi chuỗi trong obj thành [nhãn, text]; gộp trùng nhãn kề nhau
function flat(obj, skipKeys) {
  const out = [];
  const walk = (x, key) => {
    if (x == null) return;
    if (typeof x === 'string') {
      const t = clean(x);
      if (!t || !hasLetters(t)) return;
      if (/^[a-z0-9_\-]{1,6}$/i.test(t) && !KANA_KEYS.has(key)) return; // mã nội bộ
      out.push([LBL[key] || 'Khác', t]);
      return;
    }
    if (typeof x !== 'object') return;
    if (Array.isArray(x)) { x.forEach(y => walk(y, key)); return; }
    for (const k of Object.keys(x)) {
      if (SKIP.has(k) || (skipKeys && skipKeys.has(k))) continue;
      walk(x[k], LBL[k] ? k : (key && /^\d+$/.test(k) ? key : k));
    }
  };
  walk(obj, '');
  // gộp cùng nhãn liên tiếp
  const merged = [];
  for (const [l, t] of out) {
    const last = merged[merged.length - 1];
    if (last && last[0] === l && (last[1].length + t.length) < 400) last[1] += '\n' + t;
    else merged.push([l, t]);
  }
  return merged;
}

const recs = [];
const pages = [];
function page(file, island, name) { pages.push([file, island, name]); return pages.length - 1; }
// rec: p=trang, l=nhãn bài, h=từ khoá chính, m=câu chính, mv=dịch, f=[[nhãn,text]], j=tham số nhảy
function add(p, l, h, m, mv, f, j) {
  recs.push([p, l, clean(h || ''), clean(m || ''), clean(mv || ''), f, j === undefined ? null : j]);
}
const fill = (s, w) => String(s || '').replace(/（\s*[　 ]*\s*）|\(\s*[　 ]*\s*\)/, '（' + w + '）');

// ================= ĐẢO 1 =================
{
  const p = page('dao1-hantu-doc-kanji.html', 1, 'Đọc Kanji');
  const D = vm.runInNewContext(rd('dao1-hantu-doc-kanji-data.js') + ';DATA');
  D.forEach(v => add(p, 'Vòng ' + v.round + ' · ' + v.k, v.k + '（' + v.r + '）', v.ex, v.m, flat(v, new Set(['ex', 'k'])), v.k));
}
{
  const p = page('dao1-hantu-am-hanviet.html', 1, 'Âm Hán Việt');
  const K = g('dao1-hantu-am-hanviet.html', 'KANJI_VOCAB');
  K.forEach(v => add(p, v[0], v[0] + '（' + v[1] + '）', v[4] ? '〜 ' + v[4] : '', v[2], [['Đọc', v[1]], ['Nghĩa', v[2]], ['Cụm', v[4] || '']].filter(x => x[1]), v[0]));
  const S = g('dao1-hantu-am-hanviet.html', 'SET_VOCAB');
  S.forEach(v => add(p, 'Cụm ' + v[0], v[0] + '（' + v[1] + '）', v[4] || '', v[2],
    [['Đọc', v[1]], ['Nghĩa', v[2]], ['Cụm', (v[5] || []).map(x => x[0] + ' — ' + x[1]).join('\n')]], v[0]));
}

// ================= ĐẢO 2 =================
{
  const f = 'dao2-hailuu-mondai2-vancanh.html';
  const p = page(f, 2, 'Mon2 văn cảnh');
  const D = g(f, 'DATA'), T = g(f, 'TIPS') || {};
  Object.keys(D).forEach(r => D[r].forEach((q, qi) => {
    const ok = q.w[q.a - 1] || {};
    const fs = [];
    q.w.forEach((w, wi) => {
      const mark = wi === q.a - 1 ? '✅ ' : '';
      fs.push(['Đáp án', mark + w.k + '（' + w.r + '）' + (w.hv ? ' ' + w.hv : '') + ' — ' + w.v + (w.j ? '\n' + w.j : '')]);
      if (w.set) fs.push(['Cụm ' + w.k, clean(w.set).split('・').join('\n') + (w.setv ? '\n→ ' + w.setv : '')]);
      if (w.syn) fs.push(['Đồng nghĩa ' + w.k, w.syn + (w.synr ? '（' + w.synr + '）' : '') + (w.synv ? ' — ' + w.synv : '')]);
    });
    const tip = T[r + '_' + qi]; if (tip) fs.push(['Mẹo phân biệt', tip]);
    add(p, (r === 'ontap' ? 'Ôn tập' : '第' + r + '回') + ' · câu ' + (qi + 1), ok.k + '（' + (ok.r || '') + '）', fill(q.s, ok.k), q.sv, fs.map(x => [x[0], clean(x[1])]), [r, qi]);
  }));
}
{
  const f = 'dao2-hailuu-mondai2-bimatngucanh.html';
  const p = page(f, 2, 'Mon2 bí mật ngữ cảnh');
  const D = vm.runInNewContext(rd('dao2-hailuu-mondai2-bimatngucanh-data.js') + ';QUIZ_DATA');
  D.forEach((t, ti) => t.questions.forEach((q, qi) => {
    const fs = q.a.map((a, i) => ['Đáp án', (i === q.c ? '✅ ' : '') + a + (q.m && q.m[i] ? ' — ' + q.m[i] : '')]);
    add(p, t.name + ' · câu ' + (qi + 1), q.a[q.c], q.ej || q.q, q.ev, fs, [ti, qi]);
  }));
}
{
  const f = 'dao2-hailuu-mondai3-dongnghia.html';
  const p = page(f, 2, 'Mon3 đồng nghĩa');
  const V = g(f, 'V');
  V.forEach((v, i) => {
    const fs = [['Từ', v.k + '（' + v.h + '）' + (v.p ? ' ' + v.p : '')], ['Nghĩa', (v.vi || '') + (v.m ? '\n' + v.m : '')],
      ['Đồng nghĩa', (v.sy || []).join('\n')], ['Cụm', (v.co || []).join('\n')],
      ['Đáp án', (v.op || []).map((o, k) => (k === v.a - 1 ? '✅ ' : '') + o).join('\n')]];
    add(p, '第' + v.r + '回 · câu ' + v.n, v.k + '（' + v.h + '）', v.s, v.vi, fs.filter(x => x[1]), i);
  });
}
{
  const f = 'dao2-hailuu-mondai4-cachdung.html';
  const p = page(f, 2, 'Mon4 cách dùng');
  const A = g(f, 'allData');
  Object.keys(A).forEach(r => A[r].qs.forEach((q, qi) => {
    const fs = [['Nghĩa', q.m]];
    (q.o || []).forEach((o, i) => fs.push(['Câu ' + (i + 1) + (i === q.c ? ' ✅' : ' ✗'), o + (q.t && q.t[i] ? '\n→ ' + q.t[i] : '') + (q.tf && q.tf[i] && q.tf[i][1] ? '\n✔ ' + q.tf[i][1] : '')]));
    if (q.okf) fs.push(['Cụm', q.okf]);
    if (q.sy && q.sy.length) fs.push(['Đồng nghĩa', q.sy.map(s => s[0] + (s[2] ? ' — ' + s[2] : '')).join('\n')]);
    else if (q.syn) fs.push(['Đồng nghĩa', q.syn]);
    if (q.e) fs.push(['Giải thích', q.e]);
    add(p, r + ' · câu ' + (qi + 1), q.k + '（' + (q.r || '') + '）', (q.o || [])[q.c], q.t && q.t[q.c], fs.map(x => [x[0], clean(x[1])]), [r, qi]);
  }));
}

// ================= ĐẢO 3 =================
{
  const f = 'dao3-suongmu-tonghop-theonhom.html';
  const p = page(f, 3, 'Ngữ pháp theo nhóm');
  g(f, 'ITEMS').forEach(it => add(p, 'Mẫu ' + it.id, it.pattern, it.ex_jp, it.ex_vn, flat(it, new Set(['ex_jp', 'ex_vn'])), null));
}
{
  const f = 'dao3-suongmu-powerdrill-full30.html';
  const p = page(f, 3, 'Power Drill ngữ pháp');
  const Q = g(f, 'QUIZ_DATA');
  (Q.rounds || []).forEach(r => (r.parts || []).forEach((pt, pi) => (pt.items || []).forEach((it, i) => {
    const ok = Array.isArray(it.o) && typeof it.a === 'number' ? it.o[it.a - 1] : '';
    add(p, r.name + ' · 問題' + (pi + 1) + ' · câu ' + (i + 1), ok, ok ? fill(it.q, ok) : it.q, it.vi, flat(it, new Set(['q', 'vi'])), ['r', r.id]);
  })));
  (Q.trainings || []).forEach(t => (t.items || []).forEach((it, i) =>
    add(p, t.name + ' · câu ' + (i + 1), it[it.ans] || '', it.q, it.vi, flat(it, new Set(['q', 'vi'])), ['t', t.id])));
}

// ================= ĐẢO 9 =================
{
  const f = 'dao9-anhsang-mon8-doanvan.html';
  const p = page(f, 9, 'Mon8 đoản văn');
  (g(f, 'data') || []).forEach((b, i) => add(p, b.bai + ' · ' + b.date, '', '', '', flat(b), i));
}
{
  const f = 'dao9-anhsang-mon9-trungvan.html';
  const p = page(f, 9, 'Mon9 trung văn');
  (g(f, 'baiList') || []).forEach((b, i) => add(p, b.title, '', '', '', flat(b), i));
}
{
  const f = 'dao9-anhsang-mondai10-12-truongvan.html';
  const p = page(f, 9, 'Mon10–13 trường văn');
  const cnt = {}; (g(f, 'DATA') || []).forEach(b => { const k = cnt[b.source] = (cnt[b.source] || 0); cnt[b.source]++; add(p, b.title, '', '', '', flat(b, new Set(['title'])), [b.source, k]); });
}

// ================= ĐẢO 10 =================
{
  const f = 'dao10-daichien-dethi.html';
  const p = page(f, 10, 'Đại chiến đề thi');
  const D = vm.runInNewContext(rd('dao10-daichien-dethi-data.js').replace(/^const FULL_DATA=/, 'FULL_DATA=') + ';FULL_DATA');
  Object.keys(D).forEach(ky => Object.keys(D[ky]).forEach(mon => {
    const arr = D[ky][mon]; if (!Array.isArray(arr)) return;
    arr.forEach((q, i) => {
      let head = '', main = q.question || q.full_sentence || '';
      const opts = q.options || [];
      const ok = typeof q.ans === 'number' ? opts[q.ans - 1] : null;
      if (mon === 'mon1') head = q.kanji + '（' + q.reading + '）';
      else if (mon === 'mon4') { head = q.word + '（' + q.reading + '）'; const c = opts.find(o => o && o.correct); main = c ? c.text : ''; }
      else if (ok && typeof ok === 'object') { head = ok.word + '（' + (ok.reading || '') + '）'; main = fill(q.question, ok.word); }
      else if (q.star_word) head = q.star_word;
      else if (q.answer) { head = q.answer; main = fill(q.question, q.answer); }
      if (q.full_sentence) main = q.full_sentence.replace(/\*/g, '');
      add(p, 'Đề ' + ky + ' · ' + mon.replace('mon', 'Mon') + ' · câu ' + (q.q || i + 1), head, main, q.translate, flat(q, new Set(['question', 'translate', 'full_sentence'])), [ky, mon, i]);
    });
  }));
}
{
  const f = 'dao10-daichien-tuvung30.html';
  const p = page(f, 10, 'Từ vựng 30 kỳ');
  g(f, 'Q').forEach((q, i) => {
    const main = /<hl>/.test(q.q) ? q.q : fill(q.q, q.ans);
    add(p, 'Kỳ ' + q.kai + ' · ' + String(q.m).toUpperCase() + ' · ' + clean(q.label || ''), q.ans, main, '', flat(q, new Set(['q', 'label', 'm'])), null);
  });
}

// ================= GHI FILE =================
const out = { v: Date.now(), pages, recs };
const js = '/* Tự sinh bởi tools/build-tim-kiem.js — đừng sửa tay */\nwindow.TK_DATA=' + JSON.stringify(out) + ';\n';
fs.writeFileSync(path.join(ROOT, 'tim-kiem-data.js'), js);
const by = {};
recs.forEach(r => { const k = pages[r[0]][2]; by[k] = (by[k] || 0) + 1; });
console.log('records', recs.length, 'size', (js.length / 1e6).toFixed(2) + 'MB');
console.log(by);
