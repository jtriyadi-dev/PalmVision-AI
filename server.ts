import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize GoogleGenAI server-side client lazily or when key is available
function getGenAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ============================================================================
// API ROUTES (/api/v1)
// ============================================================================

// 1. Health check endpoint
app.get("/api/v1/health", (_req, res) => {
  res.json({
    status: "online",
    system: "PalmVision AI Foundation Engine",
    version: "1.0.0-enterprise",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    licenseStatus: "ACTIVE_ENTERPRISE",
  });
});

// 2. AI Assistant Endpoint
app.post("/api/v1/ai/chat", async (req, res) => {
  try {
    const { message, context } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback structured AI advisory if API key is not yet set in environment
      return res.json({
        reply: `[PalmVision AI Engine - Offline Context Advisory]\n\nBerdasarkan parameter operasional perkebunan (${context?.estateName || "Estate Utama"} - ${context?.block || "Semua Blok"}):\n\n1. **Rekomendasi Manajerial**: Optimalkan rotasi panen 7-10 hari untuk menjaga kadar ALB (Asam Lemak Bebas) tetap < 3.5%.\n2. **Pemupukan NPK**: Pastikan aplikasi dilakukan sesuai rekomendasi curah hujan (100-150 mm/bulan).\n3. **Sanitasi Pelepah**: Lakukan tunas pelepah teratur untuk mempermudah piringan bersih dan visualisasi TBS matang.\n\n*(Sistem AI menggunakan model Gemini 3.6 Flash saat GEMINI_API_KEY dikonfigurasi dalam secrets environment)*`,
        source: "palmvision-knowledge-base",
      });
    }

    const systemPrompt = `Anda adalah PalmVision AI Assistant, Pakar Agronomi dan Manajemen Perkebunan Kelapa Sawit Indonesia Enterprise.
Anda membantu Estate Manager, Mandor, Assistant Manager, Direksi, dan Operasional Lapangan.
Konteks Perusahaan Saat Ini:
- Perusahaan: ${context?.companyName || "PT Sawit Nusantara Jaya"}
- Estate: ${context?.estateName || "Estate Teluk Dalam"}
- Blok Active: ${context?.block || "Blok B12 (Areal TM-2018)"}
- Role User: ${context?.userRole || "Estate Manager"}

Berikan jawaban profesional, lugas, sistematis, menggunakan terminologi sawit Indonesia (TBS, BJR, ALB, Mandor, Afdeling, Piringan, TPH, Rotasi Panen, Pupuk NPK, Ganoderma, Ulat Api, Kerapatan Buah) dengan format Markdown yang rapi dan terstruktur.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: message,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text,
      model: "gemini-3.6-flash",
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    res.status(500).json({
      error: "AI Processing Error",
      details: error.message || "Failed to process query",
    });
  }
});

// 3. Organization Hierarchy Endpoint
app.get("/api/v1/organization/hierarchy", (_req, res) => {
  res.json({
    companies: [
      {
        id: "comp-01",
        code: "SNJ",
        name: "PT Sawit Nusantara Jaya",
        estates: [
          {
            id: "est-01",
            code: "ETD",
            name: "Estate Teluk Dalam",
            divisions: [
              {
                id: "div-01",
                name: "Divisi I (Areal Barat)",
                afdelings: [
                  {
                    id: "afd-01",
                    code: "AFD-A",
                    name: "Afdeling Alpha",
                    blocks: [
                      { id: "blk-b12", code: "B12", hectarage: 28.5, plantYear: 2018, SPH: 136, status: "TM" },
                      { id: "blk-b13", code: "B13", hectarage: 32.0, plantYear: 2018, SPH: 136, status: "TM" },
                      { id: "blk-c01", code: "C01", hectarage: 24.1, plantYear: 2022, SPH: 143, status: "TBM" },
                    ]
                  },
                  {
                    id: "afd-02",
                    code: "AFD-B",
                    name: "Afdeling Beta",
                    blocks: [
                      { id: "blk-b14", code: "B14", hectarage: 30.0, plantYear: 2017, SPH: 136, status: "TM" },
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "est-02",
            code: "EKS",
            name: "Estate Kayu Sebatang",
            divisions: []
          }
        ]
      }
    ]
  });
});

// 4. License Activation & Verification API
app.post("/api/v1/license/verify", (req, res) => {
  const { licenseKey, hwid } = req.body;
  
  if (!licenseKey) {
    return res.status(400).json({ valid: false, message: "License key required" });
  }

  // Simulated Enterprise Validation
  const isValid = licenseKey.startsWith("PVAI-ENT-") || licenseKey.startsWith("PVAI-SAAS-") || licenseKey.length >= 8;
  
  res.json({
    valid: isValid,
    licenseKey,
    type: licenseKey.includes("ENT") ? "SAAS_ENTERPRISE" : "ON_PREMISE_WHITE_LABEL",
    customer: "PT Sawit Nusantara Jaya",
    maxEstates: 25,
    maxUsers: 500,
    features: [
      "AI_HARVEST_FORECAST",
      "GIS_HEATMAP_ANALYTICS",
      "OFFLINE_SYNC_ENGINE",
      "FULL_AUDIT_TRAIL",
      "EXECUTIVE_AI_SUMMARY"
    ],
    expiresAt: "2027-12-31T23:59:59Z",
    hwidBinding: hwid || "HWID-SNJ-PROD-001928",
    status: isValid ? "ACTIVE" : "INVALID_KEY",
  });
});

// 5. Auth Login Endpoint
app.post("/api/v1/auth/login", (req, res) => {
  const { username, password, role, twoFactorCode } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username dan password wajib diisi." });
  }

  // Simulated login success response
  res.json({
    success: true,
    token: "jwt_token_pvai_enterprise_session_9921",
    user: {
      id: "usr-01",
      name: username === "admin.snj" ? "Suhardi, S.P." : username,
      username,
      email: `${username}@snj.co.id`,
      role: role || "ESTATE_MANAGER",
      estateName: "Estate Teluk Dalam",
      twoFactorEnabled: true,
    },
    message: "Autentikasi Berhasil",
  });
});

// 6. Active Sessions API
app.get("/api/v1/auth/sessions", (_req, res) => {
  res.json({
    sessions: [
      {
        id: "sess-01",
        userId: "usr-01",
        userName: "Suhardi, S.P. (Estate Manager)",
        role: "ESTATE_MANAGER",
        device: "MacBook Pro 16\" M3",
        ipAddress: "10.20.14.88",
        browser: "Chrome 126.0 (Macintosh)",
        os: "macOS Sonoma",
        location: "Pekanbaru, Riau (Kantor Estate)",
        loginTime: "2026-08-03 07:30:12",
        lastActiveTime: "2026-08-03 08:14:22",
        isCurrent: true,
      },
    ]
  });
});

// ============================================================================
// VITE MIDDLEWARE & STATIC SERVER
// ============================================================================

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PalmVision AI Engine] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
