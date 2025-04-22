import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { motion, AnimatePresence } from "framer-motion";

// Add components to window context to be globally available
// This provides global animation settings from framer-motion
window.FramerMotion = {
  motion,
  AnimatePresence,
};

createRoot(document.getElementById("root")!).render(<App />);
