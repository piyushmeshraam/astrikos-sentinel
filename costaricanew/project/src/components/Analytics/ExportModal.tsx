import React, { useState } from 'react';
import { X, Download, FileText, Table, BarChart3 } from 'lucide-react';
import { KPI } from '../../types';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface ExportModalProps {
  kpis: KPI[];
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ kpis, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'pdf'>('csv');
  const [includeCharts, setIncludeCharts] = useState(false);

  const exportData = () => {
    try {
      if (exportFormat === 'csv') {
        const headers = ['Name', 'Problem', 'Solution', 'Application', 'Benefits', 'Current', 'Target', 'Trend', 'Category'];
        const csvContent = [
          headers.join(','),
          ...kpis.map(kpi => [
            `"${kpi.name}"`,
            `"${kpi.problem}"`,
            `"${kpi.solution}"`,
            `"${kpi.application}"`,
            `"${kpi.stakeholderBenefits}"`,
            kpi.currentValue,
            kpi.targetValue,
            kpi.trend,
            kpi.category
          ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alajuelita-kpis-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else if (exportFormat === 'json') {
        const jsonContent = JSON.stringify(kpis, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `alajuelita-kpis-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        window.URL.revokeObjectURL(url);
      }

      toast.success('Data exported successfully!');
      onClose();
    } catch (error) {
      toast.error('Export failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Export KPI Data
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Export Format
            </label>
            <div className="space-y-2">
              {[
                { id: 'csv', label: 'CSV (Excel Compatible)', icon: Table },
                { id: 'json', label: 'JSON (Developer Friendly)', icon: FileText },
                { id: 'pdf', label: 'PDF Report (Coming Soon)', icon: BarChart3, disabled: true }
              ].map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => !format.disabled && setExportFormat(format.id as any)}
                    disabled={format.disabled}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      exportFormat === format.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    } ${format.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-900 dark:text-white">
                      {format.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="includeCharts"
              checked={includeCharts}
              onChange={(e) => setIncludeCharts(e.target.checked)}
              disabled={exportFormat === 'csv'}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="includeCharts" className="text-sm text-gray-700 dark:text-gray-300">
              Include chart data (JSON only)
            </label>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Exporting {kpis.length} KPI records from selected filters.
            </p>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={exportData}
            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExportModal;