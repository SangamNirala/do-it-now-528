import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Check } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      // Simulate subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="font-semibold text-foreground mb-4 text-sm">
        Stay Updated
      </h3>
      
      <p className="text-xs text-muted-foreground mb-4">
        Get notified about new projects, insights, and opportunities.
      </p>

      <form onSubmit={handleSubscribe} className="space-y-3">
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="pr-10 text-sm h-9"
              data-testid="input-newsletter-email"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground pointer-events-none" />
          </div>

          <Button
            type="submit"
            disabled={isLoading || !email}
            size="sm"
            className="w-full"
            data-testid="button-newsletter-subscribe"
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : isSubscribed ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Sent
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </div>
      </form>

      {isSubscribed && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-green-600 dark:text-green-400 mt-2"
        >
          ✓ Thanks for subscribing!
        </motion.p>
      )}
    </motion.div>
  );
}
