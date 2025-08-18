# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`

## Architecture Overview

This is a Next.js 15 portfolio website built with the App Router architecture using TypeScript and Tailwind CSS.

### Core Structure

- **Framework**: Next.js 15 with App Router (`src/app/` directory)
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to `./src/*`)
- **Fonts**: Geist Sans and Geist Mono from `next/font/google`
- **Analytics**: Vercel Analytics integration

### Key Components

**Layout (`src/app/layout.tsx`)**: 
- Root layout with font configuration
- Custom metadata for SEO (title: "Barek | Portfolio")
- CSS variable-based theming with dark mode support

**Homepage (`src/app/page.tsx`)**:
- Single-page portfolio with client-side interactivity
- Typing animation for name display
- Project showcase with staggered slide-up animations
- Projects data structure includes title, description, GitHub links, and demo URLs
- Footer with favicon integration

### Styling Architecture

**Global Styles (`src/app/globals.css`)**:
- Tailwind CSS imports with custom theme configuration
- CSS custom properties for light/dark mode theming
- Automatic dark mode detection via `prefers-color-scheme`

### Development Notes

- Uses `"use client"` directive for interactive components
- State management with React hooks for animations
- TypeScript strict mode with Next.js-specific configurations
- ESLint configured with Next.js recommended rules
- All animations use CSS transitions with custom timing