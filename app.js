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
  { id: 'sofa',           label: 'Sofá / Sillón de acompañante' },
  { id: 'ac',             label: 'Aire acondicionado' },
  { id: 'bano',           label: 'Baño / Sanitario' },
  { id: 'regadera',       label: 'Regadera' },
  { id: 'lavamanos',      label: 'Lavamanos' },
  { id: 'tv',             label: 'TV y control remoto' },
  { id: 'iluminacion',    label: 'Iluminación' },
  { id: 'tomacorrientes', label: 'Tomacorrientes' },
  { id: 'paredes',        label: 'Paredes / Pintura' },
  { id: 'cielo_falso',    label: 'Cielo falso', conCantidad: true, cantidadLabel: 'Piezas a cambiar' },
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
  { id: 'CM-ATENAS',          nombre: 'ATENAS',           sede: 'CENTRO_MEDICO', piso: '', categoria: 'HOSPITALIZACION' },
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
  // Habitaciones de Preparación - Centro Médico
  { id: 'CM-PREP-APOLO',      nombre: 'APOLO',            sede: 'CENTRO_MEDICO', piso: 'Preparación', categoria: 'PREPARACION' },
  { id: 'CM-PREP-HERA',       nombre: 'HERA',             sede: 'CENTRO_MEDICO', piso: 'Preparación', categoria: 'PREPARACION' },
  { id: 'CM-PREP-HERMES',     nombre: 'HERMES',           sede: 'CENTRO_MEDICO', piso: 'Preparación', categoria: 'PREPARACION' },
  // Áreas clínicas - Centro Médico
  { id: 'CM-CONSULTORIO',     nombre: 'CONSULTORIO',                                    sede: 'CENTRO_MEDICO', piso: 'Áreas Clínicas', categoria: 'AREA_CLINICA' },
  { id: 'CM-PROCEDIMIENTO',   nombre: 'PROCEDIMIENTO',                                  sede: 'CENTRO_MEDICO', piso: 'Áreas Clínicas', categoria: 'AREA_CLINICA' },
  { id: 'CM-TRANSFERENCIA',   nombre: 'TRANSFERENCIA (Recepción pacientes quirófano)',  sede: 'CENTRO_MEDICO', piso: 'Áreas Clínicas', categoria: 'AREA_CLINICA' },
];

const SEDE_LABEL = {
  HOSPITAL_ESPECIALIZADO: 'Hospital Especializado',
  CENTRO_MEDICO:          'Centro Médico',
};

const PRIO_LABEL = { baja: 'Baja', media: 'Media', alta: 'Alta', critica: 'Crítica' };
const ESTADO_PUNTO = { OK: 'ok', REPORTAR: 'reportar', PENDIENTE: 'pendiente' };

// Puntos que, si están reportados, afectan el USO o SEGURIDAD del paciente
// y por defecto suben la prioridad a Alta automáticamente.
const PUNTOS_CRITICOS = new Set(['puerta', 'cama', 'ac', 'bano', 'regadera', 'lavamanos', 'iluminacion', 'tomacorrientes', 'limpieza']);

// Migraciones de hab_id (cuando renombramos habitaciones, mantenemos compat con evaluaciones viejas)
const HAB_ID_MIGRATIONS = { 'CM-HERMES': 'CM-ATENAS' };

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
  filtro_rango: 'hoy',     // para vista generar: hoy | 7 | 30 | todo
  config: { ...DEFAULT_CONFIG },
  evaluaciones: [],        // historial completo
  ronda: null,             // (renombrado conceptualmente a 'evaluación en curso', single-room)
  ronda_eval_actual: null, // referencia al objeto evaluación en curso
  generar_seleccion: new Set(), // ids de evaluaciones seleccionadas en vista generar
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
    // Migrar hab_ids renombrados
    let dirty = false;
    State.evaluaciones.forEach(e => {
      if (HAB_ID_MIGRATIONS[e.hab_id]) {
        e.hab_id = HAB_ID_MIGRATIONS[e.hab_id];
        dirty = true;
      }
    });
    if (dirty) saveEvaluaciones();
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
function on(sel, evt, fn) {
  const el = $(sel);
  if (el) el.addEventListener(evt, fn);
  else console.warn('[on] elemento no encontrado:', sel);
}
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

