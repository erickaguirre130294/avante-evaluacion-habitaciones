# Evaluación de Habitaciones — Complejo Avante

App web estática para evaluar las 57 habitaciones del complejo (33 Hospital Especializado + 24 Centro Médico). Sin servidores, sin base de datos, sin costos recurrentes.

## Qué es esto

Una página web que abres en el celular y funciona como una agenda de inspecciones:

1. **Agenda** — lista las 57 habitaciones con semáforo (verde / amarillo / rojo) según hace cuánto fueron revisadas.
2. **Ronda** — eliges habitaciones disponibles (las ocupadas las saltas), llenas un checklist de 14 puntos críticos por habitación, agregas comentarios y fotos en las que reportes problemas.
3. **Reporte** — al cerrar la ronda genera un PDF y lo manda por email/WhatsApp a mantenimiento.
4. **Seguimiento** — los reportes quedan abiertos hasta que marques "reparado".

## Probarlo en local (1 minuto)

Doble-click a `index.html` y se abre en tu navegador. Listo.

Para usar en celular: necesitas subirlo a un servidor (ver siguiente sección) o servirlo localmente con `python -m http.server 8000` y entrar desde el celular en la misma red wifi a `http://<ip-de-tu-pc>:8000`.

## Deploy gratis en GitHub Pages

```powershell
cd C:\IT_Avante\05_EVALUACION_HABITACIONES
git init
git add .
git commit -m "v1 evaluación habitaciones"
gh repo create evaluacion-habitaciones --public --source . --remote origin --push
gh repo edit --enable-pages --pages-branch main
```

Tras ~30 segundos tendrás `https://<tu-usuario>.github.io/evaluacion-habitaciones/`.

Abre esa URL en tu celular, toca el menú del navegador → **"Agregar a pantalla de inicio"**. Queda como ícono de app.

## Configuración inicial

Primer uso → entra al menú (☰) → **Configuración** y llena:
- Tu nombre como evaluador
- Email del jefe de mantenimiento (destino del reporte)
- CC adicional (supervisor) — opcional
- Días para semáforo amarillo (default 14) y rojo (default 30)

Guarda y listo.

## Datos y respaldo

Todo se guarda en `localStorage` del navegador. **Si limpias caché o cambias de celular, pierdes los datos** — por eso desde el menú puedes:
- **Exportar datos (JSON)** → genera un backup descargable
- **Importar datos (JSON)** → restaura un backup

Buena práctica: exportar el JSON una vez por semana y guardarlo en OneDrive o el USB.

## Estructura del proyecto

```
05_EVALUACION_HABITACIONES/
├── index.html      Vistas y estructura
├── style.css       Estilos mobile-first
├── app.js          Toda la lógica + las 57 habitaciones + los 14 puntos del checklist
├── manifest.json   Para instalación como PWA en pantalla de inicio
└── README.md       Este archivo
```

Cero dependencias propias. Solo usa jsPDF cargado desde CDN para generar los PDFs.

## Cómo agregar habitaciones o puntos del checklist

Abre `app.js`:
- **Habitaciones**: arreglo `HABITACIONES` cerca del inicio del archivo
- **Puntos del checklist**: arreglo `PUNTOS_CHECK` cerca del inicio del archivo

Ambos están comentados y son fáciles de editar.

## Limitaciones conocidas v1

- Sin sincronización entre dispositivos (un solo celular o un solo navegador). Si necesitas que dos personas evalúen y vean datos centralizados, dime y migramos el backend a Google Sheets (sigue siendo gratis, requiere ~3h adicionales).
- Las fotos viven en localStorage comprimidas (~80 KB cada una). Capacidad típica del navegador: 5-10 MB. Si llenas el espacio te avisa para que exportes y limpies.
- El PDF se genera en el celular y se descarga; no se adjunta automáticamente al email por limitaciones de `mailto:`. Hay que adjuntarlo a mano desde Descargas.

## Versión

v1.0 — 20 may 2026. Complejo Avante.
