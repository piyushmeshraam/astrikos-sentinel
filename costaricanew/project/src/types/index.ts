export interface District {
  id: string;
  name: string;
  population: number;
  area: number; // km²
  crimeLevel: 'low' | 'moderate' | 'high' | 'critical';
  coordinates: {
    lat: number;
    lng: number;
  };
  stats: {
    drugIncidents: number;
    responseTime: number; // minutes
    gangActivity: number;
    communityTips: number;
    suspiciousTransactions: number;
    onlineThreats: number;
    youthInterventions: number;
    droneDetections: number;
    crowdDensityPeaks: number;
    routeDetections: number;
  };
}

export interface CrimeIncident {
  id: string;
  districtId: string;
  type: 'drug' | 'gang' | 'theft' | 'violence' | 'other';
  severity: 1 | 2 | 3 | 4 | 5;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  timestamp: string;
  status: 'reported' | 'investigating' | 'resolved';
  description: string;
  reportedBy: string;
  vehicleInvolved?: {
    plate: string;
    model: string;
    color: string;
  };
  predictedRoute?: {
    coordinates: { lat: number; lng: number }[];
    confidence: number;
  };
}

export interface User {
  id: string;
  email: string;
  role: 'officer' | 'analyst' | 'community_leader' | 'resident' | 'admin';
  district?: string;
  name: string;
  createdAt: string;
  premiumAccess?: boolean;
  lastLogin?: string;
}

export interface KPI {
  id: string;
  name: string;
  problem: string;
  solution: string;
  application: string;
  stakeholderBenefits: string;
  currentValue: number;
  targetValue: number;
  trend: 'up' | 'down' | 'stable';
  districtId: string;
  category: 'safety' | 'response' | 'community' | 'prevention' | 'surveillance' | 'financial' | 'youth';
  priority: 'low' | 'medium' | 'high' | 'critical';
  lastUpdated: string;
}

export interface PredictionResult {
  districtId: string;
  type: 'hotspot' | 'route' | 'incident';
  confidence: number;
  timeframe: string;
  recommendations: string[];
  coordinates?: { lat: number; lng: number }[];
  vehicleData?: {
    plate: string;
    predictedPath: { lat: number; lng: number; timestamp: string }[];
    riskScore: number;
  };
}

export interface HeatmapData {
  lat: number;
  lng: number;
  intensity: number;
  type: 'crime' | 'patrol' | 'surveillance' | 'prediction';
  timestamp: string;
  properties?: Record<string, any>;
}

export interface VehicleRoute {
  id: string;
  plate: string;
  model: string;
  color: string;
  route: {
    lat: number;
    lng: number;
    timestamp: string;
  }[];
  riskScore: number;
  districtId: string;
  predictedNextLocations: {
    lat: number;
    lng: number;
    probability: number;
    timeWindow: string;
  }[];
}

export interface CommunityTip {
  id: string;
  districtId: string;
  type: 'drug' | 'gang' | 'suspicious_activity' | 'vehicle' | 'other';
  description: string;
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  anonymous: boolean;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  submittedAt: string;
  submittedBy?: string;
  attachments?: string[];
}