function calcularPrioridadAuto(eval_) {
  if (!eval_ || !eval_.puntos) return 'media';
  const reportados = Object.entries(eval_.puntos)
    .filter(([, p]) => p.estado === ESTADO_PUNTO.REPORTAR)
    .map(([id]) => id);
  if (!reportados.length) return 'media';
  const hayCritico = reportados.some(id => PUNTOS_CRITICOS.has(id));
  return hayCritico ? 'alta' : 'media';
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
    checklist: 'Evaluación en curso',
    generar:   'Generar reporte',
    reportes:  'Reportes abiertos',
    historial: 'Historial',
    config:    'Configuración',
  };
  $('#topbar-title').textContent = titles[name] || 'Evaluación';

  const back = $('#btn-back');
  const showBack = ['checklist', 'generar', 'reportes', 'historial', 'config'].includes(name);
  back.classList.toggle('hidden', !showBack);

  $('#side-menu').classList.add('hidden');

  if (name === 'agenda')    renderAgenda();
  if (name === 'checklist') renderChecklist();
  if (name === 'generar')   renderGenerar();
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
      iniciarEvaluacion(id);
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
// INICIAR EVALUACIÓN (single-room)
// ============================================================
function iniciarEvaluacion(hab_id) {
  // Si ya hay una eval en curso, ofrecer continuarla o descartar
  if (State.ronda && State.ronda.evaluaciones_temp && State.ronda.evaluaciones_temp.length) {
    const enCurso = State.ronda.evaluaciones_temp[0];
    if (enCurso && !enCurso.fecha_guardado) {
      // Hay una evaluación a medias. Si es la MISMA habitación, retomar.
      if (enCurso.hab_id === hab_id) {
        showView('checklist');
        return;
      }
      // Si es OTRA habitación, preguntar
      const habEnCurso = HABITACIONES.find(h => h.id === enCurso.hab_id);
      showModalConfirm({
        title: 'Hay una evaluación a medias',
        body: 'Tienes la evaluación de ' + (habEnCurso ? habEnCurso.nombre : '???') + ' sin guardar. Si comienzas otra, esa se descarta.',
        confirmLabel: 'Descartar y empezar otra',
        onConfirm: () => {
          State.ronda = null;
          saveRonda();
          _crearEvaluacionNueva(hab_id);
        },
      });
      return;
    }
  }
  _crearEvaluacionNueva(hab_id);
}

