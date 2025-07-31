import React, { useState, useEffect } from 'react';
import { Map, Layers, Filter, MapPin, AlertTriangle, Shield, Users } from 'lucide-react';
import { districts } from '../../data/districts';
import { motion } from 'framer-motion';

interface InteractiveMapWidgetProps {
  selectedDistrict: string;
  filters: {
    timeRange: string;
    crimeType: string;
    severity: string;
  };
}

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'incident' | 'patrol' | 'camera' | 'hotspot';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  timestamp: string;
}

const InteractiveMapWidget: React.FC<InteractiveMapWidgetProps> = ({ selectedDistrict, filters }) => {
  const [mapData, setMapData] = useState<MapMarker[]>([]);
  const [activeLayer, setActiveLayer] = useState<'all' | 'incidents' | 'patrols' | 'cameras'>('all');
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  const district = districts.find(d => d.id === selectedDistrict);

  useEffect(() => {
    if (!district) return;

    // Generate mock map data
    const mockData: MapMarker[] = [
      {
        id: '1',
        lat: district.coordinates.lat + 0.005,
        lng: district.coordinates.lng + 0.003,
        type: 'incident',
        severity: 'high',
        title: 'Drug Activity Reported',
        description: 'Suspicious activity near commercial area',
        timestamp: '15 min ago'
      },
      {
        id: '2',
        lat: district.coordinates.lat - 0.003,
        lng: district.coordinates.lng + 0.007,
        type: 'patrol',
        severity: 'medium',
        title: 'Patrol Unit Alpha-7',
        description: 'Active patrol in residential zone',
        timestamp: '5 min ago'
      },
      {
        id: '3',
        lat: district.coordinates.lat + 0.008,
        lng: district.coordinates.lng - 0.002,
        type: 'camera',
        severity: 'low',
        title: 'CCTV Camera #12',
        description: 'Motion detected, recording active',
        timestamp: '2 min ago'
      },
      {
        id: '4',
        lat: district.coordinates.lat - 0.006,
        lng: district.coordinates.lng - 0.005,
        type: 'hotspot',
        severity: 'critical',
        title: 'High Crime Zone',
        description: 'AI predicted hotspot - increased activity',
        timestamp: 'Now'
      }
    ];

    setMapData(mockData);
  }, [district, filters]);

  const getMarkerColor = (type: string, severity: string) => {
    if (type === 'patrol') return '#3B82F6';
    if (type === 'camera') return '#10B981';
    
    switch (severity) {
      case 'critical': return '#EF4444';
      case 'high': return '#F59E0B';
      case 'medium': return '#F97316';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getMarkerIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'patrol': return Shield;
      case 'camera': return Users;
      case 'hotspot': return MapPin;
      default: return MapPin;
    }
  };

  const filteredData = mapData.filter(marker => {
    if (activeLayer !== 'all' && !marker.type.includes(activeLayer.slice(0, -1))) return false;
    if (filters.severity !== 'all' && marker.severity !== filters.severity) return false;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Map Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Map className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {district?.name} District Map
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredData.length} markers
            </span>
          </div>
        </div>

        {/* Layer Controls */}
        <div className="flex space-x-2">
          {[
            { id: 'all', label: 'All', icon: Filter },
            { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
            { id: 'patrols', label: 'Patrols', icon: Shield },
            { id: 'cameras', label: 'Cameras', icon: Users }
          ].map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  activeLayer === layer.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-700 dark:to-gray-600">
        {/* District Boundary */}
        <div className="absolute inset-4 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-lg opacity-60" />
        
        {/* District Label */}
        <div className="absolute top-6 left-6 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {district?.name}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Pop: {district?.population.toLocaleString()}
          </p>
        </div>

        {/* Map Markers */}
        {filteredData.map((marker, index) => {
          const Icon = getMarkerIcon(marker.type);
          const x = ((marker.lng + 84.1007) * 1000) % 100;
          const y = ((marker.lat - 9.9152) * 1000) % 100;
          
          return (
            <motion.div
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${20 + (x * 0.6)}%`,
                top: `${20 + (y * 0.6)}%`
              }}
              onClick={() => setSelectedMarker(marker)}
            >
              <div
                className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-125"
                style={{ backgroundColor: getMarkerColor(marker.type, marker.severity) }}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              
              {/* Pulse animation for critical markers */}
              {marker.severity === 'critical' && (
                <div
                  className="absolute inset-0 rounded-full animate-ping"
                  style={{ backgroundColor: getMarkerColor(marker.type, marker.severity) }}
                />
              )}
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Legend</h4>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Patrol</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Camera</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Marker Details */}
      {selectedMarker && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {selectedMarker.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {selectedMarker.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {selectedMarker.timestamp}
              </p>
            </div>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default InteractiveMapWidget;