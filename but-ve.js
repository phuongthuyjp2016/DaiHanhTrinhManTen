/* Bút vẽ cho các trang học: nút ✎ đỏ ở góc dưới bên phải. Dùng được với Apple Pencil, chuột, ngón tay.
   Màn hình rộng: thanh công cụ ở trên cùng. Điện thoại (rộng tối đa 640px): thanh gọn ở dưới cùng, màu và độ dày
   gom thành nút bấm để đổi. Nét vẽ bám theo ô nội dung đã gạch (thu phóng, đổi cỡ chữ vẫn đúng chỗ), tải lại là mất.
   Một file dùng chung, trang nào cần thì thêm đúng một dòng <script src="but-ve.js" defer></script> trước </body>. */
(function(){
function penMain(){
  if(window.__mmPen){ window.__mmPen.toggle(); return; }
  var COLORS=['#e03131','#1971c2','#2f9e44','#f08c00','#111111','#ffffff'];
  var SIZES=[3,6,10];
  var st={strokes:[],tool:'pen',color:COLORS[0],size:4,on:false,scroll:false,palOpen:false};
  var lastPen=0, cur=null, trashTimer=0, trashArmed=false;
  var de=document.documentElement;
  var cv=document.createElement('canvas');
  cv.style.cssText='position:fixed;left:0;top:0;z-index:2147483645;touch-action:none;pointer-events:none;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none';
  var bar=document.createElement('div');
  bar.style.cssText='position:fixed;z-index:2147483647;display:none;align-items:center;flex-wrap:wrap;justify-content:center;background:#fff;border:1px solid #ccc;box-shadow:0 4px 16px rgba(0,0,0,.3);font:14px -apple-system,Helvetica,sans-serif;color:#222;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;touch-action:manipulation';
  var pal=document.createElement('div');
  pal.style.cssText='position:absolute;left:50%;bottom:100%;transform:translateX(-50%);margin-bottom:10px;display:none;width:max-content;max-width:94vw;gap:10px;padding:10px 14px;background:#fff;border:1px solid #ccc;border-radius:22px;box-shadow:0 4px 16px rgba(0,0,0,.3)';
  bar.appendChild(pal);
  de.appendChild(cv); de.appendChild(bar);
  var btns=[];
  function mk(txt,title,fn){
    var b=document.createElement('button');
    b.textContent=txt; b.title=title; b.setAttribute('aria-label',title);
    b.style.cssText='border:1px solid #bbb;background:#f3f3f3;border-radius:12px;color:#222;padding:0 8px;cursor:pointer;touch-action:manipulation;display:flex;align-items:center;justify-content:center;flex:none;-webkit-tap-highlight-color:transparent';
    b.onclick=fn; bar.appendChild(b); btns.push(b); return b;
  }
  var tools={};
  [['pen','✏️','Bút'],['hi','🖍','Bút dạ quang'],['erase','🧽','Tẩy']].forEach(function(t){
    tools[t[0]]=mk(t[1],t[2],function(){ st.tool=t[0]; st.scroll=false; st.palOpen=false; sync(); });
  });
  var dots=COLORS.map(function(c){
    var b=mk('','Màu',function(){ pickColor(c); });
    b.style.background=c; b.dataset.dot='1';
    return [c,b];
  });
  var pdots=COLORS.map(function(c){
    var b=document.createElement('button');
    b.setAttribute('aria-label','Màu');
    b.style.cssText='width:38px;height:38px;flex:none;border-radius:50%;border:1px solid #bbb;padding:0;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;background:'+c;
    b.onclick=function(){ pickColor(c); };
    pal.appendChild(b); return [c,b];
  });
  var colorBtn=mk('','Chọn màu',function(){ st.palOpen=!st.palOpen; sync(); });
  var colorDot=document.createElement('span');
  colorBtn.appendChild(colorDot);
  var sizeBtn=mk('','Độ dày nét',function(){
    var i=SIZES.indexOf(st.size); st.size=SIZES[(i+1)%SIZES.length]; size.value=st.size; sync();
  });
  var sizeDot=document.createElement('span');
  sizeBtn.appendChild(sizeDot);
  var size=document.createElement('input');
  size.type='range'; size.min=1; size.max=14; size.value=st.size;
  size.style.cssText='width:90px;height:32px;flex:none';
  size.oninput=function(){ st.size=+size.value; sync(); };
  bar.appendChild(size);
  var undo=mk('↶','Hoàn tác',function(){ st.strokes.pop(); draw(); });
  var trash=mk('🗑','Xoá hết',function(){
    if(!trashArmed){
      trashArmed=true; trash.style.background='#ffb3b3'; trash.textContent='Xoá?';
      trashTimer=setTimeout(disarm,2500); return;
    }
    disarm(); st.strokes=[]; draw();
  });
  function disarm(){ clearTimeout(trashTimer); trashArmed=false; trash.textContent='🗑'; trash.style.background='#f3f3f3'; }
  var hand=mk('✋','Chế độ cuộn và phóng to bằng ngón tay',function(){ st.scroll=!st.scroll; st.palOpen=false; sync(); });
  var closeB=mk('✕','Tắt bút (nét vẽ vẫn hiện)',function(){ setOn(false); });
  function pickColor(c){ st.color=c; if(st.tool==='erase') st.tool='pen'; st.scroll=false; st.palOpen=false; sync(); }

  function isSmall(){ return window.innerWidth<=640; }
  function layout(){
    var small=isSmall(), h=42;
    if(small){ h=Math.max(32,Math.min(40,Math.floor((window.innerWidth*0.98-16-32)/9))); }
    var s=bar.style;
    s.left='50%'; s.transform='translateX(-50%)'; s.width='max-content';
    if(small){
      s.top='auto'; s.bottom='max(12px,env(safe-area-inset-bottom))';
      s.gap='4px'; s.padding='6px 8px'; s.borderRadius='26px'; s.maxWidth='98vw';
    } else {
      s.bottom='auto'; s.top='max(10px,env(safe-area-inset-top))';
      s.gap='8px'; s.padding='8px 12px'; s.borderRadius='28px'; s.maxWidth='96vw';
    }
    btns.forEach(function(b){
      b.style.height=h+'px';
      if(b.dataset.dot){ b.style.minWidth=b.style.width='32px'; b.style.height='32px'; b.style.borderRadius='50%'; b.style.padding='0'; b.style.display=small?'none':'flex'; }
      else { b.style.minWidth=h+'px'; b.style.padding=small?'0':'0 8px'; b.style.fontSize=small?'17px':'17px'; }
    });
    colorBtn.style.display=small?'flex':'none';
    sizeBtn.style.display=small?'flex':'none';
    size.style.display=small?'none':'';
    if(!small) st.palOpen=false;
  }
  function sync(){
    for(var id in tools){ tools[id].style.background=(!st.scroll&&st.tool===id)?'#9cd':'#f3f3f3'; }
    dots.forEach(function(d){ d[1].style.outline=(st.color===d[0]&&st.tool!=='erase'&&!st.scroll)?'3px solid #222':'none'; d[1].style.outlineOffset='1px'; });
    pdots.forEach(function(d){ d[1].style.outline=(st.color===d[0])?'3px solid #222':'none'; d[1].style.outlineOffset='2px'; });
    colorDot.style.cssText='display:block;width:22px;height:22px;border-radius:50%;border:1px solid #999;background:'+st.color;
    var sd=Math.max(4,Math.min(20,st.size*1.6));
    sizeDot.style.cssText='display:block;border-radius:50%;background:#222;width:'+sd+'px;height:'+sd+'px';
    hand.style.background=st.scroll?'#9cd':'#f3f3f3';
    pal.style.display=(st.palOpen&&isSmall())?'flex':'none';
    cv.style.pointerEvents=(st.on&&!st.scroll)?'auto':'none';
    if(fab) fab.style.display=st.on?'none':'block';
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
      var ox=0, oy=0, a=k.a;
      if(a){
        if(a.el.isConnected){
          var r=a.el.getBoundingClientRect();
          if(r.width>0||r.height>0){ a.sx=r.left+sx-a.l; a.sy=r.top+sy-a.t; }
        }
        ox=a.sx||0; oy=a.sy||0;
      }
      x.save();
      if(k.tool==='erase') x.globalCompositeOperation='destination-out';
      else if(k.tool==='hi') x.globalAlpha=0.35;
      x.strokeStyle=k.tool==='erase'?'#000':k.color; x.lineWidth=k.size;
      x.beginPath();
      k.pts.forEach(function(p,i){ if(i) x.lineTo(p[0]+ox,p[1]+oy); else x.moveTo(p[0]+ox,p[1]+oy); });
      if(k.pts.length===1) x.lineTo(k.pts[0][0]+ox+0.1,k.pts[0][1]+oy);
      x.stroke(); x.restore();
    });
  }
  function anchorAt(cx,cy){
    var list=document.elementsFromPoint?document.elementsFromPoint(cx,cy):[];
    for(var i=0;i<list.length;i++){
      var el=list[i];
      if(el===cv||bar.contains(el)||(fab&&el===fab)||el===de||el===document.body||el===document.head) continue;
      var n=el;
      while(n&&n!==document.body&&n!==de){
        var cs=getComputedStyle(n);
        if(cs.position==='fixed'||cs.position==='sticky') return null;
        n=n.parentElement;
      }
      while(el.parentElement&&el.parentElement!==document.body){
        var q=el.getBoundingClientRect();
        if(q.width>=120&&q.height>=24) break;
        el=el.parentElement;
      }
      var r=el.getBoundingClientRect();
      if(el===document.body||(r.width<1&&r.height<1)) return null;
      return {el:el,l:r.left+window.pageXOffset,t:r.top+window.pageYOffset,sx:0,sy:0};
    }
    return null;
  }
  function pt(e){ return [e.clientX+window.pageXOffset, e.clientY+window.pageYOffset]; }
  cv.addEventListener('pointerdown',function(e){
    if(e.pointerType==='pen') lastPen=Date.now();
    else if(e.pointerType==='touch' && Date.now()-lastPen<1500) return;
    if(st.palOpen){ st.palOpen=false; sync(); }
    try{ cv.setPointerCapture(e.pointerId); }catch(err){}
    cur={tool:st.tool,color:st.color,size:st.tool==='hi'?st.size*4:(st.tool==='erase'?st.size*5:st.size),pts:[pt(e)],id:e.pointerId,a:anchorAt(e.clientX,e.clientY)};
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
  cv.addEventListener('contextmenu',function(e){ e.preventDefault(); });
  cv.addEventListener('wheel',function(e){ window.scrollBy(e.deltaX,e.deltaY); },{passive:true});
  window.addEventListener('scroll',draw,true);
  window.addEventListener('resize',function(){ layout(); sync(); draw(); });
  if(window.visualViewport){ window.visualViewport.addEventListener('resize',function(){ draw(); }); }
  function setOn(v){
    st.on=v; bar.style.display=v?'flex':'none';
    if(!v){ st.scroll=false; st.palOpen=false; disarm(); }
    layout(); sync(); draw();
  }
  window.__mmPen={toggle:function(){ setOn(!st.on); }};
  var fab=null;
  if(window.__mmPenFab){
    fab=document.createElement('button');
    fab.textContent='✎'; fab.title='Bút vẽ'; fab.setAttribute('aria-label','Bút vẽ');
    var fs=isSmall()?48:54;
    fab.style.cssText='position:fixed;right:max(14px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));z-index:2147483646;width:'+fs+'px;height:'+fs+'px;border-radius:50%;border:0;background:#e03131;color:#fff;font-size:'+(isSmall()?22:26)+'px;box-shadow:0 4px 14px rgba(0,0,0,.35);cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;opacity:.92';
    fab.onclick=function(){ window.__mmPen.toggle(); };
    de.appendChild(fab);
    layout(); sync();
  } else {
    setOn(true);
  }
}
function go(){ window.__mmPenFab=true; penMain(); }
if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded',go); } else { go(); }
})();
