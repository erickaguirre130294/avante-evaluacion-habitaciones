/* ============================================================
   Evaluación Habitaciones - Complejo Avante
   App estática (HTML+JS+CSS) con persistencia en localStorage
   y generación de reportes PDF con jsPDF.
   v1.0 - 2026
============================================================ */

'use strict';

// ============================================================
// CONSTANTES: catálogos
// ============================================================

const PUNTOS_CHECK = [
  { id: 'puerta',         label: 'Puerta y cerradura' },
  { id: 'cama',           label: 'Cama y colchón' },
  { id: 'ac',             label: 'Aire acondicionado' },
  { id: 'bano',           label: 'Baño / Sanitario' },
  { id: 'regadera',       label: 'Regadera' },
  { id: 'lavamanos',      label: 'Lavamanos' },
  { id: 'tv',             label: 'TV y control remoto' },
  { id: 'iluminacion',    label: 'Iluminación' },
  { id: 'tomacorrientes', label: 'Tomacorrientes' },
  { id: 'paredes',        label: 'Paredes / Pintura' },
  { id: 'piso',           label: 'Piso' },
  { id: 'ventanas',       label: 'Ventanas / Cortinas' },
  { id: 'closet',         label: 'Closet / Mobiliario' },
  { id: 'limpieza',       label: 'Limpieza general' },
];

