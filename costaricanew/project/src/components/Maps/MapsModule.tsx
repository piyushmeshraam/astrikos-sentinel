import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Camera, AlertTriangle, Navigation, Layers } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import CCTVPanel from './CCTVPanel';
import HeatmapControls from './HeatmapControls';
import { useRealTimeSync } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';

interface MapsModuleProps {
  selectedDistrict: string;
}

const MapsModule: React.FC<MapsModuleProps> = ({ selectedDistrict }) => {
  const { t } = useTranslation();
  const [activeLayer, setActiveLayer] = useState<'crime' | 'patrol' | 'cctv' | 'prediction'>('crime');
  const [showCCTVPanel, setShowCCTVPanel] = useState(false);
  const { data, connected } = useRealTimeSync(selectedDistrict);

  const layers = [
    { id: 'crime', label: 'Crime Incidents', icon: AlertTriangle, color: 'red' },
    { id: 'patrol', label: 'Patrol Routes', icon: Navigation, color: 'blue' },
    { id: 'cctv', label: 'CCTV Coverage', icon: Camera, color: 'green' },
    { id: 'prediction', label: 'AI Predictions', icon: Map, color: 'purple' }
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.maps')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive crime mapping and surveillance integration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {connected ? 'Live Data' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Layer Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>Map Layers</span>
          </h3>
          <button
            onClick={() => setShowCCTVPanel(!showCCTVPanel)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Camera className="w-4 h-4" />
            <span>CCTV Panel</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 w-full">
          {layers.map((layer) => {
            const Icon = layer.icon;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeLayer === layer.id
                    ? `bg-${layer.color}-100 dark:bg-${layer.color}-900 text-${layer.color}-700 dark:text-${layer.color}-300`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs lg:text-sm font-medium">{layer.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-3 w-full"
        >
          <InteractiveMap
            selectedDistrict={selectedDistrict}
            activeLayer={activeLayer}
            realTimeData={data}
          />
        </motion.div>

        {/* Side Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 w-full"
        >
          <HeatmapControls activeLayer={activeLayer} />
          
          {showCCTVPanel && (
            <CCTVPanel
              selectedDistrict={selectedDistrict}
              onClose={() => setShowCCTVPanel(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MapsModule;