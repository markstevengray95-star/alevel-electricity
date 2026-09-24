(() => {
  let dragging=false,lastX=0,lastY=0,accX=0,accY=0;
  const canvas=()=>document.getElementById('sim3DCanvas');
  function send(key){
    const c=canvas();
    if(!c)return;
    c.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true,cancelable:true}));
  }
  function installStyle(){
    if(document.getElementById('sim3DInputV8Style'))return;
    const s=document.createElement('style');
    s.id='sim3DInputV8Style';
    s.textContent='#sim3DCanvas{position:relative!important;z-index:4!important;pointer-events:auto!important;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none} .sim3d-badge,.sim3d-hint{pointer-events:none!important}';
    document.head.appendChild(s);
  }
  document.addEventListener('pointerdown',e=>{
    const c=e.target.closest?.('#sim3DCanvas');
    if(!c)return;
    dragging=true;lastX=e.clientX;lastY=e.clientY;accX=0;accY=0;
    c.classList.add('dragging');
    try{c.setPointerCapture?.(e.pointerId);}catch(_){}
    e.preventDefault();
  },true);
  window.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;accX+=dx;accY+=dy;
    while(Math.abs(accX)>=8){send(accX>0?'ArrowRight':'ArrowLeft');accX+=accX>0?-8:8;}
    while(Math.abs(accY)>=8){send(accY>0?'ArrowDown':'ArrowUp');accY+=accY>0?-8:8;}
    e.preventDefault();
  },true);
  function end(){if(!dragging)return;dragging=false;canvas()?.classList.remove('dragging');accX=0;accY=0;}
  window.addEventListener('pointerup',end,true);window.addEventListener('pointercancel',end,true);window.addEventListener('blur',end);
  document.addEventListener('touchmove',e=>{if(dragging)e.preventDefault();},{passive:false,capture:true});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installStyle);else installStyle();
})();