const HABITACIONES = [
  // Hospital Especializado - Piso 1 UCI/UCIN (6)
  { id: 'HE-VANGOGH',       nombre: 'VANGOGH',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },
  { id: 'HE-PICASSO',       nombre: 'PICASSO',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },
  { id: 'HE-MIGUEL_ANGEL',  nombre: 'MIGUEL ÁNGEL',    sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },
  { id: 'HE-MONET',         nombre: 'MONET',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },
  { id: 'HE-DAVINCI',       nombre: 'DAVINCI',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },
  { id: 'HE-DALI',          nombre: 'DALI',            sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 1 - UCI/UCIN',             categoria: 'UCI' },

  // Hospital Especializado - Piso 2 Cuidados Especiales (6)
  { id: 'HE-PUERTO_MORESBY',nombre: 'PUERTO MORESBY',  sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },
  { id: 'HE-SUVA',          nombre: 'SUVA',            sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },
  { id: 'HE-BEIJING',       nombre: 'BEIJING',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },
  { id: 'HE-KIOTO',         nombre: 'KIOTO',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },
  { id: 'HE-SEUL',          nombre: 'SEUL',            sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },
  { id: 'HE-HAINAN',        nombre: 'HAINAN',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 2 - Cuidados Especiales',  categoria: 'CUIDADOS_ESPECIALES' },

  // Hospital Especializado - Piso 3 Poniente (7)
  { id: 'HE-EREVAN',        nombre: 'EREVAN',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-TOKIO',         nombre: 'TOKIO',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-BANGKOK',       nombre: 'BANGKOK',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-YAKARTA',       nombre: 'YAKARTA',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-HIMALAYA',      nombre: 'HIMALAYA',        sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-MANILA',        nombre: 'MANILA',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-SINGAPUR',      nombre: 'SINGAPUR',        sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 3 Poniente',               categoria: 'HOSPITALIZACION' },

  // Hospital Especializado - Piso 4 Oriente Pediatría (6)
  { id: 'HE-ARUSHA',        nombre: 'ARUSHA',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },
  { id: 'HE-LUANDA',        nombre: 'LUANDA',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },
  { id: 'HE-CONSTANTINA',   nombre: 'CONSTANTINA',     sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },
  { id: 'HE-RABAT',         nombre: 'RABAT',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },
  { id: 'HE-LAGOS',         nombre: 'LAGOS',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },
  { id: 'HE-NAIROBI',       nombre: 'NAIROBI',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Oriente - Pediatría',    categoria: 'PEDIATRIA' },

  // Hospital Especializado - Piso 4 Poniente (8)
  { id: 'HE-NAKURO',        nombre: 'NAKURO',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-OSHIKOTO',      nombre: 'OSHIKOTO',        sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-ANTALAH',       nombre: 'ANTALAH',         sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-MASERU',        nombre: 'MASERU',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-DAKAR',         nombre: 'DAKAR',           sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-EL_CAIRO',      nombre: 'EL CAIRO',        sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-HARARE',        nombre: 'HARARE',          sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },
  { id: 'HE-CENTURION',     nombre: 'CENTURION',       sede: 'HOSPITAL_ESPECIALIZADO', piso: 'Piso 4 Poniente',               categoria: 'HOSPITALIZACION' },

  // Centro Médico (24)
  { id: 'CM-SAN_SALVADOR',    nombre: 'SAN SALVADOR',     sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-SUCHITOTO',       nombre: 'SUCHITOTO',        sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-APANECA',         nombre: 'APANECA',          sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-MILAN',           nombre: 'MILAN',            sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-BERLIN',          nombre: 'BERLIN',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-JUAYUA',          nombre: 'JUAYUA',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-PARIS',           nombre: 'PARIS',            sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-LA_UNION',        nombre: 'LA UNION',         sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-MORAZAN',         nombre: 'MORAZAN',          sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-SANTORINI',       nombre: 'SANTORINI',        sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-BARCELONA',       nombre: 'BARCELONA',        sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-ISLA_DE_CAPRI',   nombre: 'ISLA DE CAPRI',    sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-BRUSELAS',        nombre: 'BRUSELAS',         sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-HERMES',          nombre: 'HERMES',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-LISBOA',          nombre: 'LISBOA',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-LONDRES',         nombre: 'LONDRES',          sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-MADRID',          nombre: 'MADRID',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-ZURICH',          nombre: 'ZURICH',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-PRAGA',           nombre: 'PRAGA',            sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-BOGOTA',          nombre: 'BOGOTA',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-RIO_DE_JANEIRO',  nombre: 'RIO DE JANEIRO',   sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-BUENOS_AIRES',    nombre: 'BUENOS AIRES',     sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-GUADALAJARA',     nombre: 'GUADALAJARA',      sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
  { id: 'CM-LIMA',            nombre: 'LIMA',             sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
];

const SEDE_LABEL = {
  HOSPITAL_ESPECIALIZADO: 'Hospital Especializado',
  CENTRO_MEDICO:          'Centro Médico',
};

const PRIO_LABEL = { baja: 'Baja', media: 'Media', alta: 'Alta', critica: 'Crítica' };
const ESTADO_PUNTO = { OK: 'ok', REPORTAR: 'reportar', PENDIENTE: 'pendiente' };

const STORAGE = {
  CONFIG:        'eh_config',
  EVALUACIONES:  'eh_evaluaciones',
  RONDA_ACTUAL:  'eh_ronda_actual',
};

const DEFAULT_CONFIG = {
  evaluador: '',
  email: '',
  cc: '',
  dias_amarillo: 14,
  dias_rojo: 30,
};

// ============================================================
// ESTADO de la app (en memoria)
// ============================================================
const State = {
  vista_actual: 'agenda',
  filtro_sede: 'todas',
  config: { ...DEFAULT_CONFIG },
  evaluaciones: [],        // historial completo
  ronda: null,             // { fecha_inicio, hab_ids, idx, evaluaciones_temp: [{}] }
  ronda_eval_actual: null, // referencia al objeto evaluación en curso
};

// ============================================================
// STORAGE helpers
// ============================================================
function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE.CONFIG);
    State.config = raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : { ...DEFAULT_CONFIG };
  } catch (e) { State.config = { ...DEFAULT_CONFIG }; }
}
function saveConfig() {
  localStorage.setItem(STORAGE.CONFIG, JSON.stringify(State.config));
}
function loadEvaluaciones() {
  try {
    const raw = localStorage.getItem(STORAGE.EVALUACIONES);
    State.evaluaciones = raw ? JSON.parse(raw) : [];
  } catch (e) { State.evaluaciones = []; }
}
function saveEvaluaciones() {
  try {
    localStorage.setItem(STORAGE.EVALUACIONES, JSON.stringify(State.evaluaciones));
  } catch (e) {
    toast('Error al guardar: almacenamiento lleno. Exporta tu JSON y libera espacio.', 'danger');
  }
}
function loadRonda() {
  try {
    const raw = localStorage.getItem(STORAGE.RONDA_ACTUAL);
    State.ronda = raw ? JSON.parse(raw) : null;
  } catch (e) { State.ronda = null; }
}
function saveRonda() {
  if (State.ronda) localStorage.setItem(STORAGE.RONDA_ACTUAL, JSON.stringify(State.ronda));
  else localStorage.removeItem(STORAGE.RONDA_ACTUAL);
}

// ============================================================
// Utilidades
// ============================================================
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $$(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }
function uid() { return 'e_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8); }
function todayISO() { return new Date().toISOString().slice(0, 10); }
function nowISO() { return new Date().toISOString(); }

function diasDesde(fechaISO) {
  if (!fechaISO) return Infinity;
  const ms = Date.now() - new Date(fechaISO).getTime();
  return Math.floor(ms / 86400000);
}

function fechaLegible(iso) {
  if (!iso) return '-';
  const d = new Date(iso);
  return d.toLocaleDateString('es-SV', { day: '2-digit', month: 'short', year: 'numeric' });
}
function fechaHoraLegible(iso) {
  const d = new Date(iso);
  return d.toLocaleString('es-SV', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function toast(msg, tipo) {
  const el = $('#toast');
  el.textContent = msg;
  el.className = 'toast ' + (tipo || '');
  setTimeout(() => el.classList.add('hidden'), 50);
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), 3000);
}

// Compresión de imagen para no reventar localStorage
function comprimirImagen(file, maxLado, calidad) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        const lim = maxLado || 1024;
        if (width > height && width > lim) { height = Math.round(height * lim / width); width = lim; }
        else if (height >= width && height > lim) { width = Math.round(width * lim / height); height = lim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', calidad || 0.72));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ============================================================
// Lógica de estado por habitación
// ============================================================
function ultimaEvaluacionHab(hab_id) {
  const evals = State.evaluaciones.filter(e => e.hab_id === hab_id);
  if (!evals.length) return null;
  return evals.sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
}

function reporteAbiertoHab(hab_id) {
  // Hay un reporte abierto si la última evaluación con problemas no ha sido cerrada
  const evals = State.evaluaciones
    .filter(e => e.hab_id === hab_id && e.estado === 'abierto' && tieneProblemas(e))
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
  return evals[0] || null;
}

function tieneProblemas(eval_) {
  if (!eval_ || !eval_.puntos) return false;
  return Object.values(eval_.puntos).some(p => p.estado === ESTADO_PUNTO.REPORTAR);
}

function semaforoHab(hab) {
  const reporte = reporteAbiertoHab(hab.id);
  if (reporte) return { color: 'rojo', label: 'Con reporte abierto', badge: 'alta' };

  const ult = ultimaEvaluacionHab(hab.id);
  if (!ult) return { color: 'rojo', label: 'Sin revisar', badge: 'alta' };

  const dias = diasDesde(ult.fecha);
  if (dias >= State.config.dias_rojo) return { color: 'rojo', label: 'Hace ' + dias + ' días', badge: 'alta' };
  if (dias >= State.config.dias_amarillo) return { color: 'amarillo', label: 'Hace ' + dias + ' días', badge: 'media' };
  return { color: 'verde', label: 'Hace ' + dias + ' días', badge: 'baja' };
}

function habitacionesFiltradas() {
  if (State.filtro_sede === 'todas') return HABITACIONES;
  return HABITACIONES.filter(h => h.sede === State.filtro_sede);
}

function habitacionesAgrupadas(habs) {
  // Agrupa por sede y piso, preservando orden de definición original
  const grupos = [];
  const idxMap = new Map();
  habs.forEach(h => {
    const key = h.sede + '||' + h.piso;
    if (!idxMap.has(key)) {
      idxMap.set(key, grupos.length);
      grupos.push({ sede: h.sede, piso: h.piso, items: [] });
    }
    grupos[idxMap.get(key)].items.push(h);
  });
  return grupos;
}

// ============================================================
// ROUTING / cambio de vistas
// ============================================================
function showView(name) {
  State.vista_actual = name;
  $$('.view').forEach(v => v.classList.remove('active'));
  const target = $('#view-' + name);
  if (target) target.classList.add('active');

  const titles = {
    agenda:    'Evaluación Habitaciones',
    seleccion: 'Seleccionar habitaciones',
    checklist: 'Evaluación en curso',
    resumen:   'Resumen de ronda',
    reportes:  'Reportes abiertos',
    historial: 'Historial',
    config:    'Configuración',
  };
  $('#topbar-title').textContent = titles[name] || 'Evaluación';

  const back = $('#btn-back');
  const showBack = ['seleccion', 'checklist', 'resumen', 'reportes', 'historial', 'config'].includes(name);
  back.classList.toggle('hidden', !showBack);

  $('#side-menu').classList.add('hidden');

  if (name === 'agenda')    renderAgenda();
  if (name === 'seleccion') renderSeleccion();
  if (name === 'checklist') renderChecklist();
  if (name === 'resumen')   renderResumen();
  if (name === 'reportes')  renderReportes();
  if (name === 'historial') renderHistorial();
  if (name === 'config')    renderConfig();

  window.scrollTo(0, 0);
}

// ============================================================
// VISTA: AGENDA
// ============================================================
function renderAgenda() {
  const habs = habitacionesFiltradas();
  const stats = {
    total: habs.length,
    rojas: 0, amarillas: 0, verdes: 0, abiertos: 0,
  };
  habs.forEach(h => {
    if (reporteAbiertoHab(h.id)) stats.abiertos++;
    const s = semaforoHab(h);
    if (s.color === 'rojo') stats.rojas++;
    else if (s.color === 'amarillo') stats.amarillas++;
    else if (s.color === 'verde') stats.verdes++;
  });

  $('#agenda-stats').innerHTML = `
    <div><div class="stat-num">${stats.total}</div><div class="stat-lbl">Total</div></div>
    <div><div class="stat-num danger">${stats.rojas}</div><div class="stat-lbl">Urgentes</div></div>
    <div><div class="stat-num warning">${stats.amarillas}</div><div class="stat-lbl">Por revisar</div></div>
    <div><div class="stat-num success">${stats.verdes}</div><div class="stat-lbl">Al día</div></div>
  `;

  const grupos = habitacionesAgrupadas(habs);
  const html = grupos.map(g => {
    const titulo = SEDE_LABEL[g.sede] + (g.piso ? ' - ' + g.piso : '');
    const items = g.items.map(h => habCardHTML(h, false)).join('');
    return `<div class="grupo-sede">${titulo}</div>${items}`;
  }).join('');

  $('#agenda-lista').innerHTML = html;

  $$('#agenda-lista .hab-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.habId;
      verHistorialDeHabitacion(id);
    });
  });
}

function habCardHTML(hab, conCheckbox) {
  const sem = semaforoHab(hab);
  const ult = ultimaEvaluacionHab(hab.id);
  const meta = (hab.piso ? hab.piso + ' - ' : '') + sem.label;
  const checkbox = conCheckbox
    ? `<input type="checkbox" class="hab-check" data-hab-id="${hab.id}">`
    : '';
  return `
    <div class="hab-card estado-${sem.color}" data-hab-id="${hab.id}">
      ${checkbox}
      <div class="hab-body">
        <div class="hab-nombre">${hab.nombre}</div>
        <div class="hab-meta">${meta}</div>
      </div>
      <span class="hab-badge ${sem.badge}">${ult ? 'Eval' : 'Nueva'}</span>
    </div>`;
}

// ============================================================
// VISTA: SELECCIÓN DE RONDA
// ============================================================
function renderSeleccion() {
  const habs = habitacionesFiltradas();
  const grupos = habitacionesAgrupadas(habs);
  const html = grupos.map(g => {
    const titulo = SEDE_LABEL[g.sede] + (g.piso ? ' - ' + g.piso : '');
    const items = g.items.map(h => habCardHTML(h, true)).join('');
    return `<div class="grupo-sede">${titulo}</div>${items}`;
  }).join('');
  $('#seleccion-lista').innerHTML = html;
  actualizarContadorSeleccion();

  $$('#seleccion-lista .hab-check').forEach(cb => {
    cb.addEventListener('change', actualizarContadorSeleccion);
    cb.addEventListener('click', e => e.stopPropagation());
  });
  $$('#seleccion-lista .hab-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.tagName === 'INPUT') return;
      const cb = card.querySelector('input.hab-check');
      if (cb) { cb.checked = !cb.checked; actualizarContadorSeleccion(); }
    });
  });
}

