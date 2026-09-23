(() => {
  const equationSelector='.formula-chip,.textbook-equations code';
  const normalizeOperators=text=>String(text||'')
    .replace(/[−–—]/g,'-')
    .replace(/[＋]/g,'+')
    .replace(/[÷]/g,'/')
    .replace(/[⋅∙]/g,'·');

  document.addEventListener('click',e=>{
    const target=e.target.closest?.(equationSelector);
    if(!target)return;
    const original=target.textContent;
    const normalized=normalizeOperators(original);
    if(normalized===original)return;
    target.textContent=normalized;
    queueMicrotask(()=>{ if(target.isConnected) target.textContent=original; });
  },true);

  document.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    const target=e.target.closest?.(equationSelector);
    if(!target)return;
    const original=target.textContent;
    const normalized=normalizeOperators(original);
    if(normalized===original)return;
    target.textContent=normalized;
    queueMicrotask(()=>{ if(target.isConnected) target.textContent=original; });
  },true);
})();