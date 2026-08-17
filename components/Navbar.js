import React from "react";
import { FiSave, FiDownload, FiUpload, FiFolderPlus, FiLayers, FiTrash2 } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import useStore from "../store";
import ProjectManager from "./ProjectManager";
import ExportManager from "./ExportManager";
import TemplateManager from "./TemplateManager";

const Navbar = () => {
  const {
    currentProject,
    nodes,
    saveCurrentProject,
    toggleAIAssistant,
    showProjectManager,
    toggleProjectManager,
    showExportManager,
    toggleExportManager,
    showTemplateManager,
    toggleTemplateManager,
    clearCanvas,
  } = useStore();

  const handleSave = () => {
    saveCurrentProject();
    if (typeof window !== 'undefined') {
      // Show success message
      const Toast = document.createElement('div');
      Toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up';
      Toast.textContent = '✓ Project saved successfully!';
      document.body.appendChild(Toast);
      setTimeout(() => Toast.remove(), 3000);
    }
  };

  const handleClearCanvas = () => {
    if (typeof window !== 'undefined') {
      if (confirm('Are you sure you want to clear the canvas? This will remove all components.')) {
        clearCanvas();
      }
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                <FiLayers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI System Design Builder
                </h1>
                <p className="text-xs text-gray-500">
                  {currentProject ? currentProject.name : 'Create amazing architecture diagrams'}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Project Stats */}
            {nodes.length > 0 && (
              <div className="hidden md:flex items-center space-x-4 mr-4 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Components</p>
                  <p className="text-sm font-bold text-gray-900">{nodes.length}</p>
                </div>
              </div>
            )}

            {/* Projects */}
            <button
              onClick={toggleProjectManager}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
              title="Manage Projects"
            >
              <FiFolderPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </button>

            {/* Templates */}
            <button
              onClick={toggleTemplateManager}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all"
              title="Use Template"
            >
              <FiLayers className="w-4 h-4" />
              <span className="hidden sm:inline">Templates</span>
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={!currentProject}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
              title="Save Project"
            >
              <FiSave className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </button>

            {/* Export */}
            <button
              onClick={toggleExportManager}
              disabled={!currentProject}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              title="Export Diagram"
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>

            {/* Clear Canvas */}
            {nodes.length > 0 && (
              <button
                onClick={handleClearCanvas}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 transition-all"
                title="Clear Canvas"
              >
                <FiTrash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            {/* AI Assistant */}
            <button
              onClick={toggleAIAssistant}
              className="flex items-center space-x-2 px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              title="AI Assistant"
            >
              <RiRobot2Line className="w-5 h-5" />
              <span className="hidden sm:inline">AI Assistant</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Modals */}
      {showProjectManager && <ProjectManager />}
      {showExportManager && <ExportManager />}
      {showTemplateManager && <TemplateManager />}
    </>
  );
};

export default Navbar;
