# Quick Reference Guide

## Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## File Locations

| Task | File | Lines |
|------|------|-------|
| Change your name | `src/components/PortfolioWebsite.tsx` | ~195-210 |
| Update features | `src/components/PortfolioWebsite.tsx` | ~315-322 |
| Update projects | `src/components/PortfolioWebsite.tsx` | ~370-376 |
| Update testimonials | `src/components/PortfolioWebsite.tsx` | ~445-460 |
| Update FAQ | `src/components/PortfolioWebsite.tsx` | ~670-675 |
| Update contact info | `src/components/PortfolioWebsite.tsx` | ~765-785 |
| Change colors | `src/app/globals.css` | :root section |
| Dark mode colors | `src/app/globals.css` | .dark section |

## Common Changes

### Change Primary Color (Blue)

In `src/app/globals.css`, find `:root` section:

**Current (Light mode):**
```css
--primary: oklch(0.205 0 0);        /* Dark blue */
--primary-foreground: oklch(0.985 0 0); /* White */
```

**Change to Red:**
```css
--primary: oklch(0.577 0.245 27.325);   /* Red */
--primary-foreground: oklch(0.985 0 0); /* White */
```

**Change to Green:**
```css
--primary: oklch(0.5 0.2 120);          /* Green */
--primary-foreground: oklch(0.985 0 0); /* White */
```

### Add New Feature

In `src/components/PortfolioWebsite.tsx`, find `features` array:

```tsx
const features = [
  { icon: '🎨', title: 'UI/UX Design', description: 'Creating beautiful, intuitive interfaces' },
  { icon: '💻', title: 'Web Development', description: 'Building fast, responsive applications' },
  { icon: '📱', title: 'Mobile Apps', description: 'Developing cross-platform experiences' },
  { icon: '🚀', title: 'Performance', description: 'Optimizing for speed and efficiency' },
  // Add your new feature here:
  { icon: '🔒', title: 'Security', description: 'Building secure applications' },
];
```

### Add New Project

Find `projects` array in same file:

```tsx
const projects = [
  { src: 'https://images.unsplash.com/...', alt: 'Project 1' },
  { src: 'https://images.unsplash.com/...', alt: 'Project 2' },
  // Add new project:
  { src: 'YOUR_IMAGE_URL', alt: 'Your Project Name' },
];
```

### Add New FAQ Item

Find `faqs` array:

```tsx
const faqs = [
  { question: 'What services do you offer?', answer: '...' },
  { question: 'What is your typical project timeline?', answer: '...' },
  // Add new FAQ:
  { question: 'Your question?', answer: 'Your answer' },
];
```

## Tailwind CSS Classes Used

### Typography
- `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl` - Font sizes
- `font-bold`, `font-semibold`, `font-medium` - Font weights
- `text-foreground`, `text-muted-foreground` - Colors

### Layout
- `flex`, `grid`, `absolute`, `relative` - Display types
- `gap-4`, `gap-8`, `gap-12` - Spacing
- `mx-auto`, `px-6`, `py-12` - Margins/Padding
- `max-w-7xl`, `max-w-4xl` - Max widths

### Colors
- `bg-background`, `bg-card`, `bg-muted` - Background colors
- `text-foreground`, `text-muted-foreground` - Text colors  
- `border-border`, `border-input` - Border colors

### Responsive
- `sm:`, `md:`, `lg:` - Breakpoints
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` - Responsive grids

### Animations
- `hover:` - Hover states
- `transition-all` - Smooth transitions
- `animate-appear`, `animate-appear-zoom` - Custom animations

## Imports Reference

```tsx
// Icons
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

// Utilities
import { cn } from '@/lib/utils';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
```

## Breakpoints

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

## CSS Variables Available

### Colors
- `--background`
- `--foreground`
- `--card`
- `--primary`
- `--secondary`
- `--muted`
- `--accent`
- `--destructive`
- `--border`
- `--input`
- `--ring`

### Sizing
- `--radius` - Border radius
- `--radius-sm` to `--radius-xl` - Border radius variants

## Getting Help

1. Check component files for code examples
2. Review [Tailwind CSS docs](https://tailwindcss.com)
3. Check [Next.js docs](https://nextjs.org/docs)
4. Review [Framer Motion docs](https://www.framer.com/motion/)

## Deploy Checklist

- [ ] Updated your name
- [ ] Changed profile image
- [ ] Updated features
- [ ] Updated projects
- [ ] Updated testimonials
- [ ] Updated FAQ
- [ ] Updated contact info
- [ ] Customized colors
- [ ] Tested on mobile
- [ ] Ran `npm run build` successfully
- [ ] Deployed to hosting

---

**Next Step:** Run `npm run dev` and start customizing!
