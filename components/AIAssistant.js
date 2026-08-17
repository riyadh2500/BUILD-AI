import React, { useState, useRef, useEffect } from "react";
import { FiX, FiSend, FiAlertCircle } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import useStore from "../store";
import { sendMessage, analyzeDiagram, isAIConfigured } from "../lib/ai-service";
import TypingEffect from "./TypingEffect";

const AIAssistant = () => {
  const { showAIAssistant, setShowAIAssistant, nodes, edges } = useStore();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI System Design Assistant. I know all 66 components in this builder across 9 categories (Compute, Storage, Network, Messaging, Monitoring, Security, Client, Services, AI/ML, Data Processing). I can help you design scalable architectures, analyze your diagrams, and recommend specific components. What would you like to build?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!showAIAssistant) {
    return null;
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const context = {
        nodeCount: nodes.length,
        components: nodes.map((n) => n.data.label).join(", "),
        connectionCount: edges.length,
      };

      const response = await sendMessage(userMessage, context);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message}. Please configure your Groq API key in .env.local or Vercel environment variables.`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (nodes.length === 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Please add some components to the canvas first before asking for analysis.",
          isError: true,
        },
      ]);
      return;
    }

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: "Analyze my current system design" },
    ]);

    try {
      const analysis = await analyzeDiagram(nodes, edges);
      setMessages((prev) => [...prev, { role: "assistant", content: analysis }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { label: "Analyze my design", action: handleAnalyze },
    { label: "List all components", action: () => setInput("What components are available in each category?") },
    { label: "Design ML system", action: () => setInput("Design a scalable ML inference system") },
    { label: "Best practices", action: () => setInput("Best practices for this architecture?") },
  ];

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <RiRobot2Line className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI Assistant</h3>
            <p className="text-xs text-purple-100">Powered by Groq ⚡ (FASTEST)</p>
          </div>
        </div>
        <button
          onClick={() => setShowAIAssistant(false)}
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <FiX className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* API Key Warning */}
      {!isAIConfigured() && (
        <div className="mx-4 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-2">
          <FiAlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-xs text-yellow-800 font-medium">
              Groq API Key Not Configured
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Add your free Groq API key to .env.local or Vercel. Get one at console.groq.com/keys
            </p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                message.role === "user"
                  ? "bg-blue-600 text-white"
                  : message.isError
                  ? "bg-red-50 text-red-900 border border-red-200"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {message.role === "assistant" && index === messages.length - 1 && !message.isError ? (
                <TypingEffect text={message.content} speed={20} />
              ) : (
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                disabled={isLoading}
                className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-full hover:bg-blue-100 disabled:opacity-50 transition-colors"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask about system design..."
            disabled={isLoading}
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <FiSend className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