function actualizarContadorSeleccion() {
  const n = $$('#seleccion-lista .hab-check:checked').length;
  $('#cnt-seleccionadas').textContent = n;
  $('#btn-comenzar').disabled = n === 0;
}

function comenzarRonda() {
  const ids = $$('#seleccion-lista .hab-check:checked').map(c => c.dataset.habId);
  if (!ids.length) { toast('Selecciona al menos una habitación', 'danger'); return; }

  State.ronda = {
    fecha_inicio: nowISO(),
    hab_ids: ids,
    idx: 0,
    evaluaciones_temp: ids.map(id => ({
      id: uid(),
      hab_id: id,
      fecha: nowISO(),
      evaluador: State.config.evaluador || 'Sin nombre',
      puntos: {},
      prioridad: null,
      obs_generales: '',
      estado: 'abierto',
      saltada: false,
    })),
  };
  saveRonda();
  showView('checklist');
}

// ============================================================
// VISTA: CHECKLIST
// ============================================================
function renderChecklist() {
  if (!State.ronda || !State.ronda.evaluaciones_temp.length) {
    showView('agenda'); return;
  }
  const idx = State.ronda.idx;
  const total = State.ronda.evaluaciones_temp.length;
  const evalActual = State.ronda.evaluaciones_temp[idx];
  State.ronda_eval_actual = evalActual;
  const hab = HABITACIONES.find(h => h.id === evalActual.hab_id);

  $('#check-hab-nombre').textContent = hab.nombre;
  $('#check-hab-meta').textContent = SEDE_LABEL[hab.sede] + (hab.piso ? ' - ' + hab.piso : '');
  $('#check-progreso').textContent = (idx + 1) + ' de ' + total;

  const html = PUNTOS_CHECK.map(p => {
    const data = evalActual.puntos[p.id] || { estado: ESTADO_PUNTO.PENDIENTE, comentario: '', foto: null };
    const stateClass = data.estado === ESTADO_PUNTO.OK ? 'estado-ok'
                      : data.estado === ESTADO_PUNTO.REPORTAR ? 'estado-reportar' : '';
    return `
      <div class="punto ${stateClass}" data-punto="${p.id}">
        <div class="punto-header">
          <div class="punto-label">${p.label}</div>
          <div class="punto-toggle">
            <button class="ok-btn ${data.estado === ESTADO_PUNTO.OK ? 'active' : ''}" data-set="ok">OK</button>
            <button class="rep-btn ${data.estado === ESTADO_PUNTO.REPORTAR ? 'active' : ''}" data-set="reportar">Reportar</button>
          </div>
        </div>
        <div class="punto-detalle">
          <textarea placeholder="Describe el problema..." data-field="comentario">${data.comentario || ''}</textarea>
          <div class="foto-controls">
            <label class="foto-btn">
              📷 Tomar foto
              <input type="file" accept="image/*" capture="environment" data-field="foto">
            </label>
            <div class="foto-preview-wrap" data-foto-wrap>
              ${data.foto ? `<div class="foto-preview"><img src="${data.foto}"><button class="quitar-foto" data-quitar>×</button></div>` : ''}
            </div>
          </div>
        </div>
      </div>`;
  }).join('');

  $('#checklist-items').innerHTML = html;
  $('#check-obs-generales').value = evalActual.obs_generales || '';

  $$('.prio').forEach(b => b.classList.toggle('active', b.dataset.prio === evalActual.prioridad));

  // Eventos por punto
  $$('.punto').forEach(div => {
    const puntoId = div.dataset.punto;

    div.querySelector('.ok-btn').addEventListener('click', () => setPunto(puntoId, ESTADO_PUNTO.OK));
    div.querySelector('.rep-btn').addEventListener('click', () => setPunto(puntoId, ESTADO_PUNTO.REPORTAR));

    const ta = div.querySelector('textarea[data-field="comentario"]');
    if (ta) ta.addEventListener('input', () => {
      ensurePunto(puntoId).comentario = ta.value;
    });

    const fileInput = div.querySelector('input[type="file"]');
    if (fileInput) fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      toast('Procesando foto...');
      try {
        const dataUrl = await comprimirImagen(file, 1024, 0.72);
        ensurePunto(puntoId).foto = dataUrl;
        saveRonda();
        renderFotoPreview(div, dataUrl);
        toast('Foto agregada', 'success');
      } catch (err) {
        toast('No se pudo cargar la foto', 'danger');
      }
      fileInput.value = '';
    });

    div.addEventListener('click', e => {
      if (e.target.matches('[data-quitar]')) {
        ensurePunto(puntoId).foto = null;
        saveRonda();
        renderFotoPreview(div, null);
      }
    });
  });
}

