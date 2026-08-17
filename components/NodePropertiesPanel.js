import React, { useState, useEffect } from "react";
import { FiX, FiEdit2, FiCheck } from "react-icons/fi";
import useStore from "../store";

const NodePropertiesPanel = () => {
  const { selectedNode, updateNode, setSelectedNode } = useStore();
  const [properties, setProperties] = useState({});
  const [newPropertyKey, setNewPropertyKey] = useState("");
  const [newPropertyValue, setNewPropertyValue] = useState("");
  const [editingLabel, setEditingLabel] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setProperties(selectedNode.data.properties || {});
      setLabel(selectedNode.data.label || "");
    } else {
      setProperties({});
      setLabel("");
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return null;
  }

  const Icon = selectedNode.data.icon;

  const handleAddProperty = () => {
    if (newPropertyKey.trim() && newPropertyValue.trim()) {
      const updatedProperties = {
        ...properties,
        [newPropertyKey.trim()]: newPropertyValue.trim(),
      };
      setProperties(updatedProperties);
      updateNode(selectedNode.id, { properties: updatedProperties });
      setNewPropertyKey("");
      setNewPropertyValue("");
    }
  };

  const handleDeleteProperty = (key) => {
    const updatedProperties = { ...properties };
    delete updatedProperties[key];
    setProperties(updatedProperties);
    updateNode(selectedNode.id, { properties: updatedProperties });
  };

  const handleUpdateProperty = (key, newValue) => {
    const updatedProperties = {
      ...properties,
      [key]: newValue,
    };
    setProperties(updatedProperties);
    updateNode(selectedNode.id, { properties: updatedProperties });
  };

  const handleSaveLabel = () => {
    if (label.trim()) {
      updateNode(selectedNode.id, { label: label.trim() });
      setEditingLabel(false);
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
        <button
          onClick={() => setSelectedNode(null)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          title="Close"
        >
          <FiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Node Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-lg"
              style={{ backgroundColor: `${selectedNode.data.color}20` }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: selectedNode.data.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              {editingLabel ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSaveLabel()}
                    className="flex-1 px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveLabel}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <FiCheck className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {selectedNode.data.label}
                  </h3>
                  <button
                    onClick={() => setEditingLabel(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                  >
                    <FiEdit2 className="w-3 h-3" />
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-500">
                {selectedNode.data.description}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Category:</span>
              <span className="text-gray-900 font-medium capitalize">
                {selectedNode.data.category}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Node ID:</span>
              <span className="text-gray-900 font-mono text-[10px]">
                {selectedNode.id.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        {/* Custom Properties */}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Custom Properties
          </h3>

          {/* Existing Properties */}
          {Object.keys(properties).length > 0 ? (
            <div className="space-y-2 mb-4">
              {Object.entries(properties).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded border border-gray-200"
                >
                  <div className="flex-1 min-w-0 mr-2">
                    <div className="text-xs text-gray-500 capitalize">{key}</div>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleUpdateProperty(key, e.target.value)}
                      className="w-full text-xs text-gray-900 bg-transparent border-none focus:outline-none p-0 mt-1"
                    />
                  </div>
                  <button
                    onClick={() => handleDeleteProperty(key)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded flex-shrink-0"
                    title="Delete property"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 mb-4">
              No custom properties yet
            </p>
          )}

          {/* Add New Property */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Property name"
              value={newPropertyKey}
              onChange={(e) => setNewPropertyKey(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Property value"
              value={newPropertyValue}
              onChange={(e) => setNewPropertyValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddProperty()}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddProperty}
              disabled={!newPropertyKey.trim() || !newPropertyValue.trim()}
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add Property
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="p-4 bg-purple-50 border-t border-purple-100">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-purple-600">💡</span>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-purple-900">
                Pro Tip
              </h4>
              <p className="text-xs text-purple-700 mt-1">
                Add custom properties like "capacity", "region", or "version" to
                document your system components
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NodePropertiesPanel;
