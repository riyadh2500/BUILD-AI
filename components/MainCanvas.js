import React, { useCallback, useRef, useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import useStore from "../store";
import { v4 as uuidv4 } from "uuid";

const FlowCanvas = () => {
  const reactFlowWrapper = useRef(null);
  const { project } = useReactFlow();
  
  const {
    nodes: storeNodes,
    edges: storeEdges,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    deleteNode,
    setSelectedNode,
  } = useStore();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Custom node types
  const nodeTypes = useMemo(() => ({ custom: CustomNode }), []);

  // Initialize from store AND sync when store changes
  React.useEffect(() => {
    console.log('Store nodes changed:', storeNodes.length);
    setNodes(storeNodes);
  }, [storeNodes, setNodes]);

  React.useEffect(() => {
    console.log('Store edges changed:', storeEdges.length);
    setEdges(storeEdges);
  }, [storeEdges, setEdges]);

  // Sync to store when nodes/edges change (but not from store updates)
  const syncToStore = React.useCallback(() => {
    setStoreNodes(nodes);
    setStoreEdges(edges);
  }, [nodes, edges, setStoreNodes, setStoreEdges]);

  // Debounce store updates to prevent loops
  React.useEffect(() => {
    const timer = setTimeout(() => {
      syncToStore();
    }, 100);
    return () => clearTimeout(timer);
  }, [nodes, edges]);

  // Handle connection between nodes
  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        id: uuidv4(),
        type: "smoothstep",
        animated: true,
        style: { stroke: "#6366f1", strokeWidth: 2 },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Handle drop from sidebar
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      console.log('Drop event triggered');

      const nodeDataString = event.dataTransfer.getData("application/reactflow");
      console.log('Node data string:', nodeDataString);
      
      if (!nodeDataString) {
        console.log('No node data found');
        return;
      }

      const nodeData = JSON.parse(nodeDataString);
      console.log('Parsed node data:', nodeData);
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Calculate position in the React Flow coordinate system
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      console.log('Calculated position:', position);

      const newNode = {
        id: uuidv4(),
        type: "custom",
        position,
        data: {
          ...nodeData,
          properties: {},
        },
      };
      
      console.log('Creating new node:', newNode);

      setNodes((nds) => {
        console.log('Current nodes:', nds.length);
        const updated = [...nds, newNode];
        console.log('Updated nodes:', updated.length);
        return updated;
      });
    },
    [project, setNodes]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    console.log('Drag over canvas');
  }, []);

  // Handle node click
  const onNodeClick = useCallback(
    (event, node) => {
      setSelectedNode(node);
    },
    [setSelectedNode]
  );

  // Handle pane click (deselect)
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  // Handle keyboard delete
  const onNodesDelete = useCallback(
    (deleted) => {
      deleted.forEach((node) => deleteNode(node.id));
    },
    [deleteNode]
  );

  return (
    <div ref={reactFlowWrapper} className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="bottom-left"
        deleteKeyCode={["Backspace", "Delete"]}
        multiSelectionKeyCode="Shift"
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          size={1}
          color="#e5e7eb"
        />
        <Controls className="bg-white border border-gray-200 rounded-lg shadow-lg" />
        <MiniMap
          nodeColor={(node) => node.data?.color || "#3b82f6"}
          className="bg-white border border-gray-200 rounded-lg shadow-lg"
          maskColor="rgba(0, 0, 0, 0.05)"
        />
      </ReactFlow>

      {/* Empty State */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center max-w-md px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Start Building Your System Design
            </h3>
            <p className="text-gray-500 mb-4">
              Drag components from the sidebar to the canvas and connect them to
              create your architecture diagram
            </p>
            <button
              onClick={() => {
                const testNode = {
                  id: uuidv4(),
                  type: "custom",
                  position: { x: 250, y: 150 },
                  data: {
                    id: 'database',
                    label: 'Database',
                    icon: null,
                    color: '#10b981',
                    category: 'storage',
                    description: 'Test database',
                    properties: {},
                  },
                };
                console.log('Adding test node:', testNode);
                setNodes([testNode]);
              }}
              className="pointer-events-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Add Test Component (Click Here)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const MainCanvas = () => {
  return (
    <ReactFlowProvider>
      <FlowCanvas />
    </ReactFlowProvider>
  );
};

export default MainCanvas;
