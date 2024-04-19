var map = L.map('map', {
    center: [34.5, -102],
    zoom: 5.4,
    crs: L.CRS.EPSG3857
});

var OSM = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const RI5M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RI5M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI5M"
});
const RI4M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RI4M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI4M"
});
const RI3M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RI3M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI3M"
});
const RI2M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RI2M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI2M"
});
const RI1M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RI1M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RI1M"
});
const RD5M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RD5M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD5M"
});
const RD4M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RD4M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD4M"
});
const RD3M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RD3M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD3M"
});
const RD2M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RD2M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD2M"
});
const RD1M = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:RD1M',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RD1M"
});
const RT = L.tileLayer.wms("http://127.0.0.1:8080/geoserver/OSM_Data/wms", {
layers: 'OSM_Data:OSM_Visualization_osm_data',
format: 'image/png',
transparent: true,
version: '1.1.0',
attribution: "RT"
});


// Define your basemaps

var baseMaps = {
"OpenStreetMap": OSM,
};

var RImaps = {
"RI1 Maps": L.layerGroup([RI1M]),
"RI2 Maps": L.layerGroup([RI2M]),
"RI3 Maps": L.layerGroup([RI3M]),
"RI4 Maps": L.layerGroup([RI4M]),
"RI5 Maps": L.layerGroup([RI5M]),
"RD1 Maps": L.layerGroup([RD1M]),
"RD2 Maps": L.layerGroup([RD2M]),
"RD3 Maps": L.layerGroup([RD3M]),
"RD4 Maps": L.layerGroup([RD4M]),
"RD5 Maps": L.layerGroup([RD5M]),

};

var layerControl = L.control.layers(baseMaps,RImaps, { collapsed: false, position: 'topleft' }).addTo(map);