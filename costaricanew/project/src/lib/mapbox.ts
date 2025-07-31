import mapboxgl from 'mapbox-gl';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

export { mapboxgl };

export const createMap = (container: string | HTMLElement, options?: Partial<mapboxgl.MapboxOptions>) => {
  return new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [-84.1007, 9.9152], // Alajuelita center
    zoom: 12,
    ...options,
  });
};

export const addHeatmapLayer = (map: mapboxgl.Map, data: any[], layerId: string = 'heatmap') => {
  if (map.getLayer(layerId)) {
    map.removeLayer(layerId);
  }
  if (map.getSource(layerId)) {
    map.removeSource(layerId);
  }

  map.addSource(layerId, {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: data.map(point => ({
        type: 'Feature',
        properties: point.properties || {},
        geometry: {
          type: 'Point',
          coordinates: [point.lng, point.lat]
        }
      }))
    }
  });

  map.addLayer({
    id: layerId,
    type: 'heatmap',
    source: layerId,
    maxzoom: 15,
    paint: {
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['get', 'intensity'],
        0, 0,
        6, 1
      ],
      'heatmap-intensity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 1,
        15, 3
      ],
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(33,102,172,0)',
        0.2, 'rgb(103,169,207)',
        0.4, 'rgb(209,229,240)',
        0.6, 'rgb(253,219,199)',
        0.8, 'rgb(239,138,98)',
        1, 'rgb(178,24,43)'
      ],
      'heatmap-radius': [
        'interpolate',
        ['linear'],
        ['zoom'],
        0, 2,
        15, 20
      ],
      'heatmap-opacity': [
        'interpolate',
        ['linear'],
        ['zoom'],
        7, 1,
        15, 0
      ]
    }
  });
};