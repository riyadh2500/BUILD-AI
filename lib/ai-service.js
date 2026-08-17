// Groq AI (FASTEST & FREE - Lightning Speed!)
const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const sendMessage = async (message, context = {}) => {
  if (!GROQ_API_KEY) {
    throw new Error(
      "Groq API key not configured. Please add NEXT_PUBLIC_GROQ_API_KEY to your .env.local file or Vercel environment variables."
    );
  }

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

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: systemContext,
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Groq API request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
};

export const analyzeDiagram = async (nodes, edges) => {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not configured.");
  }

  try {
    const nodeDescriptions = nodes
      .map((node) => `- ${node.data.label} (${node.data.category})`)
      .join("\n");
    const connectionCount = edges.length;

    const prompt = `Analyze this system design diagram and provide expert insights:

Components:
${nodeDescriptions}

Total connections: ${connectionCount}

Please provide a comprehensive analysis including:
1. Overall architecture assessment and design patterns identified
2. Scalability considerations and bottlenecks
3. Security analysis and potential vulnerabilities
4. Data flow and processing efficiency
5. AI/ML pipeline optimization (if applicable)
6. Recommendations for improvement
7. Missing critical components

Be specific and actionable in your recommendations.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are an expert system architect specializing in AI/ML systems, distributed architectures, and cloud infrastructure.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      throw new Error("Analysis request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw error;
  }
};

export const generateDesignSuggestions = async (requirements) => {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key not configured.");
  }

  try {
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

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are a senior system architect with expertise in AI/ML systems, distributed computing, and cloud infrastructure. Provide detailed, production-ready architecture recommendations.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      throw new Error("Design generation request failed");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("AI Generation Error:", error);
    throw error;
  }
};

export const isAIConfigured = () => {
  return !!GROQ_API_KEY;
};
