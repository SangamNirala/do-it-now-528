import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Send, Loader2, Sparkles, MessageCircle } from "lucide-react";

interface AIChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  websiteContent: string;
}

// Format markdown response into proper text
function formatMessage(content: string) {
  // Remove asterisks used for bold in markdown
  let text = content.replace(/\*\*/g, "").replace(/\*/g, "");
  
  // Split by lines and process
  const lines = text.split("\n").filter((line) => line.trim());
  
  return lines.map((line, idx) => {
    const trimmedLine = line.trim();
    
    // Check if it's a list item (starts with - or •)
    if (trimmedLine.startsWith("-") || trimmedLine.startsWith("•")) {
      const itemText = trimmedLine.replace(/^[-•]\s*/, "");
      return (
        <div key={idx} className="flex gap-2 mb-2">
          <span className="text-primary font-semibold mt-1">•</span>
          <span>{itemText}</span>
        </div>
      );
    }
    
    // Regular paragraph
    return trimmedLine ? (
      <p key={idx} className="mb-2">
        {trimmedLine}
      </p>
    ) : null;
  });
}

export function AIChatDialog({ isOpen, onClose, websiteContent }: AIChatDialogProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          context: websiteContent,
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed top-20 left-0 right-0 mx-4 md:mx-auto md:max-w-2xl z-40 bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden"
          data-testid="ai-chat-dialog"
          style={{ pointerEvents: "auto" }}
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative flex items-center justify-between p-5 border-b border-border/30 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Ask about Sangam</h3>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-primary/10 rounded-lg transition-all duration-200 hover-elevate"
              aria-label="Close AI chat"
              data-testid="button-close-ai-chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative p-4 space-y-3 max-h-80 overflow-y-auto bg-background/30 backdrop-blur-sm">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 px-4"
              >
                <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ask me anything about Sangam's experience, projects, or skills. I'm here to help!
                </p>
              </motion.div>
            )}

            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                data-testid={`chat-message-${idx}`}
              >
                {msg.role === "assistant" && (
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-md px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-br-none shadow-lg"
                      : "bg-muted/60 text-muted-foreground rounded-bl-none backdrop-blur-sm border border-border/30"
                  }`}
                >
                  {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start items-end gap-2"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-muted/60 text-muted-foreground px-4 py-2.5 rounded-2xl rounded-bl-none flex items-center gap-2 backdrop-blur-sm border border-border/30">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="relative p-4 border-t border-border/30 flex gap-2 bg-background/30 backdrop-blur-sm">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !loading && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-background/60 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent text-sm transition-all duration-200 backdrop-blur-sm"
              disabled={loading}
              data-testid="input-ai-question"
            />
            <Button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              size="sm"
              className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:shadow-lg transition-all duration-200"
              data-testid="button-send-ai-question"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
