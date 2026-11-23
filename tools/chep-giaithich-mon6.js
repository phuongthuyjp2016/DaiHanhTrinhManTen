// Cách chạy: node tools/chep-giaithich-mon6.js dao10-daichien-dethi.html dao10-tau-ghep-cau.html
// Chép nguyên văn phần giải thích Mon6 của đảo 10 vào game (giữa 2 dấu mốc), chạy lại được khi đảo 10 đổi.
const fs=require('fs');const [src,dst]=process.argv.slice(2);
const s=fs.readFileSync(src,'utf8');let g=fs.readFileSync(dst,'utf8');
function need(i,n){if(i<0)throw new Error('không thấy '+n);return i}
function braceEnd(str,open){let d=0;for(let k=open;k<str.length;k++){const c=str[k];if(c==='"'||c==="'"||c==='`'){const q=c;k++;while(k<str.length&&str[k]!==q){if(str[k]===String.fromCharCode(92))k++;k++}continue}if(c==='{')d++;else if(c==='}'){d--;if(!d)return k}}throw new Error('brace')}
const gi=need(s.indexOf('const GRAMMAR_N1={'),'GRAMMAR_N1');const go=s.indexOf('{',gi);const GR='var GRAMMAR_N1='+s.slice(go,braceEnd(s,go)+1)+';';
const mi=need(s.indexOf('const MON_LABELS='),'MON_LABELS');const ML='var MON_LABELS='+s.slice(s.indexOf('{',mi),braceEnd(s,s.indexOf('{',mi))+1)+';';
const ri=need(s.indexOf('function dcRefChip'),'dcRefChip'),re=need(s.indexOf('function render(){',ri),'render');const REF=s.slice(ri,re);
const bi=need(s.indexOf('function gramBadge'),'gramBadge');const GB=s.slice(bi,braceEnd(s,s.indexOf('{',bi))+1);
const r6=need(s.indexOf('function renderMon6'),'renderMon6');const xs=need(s.indexOf('var u=e.star_word',r6),'star_word');const xe=need(s.indexOf('return s}',xs),'return s');
const EX='function m6Explain(e){var s="",i=e.order?e.order.split("-").map(Number):[];_m6FullText=e.full_sentence?e.full_sentence.replace(/[（）()*＊★]/g,""):"";{'+s.slice(xs,xe)+'return s}';
const si=need(s.indexOf('speakJapanese=e=>{'),'speak');const SP='var speakJapanese='+s.slice(si+'speakJapanese='.length,braceEnd(s,s.indexOf('{',si))+1)+';';
const block='/*DAO10-COPY-START: chép nguyên văn từ dao10-daichien-dethi.html — đừng sửa tay, chạy lại script chép */\n'+
 'var state={exam:null,mon:"mon6",idx:0,chosen:1},_m6FullText="";\n'+SP+'\n'+ML+'\n'+GR+'\n'+REF+'\n'+GB+'\n'+EX+'\n'+
 'function dcGoToResult(r){location.href="dao10-daichien-dethi.html";}\n/*DAO10-COPY-END*/';
const a=g.indexOf('/*DAO10-COPY-START'),b=g.indexOf('/*DAO10-COPY-END*/');
if(a>=0)g=g.slice(0,a)+block+g.slice(b+'/*DAO10-COPY-END*/'.length);
else g=g.replace('<script src="dao10-daichien-dethi-data.js"></script>','<script src="dao10-daichien-dethi-data.js"></script>\n<script>\n'+block+'\n</script>');
fs.writeFileSync(dst,g);console.log('ok',block.length);
