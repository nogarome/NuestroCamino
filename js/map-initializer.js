/**
 * Inicializa un mapa de Leaflet con una configuración base y datos específicos de la página.
 * @param {object} pageConfig - Un objeto con la configuración específica de la página.
 * @param {string[]} pageConfig.trackFiles - Array de rutas a los archivos GPX.
 * @param {object[]} pageConfig.pointsData - Array de objetos de puntos de interés.
 * @param {object} [pageConfig.gpxGroupOptions] - Opciones adicionales para L.gpxGroup.
 */
function initializeMap(pageConfig) {
  // --- 1. Configuración por Defecto ---
  const defaultConfig = {
    map: {
      center: [40.3, -3.716667],
      zoom: 5,
      zoomControl: false,
    },
    tileLayers: {
      satellite: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        options: { maxZoom: 18 },
      },
      topo: {
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        options: { maxZoom: 17 },
      },
      street: {
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: { maxZoom: 19 },
      },
    },
    layersControl: {
      options: {
        position: "bottomleft",
        collapsed: true,
      },
    },
    points: {
      options: {
        icon: {
          iconUrl: "img/icon/elevation/elevation-poi.png",
          iconSize: [12, 12],
        },
      },
    },
    gpxGroup: {
      points: pageConfig.pointsData,
      points_options: {}, // Se rellena más abajo
      elevation: true,
      elevation_options: {
        theme: "steelblue-theme",
        detachedView: false, // Valor por defecto, puede ser sobreescrito
        elevationDiv: "#elevation-div",
        followPositionMarker: true,
        zFollow: 12,
        height: 121,
      },
      legend: true,
      legend_options: {
        collapsed: true,
        position: "bottomright",
      },
      distanceMarkers: false,
    },
  };

  // Rellenar opciones de puntos y sobreescribir opciones de elevación si se especifican
  defaultConfig.gpxGroup.points_options = defaultConfig.points.options;
  if (
    pageConfig.gpxGroupOptions &&
    pageConfig.gpxGroupOptions.elevation_options
  ) {
    Object.assign(
      defaultConfig.gpxGroup.elevation_options,
      pageConfig.gpxGroupOptions.elevation_options
    );
  }

  // --- 2. Extender el Plugin de Leaflet (solo una vez) ---
  if (!L.GpxGroup.prototype._uniqueColorsExtended) {
    L.GpxGroup.include({
      _uniqueColors: function (count) {
        if (count === 0) return [];
        if (count === 1) return ["#0000ff"];
        const colors = [];
        const increment = 1 / count;
        for (let i = 0; i < count; ++i) {
          const hue = i * increment;
          const rgb = this._hsvToRgb(hue, 1, 0.7);
          const hex = "#" + this._rgbToHex(rgb[0], rgb[1], rgb[2]);
          colors.push(hex);
        }
        return colors;
      },
    });
    L.GpxGroup.prototype._uniqueColorsExtended = true;
  }

  // --- 3. Inicializar el Mapa y las Capas ---
  window.map = L.map("map", defaultConfig.map);
  const baseLayers = {
    Satelite: L.tileLayer(
      defaultConfig.tileLayers.satellite.url,
      defaultConfig.tileLayers.satellite.options
    ),
    Topo: L.tileLayer(
      defaultConfig.tileLayers.topo.url,
      defaultConfig.tileLayers.topo.options
    ),
    Callejero: L.tileLayer(
      defaultConfig.tileLayers.street.url,
      defaultConfig.tileLayers.street.options
    ),
  };
  map.addLayer(baseLayers["Satelite"]);

  // --- 4. Añadir Controles y Rutas ---
  const controlLayer = L.control.layers(
    baseLayers,
    null,
    defaultConfig.layersControl.options
  );
  controlLayer.addTo(map);
  const routes = L.gpxGroup(pageConfig.trackFiles, defaultConfig.gpxGroup);
  routes.addTo(map);

  // --- 5. Configurar los Eventos del Mapa ---
  map.on("eledata_added eledata_clear", function (e) {
    const p = document.querySelector(".chart-placeholder");
    if (p) p.style.display = e.type === "eledata_added" ? "none" : "";
  });

  map.on("eledata_added", function (e) {
    const q = (selector) => document.querySelector(selector);
    const track = e.track_info;

    const trackNameElem = q(".trackname");
    if (trackNameElem) {
      trackNameElem.innerHTML = track.name || e.name || "";
    }

    const totlen = q(".totlen .summaryvalue");
    if (totlen) totlen.innerHTML = `${track.distance.toFixed(2)} km`;
    const maxele = q(".maxele .summaryvalue");
    if (maxele) maxele.innerHTML = `${track.elevation_max.toFixed(2)} m`;
    const minele = q(".minele .summaryvalue");
    if (minele) minele.innerHTML = `${track.elevation_min.toFixed(2)} m`;
    const elegain = q(".elegain .summaryvalue");
    if (elegain) elegain.innerHTML = `${track.elevation_gain.toFixed(0)} m`;
    const eleloss = q(".eleloss .summaryvalue");
    if (eleloss) eleloss.innerHTML = `${track.elevation_loss.toFixed(0)} m`;
  });
}
