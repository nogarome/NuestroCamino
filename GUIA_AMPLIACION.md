# Guía de Ampliación - Nuestro Camino

Esta guía explica cómo añadir nuevas rutas (tracks GPX) y fotografías al proyecto de forma sencilla.

## 1. Añadir Nuevas Rutas (Tracks)

Las rutas se gestionan en los archivos JavaScript correspondientes a cada página (`mapaCompleto.js`, `mapaDias.js`, etc.).

### Pasos:
1. **Sube el archivo GPX**: Guarda tu nuevo archivo `.gpx` en la carpeta `tracks/`.
2. **Edita el archivo JS**: Abre el archivo JavaScript donde quieras añadir la ruta (ej. `js/mapaDias.js`).
3. **Añade la ruta al array `tracks`**:
   ```javascript
   const tracks = [
     "tracks/2019-09-23.gpx",
     "tracks/tu-nuevo-archivo.gpx", // Añade tu nueva ruta aquí
   ];
   ```

---

## 2. Añadir Nuevas Fotografías

Las fotografías se gestionan en el archivo `testdata.json`. Este archivo utiliza el formato GeoJSON para posicionar las fotos en el mapa.

### Pasos:
1. **Prepara las imágenes**:
   - Guarda la imagen original en una carpeta dentro de `img/` (ej. `img/fotosE1/nueva_foto.jpg`).
   - Crea una versión pequeña (miniatura) y guárdala con el prefijo o sufijo que prefieras (ej. `img/fotosE1/nueva_foto_p.jpg`).
2. **Edita `testdata.json`**:
   Añade un nuevo bloque dentro del array `features`:
   ```json
   {
     "type": "Feature",
     "geometry": {
       "type": "Point",
       "coordinates": [-1.23564, 43.163474] // [Longitud, Latitud]
     },
     "properties": {
       "imageLink": "img/fotosE1/nueva_foto.jpg",
       "thumbnailLink": "img/fotosE1/nueva_foto_p.jpg",
       "title": "Nombre del Lugar",
       "description": "Breve descripción opcional"
     }
   }
   ```
   > [!IMPORTANT]
   > Recuerda que en GeoJSON las coordenadas van en orden **[Longitud, Latitud]**.

---

## 3. Añadir Puntos de Interés (Waypoints) comunes

Si quieres añadir un punto de interés que aparezca en todos los mapas:
1. Abre `js/common-data.js`.
2. Añade un nuevo objeto al array `window.commonPoints`:
   ```javascript
   { latlng: [Latitud, Longitud], name: "Nombre del Punto" },
   ```

---

## 4. Estructura de Archivos Recomendada

- `tracks/`: Todos los archivos GPX.
- `img/`: Carpetas organizadas por etapas o días para las fotos.
- `js/`: Lógica del mapa y componentes.
- `index.html`: Páginas principales que cargan los mapas.
