export interface AiModel {
  id: string;
  modelCode: string; // e.g., 'gemini-3.6-flash', 'gemini-3.1-pro-preview', 'deepseek-r1', 'gpt-4o'
  modelName: string;
  providerId: string;
  providerName: string;
  version: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  contextWindowTokens: number; // e.g., 1000000, 128000
  defaultTemperature: number;
  maxTokens: number;
  capabilities: {
    text: boolean;
    vision: boolean;
    ocr: boolean;
    audio: boolean;
    reasoning: boolean;
    embedding: boolean;
  };
  latencyMs: number;
  costPer1kInputTokenUsd: number;
  costPer1kOutputTokenUsd: number;
  usageCount24h: number;
}

export interface AiProvider {
  id: string;
  providerName: 'Google Gemini' | 'OpenAI' | 'Anthropic Claude' | 'Azure OpenAI' | 'Ollama (Local)' | 'DeepSeek' | 'Mistral' | 'Llama (Meta)' | 'OpenRouter' | 'Custom Enterprise API';
  type: 'CLOUD' | 'ON_PREMISE' | 'HYBRID';
  baseUrl: string;
  apiKeyMasked: string;
  status: 'ONLINE' | 'OFFLINE' | 'DEGRADED';
  priorityOrder: number;
  rateLimitPerMin: number;
  authHeaderType: 'BEARER' | 'X_API_KEY' | 'CUSTOM';
}

export interface PromptItem {
  id: string;
  promptCode: string;
  promptName: string;
  category: 'HARVEST' | 'FINANCE' | 'HR' | 'INVENTORY' | 'ASSET' | 'GIS' | 'AI' | 'GENERAL' | 'CUSTOM';
  description: string;
  systemInstruction: string;
  templateContent: string;
  variables: string[]; // e.g. ['{{afdeling}}', '{{period}}', '{{budget}}']
  version: string;
  status: 'PUBLISHED' | 'DRAFT' | 'DEPRECATED';
  author: string;
  updatedAt: string;
}

export interface KnowledgeDocument {
  id: string;
  docCode: string;
  title: string;
  category: 'SOP' | 'MANUAL' | 'REGULATION' | 'POLICY' | 'FAQ' | 'TEMPLATE' | 'TRAINING';
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'TXT' | 'CSV' | 'MD' | 'IMAGE_OCR' | 'PPTX';
  fileSizeMb: number;
  folderPath: string;
  tags: string[];
  version: string;
  approvalStatus: 'APPROVED' | 'PENDING' | 'REJECTED';
  indexedInVectorDb: boolean;
  totalChunks: number;
  uploadedBy: string;
  uploadedAt: string;
}

export interface VectorIndexConfig {
  id: string;
  provider: 'Pinecone' | 'Qdrant' | 'Milvus' | 'Weaviate' | 'Chroma' | 'pgvector';
  indexName: string;
  dimension: number; // e.g. 1536, 768
  metric: 'cosine' | 'euclidean' | 'dotproduct';
  status: 'ACTIVE' | 'BUILDING' | 'MAINTENANCE';
  totalVectors: number;
  chunkSize: number;
  chunkOverlap: number;
  embeddingModel: string;
  lastIndexedAt: string;
}

export interface AiWorkflowRule {
  id: string;
  ruleNo: string;
  ruleName: string;
  triggerEvent: string; // e.g. 'MINIMUM_FERTILIZER_STOCK', 'YIELD_DROP_ALERT', 'HIGH_REPAIR_COST'
  condition: string; // e.g. 'stock <= min_reorder_level'
  aiAction: string; // e.g. 'GENERATE_PO_RECOMMENDATION', 'TRIGGER_ROOT_CAUSE_ANALYSIS'
  actionType: 'NOTIFICATION' | 'EMAIL' | 'AUTO_APPROVAL' | 'WEBHOOK' | 'RECOMMENDATION';
  status: 'ACTIVE' | 'PAUSED';
  executionCount: number;
  lastExecutedAt: string;
}

export interface AiRecommendationItem {
  id: string;
  recNo: string;
  module: 'HARVEST' | 'FINANCE' | 'HR' | 'INVENTORY' | 'EAM' | 'PLANTATION' | 'CROSS_MODULE';
  title: string;
  summary: string;
  actionPlan: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScorePercent: number;
  potentialImpactIdr: number;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  status: 'OPEN' | 'IMPLEMENTED' | 'DISMISSED';
  createdAt: string;
}

export interface AiForecastItem {
  id: string;
  metricName: string;
  targetModule: 'HARVEST' | 'FINANCE' | 'INVENTORY' | 'HR' | 'EAM';
  historicalAvg: string;
  forecast30Days: string;
  trendDirection: 'UP' | 'DOWN' | 'STABLE';
  confidenceScorePercent: number;
  keyDrivers: string[];
}

export interface AiVisionOcrLog {
  id: string;
  logNo: string;
  type: 'VISION_FRUIT_COUNTING' | 'VISION_DISEASE_DETECTION' | 'VISION_PALM_COUNT' | 'OCR_WEIGHBRIDGE_TICKET' | 'OCR_INVOICE' | 'OCR_RECEIPT';
  sourceFile: string;
  detectedResult: string;
  confidenceScorePercent: number;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
  processedAt: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT' | 'SYSTEM';
  text: string;
  timestamp: string;
  citationDoc?: string;
  codeBlock?: string;
  roleContext?: string;
}

export interface AiChatSession {
  id: string;
  title: string;
  folder: string;
  pinned: boolean;
  roleContext: 'Palm Agronomist' | 'Estate CFO' | 'HR Manager' | 'EAM Fleet Engineer' | 'General Enterprise';
  modelUsed: string;
  updatedAt: string;
  messages: AiChatMessage[];
}

export interface AiUsageLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  department: string;
  module: string;
  model: string;
  provider: string;
  promptTokens: number;
  completionTokens: number;
  latencyMs: number;
  estimatedCostUsd: number;
  status: 'SUCCESS' | 'ERROR';
}
