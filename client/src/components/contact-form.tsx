import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle2, AlertCircle, MessageCircle, Linkedin, Github, MessageSquare } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const directMessageOptions = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sangamnirala", color: "from-blue-600 to-blue-700", testid: "dm-linkedin" },
  { icon: Github, label: "GitHub", href: "https://github.com/sangamnirala", color: "from-gray-700 to-gray-800", testid: "dm-github" },
  { icon: MessageSquare, label: "WhatsApp", href: "https://wa.me/919987937919", color: "from-green-500 to-green-600", testid: "dm-whatsapp" },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // In production, send to backend/email service
      console.log("Form submitted:", data);
      
      setSubmitSuccess(true);
      form.reset();
      toast({
        title: "Message sent!",
        description: "I'll get back to you within 24 hours.",
      });

      setTimeout(() => setSubmitSuccess(false), 4000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-xl p-8 backdrop-blur-sm cursor-pointer shadow-lg"
      data-testid="contact-form"
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Mail className="h-6 w-6 text-primary" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
            <p className="text-sm text-muted-foreground">I typically respond within 24 hours</p>
          </div>
        </div>
      </div>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="mb-6 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.5, 0.8, 1] }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 bg-green-500/20 rounded-full blur-lg"
              />
              <CheckCircle2 className="h-20 w-20 text-green-500 relative z-10" />
            </div>
          </motion.div>
          <motion.h4 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold text-foreground mb-2"
          >
            Message Sent!
          </motion.h4>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground mb-6"
          >
            I'll get back to you within 24 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-primary font-medium"
          >
            ✓ Thank you for reaching out!
          </motion.div>
        </motion.div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
                        {...field}
                        className="bg-background border-border focus:border-primary"
                        disabled={isSubmitting}
                        data-testid="input-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your@email.com"
                        type="email"
                        {...field}
                        className="bg-background border-border focus:border-primary"
                        disabled={isSubmitting}
                        data-testid="input-email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project inquiry, collaboration, etc."
                      {...field}
                      className="bg-background border-border focus:border-primary"
                      disabled={isSubmitting}
                      data-testid="input-subject"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell me about your project or idea..."
                      {...field}
                      className="bg-background border-border focus:border-primary min-h-32 resize-none"
                      disabled={isSubmitting}
                      data-testid="textarea-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold min-h-12 transition-all duration-300"
              data-testid="button-submit-form"
            >
              {isSubmitting ? (
                <motion.span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⏳
                  </motion.span>
                  Sending...
                </motion.span>
              ) : (
                "Send Message"
              )}
            </Button>
          </form>
        </Form>

        {/* Direct Message Options */}
        <div className="mt-8 pt-6 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center mb-4 font-medium">Or reach out directly:</p>
          <div className="grid grid-cols-3 gap-3">
            {directMessageOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`py-3 px-4 rounded-lg bg-gradient-to-br ${option.color} text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300`}
                data-testid={option.testid}
                aria-label={`Direct message via ${option.label}`}
              >
                <option.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{option.label}</span>
              </motion.a>
            ))}
          </div>
        </div>
        </>
      )}
    </motion.div>
  );
}
