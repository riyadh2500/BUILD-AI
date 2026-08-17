import React, { useState } from "react";
import { nodeCategories, getNodesByCategory } from "../lib/node-types";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState('compute');
  const [searchQuery, setSearchQuery] = useState('');

  const onDragStart = (event, nodeType) => {
    console.log('Drag started:', nodeType);
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = 'move';
  };

  const filteredNodes = getNodesByCategory(activeCategory).filter((node) =>
    node.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-72 bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 flex flex-col h-full shadow-sm">
      {/* Header */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-900">Components</h2>
        <p className="text-xs text-gray-500 mt-1">Drag to canvas to add</p>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <input
          type="text"
          placeholder="Search components..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Categories */}
      <div className="px-3 py-3 border-b border-gray-200 bg-white overflow-x-auto">
        <div className="flex flex-wrap gap-2">
          {Object.entries(nodeCategories).map(([key, category]) => {
            const Icon = category.icon;
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white shadow-md transform scale-105'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
                style={
                  isActive
                    ? { background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)` }
                    : undefined
                }
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Components List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredNodes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <p className="text-sm text-gray-500">No components found</p>
            </div>
          ) : (
            filteredNodes.map((node) => {
              const Icon = node.icon;
              return (
                <div
                  key={node.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, node)}
                  className="flex items-center space-x-3 p-3 bg-white border-2 border-gray-200 rounded-xl cursor-move hover:border-blue-400 hover:shadow-lg transition-all duration-200 group transform hover:-translate-y-0.5"
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-lg shadow-sm group-hover:shadow-md transition-all"
                    style={{ 
                      background: `linear-gradient(135deg, ${node.color}20, ${node.color}10)`,
                      border: `2px solid ${node.color}30`
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: node.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                      {node.label}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {node.description}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">💡</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 mb-1">Pro Tip</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Drag components to canvas, then connect them by dragging between the blue dots
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
