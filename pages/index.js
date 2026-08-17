import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";

// Import components with SSR disabled for React Flow
const MainCanvas = dynamic(() => import("../components/MainCanvas"), { ssr: false });
const Sidebar = dynamic(() => import("../components/Sidebar"), { ssr: false });
const Navbar = dynamic(() => import("../components/Navbar"), { ssr: false });
const AIAssistant = dynamic(() => import("../components/AIAssistant"), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>AI System Design Builder</title>
        <meta name="description" content="Build system architecture diagrams with AI" />
      </Head>
      
      <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Canvas */}
          <main className="flex-1">
            <MainCanvas />
          </main>
        </div>
        
        {/* AI Assistant */}
        <AIAssistant />
      </div>
    </>
  );
};

export default Home;
