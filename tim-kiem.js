/* 🔍 Tra mọi đảo — thanh tìm kiếm chung cho mọi trang.
   Gõ tiếng Việt (có/không dấu), kanji, hiragana, katakana hay romaji.
   Dữ liệu: tim-kiem-data.js (dựng bằng node tools/build-tim-kiem.js). */
(function () {
  if (window.__TK_LOADED) return; window.__TK_LOADED = true;
  var DATA_URL = 'tim-kiem-data.js?v=20261125a';
  var PAGE = (location.pathname.split('/').pop() || 'DaiHaiTrinhManten.dc.html');
  var IS_HUB = /DaiHaiTrinhManten\.dc\.html$/i.test(PAGE) || PAGE === '' || PAGE === 'index.html';

  /* ---------- chuẩn hoá (giữ nguyên độ dài để tô đúng chỗ) ---------- */
  function norm(s) {
    s = String(s || '');
    var o = '';
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c >= 0x30A1 && c <= 0x30F6) o += String.fromCharCode(c - 0x60);          // カタカナ → ひらがな
      else if (c >= 0xFF01 && c <= 0xFF5E) o += String.fromCharCode(c - 0xFEE0).toLowerCase(); // ＡＢＣ → abc
      else o += s[i].toLowerCase().length === 1 ? s[i].toLowerCase() : s[i];
    }
    return o;
  }
  var DIA = {};
  function noDia(s) {
    var o = '';
    for (var i = 0; i < s.length; i++) {
      var ch = s[i], r = DIA[ch];
      if (r === undefined) {
        r = ch === 'đ' ? 'd' : ch === 'Đ' ? 'd' : ch.normalize('NFD')[0];
        if (/[̀-ͯ]/.test(r) || !r) r = ch;
        DIA[ch] = r;
      }
      o += r;
    }
    return o;
  }
  /* romaji */
  var H2R = {"あ":"a","い":"i","う":"u","え":"e","お":"o","か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko","さ":"sa","し":"shi","す":"su","せ":"se","そ":"so","た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to","な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no","は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho","ま":"ma","み":"mi","む":"mu","め":"me","も":"mo","や":"ya","ゆ":"yu","よ":"yo","ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro","わ":"wa","を":"o","ん":"n","が":"ga","ぎ":"gi","ぐ":"gu","げ":"ge","ご":"go","ざ":"za","じ":"ji","ず":"zu","ぜ":"ze","ぞ":"zo","だ":"da","ぢ":"ji","づ":"zu","で":"de","ど":"do","ば":"ba","び":"bi","ぶ":"bu","べ":"be","ぼ":"bo","ぱ":"pa","ぴ":"pi","ぷ":"pu","ぺ":"pe","ぽ":"po","ぁ":"a","ぃ":"i","ぅ":"u","ぇ":"e","ぉ":"o","ゃ":"ya","ゅ":"yu","ょ":"yo","ゎ":"wa","ゐ":"i","ゑ":"e","ゔ":"vu"};
  var YO = {"ゃ":"a","ゅ":"u","ょ":"o"};
  function kanaToRomaji(h) { // h đã là ひらがな
    var out = '';
    for (var i = 0; i < h.length; i++) {
      var ch = h[i], nx = h[i + 1];
      if (ch === 'っ') { var r2 = H2R[nx] || ''; if (r2) out += (r2.indexOf('ch') === 0 ? 't' : r2[0]); continue; }
      if (ch === 'ー') { out += out.slice(-1); continue; }
      var r = H2R[ch]; if (r === undefined) { out += ' '; continue; }
      if (nx && YO[nx] && /[きしちにひみりぎじぢびぴ]/.test(ch)) {
        var base = r.slice(0, -1); // ki→k, shi→sh, chi→ch, ji→j
        if (base === 'sh' || base === 'ch' || base === 'j') out += base + YO[nx]; else out += base + 'y' + YO[nx];
        i++; continue;
      }
      if ((ch === 'ぇ' || ch === 'ぃ' || ch === 'ぉ' || ch === 'ぁ' || ch === 'ぅ') && out) { out = out.replace(/[aiueo]$/, ''); }
      out += r;
    }
    return out;
  }
  function romaNorm(s) { // gộp cách viết: ou/oo→o, uu→u, si→shi...
    return s.replace(/'/g, '').replace(/m(?=[bmp])/g, 'n')
      .replace(/(^|[^s])si/g, '$1shi').replace(/(^|[^c])ti(?!c)/g, '$1chi').replace(/(^|[^s])tu/g, '$1tsu')
      .replace(/(^|[^sc])hu/g, '$1fu').replace(/zi|di/g, 'ji').replace(/du/g, 'zu')
      .replace(/sy/g, 'sh').replace(/ty|cy/g, 'ch').replace(/jy|zy/g, 'j')
      .replace(/ou/g, 'o').replace(/ei/g, 'e').replace(/([aiueo])\1+/g, '$1');
  }
  // romaji → ひらがな (null nếu không đổi trọn được)
  var R2H = null;
  function romaToKana(s) {
    if (!R2H) {
      R2H = {};
      Object.keys(H2R).forEach(function (h) { if (!/[ぁぃぅぇぉゃゅょゎゐゑを]/.test(h) && !R2H[H2R[h]]) R2H[H2R[h]] = h; });
      R2H.o = 'お'; R2H.wo = 'を'; R2H.si = 'し'; R2H.ti = 'ち'; R2H.tu = 'つ'; R2H.hu = 'ふ'; R2H.zi = 'じ'; R2H.di = 'ぢ'; R2H.du = 'づ';
      'k:き,g:ぎ,n:に,h:ひ,b:び,p:ぴ,m:み,r:り'.split(',').forEach(function (p) { var c = p.split(':'); R2H[c[0] + 'ya'] = c[1] + 'ゃ'; R2H[c[0] + 'yu'] = c[1] + 'ゅ'; R2H[c[0] + 'yo'] = c[1] + 'ょ'; });
      [['sh', 'し'], ['sy', 'し'], ['ch', 'ち'], ['ty', 'ち'], ['cy', 'ち'], ['j', 'じ'], ['jy', 'じ'], ['zy', 'じ']].forEach(function (c) { R2H[c[0] + 'a'] = c[1] + 'ゃ'; R2H[c[0] + 'u'] = c[1] + 'ゅ'; R2H[c[0] + 'o'] = c[1] + 'ょ'; R2H[c[0] + 'e'] = c[1] + 'ぇ'; });
      R2H.ji = 'じ'; R2H.fa = 'ふぁ'; R2H.fi = 'ふぃ'; R2H.fe = 'ふぇ'; R2H.fo = 'ふぉ'; R2H.ti = 'ち'; R2H.di = 'ぢ';
    }
    s = s.toLowerCase().replace(/[\s'\-]/g, '');
    var out = '', i = 0;
    while (i < s.length) {
      var c = s[i], nx = s[i + 1];
      if (c === 'n' && (nx === undefined || (!/[aiueoy]/.test(nx)))) { out += 'ん'; i += (nx === 'n' ? 2 : 1); continue; }
      if (nx && c === nx && !/[aiueon]/.test(c)) { out += 'っ'; i++; continue; }
      if (c === 't' && nx === 'c') { out += 'っ'; i++; continue; }
      var hit = false;
      for (var L = 3; L >= 1; L--) { var k = s.substr(i, L); if (R2H[k]) { out += R2H[k]; i += L; hit = true; break; } }
      if (!hit) return null;
    }
    return out;
  }
  function romaOfText(t) { // chỉ các đoạn kana, cách nhau bằng dấu cách
    var m = t.match(/[ぁ-ゖー]+/g);
    return m ? m.map(function (x) { return romaNorm(kanaToRomaji(x)); }).join(' ') : '';
  }
  var JP = /[぀-ヿ一-鿿々〜]/;
  var KANJI = /[一-鿿々]/;

  /* ---------- dữ liệu ---------- */
  var D = null, loading = null, prep = null;
  function load() {
    if (D) return Promise.resolve(D);
    if (loading) return loading;
    loading = new Promise(function (ok, bad) {
      var s = document.createElement('script');
      s.src = DATA_URL; s.async = true;
      s.onload = function () { D = window.TK_DATA; ok(D); };
      s.onerror = function () { loading = null; bad(new Error('Không tải được dữ liệu tra cứu')); };
      document.head.appendChild(s);
    });
    return loading;
  }
  function recText(r) { var a = [r[2], r[3], r[4]]; r[5].forEach(function (f) { a.push(f[1]); }); return a.join('\n'); }
  function prepare() {
    if (prep) return prep;
    prep = D.recs.map(function (r) {
      var t = norm(recText(r));
      return { n: t, d: null, ro: null };
    });
    return prep;
  }
  function pD(i) { var p = prep[i]; if (p.d === null) p.d = noDia(p.n); return p.d; }
  function pR(i) { var p = prep[i]; if (p.ro === null) p.ro = romaOfText(p.n); return p.ro; }

  /* ---------- phân tích câu tìm ---------- */
  function parseQuery(q) {
    q = q.trim(); var qn = norm(q);
    var Q = { raw: q, jp: [], vi: null, viDia: false, ro: null };
    if (!q) return Q;
    if (JP.test(q)) {
      Q.jp.push(qn);
      // 迫る → 迫, 懲りる → 懲り: ra cả dạng chia
      if (KANJI.test(qn) && /[ぁ-ゖ]$/.test(qn) && qn.length >= 2) Q.jp.push(qn.slice(0, -1));
    } else {
      Q.vi = noDia(qn); Q.viDia = Q.vi !== qn; Q.viq = qn;
      var letters = qn.replace(/[\s'\-]/g, '');
      if (/^[a-z]{2,}$/.test(letters)) {
        var kn = romaToKana(letters);
        if (kn) Q.jp.push(kn);           // ishi → いし (khớp kana chính xác)
        Q.ro = romaNorm(letters);        // tokyo → とうきょう (khớp đầu cụm kana)
      }
    }
    return Q;
  }
  function isWordStart(s, i) { return i === 0 || !/[a-z0-9à-ỹ]/i.test(s[i - 1]); }
  function findVi(hay, needle) { // khớp đầu từ
    var i = hay.indexOf(needle);
    while (i >= 0) { if (isWordStart(hay, i)) return i; i = hay.indexOf(needle, i + 1); }
    return -1;
  }
  function findRo(hay, needle) { // chỉ khớp ở đầu một cụm kana
    var i = hay.indexOf(needle);
    while (i >= 0) { if (i === 0 || hay[i - 1] === ' ') return i; i = hay.indexOf(needle, i + 1); }
    return -1;
  }
  function recHit(i, Q) {
    var p = prep[i];
    for (var k = 0; k < Q.jp.length; k++) if (p.n.indexOf(Q.jp[k]) >= 0) return true;
    if (Q.vi) {
      if (Q.viDia ? findVi(p.n, Q.viq) >= 0 : findVi(pD(i), Q.vi) >= 0) return true;
      if (Q.ro && Q.ro.length >= 3 && findRo(pR(i), Q.ro) >= 0) return true;
    }
    return false;
  }
  // vị trí khớp trong 1 chuỗi gốc → [[start,end],...]
  function ranges(text, Q) {
    var n = norm(text), out = [];
    var add = function (needle, hay, wordStart) {
      if (!needle) return;
      var i = hay.indexOf(needle);
      while (i >= 0) {
        if (!wordStart || isWordStart(hay, i)) out.push([i, i + needle.length]);
        i = hay.indexOf(needle, i + needle.length);
      }
    };
    Q.jp.forEach(function (t) { add(t, n, false); });
    if (Q.vi) {
      if (Q.viDia) add(Q.viq, n, true); else add(Q.vi, noDia(n), true);
      if (Q.ro && Q.ro.length >= 2) { // tô cả cụm kana có romaji khớp
        var re = /[ぁ-ゖー]+/g, m;
        while ((m = re.exec(n))) { if (romaNorm(kanaToRomaji(m[0])).indexOf(Q.ro) === 0) out.push([m.index, m.index + m[0].length]); }
      }
    }
    if (!out.length) return out;
    out.sort(function (a, b) { return a[0] - b[0]; });
    var mg = [out[0]];
    for (var k = 1; k < out.length; k++) { var l = mg[mg.length - 1]; if (out[k][0] <= l[1]) l[1] = Math.max(l[1], out[k][1]); else mg.push(out[k]); }
    return mg;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hl(text, rg, from, to) {
    from = from || 0; to = to == null ? text.length : to;
    var o = '', pos = from;
    rg.forEach(function (r) {
      var a = Math.max(r[0], from), b = Math.min(r[1], to);
      if (b <= a) return;
      o += esc(text.slice(pos, a)) + '<mark>' + esc(text.slice(a, b)) + '</mark>'; pos = b;
    });
    return o + esc(text.slice(pos, to));
  }
  // đoạn trích: các dòng có khớp (tối đa 3), dòng dài cắt quanh chỗ khớp
  function snippet(text, Q, maxLines) {
    var rg = ranges(text, Q); if (!rg.length) return '';
    var lines = [], start = 0, parts = text.split('\n');
    for (var li = 0; li < parts.length && lines.length < (maxLines || 3); li++) {
      var L = parts[li], s0 = start, s1 = start + L.length; start = s1 + 1;
      var lr = rg.filter(function (r) { return r[0] < s1 && r[1] > s0; });
      if (!lr.length) continue;
      var a = s0, b = s1, pre = '', post = '';
      if (L.length > 150) { a = Math.max(s0, lr[0][0] - 60); b = Math.min(s1, lr[0][1] + 80); if (a > s0) pre = '…'; if (b < s1) post = '…'; }
      lines.push(pre + hl(text, lr, a, b) + post);
    }
    return lines.join('<br>');
  }

  /* ---------- tìm + xếp hạng ---------- */
  function search(q) {
    var Q = parseQuery(q); if (!Q.raw) return { Q: Q, res: [] };
    prepare();
    var res = [];
    for (var i = 0; i < D.recs.length; i++) {
      if (!recHit(i, Q)) continue;
      var r = D.recs[i], sc = 0;
      var hfull = norm(r[2]), head = hfull.replace(/[（(].*$/, ''), rdg = (hfull.match(/[（(]([^）)]*)[）)]/) || [])[1] || '';
      var exact = Q.jp.some(function (t) { return t === head || t === rdg || head.replace(/^[〜～]/, '') === t; }) ||
        (Q.ro && rdg && romaNorm(kanaToRomaji(rdg)) === Q.ro);
      if (exact) sc += 100; else if (ranges(r[2], Q).length) sc += 60;
      if (ranges(r[3], Q).length) sc += 30;
      if (D.pages[r[0]][0] === PAGE) sc += 15;
      res.push({ i: i, sc: sc });
    }
    res.sort(function (a, b) { return b.sc - a.sc || a.i - b.i; });
    return { Q: Q, res: res };
  }

  /* ---------- giao diện ---------- */
  var css = '' +
    '.tk-fab{position:fixed;right:max(14px,env(safe-area-inset-right));bottom:calc(max(14px,env(safe-area-inset-bottom)) + 66px);z-index:2147483640;width:50px;height:50px;border-radius:50%;border:2px solid #5a3b22;background:#ffd25a;color:#5a3b22;font-size:22px;box-shadow:0 3px 0 #5a3b22,0 6px 14px rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0}' +
    '.tk-fab:active{transform:translateY(2px);box-shadow:0 1px 0 #5a3b22}' +
    '.tk-ov{position:fixed;inset:0;z-index:2147483641;background:rgba(40,25,10,.55);display:none;align-items:flex-start;justify-content:center;padding:max(10px,env(safe-area-inset-top)) 10px 10px}' +
    '.tk-ov.show{display:flex}' +
    '.tk-box{width:min(820px,100%);max-height:calc(100vh - 20px);max-height:calc(100dvh - 20px);background:#fdf6e8;border:2px solid #5a3b22;border-radius:16px;display:flex;flex-direction:column;overflow:hidden;font-family:"Segoe UI",-apple-system,"Hiragino Sans","Noto Sans JP",sans-serif;color:#3b2a1a;box-shadow:0 10px 40px rgba(0,0,0,.35)}' +
    '.tk-top{padding:12px 12px 8px;background:#f5e6c8;border-bottom:1px solid #e0c99d}' +
    '.tk-row{display:flex;gap:8px;align-items:center}' +
    '.tk-in{flex:1;min-width:0;font-size:17px;padding:11px 14px;border:2px solid #b9761a;border-radius:12px;background:#fff;color:#3b2a1a;outline:none}' +
    '.tk-in:focus{border-color:#e08a00;box-shadow:0 0 0 3px rgba(245,166,35,.25)}' +
    '.tk-x{flex:none;width:40px;height:40px;border-radius:10px;border:none;background:#5a3b22;color:#fff;font-size:18px;cursor:pointer}' +
    '.tk-hint{font-size:12px;color:#7a5c3c;margin-top:6px}' +
    '.tk-chips{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}' +
    '.tk-chip{border:1px solid #c9a36a;background:#fff;border-radius:999px;padding:4px 10px;font-size:12.5px;cursor:pointer;color:#5a3b22}' +
    '.tk-chip.on{background:#5a3b22;color:#fff;border-color:#5a3b22}' +
    '.tk-list{overflow:auto;padding:10px 12px 16px;-webkit-overflow-scrolling:touch}' +
    '.tk-card{background:#fff;border:1px solid #e3cfa8;border-radius:12px;padding:10px 12px;margin-bottom:10px;cursor:pointer}' +
    '.tk-card:hover{border-color:#b9761a;box-shadow:0 2px 8px rgba(90,59,34,.15)}' +
    '.tk-meta{display:flex;gap:6px;align-items:center;flex-wrap:wrap;font-size:12px;color:#7a5c3c;margin-bottom:4px}' +
    '.tk-isl{background:#2e7d6b;color:#fff;border-radius:6px;padding:1px 7px;font-weight:700}' +
    '.tk-pg{background:#f1e3c6;border-radius:6px;padding:1px 7px;color:#5a3b22;font-weight:600}' +
    '.tk-go{margin-left:auto;color:#b9761a;font-weight:700;white-space:nowrap}' +
    '.tk-head{font-weight:800;font-size:16px;color:#3b2a1a;font-family:"Noto Serif JP","Hiragino Mincho ProN",serif}' +
    '.tk-main{font-size:15.5px;line-height:1.6;margin-top:2px;font-family:"Noto Serif JP","Hiragino Mincho ProN",serif}' +
    '.tk-vi{font-size:13px;color:#6b5a48;font-style:italic;margin-top:2px}' +
    '.tk-f{font-size:13.5px;line-height:1.55;margin-top:5px;padding-left:8px;border-left:3px solid #f5c26b}' +
    '.tk-fl{display:inline-block;font-size:11.5px;font-weight:700;color:#fff;background:#b9761a;border-radius:5px;padding:0 6px;margin-right:6px;vertical-align:1px}' +
    '.tk-card mark,.tk-flash{background:#ffe066;color:#8a1c00;font-weight:800;border-radius:3px;padding:0 1px}' +
    '.tk-empty{text-align:center;color:#7a5c3c;padding:28px 10px;font-size:14px}' +
    '.tk-more{display:block;margin:4px auto 10px;border:2px solid #5a3b22;background:#ffd25a;color:#5a3b22;font-weight:700;border-radius:10px;padding:8px 18px;cursor:pointer}' +
    '.tk-hub{position:fixed;top:max(8px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:2147483639;width:min(440px,calc(100% - 24px))}' +
    '.tk-hub button{width:100%;display:flex;align-items:center;gap:10px;font-size:15px;padding:10px 16px;border:2px solid #5a3b22;border-radius:999px;background:rgba(255,250,240,.96);color:#7a5c3c;cursor:text;box-shadow:0 3px 0 #5a3b22,0 6px 16px rgba(0,0,0,.2);text-align:left;font-family:"Be Vietnam Pro","Segoe UI",sans-serif}' +
    '.tk-hub b{color:#5a3b22}' +
    '@keyframes tkflash{0%,60%{background:#ffe066}100%{background:transparent}}.tk-flash{animation:tkflash 3.5s ease-out forwards}' +
    '.tk-target{outline:4px solid #ffca28!important;outline-offset:3px;transition:outline-color 2s}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var ov, inp, list, chipsEl, hintEl, filt = 'all', shown = 40, last = null, timer = null;
  function build() {
    if (ov) return;
    ov = document.createElement('div'); ov.className = 'tk-ov';
    ov.innerHTML = '<div class="tk-box" role="dialog" aria-label="Tra mọi đảo">' +
      '<div class="tk-top"><div class="tk-row"><input class="tk-in" type="search" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="🔍 Tra mọi đảo: ý chí · 意志 · いし · イシ · ishi">' +
      '<button class="tk-x" title="Đóng" aria-label="Đóng">✕</button></div>' +
      '<div class="tk-hint">Gõ tiếng Việt (có/không dấu), kanji, hiragana, katakana hay romaji — ra mọi câu có từ đó: câu đề, 4 đáp án, cụm, đồng nghĩa, giải thích.</div>' +
      '<div class="tk-chips"></div></div><div class="tk-list"></div></div>';
    document.body.appendChild(ov);
    inp = ov.querySelector('.tk-in'); list = ov.querySelector('.tk-list'); chipsEl = ov.querySelector('.tk-chips'); hintEl = ov.querySelector('.tk-hint');
    ov.querySelector('.tk-x').onclick = close;
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    inp.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 180); });
    inp.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    chipsEl.addEventListener('click', function (e) { var c = e.target.closest('.tk-chip'); if (!c) return; filt = c.getAttribute('data-f'); shown = 40; paint(); });
    list.addEventListener('click', function (e) {
      if (e.target.closest('.tk-more')) { shown += 40; paint(); return; }
      var c = e.target.closest('.tk-card'); if (c) go(+c.getAttribute('data-i'));
    });
  }
  function open(q) {
    build(); ov.classList.add('show');
    try { document.body.style.overflow = 'hidden'; } catch (e) { }
    if (q != null) inp.value = q;
    setTimeout(function () { inp.focus(); inp.select && q == null && inp.select(); }, 30);
    list.innerHTML = '<div class="tk-empty">⏳ Đang tải dữ liệu các đảo…</div>';
    load().then(function () { run(); }, function (e) { list.innerHTML = '<div class="tk-empty">⚠️ ' + esc(e.message) + '</div>'; });
  }
  function close() { if (!ov) return; ov.classList.remove('show'); try { document.body.style.overflow = ''; } catch (e) { } }
  function run() {
    if (!D) return;
    var q = inp.value;
    if (!q.trim()) { last = null; chipsEl.innerHTML = ''; list.innerHTML = '<div class="tk-empty">Nhập một từ để tra trên <b>tất cả các đảo</b> 🏝️</div>'; return; }
    last = search(q); filt = 'all'; shown = 40; paint();
  }
  function islName(n) { return 'Đảo ' + n; }
  function paint() {
    if (!last) return;
    var res = last.res, Q = last.Q, cnt = {};
    res.forEach(function (x) { var isl = D.pages[D.recs[x.i][0]][1]; cnt[isl] = (cnt[isl] || 0) + 1; });
    var ch = '<span class="tk-chip' + (filt === 'all' ? ' on' : '') + '" data-f="all">Tất cả (' + res.length + ')</span>';
    Object.keys(cnt).sort(function (a, b) { return a - b; }).forEach(function (k) {
      ch += '<span class="tk-chip' + (filt === k ? ' on' : '') + '" data-f="' + k + '">' + islName(k) + ' (' + cnt[k] + ')</span>';
    });
    chipsEl.innerHTML = res.length ? ch : '';
    var arr = filt === 'all' ? res : res.filter(function (x) { return String(D.pages[D.recs[x.i][0]][1]) === filt; });
    if (!arr.length) { list.innerHTML = '<div class="tk-empty">Không thấy「' + esc(Q.raw) + '」trong bài nào. Thử gõ cách khác (kanji / kana / nghĩa tiếng Việt).</div>'; return; }
    var h = '';
    arr.slice(0, shown).forEach(function (x) { h += card(x.i, Q); });
    if (arr.length > shown) h += '<button class="tk-more">Xem thêm (' + (arr.length - shown) + ' kết quả nữa)</button>';
    list.innerHTML = h;
    if (shown === 40) list.scrollTop = 0;
  }
  function card(i, Q) {
    var r = D.recs[i], pg = D.pages[r[0]];
    var h = '<div class="tk-card" data-i="' + i + '"><div class="tk-meta"><span class="tk-isl">' + islName(pg[1]) + '</span><span class="tk-pg">' + esc(pg[2]) + '</span><span>' + esc(r[1]) + '</span><span class="tk-go">Mở bài →</span></div>';
    if (r[2]) h += '<div class="tk-head">' + hl(r[2], ranges(r[2], Q)) + '</div>';
    if (r[3]) {
      var mr = ranges(r[3], Q);
      h += '<div class="tk-main">' + (r[3].length > 220 && mr.length ? snippet(r[3], Q, 2) : hl(r[3], mr)) + '</div>';
    }
    if (r[4]) h += '<div class="tk-vi">' + (r[4].length > 220 ? snippet(r[4], Q, 1) || esc(r[4].slice(0, 200) + '…') : hl(r[4], ranges(r[4], Q))) + '</div>';
    var nf = 0;
    for (var k = 0; k < r[5].length && nf < 4; k++) {
      var f = r[5][k], sn = snippet(f[1], Q, 3);
      if (!sn) continue;
      // bỏ trường trùng nội dung với dòng chính
      if (f[1] === r[3] || f[1] === r[4] || r[2].indexOf(f[1]) === 0) continue;
      h += '<div class="tk-f"><span class="tk-fl">' + esc(f[0]) + '</span>' + sn + '</div>'; nf++;
    }
    return h + '</div>';
  }

  /* ---------- nhảy tới đúng câu ---------- */
  function byId(id) { return document.getElementById(id); }
  function flashEl(el) { if (!el) return; el.classList.add('tk-target'); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { el.classList.remove('tk-target'); }, 3000); }
  var HOOKS = {
    'dao2-hailuu-mondai2-vancanh.html': function (j) { if (typeof jumpToQuestion !== 'function') return false; jumpToQuestion(j[0], j[1]); return true; },
    'dao2-hailuu-mondai2-bimatngucanh.html': function (j) { if (typeof goToSearchResult !== 'function') return false; goToSearchResult(j[0], j[1]); return true; },
    'dao2-hailuu-mondai3-dongnghia.html': function (j) { if (typeof startM3AtItem !== 'function' || typeof V === 'undefined') return false; if (typeof switchTab === 'function') switchTab('q'); startM3AtItem(V[j]); scrollTo(0, 0); return true; },
    'dao2-hailuu-mondai4-cachdung.html': function (j) { if (typeof startRound !== 'function') return false; startRound(j[0], j[1]); scrollTo(0, 0); return true; },
    'dao1-hantu-doc-kanji.html': function (j) {
      if (typeof render !== 'function' || typeof CARD_TEMPLATE === 'undefined' || !CARD_TEMPLATE) return false;
      try { currentRound = 'all'; } catch (e) { }
      document.querySelectorAll('.fbtn').forEach(function (b, k) { b.classList.toggle('active', k === 0); });
      var si = byId('search-input'); if (si) si.value = j;
      render();
      var c = document.querySelector('.dc-kanji-card[data-nb-id="' + CSS.escape('dao1-hantu-doc-kanji.html::' + j) + '"]');
      if (c) { c.classList.add('expanded'); flashEl(c); }
      return true;
    },
    'dao1-hantu-am-hanviet.html': function (j) {
      if (typeof onSearchInput !== 'function') return false;
      try { if (typeof currentMode !== 'undefined') currentMode = 'all'; } catch (e) { }
      var si = byId('vocabSearch'); if (si) si.value = j;
      onSearchInput(); return true;
    },
    'dao9-anhsang-mon8-doanvan.html': function (j) { if (typeof jumpToSheet !== 'function' || typeof data === 'undefined') return false; jumpToSheet(j); scrollTo(0, 0); return true; },
    'dao9-anhsang-mon9-trungvan.html': function (j) { if (typeof selectBai !== 'function' || typeof baiList === 'undefined') return false; selectBai(j); var a = byId('quizArea'); if (a) a.scrollIntoView({ behavior: 'smooth', block: 'start' }); return true; },
    'dao9-anhsang-mondai10-12-truongvan.html': function (j) {
      if (typeof render !== 'function' || typeof currentSrc === 'undefined') return false;
      var b = document.querySelector('.tab-btn[data-src="' + j[0] + '"]'); if (b) b.click();
      setTimeout(function () {
        try { currentSrc = j[0]; yearFilter = 'all'; currentBaiIndex = j[1]; resetState(); renderYearSelect(); buildSheetNav(); render(); } catch (e) { }
        scrollTo(0, 0);
      }, 30);
      return true;
    },
    'dao3-suongmu-powerdrill-full30.html': function (j) {
      if (typeof openRound !== 'function') return false;
      if (j[0] === 'r') openRound(j[1]); else openTraining(j[1]);
      return 'flash';
    },
    'dao10-daichien-dethi.html': function (j) {
      if (typeof state === 'undefined' || typeof render !== 'function' || !state.exam) return false;
      var sel = byId('examSelect'); state.exam = j[0]; if (sel) sel.value = j[0];
      var b = document.querySelector('#monSeg button[data-mon="' + j[1] + '"]'); if (b) b.click();
      state.exam = j[0]; state.idx = j[2]; state.chosen = null; render();
      var qa = byId('quizArea'); if (qa) qa.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
  };
  // tìm trong DOM rồi tô vàng chỗ đầu tiên (trang không có hàm nhảy riêng)
  function domFlash(terms) {
    var Q = parseQuery(terms[0] || '');
    if (terms[1]) { var Q2 = parseQuery(terms[1]); Q.jp = Q.jp.concat(Q2.jp); }
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) { var p = n.parentNode; if (!p || /SCRIPT|STYLE|TEXTAREA|INPUT/.test(p.nodeName) || (ov && ov.contains(p))) return NodeFilter.FILTER_REJECT; return NodeFilter.FILTER_ACCEPT; }
    });
    var n;
    while ((n = w.nextNode())) {
      if (!n.parentNode.offsetParent && n.parentNode !== document.body) continue;
      var rg = ranges(n.nodeValue, Q);
      if (!rg.length) continue;
      var range = document.createRange(); range.setStart(n, rg[0][0]); range.setEnd(n, rg[0][1]);
      var m = document.createElement('mark'); m.className = 'tk-flash';
      try { range.surroundContents(m); } catch (e) { continue; }
      m.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return true;
    }
    return false;
  }
  function headWord(r) { return String(r[2] || '').replace(/（.*$/, ''); }
  function go(i) {
    var r = D.recs[i], pg = D.pages[r[0]], q = inp ? inp.value.trim() : '';
    if (pg[0] === PAGE) {
      close();
      var hk = r[6] != null && HOOKS[PAGE] && HOOKS[PAGE](r[6]);
      if (hk) { if (hk === 'flash') setTimeout(function () { domFlash([q, headWord(r)]); }, 400); return; }
      domFlash([q, headWord(r)]); return;
    }
    var u = pg[0] + '?tkq=' + encodeURIComponent(q) + '&tkh=' + encodeURIComponent(headWord(r));
    if (r[6] != null) u += '&tk=' + encodeURIComponent(JSON.stringify(r[6]));
    location.href = u;
  }
  function arrive() {
    var sp; try { sp = new URLSearchParams(location.search); } catch (e) { return; }
    var q = sp.get('tkq'); if (q == null) return;
    var j = sp.get('tk'), h = sp.get('tkh') || '', hook = HOOKS[PAGE], t0 = Date.now();
    try { j = j ? JSON.parse(j) : null; } catch (e) { j = null; }
    (function tick() {
      var ok = false;
      try { ok = (j != null && hook) ? hook(j) : domFlash([q, h]); } catch (e) { ok = false; }
      if (ok) { if (ok === 'flash') setTimeout(function () { domFlash([q, h]); }, 500); return; }
      if (Date.now() - t0 < 8000) setTimeout(tick, 300);
    })();
  }

  /* ---------- gắn vào trang ---------- */
  // ô tìm sẵn có trong trang đảo 1–2 → mở thanh tra mọi đảo
  var OLD_BOXES = ['vocabSearch', 'search-input', 'searchInput', 'tipSearch', 'm3QSearch', 'm4Search'];
  function hijack() {
    OLD_BOXES.forEach(function (id) {
      var el = byId(id); if (!el || el.__tk) return; el.__tk = 1;
      el.setAttribute('placeholder', '🔍 Tra mọi đảo: tiếng Việt · 漢字 · かな · カナ · romaji');
      // ô trống → mở thanh tra mọi đảo; ô đang có chữ (do vừa nhảy tới từ) → để sửa/xoá như cũ
      var fire = function (e) { if (el.value) return; e.preventDefault(); e.stopPropagation(); el.blur(); open(''); };
      el.addEventListener('focus', fire, true);
      el.addEventListener('click', fire, true);
    });
  }
  function mount() {
    if (!/[?&]embed=1/.test(location.search)) {
      var fab = document.createElement('button');
      fab.className = 'tk-fab'; fab.type = 'button'; fab.title = 'Tra mọi đảo'; fab.setAttribute('aria-label', 'Tra mọi đảo'); fab.textContent = '🔍';
      fab.onclick = function () { open(); };
      document.body.appendChild(fab);
    }
    if (IS_HUB) {
      var bar = document.createElement('div'); bar.className = 'tk-hub';
      bar.innerHTML = '<button type="button">🔍 <span><b>Tra mọi đảo</b> · Việt · 漢字 · かな · romaji</span></button>';
      bar.firstChild.onclick = function () { open(); };
      document.body.insertBefore(bar, document.body.firstChild);
    }
    hijack(); setTimeout(hijack, 1500);
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); open(); }
    });
    arrive();
  }
  window.TimKiem = { open: open, close: close, search: function (q) { return load().then(function () { return search(q); }); } };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
