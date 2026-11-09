document.addEventListener('DOMContentLoaded', function() {
  const tracks = [
    "tracks/Camino_completo.gpx",
  ];

  const points = window.commonPoints;

  const mapConfig = {
    trackFiles: tracks,
    pointsData: points,
    gpxGroupOptions: {
      elevation_options: {
        detachedView: false,
      }
    }
  };

  initializeMap(mapConfig);
});