function ensurePunto(puntoId) {
  if (!State.ronda_eval_actual.puntos[puntoId]) {
    State.ronda_eval_actual.puntos[puntoId] = { estado: ESTADO_PUNTO.PENDIENTE, comentario: '', foto: null };
  }
  return State.ronda_eval_actual.puntos[puntoId];
}

function setPunto(puntoId, nuevoEstado) {
  const p = ensurePunto(puntoId);
  p.estado = (p.estado === nuevoEstado) ? ESTADO_PUNTO.PENDIENTE : nuevoEstado;
  saveRonda();

  const div = document.querySelector(`.punto[data-punto="${puntoId}"]`);
  div.classList.remove('estado-ok', 'estado-reportar');
  if (p.estado === ESTADO_PUNTO.OK) div.classList.add('estado-ok');
  if (p.estado === ESTADO_PUNTO.REPORTAR) div.classList.add('estado-reportar');

  div.querySelector('.ok-btn').classList.toggle('active', p.estado === ESTADO_PUNTO.OK);
  div.querySelector('.rep-btn').classList.toggle('active', p.estado === ESTADO_PUNTO.REPORTAR);
}

function renderFotoPreview(div, dataUrl) {
  const wrap = div.querySelector('[data-foto-wrap]');
  wrap.innerHTML = dataUrl
    ? `<div class="foto-preview"><img src="${dataUrl}"><button class="quitar-foto" data-quitar>×</button></div>`
    : '';
}

