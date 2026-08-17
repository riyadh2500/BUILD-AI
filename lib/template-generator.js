import { FiServer, FiShoppingCart, FiMessageSquare, FiDatabase, FiCloud, FiVideo, FiMusic, FiTruck, FiDollarSign, FiBarChart2, FiShield, FiUsers, FiGlobe, FiZap, FiTrendingUp, FiBook, FiFileText, FiMail, FiImage, FiActivity, FiCpu, FiPlay, FiGrid, FiLayers, FiPackage } from "react-icons/fi";

export const templateCategories = [
  { id: 'all', name: 'All Templates', icon: FiGrid, count: 0 },
  { id: 'popular', name: 'Popular', icon: FiTrendingUp, count: 0 },
  { id: 'microservices', name: 'Microservices', icon: FiLayers, count: 0 },
  { id: 'ecommerce', name: 'E-Commerce', icon: FiShoppingCart, count: 0 },
  { id: 'social', name: 'Social Media', icon: FiUsers, count: 0 },
  { id: 'streaming', name: 'Streaming', icon: FiVideo, count: 0 },
  { id: 'aiml', name: 'AI/ML', icon: FiCpu, count: 0 },
  { id: 'data', name: 'Data Pipeline', icon: FiDatabase, count: 0 },
  { id: 'realtime', name: 'Real-time', icon: FiZap, count: 0 },
  { id: 'enterprise', name: 'Enterprise', icon: FiShield, count: 0 },
];

const pos = (x, y) => ({ x, y });

