'use strict';
const el = (tag, cls, text) => { const x = document.createElement(tag); if (cls) x.className = cls; if (text) x.textContent = text; return x; };
const wa = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

// Tarjetas (se arman con textContent: sin inyección de HTML)
const slug = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function fotoCarrera(c, clase) { const i = new Image(); i.className = clase; i.alt = c.n; i.loading = 'lazy'; i.addEventListener('error', () => i.remove()); i.src = 'img/carreras/' + encodeURIComponent(c.f || slug(c.n) + '.jpg'); return i; }
const lista = document.getElementById('listaCarreras');
CARRERAS.forEach((c, i) => {
  const col = el('div', 'col-sm-6 col-lg-4');
  const b = el('button', 'card vx-card'); b.type = 'button'; b.style.background = c.c;
  const emo = el('span', 'vx-emoji', c.e), foto = fotoCarrera(c, 'vx-foto');
  foto.addEventListener('load', () => { emo.hidden = true; });
  b.append(foto, emo, el('h3', '', c.n), el('p', '', c.d.split('.')[0] + '.'));
  b.addEventListener('click', () => abrir(i));
  col.append(b); lista.append(col);
});

const modal = new bootstrap.Modal('#modalCarrera');
function abrir(i) {
  const c = CARRERAS[i], cuerpo = document.getElementById('modalCuerpo');
  document.getElementById('modalTitulo').textContent = c.e + ' ' + c.n;
  cuerpo.replaceChildren(fotoCarrera(c, 'vx-foto-modal'), el('p', '', c.d), el('p', 'fw-semibold mb-1', 'Modalidad: presencial y virtual'));
  const bloque = (t, items) => { if (!items.length) return; cuerpo.append(el('h3', 'h6 mt-3', t)); const ul = el('ul'); items.forEach(x => ul.append(el('li', '', x))); cuerpo.append(ul); };
  if (c.m.length) {
    cuerpo.append(el('h3', 'h6 mt-3', 'Materias de apoyo'));
    c.m.forEach(k => { const [t, u] = MAT[k], det = el('details', 'mb-2'); det.append(el('summary', 'fw-semibold', t)); const ul = el('ul'); u.split('|').forEach(x => ul.append(el('li', '', x))); det.append(ul); cuerpo.append(det); });
  }
  bloque('Universidades', c.u);
  document.getElementById('modalWa').href = wa('Hola, quiero info sobre ' + c.n);
  modal.show();
}

// Formulario: validación, honeypot y límite de envíos
const form = document.getElementById('formContacto'), estado = document.getElementById('estadoForm'), btn = document.getElementById('btnEnviar');
const msg = (t, ok) => { estado.className = 'mt-3 alert ' + (ok ? 'alert-success' : 'alert-danger'); estado.textContent = t; };
form.addEventListener('submit', async e => {
  e.preventDefault();
  if (form._gotcha && form._gotcha.value) return; // bot
  if (!form.checkValidity()) { form.classList.add('was-validated'); return msg('Revisá los campos obligatorios.', false); }
  let ult = 0; try { ult = +localStorage.getItem('vx_ult') || 0; } catch (_) {}
  if (Date.now() - ult < 60000) return msg('Esperá un minuto antes de enviar otra consulta.', false);
  btn.disabled = true; btn.textContent = 'Enviando...';
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error();
    try { localStorage.setItem('vx_ult', Date.now()); } catch (_) {}
    form.reset(); form.classList.remove('was-validated');
    msg('¡Gracias! Recibimos tu consulta y te respondemos pronto.', true);
  } catch (_) { msg('No pudimos enviar el mensaje. Escribinos por WhatsApp.', false); }
  btn.disabled = false; btn.textContent = 'Enviar consulta';
});

// Testimonios (la sección se muestra solo si hay datos)
const secT = document.getElementById('testimonios');
if (TESTIMONIOS.length) {
  secT.hidden = false;
  const fila = document.getElementById('listaTestimonios');
  TESTIMONIOS.forEach(t => { const col = el('div', 'col-md-6 col-lg-4'), q = el('blockquote', 'card vx-card'); q.append(el('p', '', '“' + t.texto + '”'), el('footer', 'small fw-semibold', t.nombre + ' · ' + t.carrera)); col.append(q); fila.append(col); });
}

