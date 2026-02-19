document.addEventListener('DOMContentLoaded', function() {
  const tracks = [
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
