# Portfolio Website - Integration Guide

## Project Complete

Your React portfolio component bundle has been successfully integrated into a Next.js project with TypeScript and Tailwind CSS v4.

## What's Been Set Up

### Project Type
- **Next.js 16** with App Router
- **TypeScript** for full type safety
- **Tailwind CSS v4** with custom theme configuration

### Installed Dependencies
- ✅ framer-motion
- ✅ lucide-react
- ✅ gsap
- ✅ clsx & tailwind-merge
- ✅ @radix-ui/react-slot
- ✅ @radix-ui/react-accordion
- ✅ class-variance-authority

### Project Structure

```
d:\HTML CSS\React\portfolio\
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind v4 config with theme
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Homepage
│   │   └── favicon.ico
│   ├── components/
│   │   ├── PortfolioWebsite.tsx # Main portfolio component
│   │   └── ui/
│   │       ├── button.tsx       # Button component
│   │       ├── input.tsx        # Input component
│   │       ├── textarea.tsx     # Textarea component
│   │       ├── card.tsx         # Card components
│   │       └── accordion.tsx    # Accordion component
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Running the Project

### Start Development Server
```bash
cd "d:\HTML CSS\React\portfolio"
npm run dev
```

Visit: http://localhost:3000

### Build for Production
```bash
npm run build
npm start
```

## Portfolio Sections

The website includes 7 complete sections:

### 1. Hero Section
- Large animated name (JOHN DOE)
- Profile image with hover effect
- Navigation menu
- Call-to-action buttons
- Responsive design

### 2. Features Section
- 4 skill cards with icons
- Hover animations
- Grid layout

### 3. Projects Section
- 4 project showcase items
- Image hover zoom effect
- Responsive gallery

### 4. Testimonials Section
- Carousel with auto-rotation
- Manual navigation controls
- Star ratings
- Results display
- Responsive layout

### 5. FAQ Section
- Radix UI Accordion
- 4 Q&A items
- Smooth animations

### 6. Contact Section
- Contact form (Name, Email, Message)
- Contact info cards (Email, Phone, Location)
- Responsive grid layout

### 7. Footer Section
- Quick links
- Social media links
- Copyright info

## Customization Guide

### 1. Change Your Name
File: `src/components/PortfolioWebsite.tsx` (Line ~200)

Find:
```tsx
<BlurText text="JOHN" />
<BlurText text="DOE" />
```

Replace with your name.

### 2. Change Profile Image
Same file, around line 230:
```tsx
<img src="https://images.unsplash.com/..." />
```

Replace URL with your image.

### 3. Update Skills/Features
Find the `features` array (around line 400):
```tsx
const features = [
  { icon: '🎨', title: 'UI/UX Design', description: '...' },
  // ... more items
];
```

Update with your skills.

### 4. Update Projects
Find the `projects` array (around line 450):
```tsx
const projects = [
  { src: 'https://...', alt: 'Project 1' },
  // ... more projects
];
```

Replace with your project images.

### 5. Update Testimonials
Find the `testimonials` array (around line 520):
```tsx
const testimonials = [
  { name: 'Sarah Chen', role: '...', avatar: '...', ...},
  // ... more testimonials
];
```

Replace with real client testimonials.

### 6. Update FAQ
Find the `faqs` array (around line 750):
```tsx
const faqs = [
  { question: '...', answer: '...'},
  // ... more FAQs
];
```

Update with your FAQ items.

### 7. Update Contact Info
Find contact section details (around line 820):
```tsx
<p className="text-muted-foreground">john@example.com</p>
<p className="text-muted-foreground">+1 (555) 123-4567</p>
<p className="text-muted-foreground">San Francisco, CA</p>
```

Replace with your contact information.

### 8. Change Colors
File: `src/app/globals.css`

Edit the CSS variables:
```css
:root {
  --primary: oklch(0.205 0 0);  /* Change primary color */
  --secondary: oklch(0.97 0 0);
  --accent: oklch(0.97 0 0);
  /* ... more variables ... */
}
```

OKLch format: `oklch(lightness chroma hue)`

### 9. Change Theme Colors (Dark Mode)
Same file, in `.dark` section:
```css
.dark {
  --primary: oklch(0.922 0 0);
  /* ... more variables ... */
}
```

## Using UI Components

### Button
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">Click</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="outline">Outline</Button>
```

Variants: default, destructive, outline, secondary, ghost, link
Sizes: default, sm, lg, icon

### Input
```tsx
import { Input } from '@/components/ui/input';

<Input placeholder="Enter text" />
<Input type="email" placeholder="your@email.com" />
```

### Textarea
```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Message..." rows={4} />
```

### Card
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Accordion
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question?</AccordionTrigger>
    <AccordionContent>Answer</AccordionContent>
  </AccordionItem>
</Accordion>
```

## Build and Deployment

### Local Build
```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Connect your GitHub account and redeploy on push

### Deploy to Netlify
1. Build: `npm run build`
2. Upload `.next` folder to Netlify
3. Set build command: `npm run build`
4. Set output folder: `.next`

### Deploy to Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Build Fails
```bash
# Clear build cache
rm -rf .next

# Reinstall deps
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Styling Issues
1. Ensure all Tailwind classes are spelled correctly
2. Check that globals.css is imported in layout.tsx
3. Verify CSS variables exist in :root and .dark sections

### Animation Not Working
1. Check browser console for JavaScript errors
2. Ensure Framer Motion is installed
3. Verify @keyframes are defined in globals.css

### Form Not Submitting
The contact form is currently a UI template. To make it work, add a backend:
- Use Next.js API routes
- Connect to email service (SendGrid, etc.)
- Or use form service (Formspree, etc.)

## Next Steps

1. ✅ Project structure created
2. ✅ All dependencies installed
3. ✅ Components integrated
4. ✅ Styling configured
5. ⭕ **Customize content** - Update your info
6. ⭕ **Test locally** - Run `npm run dev`
7. ⭕ **Set up form** - Connect to backend
8. ⭕ **Deploy** - Push to Vercel/Netlify

## Files Modified/Created

### Created:
- `src/components/PortfolioWebsite.tsx` - Main portfolio component
- `src/components/ui/button.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/accordion.tsx`
- `src/lib/utils.ts`
- `INTEGRATION_GUIDE.md` (this file)

### Modified:
- `src/app/globals.css` - Tailwind v4 theme
- `src/app/page.tsx` - Main page to use PortfolioWebsite
- `package.json` - Added dependencies
- `.gitignore` - Git configuration

## Support Resources

- **Next.js**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/
- **Radix UI**: https://www.radix-ui.com/docs
- **GSAP**: https://gsap.com/docs

## Have Questions?

Review the component code in:
- `src/components/PortfolioWebsite.tsx` - Main component
- `src/app/globals.css` - Styling and theme
- Component files in `src/components/ui/` - Reusable components

Happy building! 🚀
