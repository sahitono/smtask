const map = new ol.Map({
  view: new ol.View({
    center: [106.8, -6.2],
    zoom: 6,
    projection: "EPSG:4326",
  }),
  target: "map",
});

const osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

map.addLayer(osmLayer);

let jawaBoundary = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: "#483f6b",
    }),
    stroke: new ol.style.Stroke({
      color: "#fff",
      width: "2px",
    }),
  }),
});

let kalimantanBoundary = new ol.layer.Vector({
  source: new ol.source.Vector(),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: "#ffd253",
    }),
    stroke: new ol.style.Stroke({
      color: "#fff",
      width: "2px",
    }),
  }),
});

map.addLayer(jawaBoundary);
map.addLayer(kalimantanBoundary);

fetch("/sample/jawa-boundary.geojson")
  .then((res) => res.json())
  .then((data) => {
    const features = new ol.format.GeoJSON().readFeatures(data);
    jawaBoundary.getSource().addFeatures(features);
  });

fetch("/sample/kalimantan-boundary.geojson")
  .then((res) => res.json())
  .then((data) => {
    const features = new ol.format.GeoJSON().readFeatures(data);
    kalimantanBoundary.getSource().addFeatures(features);
  });

/**
 * open map layout
 */
document.getElementById("print-map-button").addEventListener("click", () => {
  printMap("Indonesia Map", map, [
    {
      name: "Java Island",
      layer: jawaBoundary,
      color: jawaBoundary.getStyle().getFill().getColor(),
      type: "polygon",
    },
    {
      name: "Borneo Island",
      layer: kalimantanBoundary,
      color: kalimantanBoundary.getStyle().getFill().getColor(),
      type: "polygon",
    },
  ]);
});
