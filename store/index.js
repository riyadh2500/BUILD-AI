import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Nodes and edges state
      nodes: [],
      edges: [],
      selectedNode: null,
      
      // Project management
      currentProject: null,
      projects: [],
      
      // UI state
      showAIAssistant: false,
      showProjectManager: false,
      showTemplateManager: false,
      showExportManager: false,
      
      // Actions for nodes and edges
      setNodes: (nodes) => set({ nodes }),
      setEdges: (edges) => set({ edges }),
      
      addNode: (node) => set((state) => ({
        nodes: [...state.nodes, node]
      })),
      
      updateNode: (nodeId, data) => set((state) => ({
        nodes: state.nodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
        )
      })),
      
      deleteNode: (nodeId) => set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== nodeId),
        edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
        selectedNode: state.selectedNode?.id === nodeId ? null : state.selectedNode
      })),
      
      setSelectedNode: (node) => set({ selectedNode: node }),
      
      // Project actions
      createProject: (project) => set((state) => ({
        projects: [...state.projects, project],
        currentProject: project
      })),
      
      updateProject: (projectId, updates) => set((state) => ({
        projects: state.projects.map((p) =>
          p.id === projectId ? { ...p, ...updates } : p
        ),
        currentProject: state.currentProject?.id === projectId
          ? { ...state.currentProject, ...updates }
          : state.currentProject
      })),
      
      deleteProject: (projectId) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== projectId),
        currentProject: state.currentProject?.id === projectId ? null : state.currentProject
      })),
      
      loadProject: (project) => set({
        currentProject: project,
        nodes: project.nodes || [],
        edges: project.edges || []
      }),
      
      saveCurrentProject: () => {
        const state = get();
        if (state.currentProject) {
          set((state) => ({
            projects: state.projects.map((p) =>
              p.id === state.currentProject.id
                ? { ...p, nodes: state.nodes, edges: state.edges, updatedAt: new Date().toISOString() }
                : p
            ),
            currentProject: {
              ...state.currentProject,
              nodes: state.nodes,
              edges: state.edges,
              updatedAt: new Date().toISOString()
            }
          }));
        }
      },
      
      clearCanvas: () => set({
        nodes: [],
        edges: [],
        selectedNode: null
      }),
      
      // UI actions
      toggleAIAssistant: () => set((state) => ({
        showAIAssistant: !state.showAIAssistant
      })),
      
      toggleProjectManager: () => set((state) => ({
        showProjectManager: !state.showProjectManager
      })),
      
      toggleTemplateManager: () => set((state) => ({
        showTemplateManager: !state.showTemplateManager
      })),
      
      toggleExportManager: () => set((state) => ({
        showExportManager: !state.showExportManager
      })),
      
      setShowAIAssistant: (show) => set({ showAIAssistant: show }),
      setShowProjectManager: (show) => set({ showProjectManager: show }),
      setShowTemplateManager: (show) => set({ showTemplateManager: show }),
      setShowExportManager: (show) => set({ showExportManager: show }),
    }),
    {
      name: 'system-design-storage',
      partialize: (state) => ({
        projects: state.projects,
        currentProject: state.currentProject,
        nodes: state.nodes,
        edges: state.edges,
      }),
    }
  )
);

export default useStore;
