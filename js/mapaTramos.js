document.addEventListener('DOMContentLoaded', function() {
  const tracks = [ 
    "tracks/1º Tramo.gpx",
    "tracks/2º Tramo.gpx",
    "tracks/3º Tramo.gpx",
    "tracks/4º Tramo.gpx",
    "tracks/5º Tramo.gpx",        
  ];

  const points = [
    {latlng:[43.163682731047714, -1.2347120046615603], name:"St-Jean-Pied-De-Port"},
    {latlng:[43.010366581286306, -1.319284737110138], name:"Roncesvalles"},
    {latlng:[42.92979801008876, -1.5037214756011963], name:"Zubiri"},
    {latlng:[42.818953113944126, -1.641788184642792], name:"Pamplona"},
    {latlng:[42.673427782002605, -1.8102496862411501], name:"Puente-La-Reina"},
    {latlng:[42.66981095920804, -2.0273476839065556], name:"Estella"},
    {latlng:[42.551916501089714, -2.2710907459259038], name:"Torres-Del-Rio"},
    {latlng:[42.468215140232, -2.444669902324677], name:"Logroño"},
    {latlng:[42.4678129, -2.4361991], name:"Logroño"},
    {latlng:[42.418103086039764, -2.7350182234749814], name:"Nájera"},
    {latlng:[42.44043030763493, -2.9546045065580984], name:"St-Domingo-De-La-Calzada"},
    {latlng:[42.418278, -3.1836227], name:"Belorado"},
    {latlng:[42.3695574, -3.4789829], name:"Agés"},
    {latlng:[42.3470482, -3.6857035], name:"Burgos"},
    {latlng:[42.343293, -3.70147], name:"Burgos"},
    {latlng:[42.312672, -4.043053], name:"Hontanas"},
    {latlng:[42.25831, -4.346831], name:"Boadilla del Camino"},
    {latlng:[42.33809, -4.60253], name:"Carrión de los Condes"},
    {latlng:[42.360452, -4.924854], name:"Moratinos"},
    {latlng:[42.417363, -5.215672], name:"El Burgo Ranero"},
    {latlng:[42.497996, -5.414581], name:"Mansilla de las Mulas"},
    {latlng:[42.597287, -5.566997], name:"León"},
    {latlng:[42.497673, -5.803839], name:"San Martín del Camino"},
    {latlng:[42.455216, -6.052459], name:"Astorga"},
    {latlng:[42.49114, -6.341516], name:"Foncebadón"},
    {latlng:[42.544477, -6.586147], name:"Ponferrada"}, 
    { latlng: [42.542727, -6.592056], name: "Ponferrada" },
    { latlng: [42.605243, -6.810358], name: "Villafranca Del Bierzo" },
    { latlng: [42.701521, -7.022103], name: "La Laguna" },
    { latlng: [42.756003, -7.239549], name: "Triacastela" },
    { latlng: [42.780401, -7.412073], name: "Sarria" },
    { latlng: [42.807821, -7.615207], name: "Portomarin" },   
  ];

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
  
  
  