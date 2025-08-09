# XSS Security Lab

## Overview

This is an interactive XSS (Cross-Site Scripting) security training platform built as a single-page application. The project provides 35+ hands-on challenges that teach users about different types of XSS vulnerabilities through practical exercises. Each challenge simulates a different vulnerable web application scenario, allowing users to learn by safely exploiting XSS vulnerabilities in a controlled environment.

The application features a comprehensive progression system with hints, solutions, and completion tracking. It covers various XSS attack vectors including reflected XSS, stored XSS, DOM-based XSS, filter bypasses, and advanced techniques like polyglot payloads and prototype pollution.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui components for consistent design
- **Styling**: Tailwind CSS with a custom "hacker/terminal" theme featuring matrix green colors
- **State Management**: React hooks for local state, TanStack Query for server state (though currently mostly local)
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js server with TypeScript
- **Development Mode**: Vite middleware integration for seamless development experience
- **Storage Interface**: Abstract storage interface with memory implementation for challenge data
- **Route Structure**: API routes prefixed with `/api` for clear separation

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: Shared schema in `/shared/schema.ts`
- **Current Tables**: Users table with id, username, and password fields
- **Migration System**: Drizzle-kit for database migrations

### Component Organization
- **Challenge System**: Each challenge is a separate React component (`Challenge1.tsx` through `Challenge35.tsx`)
- **Layout Component**: `ChallengeLayout` provides consistent structure with navigation, hints, and progress tracking
- **Progress System**: Local storage-based progress tracking with completion status, hints used, and solutions viewed
- **UI Components**: Reusable UI components in `/components/ui/` following shadcn/ui patterns

### Security Learning Features
- **Challenge Categories**: Basic, Intermediate, Advanced, and Expert level challenges
- **Vulnerability Types**: Covers reflected, stored, DOM-based, URL-based, filter bypass, polyglot, and blind XSS
- **Interactive Elements**: Each challenge simulates different vulnerable scenarios (forms, search, file upload, etc.)
- **Educational Tools**: Hint system, solution viewing, and progress tracking to guide learning

### Development Architecture
- **Monorepo Structure**: Client and server code in same repository with shared types
- **Hot Reload**: Vite HMR for instant development feedback
- **Type Safety**: Full TypeScript coverage across client, server, and shared code
- **Path Aliases**: Configured aliases for clean imports (`@/`, `@shared/`)

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM for the frontend framework
- **TypeScript**: Full TypeScript support across the entire application
- **Vite**: Modern build tool and development server
- **Express**: Node.js web framework for the backend server

### Database and ORM
- **Drizzle ORM**: Type-safe SQL ORM for PostgreSQL integration
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **PostgreSQL**: Primary database (configured but can be provisioned later)

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **class-variance-authority**: For component variant management

### State Management and Data Fetching
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight React router
- **React Hook Form**: Form state management with validation

### Development Tools
- **TSX**: TypeScript execution for development server
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **nanoid**: Unique ID generation
- **zod**: Schema validation library

The application is designed to be self-contained for educational purposes, with minimal external service dependencies to ensure it can run in various environments including Replit.