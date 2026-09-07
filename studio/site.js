(() => {
  const canvas = document.querySelector('#field');
  const ctx = canvas?.getContext('2d');
  if (!ctx) return;
  const field = canvas.parentElement;
  const motion = document.querySelector('#motion');
  const modeButtons = [...document.querySelectorAll('[data-mode]')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, mode = 0, time = 0, frame = 0;
  let width = 1, height = 1, previous = 0;
  const pointer = { x: 0, y: 0 };
  const count = 850;
  const points = Array.from({length: count}, (_, i) => {
    const y = 1 - 2 * (i + .5) / count;
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    const r = Math.sqrt(1 - y * y);
    return {x: Math.cos(phi) * r, y, z: Math.sin(phi) * r, phase: phi};
  });
  function draw() {
    ctx.clearRect(0, 0, width, height);
    const size = Math.min(width * .4, height * .35);
    const a = time * .16 + pointer.x * .25;
    const projected = points.map((p, i) => {
      let x = p.x, y = p.y, z = p.z;
      if (mode === 1) {
        x = (i / count - .5) * 2.5;
        y = Math.sin(i * .09 + time) * .35 + Math.cos(i * .025 + time * .6) * .28;
        z = Math.cos(p.phase) * .45;
      } else if (mode === 2) {
        const ring = .8 + .17 * Math.sin(p.phase * 3 + time * 1.4);
        x = Math.cos(p.phase) * ring;
        z = Math.sin(p.phase) * ring;
        y = p.y * .45 + Math.sin(p.phase * 4 + time) * .15;
      }
      const rx = x * Math.cos(a) - z * Math.sin(a);
      const rz = x * Math.sin(a) + z * Math.cos(a);
      const ry = y * Math.cos(.2 + pointer.y * .2) - rz * Math.sin(.2 + pointer.y * .2);
      const scale = 2.8 / (2.8 + rz);
      return {x: width / 2 + rx * size * scale, y: height * .46 + ry * size * scale, z: rz, alpha: .2 + (1 - rz) * .3};
    }).sort((a,b) => b.z-a.z);
    for (const p of projected) {
      ctx.fillStyle = `rgba(217,241,140,${Math.min(.9,p.alpha)})`;
      ctx.beginPath();ctx.arc(p.x,p.y, p.z < 0 ? 1.25 : .7,0,Math.PI*2);ctx.fill();
    }
  }
  function canAnimate() { return !paused && visible && !document.hidden; }
  function tick(stamp) {
    frame = 0;
    if (!canAnimate()) return;
    time += previous ? Math.min((stamp - previous)/1000,.05) : 0;
    previous = stamp; draw(); frame = requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(frame); frame = 0; previous = 0;
    motion.textContent = paused ? 'Resume motion' : 'Pause motion';
    motion.setAttribute('aria-pressed', String(paused));
    draw(); if (canAnimate()) frame = requestAnimationFrame(tick);
  }
  new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect();width = rect.width;height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1,2);
    canvas.width = Math.round(width*dpr);canvas.height = Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);draw();
  }).observe(field);
  new IntersectionObserver(([entry]) => {visible = entry.isIntersecting;sync();}).observe(field);
  document.addEventListener('visibilitychange',sync);
  field.addEventListener('pointermove', e => {
    if (paused || reduced.matches) return;
    const rect = canvas.getBoundingClientRect();
    pointer.x = (e.clientX - rect.left)/width - .5;pointer.y = (e.clientY-rect.top)/height-.5;
  });
  field.addEventListener('pointerleave',() => {pointer.x=0;pointer.y=0;});
  modeButtons.forEach(button => button.addEventListener('click',() => {
    mode = Number(button.dataset.mode);
    modeButtons.forEach(b => b.setAttribute('aria-pressed',String(b===button)));
    document.querySelector('#field-name').textContent = ['CONNECTIONS','SIGNALS','RHYTHM'][mode];draw();
  }));
  motion.addEventListener('click',() => {paused=!paused;sync();});
  reduced.addEventListener('change',() => {paused=reduced.matches;sync();});
  sync();
})();
