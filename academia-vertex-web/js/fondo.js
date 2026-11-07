'use strict';
(function () {
  const SIM = ['∫', 'Σ', 'π', '√x', '∞', 'Δ', '∂f/∂x', 'f(x)', 'x²+y²=r²', 'sen θ', 'lim', 'e^{iπ}+1=0', 'a²+b²=c²', '∇', 'λ', '{ }', '</>', '01101', 'Ω', 'F=m·a', 'dy/dx', 'cos x', 'Σn²', 'if (x)'];
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);

  function fondo(canvas, cfg) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, items = [];
    function iniciar() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cfg.fijo ? innerWidth : canvas.parentElement.clientWidth;
      h = cfg.fijo ? innerHeight : canvas.parentElement.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(14, Math.min(40, Math.round(w * h / 45000)));
      items = Array.from({ length: n }, () => ({
        t: SIM[Math.floor(Math.random() * SIM.length)], x: rnd(0, w), y: rnd(0, h), v: rnd(0.15, 0.5),
        s: rnd(16, 34), a: rnd(cfg.amin, cfg.amax), r: rnd(-0.3, 0.3), f: rnd(0, 6.28),
        cuadro: Math.random() < 0.25, l: rnd(20, 60), c: cfg.colores[Math.floor(Math.random() * cfg.colores.length)]
      }));
    }
    function dibujar(t) {
      ctx.clearRect(0, 0, w, h);
      for (const i of items) {
        if (!quieto) { i.y -= i.v; if (i.y < -70) { i.y = h + 70; i.x = rnd(0, w); } }
        const x = i.x + Math.sin(t / 2000 + i.f) * 14;
        ctx.save(); ctx.globalAlpha = i.a; ctx.translate(x, i.y);
        if (i.cuadro) { ctx.rotate(t / 6000 + i.f); ctx.strokeStyle = i.c; ctx.lineWidth = 1.5; ctx.strokeRect(-i.l / 2, -i.l / 2, i.l, i.l); }
        else { ctx.rotate(i.r); ctx.fillStyle = i.c; ctx.font = 'italic ' + i.s + 'px "Times New Roman", serif'; ctx.fillText(i.t, 0, 0); }
        ctx.restore();
      }
    }
    function paso(t) { dibujar(t); requestAnimationFrame(paso); }
    iniciar();
    quieto ? dibujar(0) : requestAnimationFrame(paso);
    let tm; addEventListener('resize', () => { clearTimeout(tm); tm = setTimeout(() => { iniciar(); if (quieto) dibujar(0); }, 200); });
  }

  fondo(document.getElementById('fondoHero'), { colores: ['#ffffff', '#ffffff', '#bfe3ff'], amin: 0.08, amax: 0.24 });
  fondo(document.getElementById('fondoPagina'), { fijo: true, colores: ['#ffffff', '#ffffff', '#bfe3ff'], amin: 0.07, amax: 0.2 });
})();