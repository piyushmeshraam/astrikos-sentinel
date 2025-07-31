import React, { useState } from 'react';
import { Thermometer, Clock, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeatmapControlsProps {
  activeLayer: string;
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({ activeLayer }) => {
  const [intensity, setIntensity] = useState(50);
  const [timeRange, setTimeRange] = useState('24h');
  const [heatmapType, setHeatmapType] = useState('density');

  const timeRanges = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const heatmapTypes = [
    { value: 'density', label: 'Density', icon: Users },
    { value: 'intensity', label: 'Intensity', icon: Thermometer },
    { value: 'temporal', label: 'Temporal', icon: Clock },
    { value: 'trend', label: 'Trend', icon: TrendingUp }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-4"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
        <Thermometer className="w-5 h-5" />
        <span>Heatmap Controls</span>
      </h3>

      {/* Intensity Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Intensity: {intensity}%
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={intensity}
          onChange={(e) => setIntensity(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Time Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time Range
        </label>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {timeRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Heatmap Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Heatmap Type
        </label>
        <div className="space-y-2">
          {heatmapTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.value}
                onClick={() => setHeatmapType(type.value)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  heatmapType === type.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer-specific Controls */}
      {activeLayer === 'crime' && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Crime Filters
          </h4>
          <div className="space-y-2">
            {['Drug-related', 'Gang Activity', 'Theft', 'Violence'].map((crime) => (
              <label key={crime} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">{crime}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {activeLayer === 'prediction' && (
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Prediction Settings
          </h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">High Confidence Only</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include Weather Data</span>
            </label>
          </div>
        </div>
      )}

      {/* Apply Button */}
      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
        Apply Changes
      </button>
    </motion.div>
  );
};

export default HeatmapControls;