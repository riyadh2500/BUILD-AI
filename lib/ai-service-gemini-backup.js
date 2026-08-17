// Dual AI Service: OpenAI (primary) + Google Gemini (free fallback)
import { GoogleGenerativeAI } from "@google/generative-ai";

const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

// Initialize Gemini if key exists
let genAI;
let geminiModel;
if (GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

// Try OpenAI first, fallback to Gemini if it fails
export const sendMessage = async (message, context = {}) => {
  // Try OpenAI first
  if (OPENAI_API_KEY) {
    try {
      const systemContext = `You are an expert system design architect assistant. You help users design scalable, reliable, and efficient system architectures for AI/ML systems, distributed systems, and cloud applications.
    
Current design context:
- Number of components: ${context.nodeCount || 0}
- Components: ${context.components || "None yet"}
- Connections: ${context.connectionCount || 0}

Provide clear, actionable advice for system design. Focus on:
- AI/ML architecture patterns (training pipelines, inference, feature stores)
- Data pipeline design (ETL, streaming, batch processing)
- Scalability and performance optimization
- Security and reliability best practices

When suggesting components, reference the available categories: Compute, Storage, Network, Messaging, Monitoring, Security, Services, AI/ML, and Data Pipeline.`;

      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemContext },
            { role: "user", content: message },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.warn("OpenAI failed, trying Gemini fallback...", error);
    }
  }

  // Fallback to Gemini
  if (GEMINI_API_KEY && geminiModel) {
    try {
      const prompt = `You are an expert system design architect assistant.

Current design context:
- Number of components: ${context.nodeCount || 0}
- Components: ${context.components || "None yet"}
- Connections: ${context.connectionCount || 0}

User question: ${message}

Provide clear, actionable advice for system design focusing on AI/ML systems, data pipelines, scalability, and security.`;

      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini also failed:", error);
      throw new Error("Both AI services are unavailable. Please check your API keys.");
    }
  }

  throw new Error(
    "No AI service configured. Please add NEXT_PUBLIC_OPENAI_API_KEY or NEXT_PUBLIC_GEMINI_API_KEY to your .env.local file or Vercel environment variables."
  );
};

export const analyzeDiagram = async (nodes, edges) => {
  const nodeDescriptions = nodes
    .map((node) => `- ${node.data.label} (${node.data.category})`)
    .join("\n");

  const prompt = `Analyze this system design diagram and provide expert insights:

Components:
${nodeDescriptions}

Total connections: ${edges.length}

Please provide a comprehensive analysis including:
1. Overall architecture assessment and design patterns identified
2. Scalability considerations and bottlenecks
3. Security analysis and potential vulnerabilities
4. Data flow and processing efficiency
5. AI/ML pipeline optimization (if applicable)
6. Recommendations for improvement
7. Missing critical components

Be specific and actionable in your recommendations.`;

  // Try OpenAI first
  if (OPENAI_API_KEY) {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are an expert system architect specializing in AI/ML systems, distributed architectures, and cloud infrastructure.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
          max_tokens: 2500,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.warn("OpenAI analysis failed, trying Gemini...", error);
    }
  }

  // Fallback to Gemini
  if (GEMINI_API_KEY && geminiModel) {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  throw new Error("No AI service available for analysis.");
};

export const generateDesignSuggestions = async (requirements) => {
  const prompt = `Based on these requirements, design a comprehensive system architecture:

${requirements}

Please provide a detailed system design including:
1. Core components and their responsibilities
2. Architecture diagram description (how components connect)
3. Technology stack recommendations
4. Data flow and processing pipeline
5. AI/ML components (if applicable: training, inference, feature store, etc.)
6. Scaling strategy and performance optimization
7. Security measures and best practices
8. Monitoring and observability setup
9. Cost optimization considerations

Be specific with component names from these categories: Compute, Storage, Network, Messaging, Monitoring, Security, AI/ML, Data Pipeline, Services.`;

  // Try OpenAI first
  if (OPENAI_API_KEY) {
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a senior system architect with expertise in AI/ML systems, distributed computing, and cloud infrastructure.",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.8,
          max_tokens: 3000,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices[0].message.content;
      }
    } catch (error) {
      console.warn("OpenAI generation failed, trying Gemini...", error);
    }
  }

  // Fallback to Gemini
  if (GEMINI_API_KEY && geminiModel) {
    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  throw new Error("No AI service available for design generation.");
};

export const isAIConfigured = () => {
  return !!(OPENAI_API_KEY || GEMINI_API_KEY);
};

export const getAIProvider = () => {
  if (OPENAI_API_KEY) return "OpenAI GPT-4o";
  if (GEMINI_API_KEY) return "Google Gemini";
  return "None";
};
