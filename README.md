# Equipo Rocket · Aerospace Technology — Landing page

Sitio estático (HTML + CSS + JS) listo para **GitHub Pages**.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en GitHub (por ejemplo `landingpage_equipo_rocket`).
2. Sube **todo el contenido de esta carpeta** a la raíz del repositorio
   (`index.html`, `css/`, `js/`, `assets/`, `.nojekyll`).
3. En el repositorio: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main` / carpeta `/ (root)` → **Save**.
4. En 1–2 minutos tu página estará en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Personalizar
Todo lo editable está al inicio de `js/main.js`, en el objeto `MISION`:
- `fechaLanzamiento`: fecha y hora del despegue (cuenta regresiva).
- `fases`: nombre, texto y estado de cada fase (`done`, `live`, `next`).
- `tripulacion`: nombres y roles de los integrantes.

## Estructura
```
index.html
css/styles.css
js/main.js
assets/favicon.svg
assets/logos/            emblema, logo horizontal, cohete, emblema blanco
assets/logos/variaciones/ versiones circulares del kit de identidad
.nojekyll
```
Todos los logos son SVG vectoriales del kit oficial de identidad visual.
