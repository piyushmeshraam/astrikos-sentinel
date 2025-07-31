import React, { useEffect, useRef, useState } from 'react';
import { districts } from '../../data/districts';
import { RealTimeData } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';

interface InteractiveMapProps {
  selectedDistrict: string;
  activeLayer: 'crime' | 'patrol' | 'cctv' | 'prediction';
  realTimeData: RealTimeData;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedDistrict,
  activeLayer,
  realTimeData
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapData, setMapData] = useState<any[]>([]);

  // Mock map data based on active layer
  useEffect(() => {
    const district = districts.find(d => d.id === selectedDistrict);
    if (!district) return;

    const generateMockData = () => {
      switch (activeLayer) {
        case 'crime':
          return Array.from({ length: 15 }, (_, i) => ({
            id: i,
            lat: district.coordinates.lat + (Math.random() - 0.5) * 0.02,
            lng: district.coordinates.lng + (Math.random() - 0.5) * 0.02,
            type: 'crime',
            severity: Math.floor(Math.random() * 5) + 1,
            timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString()
          }));
        case 'patrol':
          return Array.from({ length: 8 }, (_, i) => ({
            id: i,
            lat: district.coordinates.lat + (Math.random() - 0.5) * 0.015,
            lng: district.coordinates.lng + (Math.random() - 0.5) * 0.015,
            type: 'patrol',
            status: Math.random() > 0.5 ? 'active' : 'idle',
            route: `Route ${i + 1}`
          }));
        case 'cctv':
          return Array.from({ length: 12 }, (_, i) => ({
            id: i,
            lat: district.coordinates.lat + (Math.random() - 0.5) * 0.018,
            lng: district.coordinates.lng + (Math.random() - 0.5) * 0.018,
            type: 'cctv',
            status: Math.random() > 0.2 ? 'online' : 'offline',
            coverage: Math.floor(Math.random() * 100) + 50
          }));
        case 'prediction':
          return Array.from({ length: 6 }, (_, i) => ({
            id: i,
            lat: district.coordinates.lat + (Math.random() - 0.5) * 0.012,
            lng: district.coordinates.lng + (Math.random() - 0.5) * 0.012,
            type: 'prediction',
            risk: Math.random(),
            confidence: Math.random() * 0.4 + 0.6
          }));
        default:
          return [];
      }
    };

    setMapData(generateMockData());
  }, [selectedDistrict, activeLayer]);

  const getMarkerColor = (item: any) => {
    switch (activeLayer) {
      case 'crime':
        return item.severity > 3 ? '#EF4444' : item.severity > 2 ? '#F59E0B' : '#10B981';
      case 'patrol':
        return item.status === 'active' ? '#3B82F6' : '#6B7280';
      case 'cctv':
        return item.status === 'online' ? '#10B981' : '#EF4444';
      case 'prediction':
        return item.risk > 0.7 ? '#EF4444' : item.risk > 0.4 ? '#F59E0B' : '#10B981';
      default:
        return '#6B7280';
    }
  };

  const getMarkerSize = (item: any) => {
    switch (activeLayer) {
      case 'crime':
        return 8 + item.severity * 2;
      case 'prediction':
        return 8 + item.confidence * 8;
      default:
        return 10;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {districts.find(d => d.id === selectedDistrict)?.name} - {activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)} Layer
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {mapData.length} data points • Last updated: {new Date(realTimeData.lastUpdated).toLocaleTimeString()}
        </p>
      </div>

      <div ref={mapRef} className="relative h-96 bg-gray-100 dark:bg-gray-700">
        {/* Mock Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-600">
          {/* District Boundary */}
          <div className="absolute inset-4 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-lg opacity-50" />
          
          {/* Map Markers */}
          {mapData.map((item, index) => {
            const x = ((item.lng + 84.1007) * 1000) % 100;
            const y = ((item.lat - 9.9152) * 1000) % 100;
            
            return (
              <motion.div
                key={item.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                style={{
                  left: `${20 + (x * 0.6)}%`,
                  top: `${20 + (y * 0.6)}%`
                }}
              >
                <div
                  className="rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-125"
                  style={{
                    backgroundColor: getMarkerColor(item),
                    width: getMarkerSize(item),
                    height: getMarkerSize(item)
                  }}
                />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {activeLayer === 'crime' && `Severity: ${item.severity}/5`}
                  {activeLayer === 'patrol' && `${item.route} (${item.status})`}
                  {activeLayer === 'cctv' && `Camera ${item.id + 1} (${item.status})`}
                  {activeLayer === 'prediction' && `Risk: ${(item.risk * 100).toFixed(0)}%`}
                </div>
              </motion.div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              {activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)} Legend
            </h4>
            <div className="space-y-1">
              {activeLayer === 'crime' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">High Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Medium Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Low Severity</span>
                  </div>
                </>
              )}
              {activeLayer === 'patrol' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Active Patrol</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-gray-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Idle Patrol</span>
                  </div>
                </>
              )}
              {activeLayer === 'cctv' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Offline</span>
                  </div>
                </>
              )}
              {activeLayer === 'prediction' && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">High Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Medium Risk</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">Low Risk</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;