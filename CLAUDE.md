# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the Application
```bash
npm run dev          # Start development server with Turbopack (http://localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Architecture Overview

This is a modern Todo application built with Next.js 15 App Router, featuring a hierarchical task management system with subtasks.

### Key Architectural Decisions

1. **Component-Based UI Architecture**
   - All UI components follow a consistent pattern using Radix UI primitives wrapped with custom styling
   - Components use `class-variance-authority` (CVA) for managing variants
   - The `cn()` utility function (lib/utils.ts) combines `clsx` and `tailwind-merge` for intelligent class merging

2. **State Management**
   - Local state management using React hooks (no external state library)
   - Todo state includes hierarchical subtask relationships
   - Automatic parent-child state synchronization (completing parent completes all subtasks)

3. **Type System**
   - Strict TypeScript with interfaces defined in `src/types/`
   - Todo and SubTask interfaces model the hierarchical task structure

4. **Styling Approach**
   - Tailwind CSS v4 with PostCSS
   - CSS variables for theming support (light/dark mode ready)
   - Custom animations defined in globals.css (@keyframes)
   - Component-level transitions using Tailwind utilities

5. **Component Interaction Patterns**
   - TodoList component manages all todo operations internally
   - Optimistic UI updates with animated transitions
   - Keyboard support (Enter to add tasks/subtasks)
   - Expandable/collapsible UI sections for subtasks

### Project Structure Patterns

- **UI Components** (`/components/ui/`): Reusable, styled primitives
- **Feature Components** (`/components/`): Complex components with business logic
- **Type Definitions** (`/types/`): Shared TypeScript interfaces
- **Utilities** (`/lib/`): Helper functions and utilities

### Development Notes

- The project uses Turbopack in development for faster builds
- React 19 and Next.js 15 with App Router
- No API routes - all state is client-side
- Custom animations are defined in globals.css and applied via className