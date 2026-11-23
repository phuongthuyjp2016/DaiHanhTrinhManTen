/* Kéo thả sắp xếp câu ★ (Mondai 6 並べ替え) — dùng chung cho đảo 10 và đảo 11.
   SaoDnd.build({key, stem, options, mode, onPick, locked, order, initStar})
   → {sentence, tray} (chuỗi HTML) hoặc null nếu câu không có đúng 4 ô.
   mode "star": thả thẻ vào ô ★ là gọi onPick(số đáp án) ngay (đề thi, đổi được).
   mode "full": xếp đủ 4 ô mới gọi onPick(thẻ ở ô ★) (luyện tập, chấm ngay).
   locked + order: chỉ hiện cách đã xếp, ô đúng vị trí xanh, sai đỏ. */
(function () {
  var REG = {};
  var SLOT_RE = /（[\s　]*[*＊★]?[\s　]*）|\([\s　]*[*＊★]?[\s　]*\)|[＿_★]/g;
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function keyAttr(k) { return esc(k); }

  var css = ".sao-slot{display:inline-flex;align-items:center;justify-content:center;vertical-align:middle;min-width:64px;min-height:34px;margin:2px 3px;padding:2px 6px;border:2px dashed #7aa5c8;border-radius:10px;background:#f7fbfe;position:relative;line-height:1.3;transition:background .15s,border-color .15s}" +
    ".sao-slot.sao-star{border-color:#1f4e79;background:#dbeaf7;border-style:solid}" +
    ".sao-slot.sao-star::before{content:'★';position:absolute;top:-15px;left:50%;transform:translateX(-50%);color:#1f4e79;font-size:.9rem;line-height:1}" +
    ".sao-slot.sao-hover{background:#c4ddf2;border-color:#2b6cb0}" +
    ".sao-slot.sao-ok{border:2px solid #2e7d4f;background:#e8f5ec}" +
    ".sao-slot.sao-ng{border:2px solid #b3402f;background:#fbeae6}" +
    ".sao-slot .sao-chip{margin:0;box-shadow:none;border:none;background:transparent;padding:2px 4px}" +
    ".sao-box{margin:0 0 14px}" +
    ".sao-head,.sao-tray:empty::after{font-family:\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif}" +
    ".sao-head{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-bottom:8px;font-size:.86rem;font-weight:700;color:#3a2e25}" +
    ".sao-tag{font-size:.72rem;font-weight:600;border:1px solid #3a2e25;border-radius:20px;padding:1px 9px;background:#fff}" +
    ".sao-reset{font-size:.78rem;font-weight:700;border:1.5px solid #3a2e25;border-radius:20px;padding:3px 11px;background:#fff;cursor:pointer;font-family:inherit;box-shadow:2px 2px 0 #3a2e25}" +
    ".sao-reset:active{transform:translate(1px,1px);box-shadow:1px 1px 0 #3a2e25}" +
    ".sao-hint{width:100%;font-size:.76rem;font-weight:400;color:#6b5d50}" +
    ".sao-tray{display:flex;flex-wrap:wrap;gap:10px;min-height:58px;padding:10px;border:2px dashed #b7d3ea;border-radius:14px;background:#eef5fb}" +
    ".sao-tray:empty::after{content:'Đã xếp hết thẻ';color:#a8968a;font-size:.82rem;align-self:center}" +
    ".sao-chip{display:inline-flex;align-items:center;gap:6px;padding:6px 14px 6px 8px;border:1.5px solid #2b211b;border-radius:22px;background:#fff;box-shadow:3px 3px 0 #2b211b;cursor:grab;user-select:none;-webkit-user-select:none;touch-action:none;font-size:1rem;line-height:1.3;color:#1a1a1a;font-family:inherit}" +
    ".sao-chip .sao-n{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:50%;background:#1f4e79;color:#fff;font-size:.72rem;font-weight:700;flex:none}" +
    ".sao-chip.sao-src{opacity:.35}" +
    ".sao-ghost{position:fixed;z-index:9999;pointer-events:none;cursor:grabbing;transform:rotate(-2deg);box-shadow:5px 5px 0 #2b211b}" +
    ".sao-locked .sao-chip{cursor:default}";
  function injectCss() {
    if (document.getElementById("sao-dnd-css")) return;
    var s = document.createElement("style"); s.id = "sao-dnd-css"; s.textContent = css;
    (document.head || document.documentElement).appendChild(s);
  }

  function chipHtml(key, n, text) {
    return '<span class="sao-chip" data-key="' + keyAttr(key) + '" data-opt="' + n + '"><span class="sao-n">' + n + '</span>' + esc(text) + '</span>';
  }

  function build(o) {
    var stem = String(o.stem || ""), toks = stem.match(SLOT_RE) || [];
    if (toks.length !== 4 || !o.options || o.options.length !== 4) return null;
    var starIdx = -1;
    toks.forEach(function (t, i) { if (/[*＊★]/.test(t)) starIdx = i; });
    if (starIdx < 0) return null;
    injectCss();
    var st = REG[o.key];
    if (!st) {
      st = REG[o.key] = { slots: [0, 0, 0, 0] };
      if (o.initStar >= 1 && o.initStar <= 4) st.slots[starIdx] = o.initStar;
    }
    st.options = o.options; st.mode = o.mode || "star"; st.onPick = o.onPick; st.starIdx = starIdx;
    var used = st.slots.some(function (v) { return v; });
    if (o.locked && !used) return null;
    var order = o.order ? String(o.order).split("-").map(Number) : null;
    var k = 0, sentence = esc(stem).replace(SLOT_RE, function () {
      var i = k++, v = st.slots[i], cls = "sao-slot" + (i === starIdx ? " sao-star" : "");
      if (o.locked && v && order) cls += order[i] === v ? " sao-ok" : " sao-ng";
      return '<span class="' + cls + '" data-key="' + keyAttr(o.key) + '" data-i="' + i + '">' + (v ? chipHtml(o.key, v, st.options[v - 1]) : "") + '</span>';
    });
    if (o.locked) return { sentence: '<span class="sao-locked">' + sentence + '</span>', tray: "" };
    var hint = st.mode === "full" ? "Xếp đủ 4 ô là tự chấm theo thẻ ở ô ★. Chạm thẻ để đưa vào ô trống, chạm lần nữa để rút ra." : "Thẻ nằm ở ô ★ tự thành đáp án. Chạm thẻ để đưa vào ô trống, chạm lần nữa để rút ra.";
    var tray = '<div class="sao-box"><div class="sao-head">Kéo thẻ để sắp xếp <span class="sao-tag">Không bắt buộc</span><button type="button" class="sao-reset" data-key="' + keyAttr(o.key) + '">Xếp lại</button><span class="sao-hint">' + hint + '</span></div>' +
      '<div class="sao-tray" data-key="' + keyAttr(o.key) + '">' + trayChips(o.key, st) + '</div></div>';
    return { sentence: sentence, tray: tray };
  }
  function trayChips(key, st) {
    var h = "";
    for (var n = 1; n <= 4; n++) if (st.slots.indexOf(n) < 0) h += chipHtml(key, n, st.options[n - 1]);
    return h;
  }
  function sel(cls, key) {
    return Array.prototype.filter.call(document.querySelectorAll("." + cls), function (el) { return el.getAttribute("data-key") === key; });
  }
  function refresh(key) {
    var st = REG[key]; if (!st) return;
    sel("sao-slot", key).forEach(function (el) {
      var v = st.slots[+el.getAttribute("data-i")];
      el.innerHTML = v ? chipHtml(key, v, st.options[v - 1]) : "";
    });
    sel("sao-tray", key).forEach(function (el) { el.innerHTML = trayChips(key, st); });
  }
  function changed(key, before) {
    var st = REG[key]; refresh(key);
    var star = st.slots[st.starIdx];
    if (!st.onPick) return;
    if (st.mode === "full") {
      if (st.slots.every(function (v) { return v; })) st.onPick(star);
    } else if (star && star !== before) st.onPick(star);
  }
  // đặt thẻ n vào ô i (null = trả về khay); nếu ô có thẻ khác thì đổi chỗ
  function place(key, n, i) {
    var st = REG[key]; if (!st) return;
    var before = st.slots[st.starIdx], from = st.slots.indexOf(n);
    if (from >= 0) st.slots[from] = 0;
    if (i != null) {
      var prev = st.slots[i];
      if (prev && from >= 0) st.slots[from] = prev;
      st.slots[i] = n;
    }
    changed(key, before);
  }

  // Ô nhận thẻ: ô bị thẻ đang kéo đè lên nhiều nhất; không đè ô nào thì lấy ô gần ngón tay nhất (trong 70px).
  function findSlot(key, g, px, py) {
    var best = null, bestA = 0, near = null, nearD = 70;
    sel("sao-slot", key).forEach(function (s) {
      var r = s.getBoundingClientRect();
      var w = Math.min(g.right, r.right) - Math.max(g.left, r.left), h = Math.min(g.bottom, r.bottom) - Math.max(g.top, r.top);
      if (w > 0 && h > 0 && w * h > bestA) { bestA = w * h; best = s; }
      var dx = Math.max(r.left - px, 0, px - r.right), dy = Math.max(r.top - py, 0, py - r.bottom), d = Math.sqrt(dx * dx + dy * dy);
      if (d < nearD) { nearD = d; near = s; }
    });
    return best || near;
  }
  var drag = null;
  document.addEventListener("pointerdown", function (e) {
    var chip = e.target.closest && e.target.closest(".sao-chip");
    if (!chip || chip.closest(".sao-locked") || e.button > 0) return;
    drag = { chip: chip, key: chip.getAttribute("data-key"), n: +chip.getAttribute("data-opt"), x: e.clientX, y: e.clientY, moved: false, ghost: null, over: null, id: e.pointerId };
    e.preventDefault();
  });
  document.addEventListener("pointermove", function (e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved) {
      if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) < 6) return;
      drag.moved = true;
      var r = drag.chip.getBoundingClientRect(), g = drag.chip.cloneNode(true);
      g.classList.add("sao-ghost"); g.style.width = r.width + "px";
      drag.dx = drag.x - r.left; drag.dy = drag.y - r.top;
      document.body.appendChild(g); drag.ghost = g; drag.chip.classList.add("sao-src");
    }
    drag.ghost.style.left = (e.clientX - drag.dx) + "px"; drag.ghost.style.top = (e.clientY - drag.dy) + "px";
    var slot = findSlot(drag.key, drag.ghost.getBoundingClientRect(), e.clientX, e.clientY);
    if (drag.over && drag.over !== slot) drag.over.classList.remove("sao-hover");
    if (slot) slot.classList.add("sao-hover");
    drag.over = slot;
    e.preventDefault();
  }, { passive: false });
  function end(e) {
    if (!drag || (e && e.pointerId !== drag.id)) return;
    var d = drag; drag = null;
    if (d.ghost) d.ghost.remove();
    d.chip.classList.remove("sao-src");
    if (d.over) d.over.classList.remove("sao-hover");
    var st = REG[d.key]; if (!st) return;
    var inSlot = d.chip.closest(".sao-slot");
    if (!d.moved) { // chạm: khay → ô trống đầu tiên; ô → về khay
      if (inSlot) place(d.key, d.n, null);
      else { var free = st.slots.indexOf(0); if (free >= 0) place(d.key, d.n, free); }
      return;
    }
    if (d.over) place(d.key, d.n, +d.over.getAttribute("data-i"));
    else if (inSlot && e && e.type === "pointerup") place(d.key, d.n, null);
  }
  document.addEventListener("pointerup", end);
  document.addEventListener("pointercancel", function (e) { if (drag && drag.ghost) { drag.ghost.remove(); drag.chip.classList.remove("sao-src"); } drag = null; });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".sao-reset");
    if (!b) return;
    var key = b.getAttribute("data-key"), st = REG[key]; if (!st) return;
    st.slots = [0, 0, 0, 0]; refresh(key);
  });

  window.SaoDnd = { build: build, state: REG };
})();
