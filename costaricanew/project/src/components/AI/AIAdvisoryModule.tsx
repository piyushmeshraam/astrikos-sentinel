import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Brain, Zap, Target, Route, AlertTriangle, TrendingUp } from 'lucide-react';
import PredictionPanel from './PredictionPanel';
import ActionableInsights from './ActionableInsights';
import PatrolOptimizer from './PatrolOptimizer';
import { useRealTimeSync } from '../../hooks/useRealTimeSync';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface AIAdvisoryModuleProps {
  selectedDistrict: string;
}

const AIAdvisoryModule: React.FC<AIAdvisoryModuleProps> = ({ selectedDistrict }) => {
  const { t } = useTranslation();
  const [activePanel, setActivePanel] = useState<'predictions' | 'insights' | 'patrol'>('predictions');
  const [isGenerating, setIsGenerating] = useState(false);
  const { data, addAlert } = useRealTimeSync(selectedDistrict);

  const panels = [
    { id: 'predictions', label: 'Crime Predictions', icon: Brain },
    { id: 'insights', label: 'Actionable Insights', icon: Zap },
    { id: 'patrol', label: 'Patrol Optimization', icon: Route }
  ];

  const generatePrediction = async () => {
    setIsGenerating(true);
    toast.loading('Generating AI prediction...', { id: 'prediction' });

    // Simulate AI processing
    setTimeout(async () => {
      const prediction = {
        type: 'hotspot',
        location: 'Main Street & 5th Avenue',
        confidence: 0.87,
        timeframe: 'Next 4 hours',
        riskLevel: 'high',
        recommendations: [
          'Deploy additional patrol unit',
          'Increase CCTV monitoring',
          'Alert community leaders'
        ]
      };

      await addAlert({
        type: 'prediction',
        message: `High-risk hotspot predicted: ${prediction.location}`,
        confidence: prediction.confidence,
        recommendations: prediction.recommendations
      });

      toast.success('AI prediction generated successfully!', { id: 'prediction' });
      setIsGenerating(false);
    }, 3000);
  };

  const deployPatrol = async () => {
    toast.loading('Optimizing patrol deployment...', { id: 'patrol' });

    setTimeout(async () => {
      await addAlert({
        type: 'patrol',
        message: 'Patrol unit deployed to high-risk area',
        location: 'Sector 7-A',
        eta: '8 minutes'
      });

      toast.success('Patrol deployed successfully!', { id: 'patrol' });
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.predictions')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            AI-powered crime prediction and actionable intelligence
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
          <button
            onClick={generatePrediction}
            disabled={isGenerating}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white rounded-lg transition-colors"
          >
            <Brain className="w-4 h-4" />
            <span>{isGenerating ? 'Generating...' : t('actions.generatePrediction')}</span>
          </button>
          
          <button
            onClick={deployPatrol}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Target className="w-4 h-4" />
            <span>{t('actions.deployPatrol')}</span>
          </button>
        </div>
      </div>

      {/* Panel Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
       <div className="flex flex-wrap gap-2 w-full">
          {panels.map((panel) => {
            const Icon = panel.icon;
            return (
              <button
                key={panel.id}
                onClick={() => setActivePanel(panel.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activePanel === panel.id
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
               <span className="text-xs lg:text-sm font-medium">{panel.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-purple-200 dark:border-purple-800 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                AI Advisory System Active
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Processing {data.incidents.length} incidents • {data.alerts.length} active alerts
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-gray-600 dark:text-gray-400">87% Accuracy</span>
            </div>
            <div className="flex items-center space-x-1">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600 dark:text-gray-400">3 High Priority</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Panel Content */}
      <motion.div
        key={activePanel}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activePanel === 'predictions' && (
          <PredictionPanel selectedDistrict={selectedDistrict} realTimeData={data} />
        )}
        {activePanel === 'insights' && (
          <ActionableInsights selectedDistrict={selectedDistrict} realTimeData={data} />
        )}
        {activePanel === 'patrol' && (
          <PatrolOptimizer selectedDistrict={selectedDistrict} realTimeData={data} />
        )}
      </motion.div>
    </div>
  );
};

export default AIAdvisoryModule;