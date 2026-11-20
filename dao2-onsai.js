// Nút "📝 Ôn sai" dùng chung cho Đảo 2 (Mon2 Văn Cảnh, Mon3 Đồng Nghĩa, Mon4 Cách Dùng):
// lưu lâu dài các câu làm sai, mở danh sách, ôn lại riêng các câu đó, và lưu từ vào Sổ Tay.
// Trang gọi DcOnSai.init({ storageKey, title, getItem(id), startReview(ids), notebookEntry(id) }),
// rồi DcOnSai.markWrong(id) khi làm sai, DcOnSai.markCorrect(id) khi làm đúng
// (chỉ gỡ khỏi danh sách khi đang ôn sai), DcOnSai.endReview() khi vào bài thường.
(function () {
  var NOTEBOOK_KEY = 'dhtm_notebook_v1';
  var cfg = null, reviewing = false;

  function load() { try { return JSON.parse(localStorage.getItem(cfg.storageKey) || '[]'); } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(cfg.storageKey, JSON.stringify(list)); } catch (e) {} refresh(); }
  function validIds() { return load().filter(function (id) { return !!cfg.getItem(id); }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function loadNotebook() { try { return JSON.parse(localStorage.getItem(NOTEBOOK_KEY) || '[]'); } catch (e) { return []; } }
  function inNotebook(nbId) { return loadNotebook().some(function (x) { return x.id === nbId; }); }
  function toggleNotebook(id, btn) {
    var entry = cfg.notebookEntry(id);
    if (!entry) return;
    var list = loadNotebook(), idx = -1;
    for (var i = 0; i < list.length; i++) if (list[i].id === entry.id) { idx = i; break; }
    if (idx >= 0) { list.splice(idx, 1); btn.classList.remove('on'); btn.title = 'Lưu vào sổ tay'; }
    else {
      entry.addedAt = Date.now();
      list.push(entry);
      btn.classList.add('on'); btn.title = 'Đã lưu — bấm để bỏ khỏi sổ tay';
      if (typeof dcShowNotebookToast === 'function') dcShowNotebookToast('Đã lưu vào sổ tay!', btn);
    }
    try { localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function injectUi() {
    var css = document.createElement('style');
    css.textContent =
      '.os-fab{position:fixed;left:16px;bottom:20px;z-index:900;display:flex;align-items:center;gap:6px;padding:10px 16px;border-radius:999px;border:none;' +
      'background:linear-gradient(180deg,#2f6fb0,#1f4e79);color:#fff;font:700 14px/1 inherit;font-family:inherit;box-shadow:0 4px 14px rgba(0,0,0,.3);cursor:pointer}' +
      '.os-fab .os-cnt{background:#e85f5f;color:#fff;border-radius:999px;min-width:20px;height:20px;padding:0 6px;font-size:12px;display:inline-flex;align-items:center;justify-content:center}' +
      '.os-fab.zero .os-cnt{background:rgba(255,255,255,.3)}' +
      '.os-bg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:950;display:none}.os-bg.show{display:block}' +
      '.os-panel{position:fixed;top:0;right:0;bottom:0;width:min(480px,100vw);background:#fdf6e8;z-index:960;display:flex;flex-direction:column;' +
      'transform:translateX(100%);transition:transform .25s;box-shadow:-6px 0 20px rgba(0,0,0,.25);color:#1a1a1a}.os-panel.show{transform:none}' +
      '.os-head{background:#1f4e79;color:#fff;padding:12px 14px}.os-head h3{margin:0 0 8px;font-size:16px}' +
      '.os-btns{display:flex;gap:6px;flex-wrap:wrap}.os-btns button{border:none;border-radius:8px;padding:7px 12px;font:700 13px inherit;font-family:inherit;cursor:pointer}' +
      '.os-go{background:#ffd25a;color:#5a3b22}.os-clr{background:rgba(255,255,255,.18);color:#fff}' +
      '.os-body{flex:1;overflow-y:auto;padding:10px 12px 40px}' +
      '.os-empty{text-align:center;color:#5a5a5a;padding:40px 10px;font-size:14px;line-height:1.7}' +
      '.os-item{background:#fff;border:1px solid #9dc0da;border-radius:12px;padding:10px 12px;margin-bottom:8px;display:flex;gap:10px;align-items:flex-start}' +
      '.os-main{flex:1;min-width:0}.os-w{font-size:17px;font-weight:700}.os-r{color:#2f6fb0;font-size:13px;margin-left:6px;font-weight:600}' +
      '.os-m{color:#1f4e79;font-size:13px;margin-top:2px}.os-ex{color:#444;font-size:12.5px;margin-top:4px;line-height:1.5}.os-src{color:#8a7a5a;font-size:11px;margin-top:4px}' +
      '.os-acts{display:flex;flex-direction:column;gap:6px;flex-shrink:0}' +
      '.os-acts button{width:38px;height:34px;border-radius:9px;border:1.5px solid #9dc0da;background:#fff;cursor:pointer;font-size:16px;line-height:1;padding:0}' +
      '.os-nb.on{background:#fff2d1;border-color:#f5a623}.os-rm{color:#b3402f;font-size:14px!important}' +
      '.os-tip{font-size:12px;color:#d6e6f5;margin-top:8px;line-height:1.5}' +
      '.os-banner{background:#fff2d1;border:1.5px solid #f5a623;border-radius:10px;padding:8px 12px;margin:10px auto;max-width:760px;font-size:13px;color:#5a3b22;font-weight:600}';
    document.head.appendChild(css);

    var fab = document.createElement('button');
    fab.className = 'os-fab'; fab.id = 'os-fab'; fab.type = 'button';
    fab.innerHTML = '📝 Ôn sai <span class="os-cnt" id="os-cnt">0</span>';
    fab.onclick = open;
    document.body.appendChild(fab);

    var bg = document.createElement('div');
    bg.className = 'os-bg'; bg.id = 'os-bg'; bg.onclick = close;
    document.body.appendChild(bg);

    var panel = document.createElement('div');
    panel.className = 'os-panel'; panel.id = 'os-panel';
    panel.innerHTML =
      '<div class="os-head"><h3>📝 ' + esc(cfg.title) + '</h3>' +
      '<div class="os-btns"><button class="os-go" id="os-go" type="button">▶ Ôn tất cả</button>' +
      '<button class="os-clr" id="os-clear" type="button">🗑 Xóa hết</button>' +
      '<button class="os-clr" id="os-close" type="button">✕ Đóng</button></div>' +
      '<div class="os-tip">📓 lưu từ vào Sổ Tay · ✕ bỏ khỏi danh sách · khi ôn sai, câu làm đúng sẽ tự rời danh sách</div></div>' +
      '<div class="os-body" id="os-body"></div>';
    document.body.appendChild(panel);
    document.getElementById('os-go').onclick = function () {
      var ids = validIds();
      if (!ids.length) return;
      close(); reviewing = true; cfg.startReview(ids);
    };
    document.getElementById('os-clear').onclick = function () {
      if (!validIds().length) return;
      if (confirm('Xóa hết danh sách câu làm sai?')) { save([]); renderList(); }
    };
    document.getElementById('os-close').onclick = close;
    document.getElementById('os-body').addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-id]');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      if (btn.classList.contains('os-nb')) toggleNotebook(id, btn);
      else if (btn.classList.contains('os-rm')) {
        var l = load(), i = l.indexOf(id);
        if (i >= 0) { l.splice(i, 1); save(l); renderList(); }
      }
    });
  }

  function renderList() {
    var ids = validIds(), body = document.getElementById('os-body');
    document.getElementById('os-go').textContent = '▶ Ôn tất cả (' + ids.length + ')';
    if (!ids.length) { body.innerHTML = '<div class="os-empty">🎉 Chưa có câu nào làm sai.<br>Câu nào làm sai sẽ tự được lưu vào đây để ôn lại.</div>'; return; }
    body.innerHTML = ids.map(function (id) {
      var it = cfg.getItem(id), nb = cfg.notebookEntry(id), on = nb && inNotebook(nb.id);
      return '<div class="os-item"><div class="os-main">' +
        '<div><span class="os-w">' + esc(it.word) + '</span>' + (it.reading && it.reading !== it.word ? '<span class="os-r">' + esc(it.reading) + '</span>' : '') + '</div>' +
        (it.meaning ? '<div class="os-m">' + esc(it.meaning) + '</div>' : '') +
        (it.example ? '<div class="os-ex">' + esc(it.example) + '</div>' : '') +
        (it.label ? '<div class="os-src">' + esc(it.label) + '</div>' : '') +
        '</div><div class="os-acts">' +
        '<button type="button" class="os-nb' + (on ? ' on' : '') + '" data-id="' + esc(id) + '" title="' + (on ? 'Đã lưu — bấm để bỏ khỏi sổ tay' : 'Lưu vào sổ tay') + '">📓</button>' +
        '<button type="button" class="os-rm" data-id="' + esc(id) + '" title="Bỏ khỏi danh sách ôn sai">✕</button>' +
        '</div></div>';
    }).join('');
  }
  function refresh() {
    var n = validIds().length, fab = document.getElementById('os-fab');
    if (!fab) return;
    document.getElementById('os-cnt').textContent = n;
    fab.classList.toggle('zero', n === 0);
  }
  function open() { renderList(); document.getElementById('os-bg').classList.add('show'); document.getElementById('os-panel').classList.add('show'); }
  function close() { document.getElementById('os-bg').classList.remove('show'); document.getElementById('os-panel').classList.remove('show'); }

  window.DcOnSai = {
    init: function (c) { cfg = c; injectUi(); refresh(); },
    markWrong: function (id) { var l = load(), i = l.indexOf(id); if (i >= 0) l.splice(i, 1); l.unshift(id); save(l); },
    markCorrect: function (id) { if (!reviewing) return; var l = load(), i = l.indexOf(id); if (i >= 0) { l.splice(i, 1); save(l); } },
    isReviewing: function () { return reviewing; },
    endReview: function () { reviewing = false; },
    open: open
  };
})();