function _crearEvaluacionNueva(hab_id) {
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
    }],
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
  const evalActual = State.ronda.evaluaciones_temp[0];
  State.ronda_eval_actual = evalActual;
  const hab = HABITACIONES.find(h => h.id === evalActual.hab_id);

  $('#check-hab-nombre').textContent = hab.nombre;
  $('#check-hab-meta').textContent = SEDE_LABEL[hab.sede] + (hab.piso ? ' - ' + hab.piso : '');

  const html = PUNTOS_CHECK.map(p => {
    const data = evalActual.puntos[p.id] || { estado: ESTADO_PUNTO.PENDIENTE, comentario: '', fotos: [] };
    const fotos = data.fotos || (data.foto ? [data.foto] : []);
    const stateClass = data.estado === ESTADO_PUNTO.OK ? 'estado-ok'
                      : data.estado === ESTADO_PUNTO.REPORTAR ? 'estado-reportar' : '';
    const cantidadHtml = p.conCantidad ? `
            <label class="cantidad-label">
              ${p.cantidadLabel || 'Cantidad'}:
              <input type="number" min="0" step="1" inputmode="numeric" class="cantidad-input" data-field="cantidad" value="${data.cantidad_piezas != null ? data.cantidad_piezas : ''}" placeholder="0">
            </label>` : '';
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
          ${cantidadHtml}
          <div class="foto-controls">
            <label class="foto-btn">
              📷 Agregar foto <span class="foto-count" data-foto-count>(${fotos.length}/${MAX_FOTOS_POR_PUNTO})</span>
              <input type="file" accept="image/*" capture="environment" data-field="foto">
            </label>
            <div class="foto-preview-wrap" data-foto-wrap>
              ${fotos.map((f, idx) => `<div class="foto-preview"><img src="${f}"><button class="quitar-foto" data-quitar="${idx}">×</button></div>`).join('')}
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

    const cantInput = div.querySelector('input[data-field="cantidad"]');
    if (cantInput) cantInput.addEventListener('input', () => {
      const val = parseInt(cantInput.value, 10);
      ensurePunto(puntoId).cantidad_piezas = isNaN(val) || val < 0 ? null : val;
      saveRonda();
    });

    const fileInput = div.querySelector('input[type="file"]');
    if (fileInput) fileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const punto = ensurePunto(puntoId);
      if (punto.fotos.length >= MAX_FOTOS_POR_PUNTO) {
        toast('Máximo ' + MAX_FOTOS_POR_PUNTO + ' fotos por punto. Quita alguna primero.', 'danger');
        fileInput.value = '';
        return;
      }
      toast('Procesando foto...');
      try {
        const dataUrl = await comprimirImagen(file, 1024, 0.72);
        punto.fotos.push(dataUrl);
        saveRonda();
        renderFotoPreview(div, punto.fotos);
        toast('Foto agregada (' + punto.fotos.length + '/' + MAX_FOTOS_POR_PUNTO + ')', 'success');
      } catch (err) {
        toast('No se pudo cargar la foto', 'danger');
      }
      fileInput.value = '';
    });

    div.addEventListener('click', e => {
      const btnQuitar = e.target.closest('[data-quitar]');
      if (btnQuitar) {
        const idx = parseInt(btnQuitar.dataset.quitar, 10);
        const punto = ensurePunto(puntoId);
        if (!isNaN(idx) && idx >= 0 && idx < punto.fotos.length) {
          punto.fotos.splice(idx, 1);
          saveRonda();
          renderFotoPreview(div, punto.fotos);
        }
      }
    });
  });
}

function ensurePunto(puntoId) {
  if (!State.ronda_eval_actual.puntos[puntoId]) {
    State.ronda_eval_actual.puntos[puntoId] = { estado: ESTADO_PUNTO.PENDIENTE, comentario: '', fotos: [] };
  }
  const p = State.ronda_eval_actual.puntos[puntoId];
  // Migración inline: si hay un campo viejo `foto` (string), convertirlo a `fotos` array
  if (p.foto && !p.fotos) { p.fotos = [p.foto]; delete p.foto; }
  if (!p.fotos) p.fotos = [];
  return p;
}

const MAX_FOTOS_POR_PUNTO = 5;

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

function renderFotoPreview(div, fotos) {
  const wrap = div.querySelector('[data-foto-wrap]');
  const arr = Array.isArray(fotos) ? fotos : (fotos ? [fotos] : []);
  wrap.innerHTML = arr
    .map((f, idx) => `<div class="foto-preview"><img src="${f}"><button class="quitar-foto" data-quitar="${idx}">×</button></div>`)
    .join('');
  const cnt = div.querySelector('[data-foto-count]');
  if (cnt) cnt.textContent = '(' + arr.length + '/' + MAX_FOTOS_POR_PUNTO + ')';
}