function guardarYSiguiente() {
  if (!State.ronda_eval_actual) return;

  const obs = $('#check-obs-generales').value.trim();
  State.ronda_eval_actual.obs_generales = obs;

  const hayProblemas = tieneProblemas(State.ronda_eval_actual);
  if (hayProblemas && !State.ronda_eval_actual.prioridad) {
    toast('Asigna una prioridad al reporte', 'danger');
    return;
  }

  // Validar que tenga al menos un punto marcado para no guardar vacíos
  const algunMarcado = Object.values(State.ronda_eval_actual.puntos)
    .some(p => p.estado === ESTADO_PUNTO.OK || p.estado === ESTADO_PUNTO.REPORTAR);
  if (!algunMarcado) {
    toast('Marca al menos un punto antes de continuar', 'danger');
    return;
  }

  State.ronda_eval_actual.fecha = nowISO();
  State.ronda_eval_actual.estado = hayProblemas ? 'abierto' : 'cerrado';

  saveRonda();
  avanzarRonda();
}

function saltarHabitacion() {
  if (!State.ronda_eval_actual) return;
  State.ronda_eval_actual.saltada = true;
  avanzarRonda();
}

function avanzarRonda() {
  State.ronda.idx++;
  if (State.ronda.idx >= State.ronda.evaluaciones_temp.length) {
    finalizarChecklist();
  } else {
    saveRonda();
    renderChecklist();
  }
}

function finalizarChecklist() {
  // Mover evaluaciones válidas al historial
  const nuevas = State.ronda.evaluaciones_temp.filter(e => !e.saltada);
  State.evaluaciones.push(...nuevas);
  saveEvaluaciones();
  // Conservamos la ronda hasta que el usuario salga del resumen, para mostrarla
  showView('resumen');
}

// ============================================================
// VISTA: RESUMEN
// ============================================================
function renderResumen() {
  const ronda = State.ronda;
  if (!ronda) { showView('agenda'); return; }

  const evals = ronda.evaluaciones_temp.filter(e => !e.saltada);
  const conProblemas = evals.filter(tieneProblemas);
  const sinProblemas = evals.filter(e => !tieneProblemas(e));

  $('#resumen-fecha').textContent = fechaHoraLegible(ronda.fecha_inicio);
  $('#resumen-stats').innerHTML = `${evals.length} habitaciones evaluadas - <span style="color:#ffd2d4">${conProblemas.length} con reporte</span>`;

  let html = '';
  if (conProblemas.length) {
    html += `<div class="grupo-sede">Habitaciones con reporte</div>`;
    html += conProblemas.map(e => reporteCardHTML(e, false)).join('');
  }
  if (sinProblemas.length) {
    html += `<div class="grupo-sede">Sin observaciones</div>`;
    html += sinProblemas.map(e => {
      const hab = HABITACIONES.find(h => h.id === e.hab_id);
      return `<div class="reporte-card ok">
        <div class="rep-titulo">${hab.nombre} <span style="color:#1e8c4d">✓</span></div>
        <div class="rep-meta">${SEDE_LABEL[hab.sede]}${hab.piso ? ' - ' + hab.piso : ''}</div>
      </div>`;
    }).join('');
  }
  $('#resumen-lista').innerHTML = html || '<p class="hint">Sin evaluaciones para mostrar.</p>';
}

function reporteCardHTML(eval_, conAcciones) {
  const hab = HABITACIONES.find(h => h.id === eval_.hab_id);
  const problemas = PUNTOS_CHECK
    .filter(p => eval_.puntos[p.id] && eval_.puntos[p.id].estado === ESTADO_PUNTO.REPORTAR)
    .map(p => `<li>${p.label}${eval_.puntos[p.id].comentario ? ': ' + escapeHTML(eval_.puntos[p.id].comentario) : ''}</li>`);
  const prio = eval_.prioridad ? `<span class="hab-badge ${eval_.prioridad === 'critica' || eval_.prioridad === 'alta' ? 'alta' : eval_.prioridad === 'media' ? 'media' : 'baja'}">${PRIO_LABEL[eval_.prioridad]}</span>` : '';
  const acciones = conAcciones ? `
    <div class="rep-acciones">
      <button class="reparado" data-cerrar="${eval_.id}">Marcar como reparado</button>
      <button data-reeval="${eval_.hab_id}">Re-evaluar</button>
    </div>` : '';
  return `<div class="reporte-card">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
      <div>
        <div class="rep-titulo">${hab.nombre}</div>
        <div class="rep-meta">${SEDE_LABEL[hab.sede]}${hab.piso ? ' - ' + hab.piso : ''} - ${fechaLegible(eval_.fecha)}</div>
      </div>
      ${prio}
    </div>
    <ul class="rep-problemas">${problemas.join('')}</ul>
    ${eval_.obs_generales ? `<div class="hint" style="margin-top:6px"><b>Notas:</b> ${escapeHTML(eval_.obs_generales)}</div>` : ''}
    ${acciones}
  </div>`;
}

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function finalizarRonda() {
  State.ronda = null;
  saveRonda();
  showView('agenda');
  toast('Ronda guardada', 'success');
}

