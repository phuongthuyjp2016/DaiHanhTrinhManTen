// Shared tiny template engine for per-island "kanji/vocab card" templates.
// Used both by the island's own page (rendering its full list) and by the
// main app's Sổ Tay screen (rendering a single saved card using the exact
// same markup/CSS as the source island, without copying either by hand).

function dcParseCardTemplate(text) {
  const css = (text.split('<!--STYLE-->')[1] || '').split('<!--/STYLE-->')[0] || '';
  const html = (text.split('<!--CARD-->')[1] || '').split('<!--/CARD-->')[0] || '';
  return { css: css.trim(), html: html.trim() };
}

function dcEscapeHtml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function dcRenderCardTemplate(tpl, data) {
  let out = tpl;
  out = out.replace(/\{\{#each (\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, function (_, key, inner) {
    const arr = data[key] || [];
    return arr.map(function (item) {
      if (item && typeof item === 'object') {
        return inner.replace(/\{\{this\.(\w+)\}\}/g, function (__, prop) {
          return dcEscapeHtml(item[prop]);
        });
      }
      return inner.replace(/\{\{this\}\}/g, dcEscapeHtml(item));
    }).join('');
  });
  out = out.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, function (_, key, inner) {
    return data[key] ? inner : '';
  });
  out = out.replace(/\{\{\{(\w+)\}\}\}/g, function (_, key) {
    return data[key] != null ? data[key] : '';
  });
  out = out.replace(/\{\{(\w+)\}\}/g, function (_, key) {
    return dcEscapeHtml(data[key]);
  });
  return out;
}

// Injects a template's <style> block into <head> once (deduped by the
// template's own source URL), so hosting a card elsewhere never needs the
// host page to carry a copy of that island's CSS.
var _dcInjectedCardStyles = {};
function dcInjectCardStyle(key, css) {
  if (_dcInjectedCardStyles[key]) return;
  _dcInjectedCardStyles[key] = true;
  const el = document.createElement('style');
  el.setAttribute('data-dc-card-style', key);
  el.textContent = css;
  document.head.appendChild(el);
}

