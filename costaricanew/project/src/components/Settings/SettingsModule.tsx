import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Settings, Moon, Sun, Bell, User, Globe, Save, Info, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface NotificationSettings {
  motionDetection: boolean;
  crimeAlerts: boolean;
  patrolUpdates: boolean;
  systemMaintenance: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'en' | 'es';
  notifications: NotificationSettings;
  autoRefresh: boolean;
  refreshInterval: number;
  mapDefaultZoom: number;
  alertSound: boolean;
}

const SettingsModule: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: isDark ? 'dark' : 'light',
    language: i18n.language as 'en' | 'es',
    notifications: {
      motionDetection: true,
      crimeAlerts: true,
      patrolUpdates: false,
      systemMaintenance: true,
      emailNotifications: false,
      pushNotifications: true,
    },
    autoRefresh: true,
    refreshInterval: 30,
    mapDefaultZoom: 12,
    alertSound: true,
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Failed to parse saved preferences:', error);
      }
    }
  }, []);

  // Track changes
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    const currentPrefs = JSON.stringify(preferences);
    const savedPrefs = savedPreferences || JSON.stringify({
      theme: 'dark',
      language: 'en',
      notifications: {
        motionDetection: true,
        crimeAlerts: true,
        patrolUpdates: false,
        systemMaintenance: true,
        emailNotifications: false,
        pushNotifications: true,
      },
      autoRefresh: true,
      refreshInterval: 30,
      mapDefaultZoom: 12,
      alertSound: true,
    });
    
    setHasChanges(currentPrefs !== savedPrefs);
  }, [preferences]);

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setPreferences(prev => ({ ...prev, theme: newTheme }));
    if ((newTheme === 'dark') !== isDark) {
      toggleTheme();
    }
  };

  const handleLanguageChange = (newLanguage: 'en' | 'es') => {
    setPreferences(prev => ({ ...prev, language: newLanguage }));
    i18n.changeLanguage(newLanguage);
  };

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      localStorage.setItem('userPreferences', JSON.stringify(preferences));
      toast.success('Settings saved successfully!');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const Tooltip: React.FC<{ content: string; children: React.ReactNode; id: string }> = ({ content, children, id }) => (
    <div 
      className="relative"
      onMouseEnter={() => setActiveTooltip(id)}
      onMouseLeave={() => setActiveTooltip(null)}
    >
      {children}
      <AnimatePresence>
        {activeTooltip === id && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg whitespace-nowrap z-50"
          >
            {content}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Settings className="w-6 h-6" />
            <span>Settings</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Customize your experience and preferences
          </p>
        </div>
        
        {hasChanges && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl w-full lg:w-auto"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full">
        {/* Theme Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Moon className="w-5 h-5" />
            <span>Appearance</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Theme Preference
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Tooltip content="Switch to light theme with bright colors" id="light-theme">
                  <button
                    onClick={() => handleThemeChange('light')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      preferences.theme === 'light'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Sun className="w-5 h-5" />
                    <span className="font-medium">Light</span>
                  </button>
                </Tooltip>
                
                <Tooltip content="Switch to dark theme with deep grays and muted colors" id="dark-theme">
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      preferences.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <Moon className="w-5 h-5" />
                    <span className="font-medium">Dark</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Language</span>
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Interface Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Tooltip content="Switch interface to English" id="english-lang">
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      preferences.language === 'en'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="font-medium">🇺🇸 English</span>
                  </button>
                </Tooltip>
                
                <Tooltip content="Cambiar interfaz a Español" id="spanish-lang">
                  <button
                    onClick={() => handleLanguageChange('es')}
                    className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all duration-200 ${
                      preferences.language === 'es'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <span className="font-medium">🇪🇸 Español</span>
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 xl:col-span-2 w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Alert Types</h4>
              
              {[
                { key: 'motionDetection', label: 'Motion Detection', tooltip: 'Get notified when CCTV cameras detect motion' },
                { key: 'crimeAlerts', label: 'Crime Alerts', tooltip: 'Receive alerts for new crime incidents' },
                { key: 'patrolUpdates', label: 'Patrol Updates', tooltip: 'Get updates on patrol deployments and status' },
                { key: 'systemMaintenance', label: 'System Maintenance', tooltip: 'Notifications about system updates and maintenance' }
              ].map(({ key, label, tooltip }) => (
                <Tooltip key={key} content={tooltip} id={`notification-${key}`}>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications[key as keyof NotificationSettings]}
                        onChange={(e) => handleNotificationChange(key as keyof NotificationSettings, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </Tooltip>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Delivery Methods</h4>
              
              {[
                { key: 'pushNotifications', label: 'Push Notifications', tooltip: 'Browser push notifications for real-time alerts' },
                { key: 'emailNotifications', label: 'Email Notifications', tooltip: 'Receive notifications via email' }
              ].map(({ key, label, tooltip }) => (
                <Tooltip key={key} content={tooltip} id={`delivery-${key}`}>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.notifications[key as keyof NotificationSettings]}
                        onChange={(e) => handleNotificationChange(key as keyof NotificationSettings, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Profile Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
                <span className="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {user?.role.replace('_', ' ')}
                </span>
              </div>
            </div>
            
            <Tooltip content="Role-based permissions are managed by administrators" id="role-info">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <Info className="w-4 h-4" />
                <span>Role permissions are system-managed</span>
              </div>
            </Tooltip>
          </div>
        </motion.div>

        {/* System Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 lg:p-6 w-full"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Preferences
          </h3>
          
          <div className="space-y-4">
            <Tooltip content="Automatically refresh data every few seconds" id="auto-refresh">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Auto Refresh</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.autoRefresh}
                    onChange={(e) => setPreferences(prev => ({ ...prev, autoRefresh: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </Tooltip>

            <Tooltip content="Play sound alerts for important notifications" id="alert-sound">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm font-medium text-gray-900 dark:text-white">Alert Sounds</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.alertSound}
                    onChange={(e) => setPreferences(prev => ({ ...prev, alertSound: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </Tooltip>

            <div>
              <Tooltip content="Set refresh interval in seconds" id="refresh-interval">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Refresh Interval (seconds)
                </label>
              </Tooltip>
              <select
                value={preferences.refreshInterval}
                onChange={(e) => setPreferences(prev => ({ ...prev, refreshInterval: Number(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={15}>15 seconds</option>
                <option value={30}>30 seconds</option>
                <option value={60}>1 minute</option>
                <option value={300}>5 minutes</option>
              </select>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Save Status */}
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-6 right-6 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                You have unsaved changes
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsModule;