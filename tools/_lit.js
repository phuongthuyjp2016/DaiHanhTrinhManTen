// lấy literal JS sau "NAME =" (cân ngoặc, bỏ qua chuỗi) rồi eval
const vm = require('vm');
function grab(src, name) {
  const re = new RegExp('(?:const|var|let)\\s+' + name + '\\s*=\\s*');
  const m = re.exec(src); if (!m) return undefined;
  let i = m.index + m[0].length, start = i, depth = 0, q = null;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (c === '\\') { i++; continue; } if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === '`') { q = c; continue; }
    if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
    if (c === '[' || c === '{' || c === '(') depth++;
    else if (c === ']' || c === '}' || c === ')') { depth--; if (depth === 0) { i++; break; } }
  }
  return vm.runInNewContext('(' + src.slice(start, i) + ')');
}
module.exports = { grab };
