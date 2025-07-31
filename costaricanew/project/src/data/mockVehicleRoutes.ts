import { VehicleRoute } from '../types';

export const mockVehicleRoutes: VehicleRoute[] = [
  {
    id: '1',
    plate: 'XYZ123',
    model: 'Toyota Corolla',
    color: 'White',
    riskScore: 0.85,
    districtId: 'barrio-mexico',
    route: [
      { lat: 9.9234, lng: -84.0923, timestamp: '2024-01-15T08:00:00Z' },
      { lat: 9.9245, lng: -84.0935, timestamp: '2024-01-15T08:15:00Z' },
      { lat: 9.9256, lng: -84.0947, timestamp: '2024-01-15T08:30:00Z' },
      { lat: 9.9267, lng: -84.0959, timestamp: '2024-01-15T08:45:00Z' },
      { lat: 9.9278, lng: -84.0971, timestamp: '2024-01-15T09:00:00Z' }
    ],
    predictedNextLocations: [
      { lat: 9.9289, lng: -84.0983, probability: 0.78, timeWindow: '09:15-09:30' },
      { lat: 9.9300, lng: -84.0995, probability: 0.65, timeWindow: '09:30-09:45' },
      { lat: 9.9311, lng: -84.1007, probability: 0.52, timeWindow: '09:45-10:00' }
    ]
  },
  {
    id: '2',
    plate: 'ABC789',
    model: 'Honda Civic',
    color: 'Black',
    riskScore: 0.72,
    districtId: 'concepcion',
    route: [
      { lat: 9.9067, lng: -84.1089, timestamp: '2024-01-15T14:00:00Z' },
      { lat: 9.9078, lng: -84.1101, timestamp: '2024-01-15T14:20:00Z' },
      { lat: 9.9089, lng: -84.1113, timestamp: '2024-01-15T14:40:00Z' },
      { lat: 9.9100, lng: -84.1125, timestamp: '2024-01-15T15:00:00Z' }
    ],
    predictedNextLocations: [
      { lat: 9.9111, lng: -84.1137, probability: 0.82, timeWindow: '15:20-15:40' },
      { lat: 9.9122, lng: -84.1149, probability: 0.69, timeWindow: '15:40-16:00' }
    ]
  },
  {
    id: '3',
    plate: 'DEF456',
    model: 'Nissan Sentra',
    color: 'Blue',
    riskScore: 0.91,
    districtId: 'san-felipe',
    route: [
      { lat: 9.9198, lng: -84.0923, timestamp: '2024-01-15T19:00:00Z' },
      { lat: 9.9209, lng: -84.0935, timestamp: '2024-01-15T19:10:00Z' },
      { lat: 9.9220, lng: -84.0947, timestamp: '2024-01-15T19:20:00Z' },
      { lat: 9.9231, lng: -84.0959, timestamp: '2024-01-15T19:30:00Z' },
      { lat: 9.9242, lng: -84.0971, timestamp: '2024-01-15T19:40:00Z' }
    ],
    predictedNextLocations: [
      { lat: 9.9253, lng: -84.0983, probability: 0.88, timeWindow: '19:50-20:00' },
      { lat: 9.9264, lng: -84.0995, probability: 0.75, timeWindow: '20:00-20:10' },
      { lat: 9.9275, lng: -84.1007, probability: 0.63, timeWindow: '20:10-20:20' }
    ]
  }
];