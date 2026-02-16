document.addEventListener('DOMContentLoaded', function() {
var opts = {
  mapa: {
    center: [40.3, -3.716667],
    zoom: 5,
    zoomControl: false,
  },

  otmLayer: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    options: {
      zoom: 5,
      maxZoom: 17,
    },
  },

  osmLayer: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      maxZoom: 19,
    },
  },
  satelliteLayer: {
    url: "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      maxZoom: 18,
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
};

var tracks = [
  "tracks/2019-09-23.gpx",
  "tracks/2019-09-24.gpx",
  "tracks/2019-09-25.gpx",
  "tracks/2019-09-26.gpx",
  "tracks/2019-09-27.gpx",
  "tracks/2019-09-28.gpx",
  "tracks/2019-09-29.gpx",
  "tracks/2021-09-20.gpx",
  "tracks/2021-09-21.gpx",
  "tracks/2021-09-22.gpx",
  "tracks/2021-09-23.gpx",
  "tracks/2021-09-24.gpx",
  "tracks/2022-10-11.gpx",
  "tracks/2022-10-12.gpx",
  "tracks/2022-10-13.gpx",
  "tracks/2022-10-14.gpx",
  "tracks/2022-10-15.gpx",
  "tracks/2022-10-16.gpx",
  "tracks/2023-10-09.gpx",
  "tracks/2023-10-10.gpx",
  "tracks/2023-10-11.gpx",
  "tracks/2023-10-12.gpx",
  "tracks/2023-10-13.gpx",
  "tracks/2024-10-14.gpx",
  "tracks/2024-10-15.gpx",
  "tracks/2024-10-16.gpx",
  "tracks/2024-10-17.gpx",
  "tracks/2024-10-18.gpx",
];

var points = [
  {
    latlng: [43.163682731047714, -1.2347120046615603],
    name: "St-Jean-Pied-De-Port",
  },
  { latlng: [43.010366581286306, -1.319284737110138], name: "Roncesvalles" },
  { latlng: [42.92979801008876, -1.5037214756011963], name: "Zubiri" },
  { latlng: [42.818953113944126, -1.641788184642792], name: "Pamplona" },
  {
    latlng: [42.673427782002605, -1.8102496862411501],
    name: "Puente-La-Reina",
  },
  { latlng: [42.66981095920804, -2.0273476839065556], name: "Estella" },
  { latlng: [42.551916501089714, -2.2710907459259038], name: "Torres-Del-Rio" },
  { latlng: [42.468215140232, -2.444669902324677], name: "Logroño" },
  { latlng: [42.4678129, -2.4361991], name: "Logroño" },
  { latlng: [42.418103086039764, -2.7350182234749814], name: "Nájera" },
  {
    latlng: [42.44043030763493, -2.9546045065580984],
    name: "St-Domingo-De-La-Calzada",
  },
  { latlng: [42.418278, -3.1836227], name: "Belorado" },
  { latlng: [42.3695574, -3.4789829], name: "Agés" },
  { latlng: [42.3470482, -3.6857035], name: "Burgos" },
  { latlng: [42.343293, -3.70147], name: "Burgos" },
  { latlng: [42.312672, -4.043053], name: "Hontanas" },
  { latlng: [42.25831, -4.346831], name: "Boadilla del Camino" },
  { latlng: [42.33809, -4.60253], name: "Carrión de los Condes" },
  { latlng: [42.360452, -4.924854], name: "Moratinos" },
  { latlng: [42.417363, -5.215672], name: "El Burgo Ranero" },
  { latlng: [42.497996, -5.414581], name: "Mansilla de las Mulas" },
  { latlng: [42.597287, -5.566997], name: "León" },
  { latlng: [42.497673, -5.803839], name: "San Martín del Camino" },
  { latlng: [42.455216, -6.052459], name: "Astorga" },
  { latlng: [42.49114, -6.341516], name: "Foncebadón" },
  { latlng: [42.544477, -6.586147], name: "Ponferrada" },
  { latlng: [42.542727, -6.592056], name: "Ponferrada" },
  { latlng: [42.605243, -6.810358], name: "Villafranca Del Bierzo" },
  { latlng: [42.701521, -7.022103], name: "La Laguna" },
  { latlng: [42.756003, -7.239549], name: "Triacastela" },
  { latlng: [42.780401, -7.412073], name: "Sarria" },
  { latlng: [42.807821, -7.615207], name: "Portomarin" },
];

