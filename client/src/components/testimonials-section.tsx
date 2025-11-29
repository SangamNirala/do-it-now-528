import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Singh",
    role: "Senior ML Engineer at TechCorp",
    content: "Sangam's expertise in MLOps and production ML systems is exceptional. His ability to build scalable, end-to-end pipelines transformed our model deployment process.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    role: "Tech Lead at DataSystems",
    content: "Working with Sangam on the Face Detection System was incredible. His attention to detail and optimization skills resulted in a 96.5% accuracy model.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
    rating: 5,
  },
  {
    name: "Ananya Verma",
    role: "Product Manager at AIStartup",
    content: "Sangam built our PDF Chatbot with RAG architecture. The implementation was clean, efficient, and he delivered excellent documentation for the team.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
    rating: 5,
  },
  {
    name: "Vikram Kumar",
    role: "Founder & CEO at ML Solutions",
    content: "One of the best ML engineers I've worked with. Sangam combines deep technical knowledge with great communication skills. Highly recommended!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">What Others Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonials from colleagues and leaders I've worked with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              data-testid={`card-testimonial-${index}`}
            >
              <Card className="h-full p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full border-2 border-primary/20"
                    loading="lazy"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
