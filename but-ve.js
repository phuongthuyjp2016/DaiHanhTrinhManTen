/* Bút vẽ cho các trang học: nút ✎ đỏ ở góc dưới bên phải, dùng được với Apple Pencil, chuột, bút cảm ứng.
   Nét vẽ chỉ nằm trên trang đang mở, tải lại là mất. Một file dùng chung, trang nào cần thì thêm đúng một dòng
   <script src="but-ve.js" defer></script> trước </body>. */
(function(){
function penMain(){
  if(window.__mmPen){ window.__mmPen.toggle(); return; }
  var COLORS=['#e03131','#1971c2','#2f9e44','#f08c00','#111111','#ffffff'];
  var st={strokes:[],tool:'pen',color:COLORS[0],size:4,on:false,scroll:false};
  var lastPen=0, cur=null;
  var de=document.documentElement;
  var cv=document.createElement('canvas');
  cv.style.cssText='position:fixed;left:0;top:0;z-index:2147483645;touch-action:none;pointer-events:none;-webkit-user-select:none;user-select:none';
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;top:max(10px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);z-index:2147483647;display:none;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:96vw;padding:8px 12px;border-radius:28px;background:#fff;border:1px solid #ccc;box-shadow:0 4px 16px rgba(0,0,0,.3);font:14px -apple-system,Helvetica,sans-serif;color:#222;-webkit-user-select:none;user-select:none';
  de.appendChild(cv); de.appendChild(bar);
  function mk(txt,title,fn){
    var b=document.createElement('button');
    b.textContent=txt; b.title=title; b.setAttribute('aria-label',title);
    b.style.cssText='min-width:42px;height:42px;border:1px solid #bbb;background:#f3f3f3;border-radius:12px;font-size:17px;color:#222;padding:0 10px;cursor:pointer;touch-action:manipulation';
    b.onclick=fn; bar.appendChild(b); return b;
  }
  var tools={};
  [['pen','✏️','Bút'],['hi','🖍','Bút dạ quang'],['erase','🧽','Tẩy']].forEach(function(t){
    tools[t[0]]=mk(t[1],t[2],function(){ st.tool=t[0]; st.scroll=false; sync(); });
  });
  var dots=COLORS.map(function(c){
    var b=mk('','Màu',function(){ st.color=c; if(st.tool==='erase') st.tool='pen'; st.scroll=false; sync(); });
    b.style.cssText+=';min-width:32px;width:32px;height:32px;border-radius:50%;background:'+c+';padding:0';
    return [c,b];
  });
  var size=document.createElement('input');
  size.type='range'; size.min=1; size.max=14; size.value=st.size; size.style.cssText='width:90px;height:32px';
  size.oninput=function(){ st.size=+size.value; };
  bar.appendChild(size);
  mk('↶','Hoàn tác',function(){ st.strokes.pop(); draw(); });
  mk('🗑','Xoá hết',function(){ st.strokes=[]; draw(); });
  var hand=mk('✋','Chế độ cuộn trang bằng ngón tay',function(){ st.scroll=!st.scroll; sync(); });
  mk('✕','Tắt bút (nét vẽ vẫn hiện)',function(){ setOn(false); });
  function sync(){
    for(var id in tools){ tools[id].style.background=(!st.scroll&&st.tool===id)?'#9cd':'#f3f3f3'; }
    dots.forEach(function(d){ d[1].style.outline=(st.color===d[0]&&st.tool!=='erase'&&!st.scroll)?'3px solid #222':'none'; });
    hand.style.background=st.scroll?'#9cd':'#f3f3f3';
    cv.style.pointerEvents=(st.on&&!st.scroll)?'auto':'none';
  }
  function draw(){
    var d=window.devicePixelRatio||1, w=window.innerWidth, h=window.innerHeight;
    if(cv.width!==Math.round(w*d)||cv.height!==Math.round(h*d)){
      cv.width=Math.round(w*d); cv.height=Math.round(h*d);
      cv.style.width=w+'px'; cv.style.height=h+'px';
    }
    var x=cv.getContext('2d'), sx=window.pageXOffset, sy=window.pageYOffset;
    x.setTransform(d,0,0,d,-sx*d,-sy*d);
    x.clearRect(sx,sy,w,h);
    x.lineCap='round'; x.lineJoin='round';
    st.strokes.forEach(function(k){
      x.save();
      if(k.tool==='erase') x.globalCompositeOperation='destination-out';
      else if(k.tool==='hi') x.globalAlpha=0.35;
      x.strokeStyle=k.tool==='erase'?'#000':k.color; x.lineWidth=k.size;
      x.beginPath();
      k.pts.forEach(function(p,i){ if(i) x.lineTo(p[0],p[1]); else x.moveTo(p[0],p[1]); });
      if(k.pts.length===1) x.lineTo(k.pts[0][0]+0.1,k.pts[0][1]);
      x.stroke(); x.restore();
    });
  }
  function pt(e){ return [e.clientX+window.pageXOffset, e.clientY+window.pageYOffset]; }
  cv.addEventListener('pointerdown',function(e){
    if(e.pointerType==='pen') lastPen=Date.now();
    else if(e.pointerType==='touch' && Date.now()-lastPen<1500) return;
    try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    cur={tool:st.tool,color:st.color,size:st.tool==='hi'?st.size*4:(st.tool==='erase'?st.size*5:st.size),pts:[pt(e)],id:e.pointerId};
    st.strokes.push(cur); draw(); e.preventDefault();
  });
  cv.addEventListener('pointermove',function(e){
    if(!cur||e.pointerId!==cur.id) return;
    if(e.pointerType==='pen') lastPen=Date.now();
    var list=(e.getCoalescedEvents&&e.getCoalescedEvents())||[e];
    if(!list.length) list=[e];
    list.forEach(function(ev){ cur.pts.push(pt(ev)); });
    draw(); e.preventDefault();
  });
  function end(e){ if(cur&&(!e||e.pointerId===cur.id)) cur=null; }
  cv.addEventListener('pointerup',end);
  cv.addEventListener('pointercancel',end);
  cv.addEventListener('wheel',function(e){ window.scrollBy(e.deltaX,e.deltaY); },{passive:true});
  window.addEventListener('scroll',draw,true);
  window.addEventListener('resize',draw);
  function setOn(v){
    st.on=v; bar.style.display=v?'flex':'none';
    if(!v) st.scroll=false;
    sync(); draw();
  }
  window.__mmPen={toggle:function(){ setOn(!st.on); }};
  if(window.__mmPenFab){
    var fab=document.createElement('button');
    fab.textContent='✎'; fab.title='Bút vẽ'; fab.setAttribute('aria-label','Bút vẽ');
    fab.style.cssText='position:fixed;right:max(16px,env(safe-area-inset-right));bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483646;width:54px;height:54px;border-radius:50%;border:0;background:#e03131;color:#fff;font-size:26px;box-shadow:0 4px 14px rgba(0,0,0,.35);cursor:pointer;touch-action:manipulation';
    fab.onclick=function(){ window.__mmPen.toggle(); };
    de.appendChild(fab);
  } else {
    setOn(true);
  }
  sync();
}
function go(){ window.__mmPenFab=true; penMain(); }
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',go); } else { go(); }
})();