// ============================================================
// VISTA: REPORTES ABIERTOS
// ============================================================
function renderReportes() {
  const abiertos = HABITACIONES
    .map(h => reporteAbiertoHab(h.id))
    .filter(Boolean)
    .sort((a, b) => {
      const ord = { critica: 0, alta: 1, media: 2, baja: 3 };
      return (ord[a.prioridad] ?? 4) - (ord[b.prioridad] ?? 4);
    });

  $('#reportes-stats').innerHTML = `
    <div style="grid-column:span 4"><div class="stat-num danger">${abiertos.length}</div><div class="stat-lbl">Reportes abiertos</div></div>
  `;

  if (!abiertos.length) {
    $('#reportes-lista').innerHTML = '<p class="hint">No hay reportes abiertos. Todas las habitaciones evaluadas están conformes.</p>';
    return;
  }

  $('#reportes-lista').innerHTML = abiertos.map(e => reporteCardHTML(e, true)).join('');

  $$('#reportes-lista [data-cerrar]').forEach(b => {
    b.addEventListener('click', () => cerrarReporte(b.dataset.cerrar));
  });
  $$('#reportes-lista [data-reeval]').forEach(b => {
    b.addEventListener('click', () => iniciarReevaluacion(b.dataset.reeval));
  });
}

function cerrarReporte(eval_id) {
  const e = State.evaluaciones.find(x => x.id === eval_id);
  if (!e) return;
  if (!confirm('¿Confirmas que la habitación fue reparada y se cierra el reporte?')) return;
  e.estado = 'cerrado';
  e.fecha_cierre = nowISO();
  saveEvaluaciones();
  toast('Reporte cerrado', 'success');
  renderReportes();
}

function iniciarReevaluacion(hab_id) {
  State.ronda = {
    fecha_inicio: nowISO(),
    hab_ids: [hab_id],
    idx: 0,
    evaluaciones_temp: [{
      id: uid(),
      hab_id: hab_id,
      fecha: nowISO(),
      evaluador: State.config.evaluador || 'Sin nombre',
      puntos: {},
      prioridad: null,
      obs_generales: '',
      estado: 'abierto',
      saltada: false,
    }],
  };
  saveRonda();
  showView('checklist');
}

// ============================================================
// VISTA: HISTORIAL
// ============================================================
function renderHistorial() {
  const evals = [...State.evaluaciones].sort((a, b) => b.fecha.localeCompare(a.fecha)).slice(0, 100);
  if (!evals.length) {
    $('#historial-lista').innerHTML = '<p class="hint">Sin evaluaciones registradas.</p>';
    return;
  }
  $('#historial-lista').innerHTML = evals.map(e => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    const probs = tieneProblemas(e);
    return `<div class="reporte-card ${probs ? '' : 'ok'}">
      <div class="rep-titulo">${hab ? hab.nombre : '???'} ${probs ? '⚠' : '✓'}</div>
      <div class="rep-meta">${fechaHoraLegible(e.fecha)} - ${e.evaluador} - estado: ${e.estado}</div>
    </div>`;
  }).join('');
}

function verHistorialDeHabitacion(hab_id) {
  const evals = State.evaluaciones.filter(e => e.hab_id === hab_id).sort((a, b) => b.fecha.localeCompare(a.fecha));
  const hab = HABITACIONES.find(h => h.id === hab_id);
  if (!evals.length) {
    toast(hab.nombre + ' sin evaluaciones previas');
    return;
  }
  const ult = evals[0];
  const probs = PUNTOS_CHECK
    .filter(p => ult.puntos[p.id] && ult.puntos[p.id].estado === ESTADO_PUNTO.REPORTAR)
    .map(p => p.label + (ult.puntos[p.id].comentario ? ': ' + ult.puntos[p.id].comentario : ''))
    .join('\n');
  alert(
    hab.nombre + ' - ' + SEDE_LABEL[hab.sede] + '\n' +
    'Última evaluación: ' + fechaHoraLegible(ult.fecha) + '\n' +
    'Estado: ' + ult.estado + '\n\n' +
    (probs ? 'Puntos reportados:\n' + probs : 'Sin observaciones en la última revisión.') +
    '\n\nHistorial total: ' + evals.length + ' evaluaciones'
  );
}

// ============================================================
// VISTA: CONFIGURACIÓN
// ============================================================
function renderConfig() {
  $('#cfg-evaluador').value = State.config.evaluador;
  $('#cfg-email').value = State.config.email;
  $('#cfg-cc').value = State.config.cc;
  $('#cfg-dias-amarillo').value = State.config.dias_amarillo;
  $('#cfg-dias-rojo').value = State.config.dias_rojo;
}

