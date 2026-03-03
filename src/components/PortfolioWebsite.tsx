'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ArrowLeft, ArrowRight, Sparkles, Menu, X, ChevronDown, Mail, Phone, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

gsap.registerPlugin(ScrambleTextPlugin);

// Glow Component
const Glow = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: 'top' | 'above' | 'bottom' | 'below' | 'center' }>(
  ({ className, variant = 'top', ...props }, ref) => {
    const variantClasses = {
      top: 'top-0',
      above: '-top-[128px]',
      bottom: 'bottom-0',
      below: '-bottom-[128px]',
      center: 'top-[50%]',
    };

    return (
      <div ref={ref} className={cn('absolute w-full', variantClasses[variant], className)} {...props}>
        <div className={cn('absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand-foreground)/.5)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[512px]', variant === 'center' && '-translate-y-1/2')} />
        <div className={cn('absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsla(var(--brand)/.3)_10%,_hsla(var(--brand-foreground)/0)_60%)] sm:h-[256px]', variant === 'center' && '-translate-y-1/2')} />
      </div>
    );
  }
);
Glow.displayName = 'Glow';

// Mockup Component
const Mockup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { type?: 'mobile' | 'responsive' }>(
  ({ className, type = 'responsive', ...props }, ref) => {
    const typeClasses = type === 'mobile' ? 'rounded-[48px] max-w-[350px]' : 'rounded-md';
    return <div ref={ref} className={cn('flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15', typeClasses, className)} {...props} />;
  }
);
Mockup.displayName = 'Mockup';

