import React from 'react';
import { Shield, Moon, Sun, LogOut, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 lg:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              {t('header.title')}
            </h1>
            <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
              {t('header.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          <LanguageToggle />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* User Menu */}
          {user && (
            <div className="flex items-center space-x-2 lg:space-x-3">
              <div className="flex items-center space-x-2 px-2 lg:px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white hidden sm:inline">
                  {user.name}
                </span>
                <span className="text-xs px-1 lg:px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                  {user.role.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;