function guardarConfig() {
  State.config.evaluador = $('#cfg-evaluador').value.trim();
  State.config.email = $('#cfg-email').value.trim();
  State.config.cc = $('#cfg-cc').value.trim();
  State.config.dias_amarillo = Math.max(1, parseInt($('#cfg-dias-amarillo').value, 10) || 14);
  State.config.dias_rojo = Math.max(State.config.dias_amarillo + 1, parseInt($('#cfg-dias-rojo').value, 10) || 30);
  saveConfig();
  toast('Configuración guardada', 'success');
}

// ============================================================
// PDF + COMPARTIR
// ============================================================
function generarPDF() {
  if (!window.jspdf) { toast('PDF no disponible: revisa conexión', 'danger'); return null; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const ronda = State.ronda;
  const evals = ronda ? ronda.evaluaciones_temp.filter(e => !e.saltada) : [];
  const conProblemas = evals.filter(tieneProblemas);

  // Cabecera
  doc.setFillColor(13, 79, 124);
  doc.rect(0, 0, 612, 70, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18); doc.text('Complejo Avante', 40, 32);
  doc.setFontSize(12); doc.text('Reporte de evaluación de habitaciones', 40, 52);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.text('Fecha: ' + fechaHoraLegible(ronda.fecha_inicio), 40, 92);
  doc.text('Evaluador: ' + (State.config.evaluador || 'Sin nombre'), 40, 108);
  doc.text('Habitaciones evaluadas: ' + evals.length + '  |  Con reporte: ' + conProblemas.length, 40, 124);

  // Tabla resumen
  const rows = evals.map(e => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    const probs = PUNTOS_CHECK
      .filter(p => e.puntos[p.id] && e.puntos[p.id].estado === ESTADO_PUNTO.REPORTAR)
      .map(p => p.label).join(', ');
    return [
      hab ? hab.nombre : '?',
      SEDE_LABEL[hab.sede].replace('Hospital ', 'Hosp. '),
      tieneProblemas(e) ? 'Requiere intervención' : 'OK',
      e.prioridad ? PRIO_LABEL[e.prioridad] : '-',
      probs || '-',
    ];
  });

  doc.autoTable({
    startY: 144,
    head: [['Habitación', 'Sede', 'Estado', 'Prioridad', 'Puntos reportados']],
    body: rows,
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [13, 79, 124], textColor: 255 },
    columnStyles: { 4: { cellWidth: 200 } },
  });

  // Detalle por habitación con problemas (con fotos)
  let y = doc.lastAutoTable.finalY + 24;
  conProblemas.forEach((e, idx) => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);

    if (y > 680) { doc.addPage(); y = 50; }

    doc.setFillColor(245, 247, 250);
    doc.rect(40, y - 14, 532, 22, 'F');
    doc.setTextColor(13, 79, 124);
    doc.setFontSize(13);
    doc.text(`${idx + 1}. ${hab.nombre} - ${SEDE_LABEL[hab.sede]}${hab.piso ? ' (' + hab.piso + ')' : ''}`, 46, y);
    y += 16;

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    if (e.prioridad) { doc.text('Prioridad: ' + PRIO_LABEL[e.prioridad], 46, y); y += 14; }

    PUNTOS_CHECK.forEach(p => {
      const data = e.puntos[p.id];
      if (!data || data.estado !== ESTADO_PUNTO.REPORTAR) return;

      if (y > 720) { doc.addPage(); y = 50; }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('- ' + p.label, 46, y);
      doc.setFont(undefined, 'normal');
      y += 13;

      if (data.comentario) {
        const lines = doc.splitTextToSize(data.comentario, 480);
        doc.text(lines, 60, y);
        y += lines.length * 12;
      }
      if (data.foto) {
        if (y > 600) { doc.addPage(); y = 50; }
        try {
          doc.addImage(data.foto, 'JPEG', 60, y, 120, 90);
          y += 100;
        } catch (err) { /* skip foto si falla */ }
      }
      y += 6;
    });

    if (e.obs_generales) {
      const lines = doc.splitTextToSize('Notas: ' + e.obs_generales, 500);
      if (y + lines.length * 12 > 720) { doc.addPage(); y = 50; }
      doc.setFont(undefined, 'italic');
      doc.text(lines, 46, y);
      doc.setFont(undefined, 'normal');
      y += lines.length * 12 + 8;
    }
    y += 12;
  });

  // Pie de página
  const totalPaginas = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`Generado ${fechaHoraLegible(nowISO())}  -  Página ${i} de ${totalPaginas}`, 40, 770);
  }

  const fechaArchivo = todayISO();
  const nombre = `Reporte_Habitaciones_${fechaArchivo}.pdf`;
  doc.save(nombre);
  toast('PDF generado', 'success');
  return { doc, nombre };
}