// BlurText Component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({ text, delay = 50, animateBy = 'words', direction = 'top', className = '', style }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
      }
    }, { threshold: 0.1 });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = animateBy === 'words' ? text.split(' ') : text.split('');

  return (
    <p ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            filter: inView ? 'blur(0px)' : 'blur(10px)',
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : `translateY(${direction === 'top' ? '-20px' : '20px'})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === 'words' && i < segments.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </p>
  );
};

// Hero Section
const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && menuRef.current && buttonRef.current && !menuRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const menuItems = [
    { label: 'HOME', href: '#hero' },
    { label: 'ABOUT', href: '#features' },
    { label: 'PROJECTS', href: '#proof' },
    { label: 'TESTIMONIALS', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'CONTACT', href: '#contact' },
  ];

  return (
    <section id="hero" className="relative bg-background text-foreground py-12 px-4 md:py-24 lg:py-32 overflow-hidden min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-6 bg-background/80 backdrop-blur-sm">
        <nav className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              className="p-2 transition-colors duration-300 z-50 text-muted-foreground hover:text-foreground"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" strokeWidth={2} /> : <Menu className="w-8 h-8" strokeWidth={2} />}
            </button>

            {isMenuOpen && (
              <div ref={menuRef} className="absolute top-full left-0 w-[200px] md:w-[240px] shadow-2xl mt-2 ml-4 p-4 rounded-lg z-[100] bg-background border border-border">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-lg md:text-xl font-bold tracking-tight py-1.5 px-2 cursor-pointer transition-colors duration-300 text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="text-4xl text-foreground" style={{ fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive" }}>
            P
          </div>
        </nav>
      </header>

      <div className="relative z-10 max-w-[1280px] mx-auto flex flex-col gap-12 lg:gap-24 flex-1 justify-center mt-20">
        <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:gap-12">
          <div className="relative">
            <BlurText
              text="JOHN"
              delay={100}
              animateBy="letters"
              direction="top"
              className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'Fira Code', monospace" }}
            />
            <BlurText
              text="DOE"
              delay={100}
              animateBy="letters"
              direction="top"
              className="font-bold text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap"
              style={{ color: 'hsl(var(--primary))', fontFamily: "'Fira Code', monospace" }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="w-[65px] h-[110px] sm:w-[90px] sm:h-[152px] md:w-[110px] md:h-[185px] lg:w-[129px] lg:h-[218px] rounded-full overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-110 cursor-pointer">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <p className="max-w-[550px] animate-appear opacity-0 [animation-delay:150ms] text-base sm:text-lg md:text-xl text-muted-foreground font-medium">
            Full-Stack Developer & Designer crafting exceptional digital experiences
          </p>

          <div className="relative z-10 flex flex-wrap justify-center gap-4 animate-appear opacity-0 [animation-delay:300ms]">
            <Button asChild size="lg" className="bg-gradient-to-b from-primary to-primary/90 hover:from-primary/95 hover:to-primary/85 text-primary-foreground shadow-lg">
              <a href="#contact">Get In Touch</a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#proof">View Work</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Glow variant="above" className="animate-appear-zoom opacity-0 [animation-delay:1000ms]" />
      </div>

      <button type="button" className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 transition-colors duration-300" aria-label="Scroll down">
        <ChevronDown className="w-5 h-5 md:w-8 md:h-8 text-muted-foreground hover:text-foreground transition-colors duration-300" />
      </button>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const features = [
    { icon: '🎨', title: 'UI/UX Design', description: 'Creating beautiful, intuitive interfaces that users love' },
    { icon: '💻', title: 'Web Development', description: 'Building fast, responsive, and scalable web applications' },
    { icon: '📱', title: 'Mobile Apps', description: 'Developing cross-platform mobile experiences' },
    { icon: '🚀', title: 'Performance', description: 'Optimizing for speed and efficiency' },
  ];

  return (
    <section id="features" className="relative py-32 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">What I Do</h2>
          <p className="text-xl text-muted-foreground">Specialized skills and expertise</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Proof Section
const ProofSection = () => {
  const projects = [
    { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80', alt: 'Project 1' },
    { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80', alt: 'Project 2' },
    { src: 'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80', alt: 'Project 3' },
    { src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80', alt: 'Project 4' },
  ];

  return (
    <section id="proof" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Featured Work</h2>
          <p className="text-xl text-muted-foreground">Recent projects and achievements</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group cursor-pointer">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow">
                <img src={project.src} alt={project.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const testimonials = [
    { name: 'Sarah Chen', role: 'CEO, TechFlow', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Outstanding work! Delivered beyond expectations with exceptional attention to detail.', results: ['300% efficiency', '$2M savings', '24/7 automation'] },
    { name: 'Marcus Johnson', role: 'CTO, DataDrive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Revolutionary solutions that transformed our entire operation. Highly recommended!', results: ['40% satisfaction', 'Instant responses', 'Seamless integration'] },
    { name: 'Elena Rodriguez', role: 'VP Operations', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face', rating: 5, text: 'Professional, creative, and results-driven. A pleasure to work with!', results: ['Full automation', 'Strategic focus', 'Team productivity'] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }),
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0, scale: 0.8 }),
  };

  return (
    <section id="testimonials" className="relative py-32 bg-gradient-to-br from-background via-muted/20 to-background overflow-hidden">
      <div className="absolute inset-0">
        <motion.div className="absolute top-1/3 left-1/5 w-72 h-72 bg-primary/10 rounded-full blur-3xl" animate={{ x: [0, 150, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-xl text-muted-foreground">What people say about working with me</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="relative h-[500px] md:h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div key={currentIndex} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } }} className="absolute inset-0">
                <div className="relative h-full bg-card backdrop-blur-xl rounded-3xl border border-border p-8 md:p-12 overflow-hidden">
                  <Quote className="absolute top-8 right-8 w-16 h-16 text-muted-foreground/20" />
                  <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0 text-center md:text-left">
                      <div className="w-24 h-24 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-border mb-4">
                        <img src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{testimonials[currentIndex].name}</h3>
                      <p className="text-primary mb-4">{testimonials[currentIndex].role}</p>
                      <div className="flex justify-center md:justify-start gap-1">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-xl md:text-2xl leading-relaxed mb-8 italic">"{testimonials[currentIndex].text}"</blockquote>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {testimonials[currentIndex].results.map((result, i) => (
                          <div key={i} className="bg-muted/50 rounded-lg p-3 border border-border">
                            <span className="text-sm font-medium">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-6 mt-8">
            <Button variant="outline" size="icon" onClick={() => { setDirection(-1); setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length); }}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-primary scale-125' : 'bg-muted-foreground/30'}`} />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={() => { setDirection(1); setCurrentIndex((prev) => (prev + 1) % testimonials.length); }}>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    { question: 'What services do you offer?', answer: 'I offer full-stack web development, UI/UX design, mobile app development, and consulting services.' },
    { question: 'What is your typical project timeline?', answer: 'Project timelines vary based on scope and complexity, typically ranging from 2-12 weeks.' },
    { question: 'Do you work with international clients?', answer: 'Yes, I work with clients worldwide and am comfortable with remote collaboration.' },
    { question: 'What technologies do you specialize in?', answer: 'I specialize in React, TypeScript, Node.js, Next.js, and modern web technologies.' },
  ];

  return (
    <section id="faq" className="relative py-32 px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">FAQ</h2>
          <p className="text-xl text-muted-foreground">Frequently asked questions</p>
        </motion.div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">Let's work together on your next project</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea placeholder="Tell me about your project..." />
                  </div>
                  <Button className="w-full" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-muted-foreground">john@example.com</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <Phone className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-muted-foreground">San Francisco, CA</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const FooterSection = () => {
  return (
    <footer className="relative py-12 px-6 bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">John Doe</h3>
            <p className="text-muted-foreground">Full-Stack Developer & Designer</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-muted-foreground hover:text-foreground transition-colors">Home</a></li>
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">About</a></li>
              <li><a href="#proof" className="text-muted-foreground hover:text-foreground transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Github className="w-6 h-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><Twitter className="w-6 h-6" /></a>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-border">
          <p className="text-muted-foreground">&copy; 2024 John Doe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main Portfolio Component
export const PortfolioWebsite = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&display=swap');
        
        @keyframes appear {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes appear-zoom {
          0% { opacity: 0; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        .animate-appear {
          animation: appear 0.5s ease-out forwards;
        }
        
        .animate-appear-zoom {
          animation: appear-zoom 0.8s ease-out forwards;
        }
      `}</style>
      
      <HeroSection />
      <FeaturesSection />
      <ProofSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
};

export default PortfolioWebsite;
