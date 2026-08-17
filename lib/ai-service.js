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
    const systemContext = `You are an expert system design architect for the AI System Design Builder app.

APP INFO:
- 66 components available across 9 categories
- Drag-and-drop visual design canvas
- Export as PNG/JSON
- Save/load projects
- Real-time AI assistance

CATEGORIES & KEY COMPONENTS:
1. Compute: Server, Microservice, Container, Kubernetes, Lambda
2. Storage: Database, MongoDB, PostgreSQL, Redis, Cache, Data Warehouse
3. Network: Load Balancer, CDN, API Gateway, Nginx, DNS
4. Messaging: Kafka, RabbitMQ, Message Queue, Event Bus
5. Monitoring: Prometheus, Grafana, Logging, Analytics
6. Security: Firewall, Authentication, WAF, Encryption
7. Client: Web App, Mobile App, User, Admin Panel
8. Services: Cloud Service, AWS, Search Engine, Elasticsearch, Email, Notification, Payment
9. AI/ML: ML Model, TensorFlow, PyTorch, Model Serving, Feature Store, Training Pipeline, Inference Engine, MLflow, Jupyter, LLM, Vector DB, Embeddings
10. Data Processing: ETL Pipeline, Apache Spark, Airflow, Data Lake, Stream Processing, Batch Processing, Data Ingestion, Data Transform, Data Validation, Orchestrator, Real-time Analytics, Data Catalog

CURRENT USER DESIGN:
- Components: ${context.nodeCount || 0} (${context.components || "None"})
- Connections: ${context.connectionCount || 0}

STRICT RESPONSE RULES:
- Maximum 3-4 sentences ONLY
- NO markdown formatting (no **, no #, no bullets)
- Plain text only
- Direct and simple language
- No long explanations`;

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
        temperature: 0.5,
        max_tokens: 300,
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

    const prompt = `Analyze this design from AI System Design Builder:

Components: ${nodeDescriptions}
Connections: ${connectionCount}

Give a SHORT analysis in plain text (no markdown). 3-4 sentences only. Cover: architecture type, one strength, one improvement needed.`;

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
            content: "You are an AI assistant for the AI System Design Builder. Give SHORT answers (2-3 sentences max). NO markdown formatting. Plain text only. No ** or bullets."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 400,
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
    const prompt = `Using the AI System Design Builder, design: ${requirements}

Give a BRIEF design in plain text (no markdown, no **). 4-5 sentences covering: core components (by name), how they connect, and one key scaling point.`;

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
            content: "You are an AI assistant for AI System Design Builder. Give SHORT answers (3-4 sentences). NO markdown. Plain text only. Suggest specific component names."
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 500,
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