function compartirReporte() {
  if (!State.ronda) { toast('No hay ronda activa', 'danger'); return; }
  const evals = State.ronda.evaluaciones_temp.filter(e => !e.saltada);
  const conProblemas = evals.filter(tieneProblemas);
  const fecha = fechaLegible(State.ronda.fecha_inicio);

  let body = `Reporte de evaluación de habitaciones - ${fecha}\n`;
  body += `Evaluador: ${State.config.evaluador || 'Sin nombre'}\n`;
  body += `Habitaciones evaluadas: ${evals.length} | Con reporte: ${conProblemas.length}\n\n`;

  if (!conProblemas.length) {
    body += 'Sin habitaciones que requieran intervención.\n';
  } else {
    conProblemas.forEach((e, idx) => {
      const hab = HABITACIONES.find(h => h.id === e.hab_id);
      body += `${idx + 1}) ${hab.nombre} - ${SEDE_LABEL[hab.sede]}`;
      if (e.prioridad) body += ` [Prioridad ${PRIO_LABEL[e.prioridad]}]`;
      body += '\n';
      PUNTOS_CHECK.forEach(p => {
        const d = e.puntos[p.id];
        if (d && d.estado === ESTADO_PUNTO.REPORTAR) {
          body += `   - ${p.label}${d.comentario ? ': ' + d.comentario : ''}\n`;
        }
      });
      if (e.obs_generales) body += `   Notas: ${e.obs_generales}\n`;
      body += '\n';
    });
  }
  body += '\n--\nReporte generado desde la app Evaluación Habitaciones - Complejo Avante';

  const subject = `Reporte habitaciones ${fecha} - ${conProblemas.length} con intervención`;

  // Intento Web Share API (mobile)
  if (navigator.share) {
    navigator.share({ title: subject, text: body })
      .catch(() => fallbackEmail(subject, body));
  } else {
    fallbackEmail(subject, body);
  }
}

function fallbackEmail(subject, body) {
  const to = State.config.email || '';
  const cc = State.config.cc ? '&cc=' + encodeURIComponent(State.config.cc) : '';
  const url = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}${cc}&body=${encodeURIComponent(body)}`;
  if (url.length > 1800) {
    toast('Reporte muy largo para email. Genera el PDF y adjúntalo manualmente.', 'danger');
    return;
  }
  window.location.href = url;
}

// ============================================================
// EXPORT / IMPORT JSON
// ============================================================
function exportarDatos() {
  const data = {
    version: 1,
    fecha_export: nowISO(),
    config: State.config,
    evaluaciones: State.evaluaciones,
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `eh_backup_${todayISO()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Backup exportado', 'success');
}

function importarDatos(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || !Array.isArray(data.evaluaciones)) throw new Error('Formato inválido');
      if (!confirm('Esto reemplazará los datos actuales. ¿Continuar?')) return;
      State.config = { ...DEFAULT_CONFIG, ...(data.config || {}) };
      State.evaluaciones = data.evaluaciones;
      saveConfig();
      saveEvaluaciones();
      toast('Datos importados', 'success');
      showView('agenda');
    } catch (err) {
      toast('Archivo inválido: ' + err.message, 'danger');
    }
  };
  reader.readAsText(file);
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
function init() {
  loadConfig();
  loadEvaluaciones();
  loadRonda();

  // Si hay una ronda en curso, retomarla
  if (State.ronda && State.ronda.evaluaciones_temp && State.ronda.evaluaciones_temp.length) {
    if (State.ronda.idx < State.ronda.evaluaciones_temp.length) {
      if (confirm('Hay una ronda sin terminar. ¿Continuarla?')) {
        showView('checklist');
        return;
      } else {
        State.ronda = null;
        saveRonda();
      }
    } else {
      // Quedó en el resumen
      State.ronda = null;
      saveRonda();
    }
  }

  showView('agenda');

  // Filtros sede
  $$('.chip').forEach(c => c.addEventListener('click', () => {
    $$('.chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    State.filtro_sede = c.dataset.sede;
    if (State.vista_actual === 'agenda') renderAgenda();
  }));

  // Top bar
  $('#btn-back').addEventListener('click', () => {
    if (State.vista_actual === 'checklist' || State.vista_actual === 'seleccion') {
      if (confirm('Salir cancelará la ronda en curso. ¿Confirmas?')) {
        State.ronda = null;
        saveRonda();
        showView('agenda');
      }
    } else {
      showView('agenda');
    }
  });
  $('#btn-menu').addEventListener('click', () => {
    $('#side-menu').classList.toggle('hidden');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#side-menu') && !e.target.closest('#btn-menu')) {
      $('#side-menu').classList.add('hidden');
    }
  });

  // Menu items
  $$('#side-menu .menu-item[data-view]').forEach(b => {
    b.addEventListener('click', () => showView(b.dataset.view));
  });
  $('#btn-export-data').addEventListener('click', exportarDatos);
  $('#btn-import-data').addEventListener('click', () => $('#file-import').click());
  $('#file-import').addEventListener('change', (e) => {
    if (e.target.files[0]) importarDatos(e.target.files[0]);
  });

  // Agenda
  $('#btn-iniciar-ronda').addEventListener('click', () => showView('seleccion'));

  // Selección
  $('#btn-cancelar-seleccion').addEventListener('click', () => showView('agenda'));
  $('#btn-comenzar').addEventListener('click', comenzarRonda);

  // Checklist
  $('#btn-guardar-siguiente').addEventListener('click', guardarYSiguiente);
  $('#btn-saltar').addEventListener('click', saltarHabitacion);
  $$('.prio').forEach(b => b.addEventListener('click', () => {
    $$('.prio').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    if (State.ronda_eval_actual) {
      State.ronda_eval_actual.prioridad = b.dataset.prio;
      saveRonda();
    }
  }));

  // Resumen
  $('#btn-generar-pdf').addEventListener('click', generarPDF);
  $('#btn-compartir').addEventListener('click', compartirReporte);
  $('#btn-finalizar').addEventListener('click', finalizarRonda);

  // Config
  $('#btn-guardar-config').addEventListener('click', guardarConfig);

  // Prevent accidental swipe-to-back on iOS
  document.addEventListener('touchmove', (e) => {
    if (e.scale && e.scale !== 1) e.preventDefault();
  }, { passive: false });
}

document.addEventListener('DOMContentLoaded', init);
