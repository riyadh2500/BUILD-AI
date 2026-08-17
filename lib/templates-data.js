import { FiServer, FiShoppingCart, FiMessageSquare, FiDatabase, FiCloud, FiVideo, FiMusic, FiTruck, FiDollarSign, FiBarChart2, FiShield, FiUsers, FiGlobe, FiZap, FiTrendingUp, FiBook, FiFileText, FiMail, FiImage, FiActivity, FiCpu, FiPlay, FiRadio, FiMonitor, FiBell, FiPackage, FiLayers, FiGrid, FiAirplay } from "react-icons/fi";

export const templateCategories = [
  { id: 'all', name: 'All Templates', icon: FiGrid },
  { id: 'popular', name: 'Popular', icon: FiTrendingUp },
  { id: 'microservices', name: 'Microservices', icon: FiLayers },
  { id: 'ecommerce', name: 'E-Commerce', icon: FiShoppingCart },
  { id: 'social', name: 'Social Media', icon: FiUsers },
  { id: 'streaming', name: 'Streaming', icon: FiVideo },
  { id: 'aiml', name: 'AI/ML', icon: FiCpu },
  { id: 'data', name: 'Data Pipeline', icon: FiDatabase },
  { id: 'realtime', name: 'Real-time', icon: FiZap },
  { id: 'enterprise', name: 'Enterprise', icon: FiShield },
];

// Template builder helper
const createTemplate = (id, name, desc, category, icon, color, nodes) => ({
  id,
  name,
  description: desc,
  category,
  icon,
  color,
  downloads: Math.floor(Math.random() * 20000) + 1000,
  nodes,
});

// Position helper
const pos = (x, y) => ({ x, y });

export const templates = [
