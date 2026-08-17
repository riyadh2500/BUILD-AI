import React, { useRef } from "react";
import { FiX, FiDownload, FiImage } from "react-icons/fi";
import useStore from "../store";
import { toPng } from "html-to-image";

const ExportManager = () => {
  const { toggleExportManager, currentProject, nodes, edges } = useStore();

  const handleExportJSON = () => {
    if (!currentProject) return;

    const exportData = {
      ...currentProject,
      nodes,
      edges,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${currentProject.name.replace(/\s+/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportImage = async () => {
    const element = document.querySelector(".react-flow");
    if (!element) return;

    try {
      const dataUrl = await toPng(element, {
        backgroundColor: "#ffffff",
        quality: 1.0,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${
        currentProject?.name.replace(/\s+/g, "-") || "diagram"
      }.png`;
      link.click();
    } catch (error) {
      console.error("Error exporting image:", error);
      alert("Failed to export image. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Export</h2>
            <p className="text-sm text-gray-500 mt-1">
              Export your system design
            </p>
          </div>
          <button
            onClick={toggleExportManager}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Export as JSON */}
          <button
            onClick={handleExportJSON}
            disabled={!currentProject}
            className="w-full flex items-center space-x-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <FiDownload className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Export as JSON</h3>
              <p className="text-sm text-gray-600">
                Download project data for sharing or backup
              </p>
            </div>
          </button>

          {/* Export as Image */}
          <button
            onClick={handleExportImage}
            disabled={!currentProject || nodes.length === 0}
            className="w-full flex items-center space-x-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg">
              <FiImage className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Export as Image</h3>
              <p className="text-sm text-gray-600">
                Download diagram as PNG image
              </p>
            </div>
          </button>

          {!currentProject && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Please create or load a project first to enable export.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExportManager;
