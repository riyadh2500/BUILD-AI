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
    const systemContext = `You are an expert system design architect assistant. Give SHORT, CONCISE answers (2-4 sentences max).

Current design context:
- Components: ${context.nodeCount || 0} (${context.components || "None yet"})
- Connections: ${context.connectionCount || 0}

RULES:
- Keep responses brief and to the point
- Use bullet points for lists
- No lengthy explanations
- Focus on actionable advice only

Available categories: Compute, Storage, Network, Messaging, Monitoring, Security, Services, AI/ML, Data Pipeline.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
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
        max_tokens: 500,
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

    const prompt = `Analyze this system design briefly (3-5 key points only):

Components:
${nodeDescriptions}

Total connections: ${connectionCount}

Provide:
1. Architecture pattern (1 sentence)
2. Top 2-3 strengths
3. Top 2-3 improvements needed
4. Critical missing components (if any)

Keep it SHORT and actionable.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: "You are a system architect. Give SHORT, concise design recommendations. Use bullet points. Maximum 5-6 sentences total."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
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
    const prompt = `Design a system for: ${requirements}

Provide a BRIEF design (5-7 bullet points):
1. Core components (3-4 key ones)
2. How they connect
3. Tech stack (brief)
4. Key scaling point
5. Top security measure

Keep it SHORT and practical. Use component names from: Compute, Storage, Network, Messaging, Monitoring, Security, AI/ML, Data Pipeline.`;

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          {
            role: "system",
            content: "You are a senior system architect. Provide SHORT, production-ready recommendations. Use bullet points. Maximum 6-7 sentences."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 1000,
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
