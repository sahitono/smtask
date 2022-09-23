const symbolSvg = {
  polygon: (color) =>
    `<svg viewBox="0 0 130 100" width="20px" xmlns="http://www.w3.org/2000/svg">
      <rect class="symbol" width="130" height="100" fill="${color}" />
    </svg>`,
  line: (color) =>
    `<svg viewBox="0 0 130 100" width="20px"xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="20" x2="150" y2="100" style="stroke: ${color}; stroke-width: 12px" />
    </svg>`,

  point: (color) =>
    `<svg viewBox="0 0 130 100" width="20px"xmlns="http://www.w3.org/2000/svg">
      <circle cx="65" cy="50" r="40" stroke="black" stroke-width="3" fill="${color}" />
    </svg>`,
};

let mapPrint;

/**
 * Show Printing Map Layout
 * @param {string} title - map title
 * @param {ol.Map} mapVar - the created openlayers Map variable
 * @param {Array<{name: string, layer: ol.layer.Vector, type: string, color: string}>} vectorLayers - list of all vector layer grouped by each category, define type = polygon, line, point
 * @param {Array<{name: string, layer: ol.layer.Tile}>} tileImageLayers - list of all tile layer, if empty will use osm as basemap
 */
function printMap(title, mapVar, vectorLayers, tileImageLayers = []) {
  Notiflix.Loading.standard("Preparing maps...");

  if (vectorLayers.length === 0) {
    console.error("missing vector layer");
    return;
  }

  if (mapPrint != null) {
    mapPrint.dispose();
  }

  const map = new ol.Map({
    view: new ol.View({
      center: mapVar.getView().getCenter(),
      zoom: mapVar.getView().getZoom(),
      projection: "EPSG:4326",
    }),
    target: "printarea-map",
  });

  map.updateSize();

  // add tileimagelayer
  if (tileImageLayers.length === 0) {
    const osmLayer = new ol.layer.Tile({
      source: new ol.source.OSM(),
    });

    map.addLayer(osmLayer);
  } else {
    for (const { layer } of tileImageLayers) {
      map.addLayer(layer);
    }
  }

  const legend = document.getElementById("legend-layer");

  while (legend.firstChild) {
    legend.removeChild(legend.firstChild);
  }

  // add vector layer to print map
  for (const { name, layer, type, color } of vectorLayers) {
    map.addLayer(layer);

    let symbol = symbolSvg[type](color);

    const symbolDiv = document.createElement("div");
    symbolDiv.style.marginRight = "0.3rem";
    symbolDiv.innerHTML = symbol;

    const layerNameDiv = document.createElement("div");
    layerNameDiv.innerText = name;

    const innerDiv = document.createElement("div");
    innerDiv.style.display = "flex";

    innerDiv.appendChild(symbolDiv);
    innerDiv.appendChild(layerNameDiv);

    const layerDiv = document.createElement("li");
    layerDiv.appendChild(innerDiv);

    legend.appendChild(layerDiv);
  }

  mapPrint = map;

  document.getElementById("map-title").innerText = title;
  document.getElementById(
    "created-date"
  ).innerText = `Created at ${new Date().toISOString()}`;

  setTimeout(function () {
    map.updateSize();
    Notiflix.Loading.remove();

    document.getElementById("ok-print").addEventListener("click", () => {
      document.body.classList.add("printing");
      mapPrint.updateSize();
      window.print();
      document.body.classList.remove("printing");
    });
  }, 200);
}
