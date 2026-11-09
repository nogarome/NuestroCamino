document.addEventListener('DOMContentLoaded', function() {
  const tracks = [ 
    "tracks/tramo-1.gpx",
    "tracks/tramo-2.gpx",
    "tracks/tramo-3.gpx",
    "tracks/tramo-4.gpx",
    "tracks/tramo-5.gpx",
    "tracks/tramo-6.gpx",        
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
