import React from "react";
import { FiX, FiServer, FiShoppingCart, FiMessageSquare } from "react-icons/fi";
import useStore from "../store";
import { v4 as uuidv4 } from "uuid";
import { nodeTypes } from "../lib/node-types";

const TemplateManager = () => {
  const { toggleTemplateManager, setNodes, setEdges, createProject, clearCanvas } = useStore();

  const templates = [
    {
      id: "microservices",
      name: "Microservices Architecture",
      description: "A scalable microservices setup with API gateway, services, and databases",
      icon: FiServer,
      color: "#3b82f6",
      nodes: [
        { type: "user", position: { x: 100, y: 100 } },
        { type: "loadBalancer", position: { x: 100, y: 220 } },
        { type: "apiGateway", position: { x: 100, y: 340 } },
        { type: "microservice", position: { x: 50, y: 480 }, label: "Auth Service" },
        { type: "microservice", position: { x: 250, y: 480 }, label: "User Service" },
        { type: "microservice", position: { x: 450, y: 480 }, label: "Order Service" },
        { type: "database", position: { x: 50, y: 620 } },
        { type: "database", position: { x: 250, y: 620 } },
        { type: "database", position: { x: 450, y: 620 } },
        { type: "redis", position: { x: 650, y: 480 } },
      ],
    },
    {
      id: "ecommerce",
      name: "E-Commerce Platform",
      description: "Complete e-commerce architecture with payment and inventory systems",
      icon: FiShoppingCart,
      color: "#10b981",
      nodes: [
        { type: "webApp", position: { x: 100, y: 100 } },
        { type: "cdn", position: { x: 100, y: 220 } },
        { type: "loadBalancer", position: { x: 100, y: 340 } },
        { type: "server", position: { x: 50, y: 480 }, label: "Web Server" },
        { type: "server", position: { x: 250, y: 480 }, label: "API Server" },
        { type: "database", position: { x: 150, y: 620 } },
        { type: "cache", position: { x: 350, y: 620 } },
        { type: "cloudService", position: { x: 450, y: 340 }, label: "Payment Gateway" },
      ],
    },
    {
      id: "chat",
      name: "Real-time Chat Application",
      description: "Scalable chat system with message queues and real-time updates",
      icon: FiMessageSquare,
      color: "#8b5cf6",
      nodes: [
        { type: "mobileApp", position: { x: 50, y: 100 } },
        { type: "webApp", position: { x: 250, y: 100 } },
        { type: "loadBalancer", position: { x: 150, y: 240 } },
        { type: "server", position: { x: 150, y: 360 }, label: "WebSocket Server" },
        { type: "kafka", position: { x: 350, y: 360 } },
        { type: "database", position: { x: 50, y: 500 } },
        { type: "redis", position: { x: 250, y: 500 } },
        { type: "storage", position: { x: 450, y: 500 } },
      ],
    },
  ];

  const applyTemplate = (template) => {
    const newNodes = template.nodes.map((node) => {
      const nodeType = nodeTypes[node.type];
      return {
        id: uuidv4(),
        type: "custom",
        position: node.position,
        data: {
          ...nodeType,
          label: node.label || nodeType.label,
          properties: {},
        },
      };
    });

    const newProject = {
      id: uuidv4(),
      name: template.name,
      description: template.description,
      nodes: newNodes,
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createProject(newProject);
    setNodes(newNodes);
    setEdges([]);
    toggleTemplateManager();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Templates</h2>
            <p className="text-sm text-gray-500 mt-1">
              Start with a pre-built architecture template
            </p>
          </div>
          <button
            onClick={toggleTemplateManager}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <div
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className="p-6 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all group"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${template.color}20` }}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{ color: template.color }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {template.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{template.nodes.length} components</span>
                    <span className="text-blue-600 font-medium group-hover:text-blue-700">
                      Use Template →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