// Template definitions - organized by category
const templateDefinitions = {
  popular: [
    { name: 'Netflix Streaming', desc: 'Video streaming with CDN and recommendations', icon: FiVideo, color: '#E50914',
      nodes: [
        { type: 'user', position: pos(100, 50) },
        { type: 'cdn', position: pos(100, 150) },
        { type: 'loadBalancer', position: pos(100, 250) },
        { type: 'server', position: pos(50, 350), label: 'Streaming Server' },
        { type: 'mlModel', position: pos(250, 350), label: 'Recommender' },
        { type: 'storage', position: pos(150, 450), label: 'Video Storage' },
        { type: 'redis', position: pos(350, 350) },
        { type: 'analytics', position: pos(450, 250) },
      ]
    },
    { name: 'Instagram Social', desc: 'Photo sharing with stories and feed', icon: FiImage, color: '#E4405F',
      nodes: [
        { type: 'mobileApp', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 170) },
        { type: 'microservice', position: pos(50, 300), label: 'Feed Service' },
        { type: 'microservice', position: pos(250, 300), label: 'Story Service' },
        { type: 'mongodb', position: pos(50, 430) },
        { type: 'storage', position: pos(250, 430), label: 'Image Storage' },
        { type: 'cdn', position: pos(400, 300) },
      ]
    },
    { name: 'Twitter Feed', desc: 'Real-time social feed with trending topics', icon: FiMessageSquare, color: '#1DA1F2',
      nodes: [
        { type: 'mobileApp', position: pos(100, 50) },
        { type: 'loadBalancer', position: pos(100, 170) },
        { type: 'microservice', position: pos(50, 300), label: 'Tweet Service' },
        { type: 'microservice', position: pos(250, 300), label: 'Timeline Service' },
        { type: 'kafka', position: pos(400, 300) },
        { type: 'redis', position: pos(150, 430) },
        { type: 'mongodb', position: pos(400, 430) },
      ]
    },
    { name: 'Uber Ride Sharing', desc: 'Real-time ride matching and tracking', icon: FiTruck, color: '#000000',
      nodes: [
        { type: 'mobileApp', position: pos(50, 50) },
        { type: 'mobileApp', position: pos(250, 50), label: 'Driver App' },
        { type: 'apiGateway', position: pos(150, 170) },
        { type: 'microservice', position: pos(50, 300), label: 'Matching Service' },
        { type: 'microservice', position: pos(250, 300), label: 'Location Service' },
        { type: 'postgresql', position: pos(50, 430) },
        { type: 'redis', position: pos(250, 430) },
        { type: 'kafka', position: pos(400, 300) },
      ]
    },
    { name: 'Amazon E-Commerce', desc: 'Large-scale e-commerce platform', icon: FiShoppingCart, color: '#FF9900',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'cdn', position: pos(100, 150) },
        { type: 'loadBalancer', position: pos(100, 250) },
        { type: 'microservice', position: pos(50, 370), label: 'Product Service' },
        { type: 'microservice', position: pos(200, 370), label: 'Cart Service' },
        { type: 'microservice', position: pos(350, 370), label: 'Order Service' },
        { type: 'payment', position: pos(500, 250) },
        { type: 'database', position: pos(150, 500) },
        { type: 'redis', position: pos(350, 500) },
      ]
    },
  ],
  
  microservices: [
    { name: 'Basic Microservices', desc: 'Simple microservices with API gateway', icon: FiLayers, color: '#3b82f6',
      nodes: [
        { type: 'user', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 170) },
        { type: 'microservice', position: pos(50, 300), label: 'Service A' },
        { type: 'microservice', position: pos(250, 300), label: 'Service B' },
        { type: 'database', position: pos(50, 430) },
        { type: 'database', position: pos(250, 430) },
      ]
    },
    { name: 'Event-Driven Architecture', desc: 'Event-driven microservices with message bus', icon: FiZap, color: '#f59e0b',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'microservice', position: pos(50, 180), label: 'Publisher' },
        { type: 'kafka', position: pos(250, 180) },
        { type: 'microservice', position: pos(400, 100), label: 'Consumer 1' },
        { type: 'microservice', position: pos(400, 260), label: 'Consumer 2' },
        { type: 'database', position: pos(550, 180) },
      ]
    },
    { name: 'CQRS Pattern', desc: 'Command Query Responsibility Segregation', icon: FiServer, color: '#8b5cf6',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'microservice', position: pos(50, 180), label: 'Command Service' },
        { type: 'microservice', position: pos(250, 180), label: 'Query Service' },
        { type: 'postgresql', position: pos(50, 310), label: 'Write DB' },
        { type: 'mongodb', position: pos(250, 310), label: 'Read DB' },
        { type: 'eventBus', position: pos(150, 180) },
      ]
    },
    { name: 'Saga Pattern', desc: 'Distributed transaction management', icon: FiLayers, color: '#10b981',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'microservice', position: pos(100, 170), label: 'Orchestrator' },
        { type: 'microservice', position: pos(50, 290), label: 'Order Service' },
        { type: 'microservice', position: pos(200, 290), label: 'Payment Service' },
        { type: 'microservice', position: pos(350, 290), label: 'Inventory Service' },
        { type: 'eventBus', position: pos(200, 170) },
      ]
    },
    { name: 'Service Mesh', desc: 'Microservices with Kubernetes mesh', icon: FiGrid, color: '#326ce5',
      nodes: [
        { type: 'loadBalancer', position: pos(100, 50) },
        { type: 'kubernetes', position: pos(100, 170) },
        { type: 'microservice', position: pos(50, 290) },
        { type: 'microservice', position: pos(200, 290) },
        { type: 'microservice', position: pos(350, 290) },
        { type: 'monitoring', position: pos(500, 170) },
      ]
    },
    { name: 'API Gateway Pattern', desc: 'Centralized API management', icon: FiServer, color: '#ef4444',
      nodes: [
        { type: 'user', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 150) },
        { type: 'auth', position: pos(250, 150) },
        { type: 'microservice', position: pos(50, 280) },
        { type: 'microservice', position: pos(200, 280) },
        { type: 'redis', position: pos(350, 280) },
      ]
    },
  ],
  
  ecommerce: [
    { name: 'Shopping Cart System', desc: 'Cart with inventory management', icon: FiShoppingCart, color: '#10b981',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 150) },
        { type: 'microservice', position: pos(50, 270), label: 'Cart Service' },
        { type: 'microservice', position: pos(250, 270), label: 'Inventory Service' },
        { type: 'redis', position: pos(50, 390) },
        { type: 'database', position: pos(250, 390) },
      ]
    },
    { name: 'Payment Processing', desc: 'Secure payment gateway integration', icon: FiDollarSign, color: '#059669',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'microservice', position: pos(100, 170), label: 'Payment Service' },
        { type: 'payment', position: pos(250, 170) },
        { type: 'database', position: pos(100, 290) },
        { type: 'notification', position: pos(250, 290) },
      ]
    },
    { name: 'Order Management', desc: 'Complete order lifecycle', icon: FiPackage, color: '#f59e0b',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'microservice', position: pos(100, 170), label: 'Order Service' },
        { type: 'kafka', position: pos(250, 170) },
        { type: 'microservice', position: pos(350, 100), label: 'Fulfillment' },
        { type: 'microservice', position: pos(350, 240), label: 'Shipping' },
        { type: 'database', position: pos(100, 290) },
      ]
    },
    { name: 'Product Catalog', desc: 'Searchable product catalog', icon: FiDatabase, color: '#8b5cf6',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 150) },
        { type: 'microservice', position: pos(100, 270), label: 'Catalog Service' },
        { type: 'elasticsearch', position: pos(250, 270) },
        { type: 'database', position: pos(100, 390) },
        { type: 'cdn', position: pos(250, 150) },
      ]
    },
    { name: 'Recommendation Engine', desc: 'AI-powered product recommendations', icon: FiTrendingUp, color: '#9333ea',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'mlModel', position: pos(100, 170), label: 'Recommendation Model' },
        { type: 'featureStore', position: pos(250, 170) },
        { type: 'vectorDB', position: pos(100, 290) },
        { type: 'analytics', position: pos(250, 290) },
      ]
    },
  ],
  
  social: [
    { name: 'Social Feed', desc: 'Timeline with posts and comments', icon: FiUsers, color: '#3b82f6',
      nodes: [
        { type: 'mobileApp', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 150) },
        { type: 'microservice', position: pos(50, 270), label: 'Feed Service' },
        { type: 'microservice', position: pos(250, 270), label: 'Post Service' },
        { type: 'redis', position: pos(150, 390) },
        { type: 'mongodb', position: pos(300, 390) },
      ]
    },
    { name: 'Messaging System', desc: 'Direct messaging with notifications', icon: FiMessageSquare, color: '#10b981',
      nodes: [
        { type: 'mobileApp', position: pos(100, 50) },
        { type: 'server', position: pos(100, 170), label: 'WebSocket Server' },
        { type: 'kafka', position: pos(250, 170) },
        { type: 'database', position: pos(100, 290) },
        { type: 'notification', position: pos(250, 290) },
      ]
    },
    { name: 'Live Streaming', desc: 'Live video streaming platform', icon: FiVideo, color: '#ef4444',
      nodes: [
        { type: 'mobileApp', position: pos(100, 50) },
        { type: 'loadBalancer', position: pos(100, 150) },
        { type: 'server', position: pos(100, 270), label: 'Streaming Server' },
        { type: 'cdn', position: pos(250, 270) },
        { type: 'storage', position: pos(100, 390) },
        { type: 'analytics', position: pos(250, 390) },
      ]
    },
  ],
  
  aiml: [
    { name: 'ML Training Pipeline', desc: 'End-to-end model training', icon: FiCpu, color: '#9333ea',
      nodes: [
        { type: 'dataLake', position: pos(100, 50) },
        { type: 'dataTransform', position: pos(100, 150) },
        { type: 'trainingPipeline', position: pos(100, 250) },
        { type: 'mlflow', position: pos(250, 250) },
        { type: 'modelServing', position: pos(100, 350) },
      ]
    },
    { name: 'ML Inference API', desc: 'Real-time model inference', icon: FiZap, color: '#06b6d4',
      nodes: [
        { type: 'apiGateway', position: pos(100, 50) },
        { type: 'inferenceEngine', position: pos(100, 170) },
        { type: 'featureStore', position: pos(250, 170) },
        { type: 'redis', position: pos(100, 290) },
        { type: 'monitoring', position: pos(250, 290) },
      ]
    },
    { name: 'LLM Chat Application', desc: 'AI chatbot with LLM', icon: FiMessageSquare, color: '#8b5cf6',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'apiGateway', position: pos(100, 150) },
        { type: 'llm', position: pos(100, 270) },
        { type: 'vectorDB', position: pos(250, 270) },
        { type: 'redis', position: pos(100, 390) },
      ]
    },
  ],
  
  data: [
    { name: 'ETL Pipeline', desc: 'Extract Transform Load pipeline', icon: FiDatabase, color: '#fb923c',
      nodes: [
        { type: 'dataIngestion', position: pos(100, 50) },
        { type: 'dataTransform', position: pos(100, 150) },
        { type: 'dataValidation', position: pos(100, 250) },
        { type: 'dataWarehouse', position: pos(100, 350) },
      ]
    },
    { name: 'Stream Processing', desc: 'Real-time data streaming', icon: FiZap, color: '#06b6d4',
      nodes: [
        { type: 'kafka', position: pos(100, 50) },
        { type: 'streamProcessing', position: pos(100, 170) },
        { type: 'realtimeAnalytics', position: pos(100, 290) },
        { type: 'mongodb', position: pos(250, 290) },
      ]
    },
  ],
  
  realtime: [
    { name: 'WebSocket Chat', desc: 'Real-time chat application', icon: FiMessageSquare, color: '#3b82f6',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'server', position: pos(100, 170), label: 'WebSocket Server' },
        { type: 'redis', position: pos(250, 170) },
        { type: 'database', position: pos(100, 290) },
      ]
    },
    { name: 'Live Dashboard', desc: 'Real-time monitoring dashboard', icon: FiActivity, color: '#10b981',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'server', position: pos(100, 170), label: 'WebSocket Server' },
        { type: 'kafka', position: pos(250, 170) },
        { type: 'realtimeAnalytics', position: pos(100, 290) },
        { type: 'grafana', position: pos(250, 290) },
      ]
    },
  ],
  
  enterprise: [
    { name: 'Identity Management', desc: 'Enterprise SSO and IAM', icon: FiShield, color: '#ef4444',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'auth', position: pos(100, 170) },
        { type: 'database', position: pos(100, 290) },
        { type: 'encryption', position: pos(250, 170) },
      ]
    },
  ],
  
  streaming: [
    { name: 'Video Platform', desc: 'Video streaming with encoding', icon: FiVideo, color: '#E50914',
      nodes: [
        { type: 'webApp', position: pos(100, 50) },
        { type: 'cdn', position: pos(100, 150) },
        { type: 'server', position: pos(100, 270), label: 'Streaming Server' },
        { type: 'storage', position: pos(250, 270), label: 'Video Storage' },
      ]
    },
  ],
};

