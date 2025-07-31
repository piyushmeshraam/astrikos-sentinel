import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Header
      "header.title": "Alajuelita Crime Analytics",
      "header.subtitle": "District Intelligence & Safety Platform",
      
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.analytics": "Analytics",
      "nav.maps": "Crime Maps",
      "nav.surveillance": "CCTV Feeds",
      "nav.predictions": "AI Advisory",
      "nav.community": "Community",
      "nav.trends": "Trends",
      "nav.settings": "Settings",
      
      // Dashboard
      "dashboard.title": "Crime Analytics Dashboard",
      "dashboard.subtitle": "Real-time insights and intelligence for Alajuelita districts",
      "dashboard.selectDistrict": "Select District",
      "dashboard.keyMetrics": "Key Metrics",
      "dashboard.lastDays": "Last 30 days",
      
      // Stats
      "stats.drugIncidents": "Drug Incidents",
      "stats.responseTime": "Response Time",
      "stats.gangActivity": "Gang Activity",
      "stats.communityTips": "Community Tips",
      "stats.population": "Population",
      "stats.incidents": "incidents",
      "stats.min": "min",
      "stats.reports": "reports",
      "stats.month": "/month",
      
      // Crime Levels
      "crime.low": "low",
      "crime.moderate": "moderate",
      "crime.high": "high",
      "crime.critical": "critical",
      
      // Actions
      "actions.deployPatrol": "Deploy Patrol",
      "actions.generatePrediction": "Generate Prediction",
      "actions.exportData": "Export Data",
      "actions.viewDetails": "View Details",
      
      // KPI Categories
      "kpi.safety": "Safety",
      "kpi.response": "Response",
      "kpi.community": "Community",
      "kpi.prevention": "Prevention"
    }
  },
  es: {
    translation: {
      // Header
      "header.title": "Análisis Criminal de Alajuelita",
      "header.subtitle": "Plataforma de Inteligencia y Seguridad Distrital",
      
      // Navigation
      "nav.dashboard": "Panel Principal",
      "nav.analytics": "Análisis",
      "nav.maps": "Mapas Criminales",
      "nav.surveillance": "Cámaras CCTV",
      "nav.predictions": "Asesor IA",
      "nav.community": "Comunidad",
      "nav.trends": "Tendencias",
      "nav.settings": "Configuración",
      
      // Dashboard
      "dashboard.title": "Panel de Análisis Criminal",
      "dashboard.subtitle": "Información en tiempo real e inteligencia para los distritos de Alajuelita",
      "dashboard.selectDistrict": "Seleccionar Distrito",
      "dashboard.keyMetrics": "Métricas Clave",
      "dashboard.lastDays": "Últimos 30 días",
      
      // Stats
      "stats.drugIncidents": "Incidentes de Drogas",
      "stats.responseTime": "Tiempo de Respuesta",
      "stats.gangActivity": "Actividad de Pandillas",
      "stats.communityTips": "Denuncias Comunitarias",
      "stats.population": "Población",
      "stats.incidents": "incidentes",
      "stats.min": "min",
      "stats.reports": "reportes",
      "stats.month": "/mes",
      
      // Crime Levels
      "crime.low": "bajo",
      "crime.moderate": "moderado",
      "crime.high": "alto",
      "crime.critical": "crítico",
      
      // Actions
      "actions.deployPatrol": "Desplegar Patrulla",
      "actions.generatePrediction": "Generar Predicción",
      "actions.exportData": "Exportar Datos",
      "actions.viewDetails": "Ver Detalles",
      
      // KPI Categories
      "kpi.safety": "Seguridad",
      "kpi.response": "Respuesta",
      "kpi.community": "Comunidad",
      "kpi.prevention": "Prevención"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;