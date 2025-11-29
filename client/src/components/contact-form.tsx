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
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

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
      className="bg-card border border-border rounded-lg p-8 backdrop-blur-sm"
      data-testid="contact-form"
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Send Me a Message</h3>
      </div>

      {submitSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex justify-center"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </motion.div>
          <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
          <p className="text-muted-foreground">I'll get back to you within 24 hours.</p>
        </motion.div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold min-h-12"
              data-testid="button-submit-form"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      )}
    </motion.div>
  );
}
