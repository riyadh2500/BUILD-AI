import React, { memo } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { FiX, FiDatabase } from "react-icons/fi";

const CustomNode = ({ data, selected, id }) => {
  const { setNodes, setEdges } = useReactFlow();
  
  if (!data) {
    return null;
  }
  
  const Icon = data.icon || FiDatabase;

  const handleDelete = () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  };

  return (
    <div
      className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-200 hover:shadow-2xl ${
        selected ? 'border-blue-500 shadow-blue-200 scale-105' : 'border-gray-200 hover:border-gray-300'
      }`}
      style={{ minWidth: '180px' }}
    >
      {/* Delete Button */}
      {selected && (
        <button
          onClick={handleDelete}
          className="absolute -top-3 -right-3 w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transition-all z-10 shadow-lg hover:shadow-xl transform hover:scale-110"
          title="Delete node"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}

      {/* Color Accent Bar */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
        style={{ background: `linear-gradient(90deg, ${data.color}, ${data.color}dd)` }}
      />

      {/* Node Content */}
      <div className="p-4 pt-5">
        {/* Icon and Label */}
        <div className="flex items-center space-x-3">
          <div
            className="flex items-center justify-center w-14 h-14 rounded-xl shadow-md transition-transform hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${data.color}20, ${data.color}10)`,
              border: `2px solid ${data.color}30`
            }}
          >
            <Icon className="w-7 h-7" style={{ color: data.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-gray-900 truncate mb-0.5">
              {data.label}
            </h3>
            <p className="text-xs text-gray-500 truncate">
              {data.description || data.category}
            </p>
          </div>
        </div>

        {/* Custom Properties */}
        {data.properties && Object.keys(data.properties).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="space-y-1.5">
              {Object.entries(data.properties).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 capitalize font-medium">{key}:</span>
                  <span className="text-gray-900 font-semibold truncate ml-2 bg-gray-50 px-2 py-0.5 rounded">
                    {String(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 border-2 !border-white shadow-md transition-transform hover:scale-125"
        style={{ left: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 border-2 !border-white shadow-md transition-transform hover:scale-125"
        style={{ right: -6 }}
      />
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 border-2 !border-white shadow-md transition-transform hover:scale-125"
        style={{ top: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 border-2 !border-white shadow-md transition-transform hover:scale-125"
        style={{ bottom: -6 }}
      />
    </div>
  );
};

export default memo(CustomNode);