// Chatbot de preguntas frecuentes (sin servidor)
const chat = document.getElementById('chatPanel'), chatLog = document.getElementById('chatLog'), chatIn = document.getElementById('chatInput');
const burbuja = (t, quien) => { const b = el('div', 'vx-msg ' + quien, t); chatLog.append(b); chatLog.scrollTop = chatLog.scrollHeight; };
document.getElementById('chatToggle').addEventListener('click', () => { chat.hidden = !chat.hidden; if (!chat.hidden && !chatLog.children.length) burbuja(RESPUESTAS[5][1], 'bot'); if (!chat.hidden) chatIn.focus(); });
document.getElementById('chatForm').addEventListener('submit', e => {
  e.preventDefault();
  const q = chatIn.value.trim().slice(0, 200); if (!q) return;
  burbuja(q, 'yo'); chatIn.value = '';
  const r = RESPUESTAS.find(([re]) => re.test(q.toLowerCase()));
  setTimeout(() => burbuja(r ? r[1] : RESPUESTA_DEFECTO, 'bot'), 300);
});

// Logo y foto del profesor (opcionales)
function cargarImg(id, base) {
  const i = document.getElementById(id), exts = ['.jpg', '.jpeg', '.png', '.webp', '.jfif', '.gif', '.avif', '.bmp', '.svg', '.JPG', '.PNG']; let n = 0;
  i.addEventListener('load', () => { i.hidden = false; });
  i.addEventListener('error', () => { if (++n < exts.length) i.src = encodeURI(base + exts[n]); });
  i.src = encodeURI(base + exts[0]);
}
cargarImg('logoImg', LOGO); document.getElementById('logoImg').addEventListener('load', () => { document.getElementById('logoTxt').hidden = true; }); cargarImg('fotoProfesor', FOTO_PROFESOR);

// Carrusel de alumnos aprobados (prueba varias extensiones; si una imagen no existe, se omite)
function probar(base) {
  const exts = ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']; let n = 0;
  return new Promise(res => {
    const i = new Image();
    i.onload = () => res(i.src);
    i.onerror = () => { if (++n < exts.length) i.src = encodeURI('img/resultados/' + base + exts[n]); else res(null); };
    i.src = encodeURI('img/resultados/' + base + exts[0]);
  });
}
Promise.all(GALERIA.map(probar)).then(urls => {
  urls = urls.filter(Boolean);
  if (!urls.length) return;
  document.getElementById('resultados').hidden = false;
  const cont = document.getElementById('listaResultados'), grande = document.getElementById('fotoGrande'), mf = new bootstrap.Modal('#modalFoto');
  cont.className = '';
  const car = el('div', 'carousel slide vx-carrusel'); car.id = 'carruselResultados';
  const ind = el('div', 'carousel-indicators'), inner = el('div', 'carousel-inner');
  urls.forEach((u, n) => {
    const b = el('button'); b.type = 'button'; b.dataset.bsTarget = '#carruselResultados'; b.dataset.bsSlideTo = n; b.setAttribute('aria-label', 'Mensaje ' + (n + 1)); if (!n) { b.className = 'active'; b.setAttribute('aria-current', 'true'); }
    ind.append(b);
    const it = el('div', 'carousel-item' + (n ? '' : ' active')), im = new Image();
    im.src = u; im.alt = 'Mensaje de un alumno aprobado ' + (n + 1); im.className = 'd-block mx-auto vx-slide'; im.addEventListener('click', () => { grande.src = u; mf.show(); });
    it.append(im); inner.append(it);
  });
  const ctl = (dir, txt) => { const b = el('button', 'carousel-control-' + dir); b.type = 'button'; b.dataset.bsTarget = '#carruselResultados'; b.dataset.bsSlide = dir; b.append(el('span', 'carousel-control-' + dir + '-icon'), el('span', 'visually-hidden', txt)); return b; };
  car.append(ind, inner, ctl('prev', 'Anterior'), ctl('next', 'Siguiente'));
  cont.append(car);
  new bootstrap.Carousel(car, { interval: 4000, ride: 'carousel' });
});
