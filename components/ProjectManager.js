import React, { useState } from "react";
import { FiX, FiFolder, FiTrash2, FiDownload } from "react-icons/fi";
import useStore from "../store";
import { v4 as uuidv4 } from "uuid";

const ProjectManager = () => {
  const {
    projects,
    currentProject,
    createProject,
    loadProject,
    deleteProject,
    toggleProjectManager,
    clearCanvas,
  } = useStore();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const newProject = {
      id: uuidv4(),
      name: projectName.trim(),
      description: projectDescription.trim(),
      nodes: [],
      edges: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createProject(newProject);
    clearCanvas();
    setProjectName("");
    setProjectDescription("");
  };

  const handleLoadProject = (project) => {
    loadProject(project);
    toggleProjectManager();
  };

  const handleDeleteProject = (projectId, e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your system design projects
            </p>
          </div>
          <button
            onClick={toggleProjectManager}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* New Project Form */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Create New Project
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Project description (optional)"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <button
                onClick={handleCreateProject}
                disabled={!projectName.trim()}
                className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Create Project
              </button>
            </div>
          </div>

          {/* Projects List */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Your Projects ({projects.length})
            </h3>
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <FiFolder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No projects yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Create your first project to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => handleLoadProject(project)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      currentProject?.id === project.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <FiFolder className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">
                          {project.name}
                        </h4>
                      </div>
                      <button
                        onClick={(e) => handleDeleteProject(project.id, e)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Delete project"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {project.description && (
                      <p className="text-sm text-gray-600 mb-3">
                        {project.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        {project.nodes?.length || 0} components
                      </span>
                      <span>
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
