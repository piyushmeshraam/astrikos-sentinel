import { HeatmapData } from '../types';

export const generateHeatmapData = (districtId: string, type: 'crime' | 'patrol' | 'surveillance' | 'prediction' = 'crime'): HeatmapData[] => {
  const baseCoordinates = {
    'alajuelita': { lat: 9.9152, lng: -84.1007 },
    'barrio-mexico': { lat: 9.9234, lng: -84.0923 },
    'concepcion': { lat: 9.9067, lng: -84.1089 },
    'san-felipe': { lat: 9.9198, lng: -84.0923 },
    'tejarcillos': { lat: 9.9156, lng: -84.1234 },
    'san-josecito': { lat: 9.9089, lng: -84.0945 },
    'san-antonio': { lat: 9.9234, lng: -84.1156 }
  };

  const base = baseCoordinates[districtId as keyof typeof baseCoordinates] || baseCoordinates.alajuelita;
  const points: HeatmapData[] = [];

  // Generate random points around the district center
  for (let i = 0; i < 50; i++) {
    const lat = base.lat + (Math.random() - 0.5) * 0.02;
    const lng = base.lng + (Math.random() - 0.5) * 0.02;
    
    let intensity = Math.random() * 5 + 1;
    
    // Adjust intensity based on type and district
    if (type === 'crime') {
      if (districtId === 'barrio-mexico' || districtId === 'san-felipe') {
        intensity *= 1.5; // Higher crime intensity
      }
    } else if (type === 'patrol') {
      intensity = Math.random() * 3 + 1; // Lower intensity for patrols
    }

    points.push({
      lat,
      lng,
      intensity: Math.round(intensity),
      type,
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      properties: {
        districtId,
        severity: intensity > 4 ? 'high' : intensity > 2 ? 'medium' : 'low'
      }
    });
  }

  return points;
};