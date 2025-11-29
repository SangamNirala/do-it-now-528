# ML Engineer Portfolio - Sangam Nirala

## Overview

This is a personal portfolio website for Sangam Nirala, a Machine Learning Engineer. The application is a single-page portfolio showcasing professional experience, projects, and skills in ML/AI, with a focus on MLOps and production ML systems. The site features a modern, clean aesthetic inspired by tech companies like Linear, Vercel, and GitHub, with an immersive hero section, animated components, and downloadable resume functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript and Vite as the build tool. The application uses a modern client-side rendering approach with a single-page architecture.

**Routing**: Wouter library for lightweight client-side routing. The application currently has two routes:
- `/` - Home page (main portfolio)
- Catch-all route for 404 handling

**UI Component Library**: Shadcn/ui (New York style variant) built on Radix UI primitives. This provides accessible, customizable components with a consistent design system using CSS variables for theming.

**Styling**: 
- Tailwind CSS for utility-first styling
- Custom design system defined in `index.css` with CSS variables for colors, spacing, and effects
- Typography system using Inter (primary) and JetBrains Mono (for code/technical badges) from Google Fonts
- Responsive design with mobile-first approach
- Custom animations using Framer Motion for scroll-triggered animations and transitions

**State Management**: TanStack Query (React Query) for server state management and API calls. Configured with conservative defaults (no automatic refetching, infinite stale time).

**Design Rationale**: The choice of Shadcn/ui over a heavier component library provides flexibility and customization while maintaining accessibility standards through Radix UI. Wouter was chosen over React Router for its minimal bundle size, appropriate for a simple portfolio site.

### Backend Architecture

**Server Framework**: Express.js with TypeScript, running on Node.js.

**Build System**: Custom build script using esbuild for server bundling and Vite for client bundling. The build process:
- Bundles commonly used dependencies (allowlist approach) to reduce cold start times
- Externalizes rarely-used dependencies
- Produces optimized production builds in the `dist` directory

**API Structure**: Minimal REST API with a single endpoint:
- `GET /api/resume` - Serves the PDF resume file from `attached_assets` directory

**Static File Serving**: Client build artifacts served from `dist/public` directory with SPA fallback to `index.html` for client-side routing.

**Development Environment**: 
- Vite development server in middleware mode for HMR (Hot Module Replacement)
- Replit-specific plugins for error overlay and development banner
- Custom logging middleware for request monitoring

**Rationale**: Express was chosen for its simplicity and widespread adoption. The minimal API surface reflects the portfolio's static nature, with only resume download requiring server-side handling.

### Data Storage

**Database ORM**: Drizzle ORM configured for PostgreSQL (via Neon Database serverless driver).

**Schema**: Basic user authentication schema defined in `shared/schema.ts`:
- Users table with id, username, and password fields
- Zod validation schemas for type safety

**Current State**: Database infrastructure is configured but not actively used in the portfolio. The schema exists for potential future features like contact forms, admin panels, or visitor analytics.

**In-Memory Storage**: Fallback `MemStorage` implementation for user data without database dependency.

**Rationale**: Drizzle was chosen for its TypeScript-first approach and lightweight nature. The Neon serverless driver enables edge deployment and eliminates connection pooling concerns. The schema is prepared but inactive, following a "build for scale later" approach.

### External Dependencies

**UI & Interaction**:
- `@radix-ui/*` - Accessible component primitives (20+ components)
- `framer-motion` - Animation library for scroll-triggered effects
- `lucide-react` - Icon library
- `embla-carousel-react` - Carousel component
- `class-variance-authority` & `clsx` - Conditional styling utilities

**Forms & Validation**:
- `react-hook-form` - Form state management
- `@hookform/resolvers` - Form validation resolvers
- `zod` - Schema validation
- `drizzle-zod` - Integration between Drizzle and Zod

**Database & API**:
- `@neondatabase/serverless` - PostgreSQL serverless driver
- `drizzle-orm` - TypeScript ORM
- `@tanstack/react-query` - Server state management

**Development Tools**:
- Vite plugins for Replit integration (`@replit/vite-plugin-*`)
- TypeScript for type safety across the stack
- Tailwind CSS with PostCSS for styling

**Build & Deployment**:
- `esbuild` - Fast JavaScript bundler for server code
- `vite` - Frontend build tool and dev server
- `tsx` - TypeScript execution for development and build scripts

**Typography**:
- Google Fonts: Inter (sans-serif), JetBrains Mono (monospace), DM Sans, Fira Code, Geist Mono

**Asset Management**: Static assets stored in `attached_assets` directory, aliased as `@assets` in the build configuration for easy imports.