function guardarEvaluacion() {
  if (!State.ronda_eval_actual) {
    toast('No hay evaluación en curso', 'danger');
    return;
  }

  const obs = $('#check-obs-generales').value.trim();
  State.ronda_eval_actual.obs_generales = obs;

  const hayProblemas = tieneProblemas(State.ronda_eval_actual);

  const algunMarcado = Object.values(State.ronda_eval_actual.puntos)
    .some(p => p.estado === ESTADO_PUNTO.OK || p.estado === ESTADO_PUNTO.REPORTAR);
  if (!algunMarcado) {
    showModalConfirm({
      title: 'Sin marcar ningún punto',
      body: 'No marcaste OK ni Reportar en ninguno de los puntos del checklist. Marca al menos uno para poder guardar la evaluación.',
      confirmLabel: 'Entendido',
      onConfirm: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
    return;
  }

  // Si hay problemas pero no se asignó prioridad, calcular automáticamente
  // según los puntos reportados (Alta si afecta uso/seguridad, Media si es estético)
  if (hayProblemas && !State.ronda_eval_actual.prioridad) {
    State.ronda_eval_actual.prioridad = calcularPrioridadAuto(State.ronda_eval_actual);
    State.ronda_eval_actual.prioridad_auto = true;
  }

  State.ronda_eval_actual.fecha = nowISO();
  State.ronda_eval_actual.fecha_guardado = nowISO();
  State.ronda_eval_actual.estado = hayProblemas ? 'abierto' : 'cerrado';

  // Empujar al historial PERMANENTE
  State.evaluaciones.push(State.ronda_eval_actual);
  saveEvaluaciones();

  // Limpiar evaluación en curso
  const hab = HABITACIONES.find(h => h.id === State.ronda_eval_actual.hab_id);
  State.ronda = null;
  State.ronda_eval_actual = null;
  saveRonda();

  toast('Evaluación de ' + (hab ? hab.nombre : '???') + ' guardada', 'success');
  showView('agenda');
}

function cancelarEvaluacion() {
  showModalConfirm({
    title: 'Cancelar evaluación',
    body: 'Se perderán los cambios sin guardar de esta habitación. ¿Continuar?',
    confirmLabel: 'Sí, cancelar',
    onConfirm: () => {
      State.ronda = null;
      State.ronda_eval_actual = null;
      saveRonda();
      showView('agenda');
    },
  });
}

// ============================================================
// VISTA: GENERAR REPORTE CONSOLIDADO
// ============================================================
function evaluacionesEnRango(rango) {
  let limite = null;
  if (rango === 'hoy') { limite = new Date(); limite.setHours(0, 0, 0, 0); }
  else if (rango === '7')   { limite = new Date(); limite.setDate(limite.getDate() - 7); }
  else if (rango === '30')  { limite = new Date(); limite.setDate(limite.getDate() - 30); }

  const evals = [...State.evaluaciones].sort((a, b) => b.fecha.localeCompare(a.fecha));
  if (!limite) return evals;
  return evals.filter(e => new Date(e.fecha) >= limite);
}

function renderGenerar() {
  // marcar chip activo
  $$('#view-generar .chip').forEach(c => c.classList.toggle('active', c.dataset.rango === State.filtro_rango));

  const evals = evaluacionesEnRango(State.filtro_rango);

  // Por defecto: todas seleccionadas si no hay selección previa o si el rango cambió
  if (!State.generar_seleccion || !State.generar_seleccion.size) {
    State.generar_seleccion = new Set(evals.map(e => e.id));
  } else {
    // Limpiar selecciones que ya no estén en el rango filtrado
    const ids = new Set(evals.map(e => e.id));
    State.generar_seleccion = new Set([...State.generar_seleccion].filter(id => ids.has(id)));
  }

  const conProblemas = evals.filter(tieneProblemas).length;

  $('#generar-stats').innerHTML = `
    <div><div class="stat-num">${evals.length}</div><div class="stat-lbl">Evaluadas</div></div>
    <div><div class="stat-num danger">${conProblemas}</div><div class="stat-lbl">Con reporte</div></div>
    <div><div class="stat-num success">${evals.length - conProblemas}</div><div class="stat-lbl">Sin obs.</div></div>
    <div><div class="stat-num">${State.generar_seleccion.size}</div><div class="stat-lbl">Seleccionadas</div></div>
  `;

  if (!evals.length) {
    $('#generar-lista').innerHTML = '<p class="hint">Sin evaluaciones en este rango. Cambia el filtro o evalúa habitaciones desde la Agenda.</p>';
    actualizarContadorGenerar();
    return;
  }

  $('#generar-lista').innerHTML = evals.map(e => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    const probs = tieneProblemas(e);
    const checked = State.generar_seleccion.has(e.id) ? 'checked' : '';
    const prio = e.prioridad ? ` · ${PRIO_LABEL[e.prioridad]}` : '';
    return `
      <div class="eval-card ${probs ? 'con-problemas' : 'sin-problemas'}" data-eval-id="${e.id}">
        <input type="checkbox" class="eval-check" ${checked}>
        <div class="eval-body">
          <div class="eval-titulo">${hab ? hab.nombre : '???'} ${probs ? '⚠' : '✓'}</div>
          <div class="eval-meta">${hab ? SEDE_LABEL[hab.sede] : ''}${hab && hab.piso ? ' · ' + hab.piso : ''} · ${fechaHoraLegible(e.fecha)}${prio}</div>
        </div>
      </div>`;
  }).join('');

  $$('#generar-lista .eval-card').forEach(card => {
    const id = card.dataset.evalId;
    card.addEventListener('click', (ev) => {
      if (ev.target.tagName !== 'INPUT') {
        const cb = card.querySelector('.eval-check');
        cb.checked = !cb.checked;
        cb.dispatchEvent(new Event('change'));
      }
    });
    card.querySelector('.eval-check').addEventListener('change', (ev) => {
      if (ev.target.checked) State.generar_seleccion.add(id);
      else State.generar_seleccion.delete(id);
      actualizarContadorGenerar();
    });
  });

  actualizarContadorGenerar();
}

function actualizarContadorGenerar() {
  const n = State.generar_seleccion.size;
  $('#cnt-generar').textContent = n;
  $('#btn-generar-pdf').disabled = n === 0;
  $('#btn-compartir').disabled = n === 0;
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
  const hab = HABITACIONES.find(h => h.id === e.hab_id);
  showModalConfirm({
    title: 'Cerrar reporte',
    body: '¿Confirmas que la habitación ' + (hab ? hab.nombre : '???') + ' fue reparada?',
    confirmLabel: 'Sí, cerrar reporte',
    onConfirm: () => {
      e.estado = 'cerrado';
      e.fecha_cierre = nowISO();
      saveEvaluaciones();
      toast('Reporte cerrado', 'success');
      renderReportes();
    },
  });
}

function iniciarReevaluacion(hab_id) {
  iniciarEvaluacion(hab_id);
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

function showModalConfirm({ title, body, requireText, confirmLabel, onConfirm }) {
  const backdrop = $('#modal-backdrop');
  const titleEl = $('#modal-title');
  const bodyEl = $('#modal-body');
  const inputEl = $('#modal-input');
  const cancelBtn = $('#modal-cancel');
  const confirmBtn = $('#modal-confirm');

  titleEl.textContent = title || 'Confirmar';
  bodyEl.textContent = body || '';
  confirmBtn.textContent = confirmLabel || 'Confirmar';

  if (requireText) {
    inputEl.classList.remove('hidden');
    inputEl.value = '';
    inputEl.placeholder = 'Escribe ' + requireText;
    confirmBtn.disabled = true;
    inputEl.oninput = () => {
      confirmBtn.disabled = inputEl.value.trim().toUpperCase() !== requireText.toUpperCase();
    };
  } else {
    inputEl.classList.add('hidden');
    confirmBtn.disabled = false;
  }

  const cerrar = () => {
    backdrop.classList.add('hidden');
    cancelBtn.onclick = null;
    confirmBtn.onclick = null;
    inputEl.oninput = null;
  };
  cancelBtn.onclick = cerrar;
  confirmBtn.onclick = () => {
    if (requireText && inputEl.value.trim().toUpperCase() !== requireText.toUpperCase()) return;
    cerrar();
    if (typeof onConfirm === 'function') onConfirm();
  };

  backdrop.classList.remove('hidden');
  if (requireText) setTimeout(() => inputEl.focus(), 100);
}

function borrarTodosLosDatos() {
  const totalEvals = State.evaluaciones.length;
  const abiertos = State.evaluaciones.filter(e => e.estado === 'abierto' && tieneProblemas(e)).length;

  showModalConfirm({
    title: 'Borrar TODOS los datos',
    body: `Se van a borrar:
• ${totalEvals} evaluaciones del historial
• ${abiertos} reportes abiertos
• Configuración (nombre, email, umbrales)
• Ronda en curso (si la hay)

Esta acción NO se puede deshacer.`,
    requireText: 'BORRAR',
    confirmLabel: 'Borrar todo',
    onConfirm: () => {
      localStorage.removeItem(STORAGE.CONFIG);
      localStorage.removeItem(STORAGE.EVALUACIONES);
      localStorage.removeItem(STORAGE.RONDA_ACTUAL);

      State.config = { ...DEFAULT_CONFIG };
      State.evaluaciones = [];
      State.ronda = null;
      State.ronda_eval_actual = null;

      toast('Todos los datos fueron borrados', 'success');
      showView('config');
      renderConfig();
    },
  });
}

// ============================================================
// PDF + COMPARTIR
// ============================================================
function obtenerEvaluacionesSeleccionadas() {
  const ids = State.generar_seleccion;
  if (!ids || !ids.size) return [];
  return [...State.evaluaciones]
    .filter(e => ids.has(e.id))
    .sort((a, b) => a.fecha.localeCompare(b.fecha));
}

function generarPDF() {
  if (!window.jspdf) { toast('PDF no disponible: revisa conexión', 'danger'); return null; }
  const evals = obtenerEvaluacionesSeleccionadas();
  if (!evals.length) { toast('Selecciona al menos una evaluación', 'danger'); return null; }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const conProblemas = evals.filter(tieneProblemas);
  const fechaReporte = nowISO();

  // Cabecera
  doc.setFillColor(13, 79, 124);
  doc.rect(0, 0, 612, 70, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18); doc.text('Complejo Avante', 40, 32);
  doc.setFontSize(12); doc.text('Reporte de evaluación de habitaciones', 40, 52);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(10);
  doc.text('Fecha del reporte: ' + fechaHoraLegible(fechaReporte), 40, 92);
  doc.text('Evaluador: ' + (State.config.evaluador || 'Sin nombre'), 40, 108);
  doc.text('Habitaciones evaluadas: ' + evals.length + '  |  Con observaciones: ' + conProblemas.length, 40, 124);

  // Mini resumen por sede
  const porSede = {};
  evals.forEach(e => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    if (!hab) return;
    if (!porSede[hab.sede]) porSede[hab.sede] = { total: 0, problemas: 0 };
    porSede[hab.sede].total++;
    if (tieneProblemas(e)) porSede[hab.sede].problemas++;
  });
  let xResumen = 40, yResumen = 144;
  Object.entries(porSede).forEach(([sede, c]) => {
    doc.setFillColor(245, 247, 250);
    doc.rect(xResumen, yResumen - 12, 250, 22, 'F');
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(9);
    doc.text(`${SEDE_LABEL[sede]}: ${c.total} evaluadas, ${c.problemas} con observaciones`, xResumen + 6, yResumen + 2);
    xResumen += 260;
  });

  // Bloques por habitación con observaciones y fotos integradas
  let y = 180;
  evals.forEach((e, idx) => {
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    const probs = tieneProblemas(e);

    // Reservar espacio mínimo para el bloque de encabezado
    if (y > 660) { doc.addPage(); y = 50; }

    // Encabezado de habitación (barra azul)
    doc.setFillColor(13, 79, 124);
    doc.rect(40, y - 14, 532, 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.text(`${idx + 1}. ${hab.nombre}`, 46, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    doc.text(SEDE_LABEL[hab.sede] + (hab.piso ? '  -  ' + hab.piso : ''), 200, y);
    // Prioridad a la derecha
    if (probs) {
      const prioTxt = (e.prioridad ? PRIO_LABEL[e.prioridad] : 'Media');
      doc.setFont(undefined, 'bold');
      doc.text('Prioridad: ' + prioTxt, 460, y);
      doc.setFont(undefined, 'normal');
    }
    y += 24;

    // Estado
    doc.setFontSize(10);
    doc.setTextColor(probs ? 194 : 30, probs ? 51 : 140, probs ? 58 : 77);
    doc.setFont(undefined, 'bold');
    doc.text(probs ? 'REQUIERE INTERVENCIÓN' : 'SIN OBSERVACIONES', 46, y);
    doc.setFont(undefined, 'normal');
    y += 18;

    // Puntos reportados con comentario y fotos
    const reportados = PUNTOS_CHECK.filter(p => e.puntos[p.id] && e.puntos[p.id].estado === ESTADO_PUNTO.REPORTAR);
    reportados.forEach(p => {
      const data = e.puntos[p.id];
      if (y > 720) { doc.addPage(); y = 50; }

      // Nombre del punto
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(194, 51, 58);
      doc.text('>  ' + p.label, 50, y);
      doc.setFont(undefined, 'normal');
      y += 14;

      // Cantidad de piezas (solo para puntos con conCantidad, ej. cielo falso)
      if (p.conCantidad && data.cantidad_piezas != null && data.cantidad_piezas > 0) {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(13, 79, 124);
        doc.text((p.cantidadLabel || 'Cantidad') + ': ' + data.cantidad_piezas, 64, y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(60, 60, 60);
        y += 14;
      }

      // Comentario
      if (data.comentario) {
        const lines = doc.splitTextToSize('"' + data.comentario + '"', 480);
        if (y + lines.length * 12 > 730) { doc.addPage(); y = 50; }
        doc.setFontSize(10);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(70, 70, 70);
        doc.text(lines, 64, y);
        doc.setFont(undefined, 'normal');
        y += lines.length * 12 + 4;
      }

      // Fotos
      const fotos = data.fotos || (data.foto ? [data.foto] : []);
      if (fotos.length) {
        const PHOTO_W = 110, PHOTO_H = 82, GAP = 6, PER_ROW = 4;
        let col = 0;
        const xStart = 64;
        fotos.forEach(foto => {
          if (col === 0 && y + PHOTO_H > 730) { doc.addPage(); y = 50; }
          try {
            doc.addImage(foto, 'JPEG', xStart + col * (PHOTO_W + GAP), y, PHOTO_W, PHOTO_H);
          } catch (err) { /* skip */ }
          col++;
          if (col >= PER_ROW) { col = 0; y += PHOTO_H + GAP; }
        });
        if (col > 0) y += PHOTO_H + GAP;
      }
      y += 6;
    });

    // Observaciones generales del evaluador (si las hay)
    if (e.obs_generales) {
      const lines = doc.splitTextToSize('Notas del evaluador: ' + e.obs_generales, 500);
      if (y + lines.length * 12 > 730) { doc.addPage(); y = 50; }
      doc.setFontSize(10);
      doc.setFont(undefined, 'italic');
      doc.setTextColor(80, 80, 80);
      doc.text(lines, 50, y);
      doc.setFont(undefined, 'normal');
      y += lines.length * 12 + 6;
    }

    // Línea compacta de verificación: cuántos puntos quedaron en cada estado
    const conteoOK = PUNTOS_CHECK.filter(p => e.puntos[p.id] && e.puntos[p.id].estado === ESTADO_PUNTO.OK).length;
    const conteoNR = PUNTOS_CHECK.filter(p => !e.puntos[p.id] || e.puntos[p.id].estado === ESTADO_PUNTO.PENDIENTE).length;
    const conteoReportar = reportados.length;

    if (y > 730) { doc.addPage(); y = 50; }
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.setFont(undefined, 'normal');
    const partes = [];
    if (conteoOK > 0) partes.push(conteoOK + ' verificados OK');
    if (conteoReportar > 0) partes.push(conteoReportar + ' reportados');
    if (conteoNR > 0) partes.push(conteoNR + ' sin revisar');
    doc.text('Verificación: ' + partes.join('  -  ') + '  (de ' + PUNTOS_CHECK.length + ' puntos totales)', 46, y);
    y += 8;

    // Separador
    doc.setDrawColor(220, 222, 228);
    doc.line(40, y, 572, y);
    y += 18;
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
  const evals = obtenerEvaluacionesSeleccionadas();
  if (!evals.length) { toast('Selecciona al menos una evaluación', 'danger'); return; }

  const conProblemas = evals.filter(tieneProblemas);
  const fecha = fechaLegible(nowISO());

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

  // Saneo: si hay una "ronda" antigua (multi-room) o inconsistente, descartarla silenciosamente
  if (State.ronda) {
    const evals = State.ronda.evaluaciones_temp;
    const valida = evals && evals.length === 1 && !evals[0].fecha_guardado;
    if (!valida) {
      State.ronda = null;
      saveRonda();
    }
  }

  showView('agenda');

  // Si hay una evaluación a medias, ofrecer retomar después de renderizar
  if (State.ronda && State.ronda.evaluaciones_temp.length) {
    const e = State.ronda.evaluaciones_temp[0];
    const hab = HABITACIONES.find(h => h.id === e.hab_id);
    setTimeout(() => {
      showModalConfirm({
        title: 'Evaluación a medias',
        body: 'Quedó la evaluación de ' + (hab ? hab.nombre : '???') + ' sin guardar. ¿Continuarla?',
        confirmLabel: 'Sí, continuar',
        onConfirm: () => showView('checklist'),
      });
    }, 200);
  }

  // Chips sede (vista agenda)
  $$('#view-agenda .chip').forEach(c => c.addEventListener('click', () => {
    $$('#view-agenda .chip').forEach(x => x.classList.remove('active'));
    c.classList.add('active');
    State.filtro_sede = c.dataset.sede;
    renderAgenda();
  }));

  // Chips rango (vista generar)
  $$('#view-generar .chip').forEach(c => c.addEventListener('click', () => {
    State.filtro_rango = c.dataset.rango;
    State.generar_seleccion = new Set(); // re-seleccionar todas al cambiar rango
    renderGenerar();
  }));

  // Top bar
  $('#btn-back').addEventListener('click', () => {
    if (State.vista_actual === 'checklist') {
      cancelarEvaluacion();
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
  on('#btn-export-data', 'click', exportarDatos);
  on('#btn-import-data', 'click', () => $('#file-import').click());
  on('#file-import', 'change', (e) => {
    if (e.target.files[0]) importarDatos(e.target.files[0]);
  });

  // Agenda
  on('#btn-ir-generar', 'click', () => {
    State.generar_seleccion = new Set();
    showView('generar');
  });

  // Checklist
  on('#btn-guardar-eval', 'click', guardarEvaluacion);
  on('#btn-cancelar-eval', 'click', cancelarEvaluacion);
  $$('.prio').forEach(b => b.addEventListener('click', () => {
    $$('.prio').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    if (State.ronda_eval_actual) {
      State.ronda_eval_actual.prioridad = b.dataset.prio;
      saveRonda();
    }
  }));

  // Generar
  on('#btn-sel-todo', 'click', () => {
    const evals = evaluacionesEnRango(State.filtro_rango);
    State.generar_seleccion = new Set(evals.map(e => e.id));
    renderGenerar();
  });
  on('#btn-sel-nada', 'click', () => {
    State.generar_seleccion = new Set();
    renderGenerar();
  });
  on('#btn-generar-pdf', 'click', generarPDF);
  on('#btn-compartir', 'click', compartirReporte);

  // Config
  on('#btn-guardar-config', 'click', guardarConfig);
  on('#btn-borrar-todo', 'click', borrarTodosLosDatos);

  // Prevent accidental swipe-to-back on iOS
  document.addEventListener('touchmove', (e) => {
    if (e.scale && e.scale !== 1) e.preventDefault();
  }, { passive: false });
}

document.addEventListener('DOMContentLoaded', init);