// Speak / expand handlers shared by every rendered card, regardless of
// which page (island or Sổ Tay) it is displayed on.
function dcKanjiCardToggle(el) {
  if (el.getAttribute('data-pinned') === '1') return;
  el.classList.toggle('expanded');
}
function dcKanjiCardSpeak(btn) {
  const text = btn.getAttribute('data-speak');
  if (!text || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  document.querySelectorAll('.speak-btn.speaking').forEach(function (b) { b.classList.remove('speaking'); });
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = 'ja-JP'; utt.rate = 0.9; utt.pitch = 1; utt.volume = 1;
  btn.classList.add('speaking');
  utt.onend = function () { btn.classList.remove('speaking'); };
  utt.onerror = function () { btn.classList.remove('speaking'); };
  const pick = function () {
    const vs = window.speechSynthesis.getVoices();
    for (let i = 0; i < vs.length; i++) {
      if (vs[i].lang === 'ja-JP' || vs[i].lang.indexOf('ja') === 0) { utt.voice = vs[i]; break; }
    }
    window.speechSynthesis.speak(utt);
  };
  if (window.speechSynthesis.getVoices().length > 0) pick();
  else window.speechSynthesis.onvoiceschanged = pick;
}
function dcKanjiCardToggleNotebook(btn) {
  if (typeof toggleNotebook === 'function') {
    const id = btn.closest('[data-nb-id]').getAttribute('data-nb-id');
    toggleNotebook(id, btn);
  }
}

function dcHighlightText(t, q) {
  const esc = dcEscapeHtml(t);
  if (!q) return esc;
  const re = new RegExp(String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
  return esc.replace(re, function (m) { return '<mark>' + m + '</mark>'; });
}

// Maps one dao1-hantu-doc-kanji.html DATA item (or a Sổ Tay entry's saved
// `raw` copy of that same item) into the field set dao1's card template
// expects. Shared so the island's own list and the notebook's inline
// preview render identically from a single source of truth.
// opts: { q, notebookIds, interactive, pinned }
//   interactive: show the 📓/▼ buttons (island list). false for a
//   read-only Sổ Tay preview, where `pinned` instead forces the card open.
function dcBuildDao1KanjiCardData(item, opts) {
  opts = opts || {};
  const q = opts.q || '';
  const notebookIds = opts.notebookIds || null;
  const interactive = opts.interactive !== false;
  const pinned = !!opts.pinned;
  const rLabel = item.round === 25 ? '復習問題' : ('第' + item.round + '回');
  const nbId = 'dao1-hantu-doc-kanji.html::' + item.k;
  const nbData = JSON.stringify({
    source: 'dao1-hantu-doc-kanji.html', sourceLabel: 'Đảo 1 · Hán Tự - Đọc Kanji',
    title: item.k, reading: item.r, meaning: item.m, raw: item
  }).replace(/"/g, '&quot;');
  const nbActive = !!(notebookIds && notebookIds.has(nbId));

  let exHtml = dcEscapeHtml(item.ex || '');
  const kEsc = dcEscapeHtml(item.k);
  exHtml = exHtml.replace(new RegExp(kEsc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '<b>' + kEsc + '</b>');

  const we = item.wrong_explained || [];

  return {
    nbId, nbData,
    nbActiveClass: nbActive ? ' active' : '',
    expandedClass: pinned ? ' expanded' : '',
    pinnedAttr: pinned ? '1' : '',
    interactive: interactive,
    speakTxt: item.k + '。' + item.r,
    kHl: dcHighlightText(item.k, q),
    rHl: dcHighlightText(item.r, q),
    mHl: dcHighlightText(item.m, q),
    exHtml,
    rLabel, order: item.order,
    hasParts: !!(item.parts && item.parts.length),
    parts: (item.parts || []).map(function (p) { return { kanji: p.kanji, hanviet: p.hanviet || '—', on: p.on || '—', kun: p.kun || '—', meaning: p.meaning || '' }; }),
    hasConfuse: !!item.confuse,
    confuse: item.confuse || '',
    hasWrong: !!(we.length && !(we[0].meaning && we[0].meaning.indexOf('→ cần') === 0)),
    wrong: we.map(function (w) { return { r: w.r || '', meaning: w.meaning || '' }; }),
    hasCollocations: !!(item.collocations && item.collocations.length),
    collocations: (item.collocations || []).map(function (c) { return { text: c }; }),
    hasSynonyms: !!(item.synonyms && item.synonyms.length),
    synonyms: (item.synonyms || []).map(function (s, i) { return { text: s, mainClass: i === 0 ? ' main' : '' }; })
  };
}

// Same idea as dcBuildDao1KanjiCardData, for
// dao2-hailuu-mondai3-dongnghia.html's V item shape (k/h/m/vi/p/r/n/sy/co).
// opts: { notebookIds, interactive }
function dcBuildDao2Mondai3CardData(item, opts) {
  opts = opts || {};
  const notebookIds = opts.notebookIds || null;
  const interactive = opts.interactive !== false;
  const nbId = 'dao2-hailuu-mondai3-dongnghia.html::' + item.k;
  const nbData = JSON.stringify({
    source: 'dao2-hailuu-mondai3-dongnghia.html', sourceLabel: 'Đảo 2 · Gió Nam - Đồng Nghĩa',
    title: item.k, reading: item.h, meaning: item.vi || item.m, raw: item
  }).replace(/"/g, '&quot;');
  const nbActive = !!(notebookIds && notebookIds.has(nbId));

  return {
    nbId, nbData,
    nbActiveClass: nbActive ? ' active' : '',
    interactive: interactive,
    speakTxt: item.h,
    n: item.n, k: item.k, h: item.h, p: item.p,
    rLabel: '第' + item.r + '回',
    m: item.m,
    hasVi: !!item.vi,
    vi: item.vi || '',
    synonyms: (item.sy || []).map(function (s, i) { return { text: s, mainClass: i === 0 ? ' pri' : '' }; }),
    collocations: (item.co || []).map(function (c) { return { text: c }; })
  };
}

// Shared "Đã lưu vào sổ tay!" toast, anchored above whichever 📓 button
// was clicked (never covering it) instead of a fixed spot on the page.
// One shared implementation so every island's toast behaves identically
// and a future fix only needs to happen once.
var _dcNbToastStyleInjected = false;
function dcEnsureToastStyle() {
  if (_dcNbToastStyleInjected) return;
  _dcNbToastStyleInjected = true;
  const el = document.createElement('style');
  el.textContent =
    '.nb-toast{position:fixed;left:0;top:0;transform:translate(-50%,calc(-100% - 8px));' +
    "background:linear-gradient(180deg,#3a3226,#241f18);color:#ffe9b0;font-family:'Baloo 2','Be Vietnam Pro',sans-serif;" +
    'font-weight:700;font-size:12px;padding:6px 12px;border-radius:9px;box-shadow:0 4px 14px rgba(0,0,0,.3);' +
    'z-index:9999;opacity:0;transition:opacity .2s,transform .2s;pointer-events:none;white-space:nowrap;}' +
    '.nb-toast.show{opacity:1;transform:translate(-50%,calc(-100% - 14px));}';
  document.head.appendChild(el);
}
var _dcNbToastTimer = null;
function dcShowNotebookToast(msg, anchorEl) {
  dcEnsureToastStyle();
  let el = document.getElementById('nb-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'nb-toast';
    el.className = 'nb-toast';
    document.body.appendChild(el);
  }
  el.textContent = '📓 ' + msg;
  if (anchorEl) {
    const r = anchorEl.getBoundingClientRect();
    el.style.left = (r.left + r.width / 2) + 'px';
    el.style.top = r.top + 'px';
  }
  clearTimeout(_dcNbToastTimer);
  el.classList.remove('show');
  void el.offsetWidth;
  el.classList.add('show');
  _dcNbToastTimer = setTimeout(function () { el.classList.remove('show'); }, 1800);
}

// Same idea, for dao3-suongmu-tonghop-theonhom.html's ITEMS item shape
// (id/pattern/group/meaning/nuance/ex_jp/ex_vn). The item's group accent
// color isn't on the item itself in ITEMS — callers merge it in as
// `groupColor` before calling (dao3's own render loop looks it up from its
// GROUPS map; a saved Sổ Tay entry keeps its own copy in `raw.groupColor`).
// opts: { q, notebookIds, interactive }
function dcBuildDao3TonghopCardData(item, opts) {
  opts = opts || {};
  const q = opts.q || '';
  const notebookIds = opts.notebookIds || null;
  const interactive = opts.interactive !== false;
  const nbId = 'dao3-suongmu-tonghop-theonhom.html::' + item.id;
  const nbData = JSON.stringify({
    source: 'dao3-suongmu-tonghop-theonhom.html', sourceLabel: 'Đảo 3 · Sương Mù - Tổng Hợp Theo Nhóm',
    title: item.pattern, reading: '', meaning: item.meaning, raw: item
  }).replace(/"/g, '&quot;');
  const nbActive = !!(notebookIds && notebookIds.has(nbId));

  return {
    nbId, nbData,
    nbActiveClass: nbActive ? ' active' : '',
    interactive: interactive,
    groupColor: item.groupColor || '#333',
    patternHl: dcHighlightText(item.pattern, q),
    meaningHl: dcHighlightText(item.meaning, q),
    hasNuance: !!item.nuance,
    nuanceHl: item.nuance ? dcHighlightText(item.nuance, q) : '',
    exJpHl: dcHighlightText(item.ex_jp, q),
    exVnHl: dcHighlightText(item.ex_vn, q)
  };
}
