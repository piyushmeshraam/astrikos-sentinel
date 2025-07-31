import React from 'react';
import { 
  Home, 
  BarChart3, 
  Map, 
  Camera, 
  Brain, 
  Users, 
  Settings,
  AlertTriangle,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const menuItems = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: Home, roles: ['officer', 'analyst', 'community_leader', 'admin'] },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart3, roles: ['analyst', 'officer', 'admin'] },
    { id: 'maps', label: t('nav.maps'), icon: Map, roles: ['officer', 'analyst', 'admin'] },
    { id: 'surveillance', label: t('nav.surveillance'), icon: Camera, roles: ['officer', 'admin'] },
    { id: 'predictions', label: t('nav.predictions'), icon: Brain, roles: ['analyst', 'officer', 'admin'] },
    { id: 'community', label: t('nav.community'), icon: Users, roles: ['community_leader', 'resident', 'admin'] },
    { id: 'trends', label: t('nav.trends'), icon: TrendingUp, roles: ['analyst', 'admin'] },
    { id: 'settings', label: t('nav.settings'), icon: Settings, roles: ['admin', 'officer', 'analyst'] },
  ];

  const filteredItems = menuItems.filter(item => 
    !user || item.roles.includes(user.role)
  );

  return (
    <aside className="w-64 lg:w-64 md:w-56 sm:w-48 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex-shrink-0 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 lg:px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <span className="font-medium text-sm lg:text-base truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;