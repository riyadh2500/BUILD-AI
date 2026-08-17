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

RESPONSE RULES:
- Keep answers SHORT (3-5 sentences max)
- Use bullet points
- Suggest specific components from the builder
- Be actionable and practical`;

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

    const prompt = `Analyze this design from AI System Design Builder:

Components: ${nodeDescriptions}
Connections: ${connectionCount}

Provide SHORT analysis (4-5 points):
1. Architecture type
2. 2 strengths
3. 2 improvements (suggest specific builder components)
4. Missing critical components

Use actual component names from the builder.`;

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
            content: "You are an AI assistant for the AI System Design Builder. You know all 66 available components. Give SHORT, specific recommendations using actual component names from the builder. Use bullet points."
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
    const prompt = `Using the AI System Design Builder, design: ${requirements}

Available: 66 components in Compute, Storage, Network, Messaging, Monitoring, Security, Client, Services, AI/ML, Data Processing categories.

Provide BRIEF design (5-6 points):
• 3-4 core components (by name)
• How they connect
• Key tech choices
• Scaling approach
• Security measure

Use specific builder component names.`;

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
            content: "You are an AI assistant for AI System Design Builder with 66 components. Suggest specific components by name (e.g., 'Add Redis for caching', 'Use Kafka for messaging'). Keep it SHORT."
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
