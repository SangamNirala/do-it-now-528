import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import fs from "fs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/resume", (req, res) => {
    const resumePath = path.join(process.cwd(), "attached_assets", "Sangam Nirala2_1764390677895.pdf");
    
    if (fs.existsSync(resumePath)) {
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", 'attachment; filename="Sangam_Nirala_Resume.pdf"');
      fs.createReadStream(resumePath).pipe(res);
    } else {
      res.status(404).json({ error: "Resume not found" });
    }
  });

  return httpServer;
}