// Generate expanded templates by creating variations
export function generateAllTemplates() {
  const allTemplates = [];
  let globalId = 1;

  Object.entries(templateDefinitions).forEach(([category, templates]) => {
    templates.forEach((template, index) => {
      // Add original template
      allTemplates.push({
        id: `${category}-${globalId++}`,
        ...template,
        category,
        downloads: Math.floor(Math.random() * 20000) + 1000,
      });

      // Create variations with different scales
      const scales = [
        { suffix: 'Small', scale: 'Small-scale', mult: 0.7 },
        { suffix: 'Medium', scale: 'Medium-scale', mult: 1 },
        { suffix: 'Large', scale: 'Large-scale', mult: 1.3 },
        { suffix: 'Enterprise', scale: 'Enterprise-grade', mult: 1.6 },
      ];

      scales.forEach(({ suffix, scale, mult }) => {
        allTemplates.push({
          id: `${category}-${globalId++}`,
          name: `${template.name} (${suffix})`,
          description: `${scale} ${template.desc.toLowerCase()}`,
          icon: template.icon,
          color: template.color,
          category,
          downloads: Math.floor(Math.random() * 15000) + 500,
          nodes: template.nodes.map(node => ({
            ...node,
            position: { x: node.position.x * mult, y: node.position.y * mult }
          })),
        });
      });
    });
  });

  // Update category counts
  templateCategories.forEach(cat => {
    if (cat.id === 'all') {
      cat.count = allTemplates.length;
    } else {
      cat.count = allTemplates.filter(t => t.category === cat.id).length;
    }
  });

  return allTemplates;
}