map = L.map("map", opts.mapa);

var baseLayers = {};

baseLayers["Satelite"] = L.tileLayer(
  opts.satelliteLayer.url,
  opts.satelliteLayer.options
);
/* baseLayers["Relieve"] = new L.tileLayer(opts.ormLayer.url, opts.ormLayer.options); */
baseLayers["Topo"] = new L.TileLayer(opts.otmLayer.url, opts.otmLayer.options);
baseLayers["Callejero"] = new L.TileLayer(
  opts.osmLayer.url,
  opts.osmLayer.options
);

//var controlZoom = new L.Control.Zoom(opts.zoomControl);
var controlLayer = L.control.layers(
  baseLayers,
  null,
  opts.layersControl.options
);
//var controlScale = L.control.scale(opts.scaleControl.options);
//var controlMiniMap = new L.Control.MiniMap(new L.TileLayer(opts.osmLayer.url, opts.osmLayer.options), opts.miniMapControl.options);
//var controlPegman = new L.Control.Pegman(opts.pegmanControl.options);
//var controlLocate = L.control.locate(opts.locateControl.options);
L.GpxGroup.include({
  /**
   * Edit the following function as you fit.
   *
   * @param count    index of ".gpx" track within tracks array
   * @return colors  array of strings ("hex" colors) up to that given index
   */
  _uniqueColors: function (count) {
    // CURRENT behaviour

    if (count === 0) return [];
    if (count === 1) return ["#0000ff"];
    var increment = 1 / count;
    var colors = [];
    for (var i = 0; i < count; ++i) {
      var hue = i * increment;
      var rgb = this._hsvToRgb(hue, 1, 0.7);
      var hex = "#" + this._rgbToHex(rgb[0], rgb[1], rgb[2]);
      colors.push(hex);
    }
    return colors;
  },
});

var routes = L.gpxGroup(tracks, {
  points: points,
  points_options: opts.points.options,
  elevation: true,
  elevation_options: {
    theme: "steelblue-theme",
    detachedView: false,
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
});

map.on("eledata_added eledata_clear", function (e) {
  var p = document.querySelector(".chart-placeholder");
  if (p) {
    p.style.display = e.type == "eledata_added" ? "none" : "";
  }
});

map.on("eledata_added", function (e) {
  var q = document.querySelector.bind(document);
  var track = e.track_info;
  
  var trackNameElem = q(".trackname");
  if (trackNameElem) {
    trackNameElem.innerHTML = track.name || e.name || "";
  }

  //controlLayer.addOverlay(e.layer, e.name);
  q(".totlen .summaryvalue").innerHTML = track.distance.toFixed(2) + " km";
  q(".maxele .summaryvalue").innerHTML = track.elevation_max.toFixed(2) + " m";
  q(".minele .summaryvalue").innerHTML = track.elevation_min.toFixed(2) + " m";
});

controlLayer.addTo(map);
//controlScale.addTo(map);
//controlZoom.addTo(map);
//controlPegman.addTo(map);
//controlLocate.addTo(map);
//controlMiniMap.addTo(map);

routes.addTo(map);

map.addLayer(baseLayers["Satelite"]);

document.addEventListener('DOMContentLoaded', function () {
  const mapConfig = {
    trackFiles: [
      "tracks/Camino_completo.gpx",
    ],
    pointsData: window.caminoPoints, // Usa los datos globales de camino-data.js
    gpxGroupOptions: {
      elevation_options: {
        detachedView: true, // Opción específica para este mapa
      }
    }
  };

  initializeMap(mapConfig);
});
});
