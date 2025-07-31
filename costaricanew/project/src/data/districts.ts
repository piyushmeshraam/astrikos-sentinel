import { District } from '../types';

export const districts: District[] = [
  {
    id: 'alajuelita',
    name: 'Alajuelita',
    population: 20000,
    area: 8.5,
    crimeLevel: 'high',
    coordinates: { lat: 9.9152, lng: -84.1007 },
    stats: {
      drugIncidents: 45,
      responseTime: 8,
      gangActivity: 12,
      communityTips: 23
    }
  },
  {
    id: 'barrio-mexico',
    name: 'Barrio México',
    population: 18500,
    area: 7.2,
    crimeLevel: 'critical',
    coordinates: { lat: 9.9234, lng: -84.0923 },
    stats: {
      drugIncidents: 45,
      responseTime: 8,
      gangActivity: 18,
      communityTips: 31
    }
  },
  {
    id: 'concepcion',
    name: 'Concepción',
    population: 12000,
    area: 7.8,
    crimeLevel: 'high',
    coordinates: { lat: 9.9067, lng: -84.1089 },
    stats: {
      drugIncidents: 38,
      responseTime: 9,
      gangActivity: 15,
      communityTips: 20
    }
  },
  {
    id: 'san-felipe',
    name: 'San Felipe',
    population: 18000,
    area: 9.1,
    crimeLevel: 'critical',
    coordinates: { lat: 9.9198, lng: -84.0923 },
    stats: {
      drugIncidents: 52,
      responseTime: 7,
      gangActivity: 18,
      communityTips: 31
    }
  },
  {
    id: 'tejarcillos',
    name: 'Tejarcillos',
    population: 14500,
    area: 10.2,
    crimeLevel: 'moderate',
    coordinates: { lat: 9.9156, lng: -84.1234 },
    stats: {
      drugIncidents: 25,
      responseTime: 10,
      gangActivity: 9,
      communityTips: 18
    }
  },
  {
    id: 'san-josecito',
    name: 'San Josecito',
    population: 15000,
    area: 6.2,
    crimeLevel: 'moderate',
    coordinates: { lat: 9.9089, lng: -84.0945 },
    stats: {
      drugIncidents: 28,
      responseTime: 6,
      gangActivity: 7,
      communityTips: 18
    }
  },
  {
    id: 'san-antonio',
    name: 'San Antonio',
    population: 10000,
    area: 12.3,
    crimeLevel: 'moderate',
    coordinates: { lat: 9.9234, lng: -84.1156 },
    stats: {
      drugIncidents: 19,
      responseTime: 12,
      gangActivity: 8,
      communityTips: 11
    }
  }
];