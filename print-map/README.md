### Requirements

1. Bootstrap 5
2. Notiflix loading
   ```html
   <script
     src="https://cdn.jsdelivr.net/npm/notiflix@3.2.5/dist/notiflix-loading-aio-3.2.5.min.js"
     integrity="sha256-7GclEiFFfSH76MKH1ZW+Kx1zRpuE53QLwU3pv4OOAKY="
     crossorigin="anonymous"
   ></script>
   ```

### Usage

1. Copy print page layout modal in html

```html
<div
  class="modal fade"
  id="print-map-modal"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="print-map-modal"
  aria-hidden="true"
>
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-body">
        <div id="print-page" class="printView">
          <div id="printarea-map"></div>

          <div id="sidebar">
            <div class="header">
              <div id="map-title" class="title">Map Title</div>
              <div id="created-date" class="creation">created at</div>
            </div>

            <div class="legend" style="width: 100%">
              <div class="title">Legend</div>
              <ul id="legend-layer">
                <!-- List of layer will be placed here -->
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button id="ok-print" type="button" class="btn btn-primary">
          Print
        </button>
      </div>
    </div>
  </div>
</div>
```

2. Copy `print-map.css` under head and `print-map.js` under body
3. Call function `printMap` with paramaters:
   1. title : the title of map
   2. map : the existing map, to obtain extent information
   3. vectorLayers : list of vector layer created with openlayers, e.g,

```js
const vectorLayers = [
  {
    name: "Java Island",
    layer: jawaBoundary, // this is ol.layer.Vector with defined geometry
    color: jawaBoundary.getStyle().getFill().getColor(),
    type: "polygon",
  },
  {
    name: "Borneo Island",
    layer: kalimantanBoundary, // this is ol.layer.Vector with defined geometry
    color: kalimantanBoundary.getStyle().getFill().getColor(),
    type: "polygon",
  },
];
```

4.  tileImageLayers : optional, list of tile image layers, will be rendered following its order
