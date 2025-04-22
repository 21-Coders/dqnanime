import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for submitting newsletter emails
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Valid email is required' });
      }
      
      // Here you would typically store the email in a database
      // For this demo, we'll just return a success message
      
      return res.status(200).json({ 
        message: 'Subscription successful', 
        email 
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  // API route for getting character data
  app.get('/api/characters', (_req, res) => {
    try {
      // Character data is client-side for this application
      // If needed, this endpoint could be used to fetch dynamic character data
      return res.status(200).json({ 
        message: 'Character data fetched from client-side' 
      });
    } catch (error) {
      console.error('Error fetching characters:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
