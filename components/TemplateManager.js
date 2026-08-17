import React, { useState } from "react";
import { FiX, FiSearch, FiDownload, FiTrendingUp } from "react-icons/fi";
import useStore from "../store";
import { v4 as uuidv4 } from "uuid";
import { nodeTypes } from "../lib/node-types";
import { generateAllTemplates, templateCategories } from "../lib/template-generator";

const TemplateManager = () => {
  const { toggleTemplateManager, setNodes, setEdges, createProject } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const allTemplates = generateAllTemplates();
  
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
            <h2 className="text-2xl font-bold text-gray-900">Templates Library</h2>
            <p className="text-sm text-gray-500 mt-1">
              {filteredTemplates.length}+ professional system design templates
            </p>
          </div>
          <button
            onClick={toggleTemplateManager}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          {/* Search */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {templateCategories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                  <span className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    ({category.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No templates found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FiDownload className="w-3.5 h-3.5" />
                        <span>{template.downloads.toLocaleString()} uses</span>
                      </div>
                      <span className="text-blue-600 font-medium group-hover:text-blue-700">
                        Use Template →
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateManager;
