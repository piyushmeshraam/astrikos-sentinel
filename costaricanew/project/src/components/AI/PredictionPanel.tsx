import React, { useState, useEffect } from 'react';
import { Brain, MapPin, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { RealTimeData } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';

interface PredictionPanelProps {
  selectedDistrict: string;
  realTimeData: RealTimeData;
}

interface Prediction {
  id: string;
  type: 'hotspot' | 'route' | 'incident';
  location: string;
  confidence: number;
  timeframe: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendations: string[];
  coordinates: { lat: number; lng: number };
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({ selectedDistrict, realTimeData }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<string | null>(null);

  useEffect(() => {
    // Generate mock predictions based on district
    const mockPredictions: Prediction[] = [
      {
        id: '1',
        type: 'hotspot',
        location: 'Main Street & 5th Avenue',
        confidence: 0.87,
        timeframe: 'Next 4 hours',
        riskLevel: 'high',
        description: 'High probability of drug-related activity based on historical patterns and current conditions.',
        recommendations: [
          'Deploy additional patrol unit',
          'Increase CCTV monitoring',
          'Alert community leaders',
          'Coordinate with narcotics division'
        ],
        coordinates: { lat: 9.9152, lng: -84.1007 }
      },
      {
        id: '2',
        type: 'route',
        location: 'Route 27 - Commercial District',
        confidence: 0.73,
        timeframe: 'Next 2 hours',
        riskLevel: 'medium',
        description: 'Potential gang movement detected along this corridor during evening hours.',
        recommendations: [
          'Monitor vehicle checkpoints',
          'Increase patrol frequency',
          'Coordinate with traffic division'
        ],
        coordinates: { lat: 9.9089, lng: -84.0945 }
      },
      {
        id: '3',
        type: 'incident',
        location: 'Park Central Area',
        confidence: 0.92,
        timeframe: 'Next 6 hours',
        riskLevel: 'critical',
        description: 'Critical risk of violent confrontation based on social media intelligence and gang activity patterns.',
        recommendations: [
          'Deploy tactical response team',
          'Establish perimeter monitoring',
          'Activate emergency protocols',
          'Notify hospital emergency services'
        ],
        coordinates: { lat: 9.9234, lng: -84.1156 }
      }
    ];

    setPredictions(mockPredictions);
  }, [selectedDistrict]);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-500 bg-green-100 dark:bg-green-900';
      case 'medium': return 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900';
      case 'high': return 'text-orange-500 bg-orange-100 dark:bg-orange-900';
      case 'critical': return 'text-red-500 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-500 bg-gray-100 dark:bg-gray-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotspot': return MapPin;
      case 'route': return TrendingUp;
      case 'incident': return AlertTriangle;
      default: return Brain;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Predictions List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>AI Crime Predictions</span>
          </h3>

          <div className="space-y-4">
            {predictions.map((prediction, index) => {
              const TypeIcon = getTypeIcon(prediction.type);
              
              return (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedPrediction === prediction.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                  onClick={() => setSelectedPrediction(prediction.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {prediction.location}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {prediction.type} Prediction
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(prediction.riskLevel)}`}>
                        {prediction.riskLevel}
                      </span>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {Math.round(prediction.confidence * 100)}%
                        </p>
                        <p className="text-xs text-gray-500">confidence</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {prediction.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{prediction.timeframe}</span>
                    </div>
                    
                    <div className="text-sm text-purple-600 dark:text-purple-400">
                      {prediction.recommendations.length} recommendations
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Prediction Details */}
      <div className="space-y-4">
        {selectedPrediction && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            {(() => {
              const prediction = predictions.find(p => p.id === selectedPrediction);
              if (!prediction) return null;

              return (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Prediction Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Location
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {prediction.location}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Risk Assessment
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(prediction.riskLevel)}`}>
                          {prediction.riskLevel.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {Math.round(prediction.confidence * 100)}% confidence
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Recommended Actions
                      </h4>
                      <ul className="space-y-2">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {rec}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                        Execute Recommendations
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}

        {/* Prediction Accuracy */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Model Performance
          </h3>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Overall Accuracy</span>
                <span className="font-semibold text-gray-900 dark:text-white">87%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Hotspot Detection</span>
                <span className="font-semibold text-gray-900 dark:text-white">92%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Route Prediction</span>
                <span className="font-semibold text-gray-900 dark:text-white">78%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPanel;