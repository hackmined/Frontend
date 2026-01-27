# HACKAMINED - Clean Codebase

Modern hackathon website with horizontal scroll experience powered by GSAP.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles
├── components/
│   ├── layout/
│   │   ├── Header/         # Navigation bar
│   │   └── ScrollProgress/ # Top progress bar
│   ├── sections/
│   │   ├── HeroSection/    # Landing hero
│   │   ├── AboutSection/   # Mission statement
│   │   ├── TimelineSection/# Event timeline
│   │   ├── TracksSection/  # Challenge tracks
│   │   └── CTASection/     # Call to action
│   └── ui/
│       ├── Button/         # Reusable button
│       ├── TrackCard/      # Track card component
│       └── TimelineItem/   # Timeline event item
├── containers/
│   └── HorizontalScroll/   # GSAP horizontal scroll container
├── styles/
│   └── variables.scss      # Design tokens
└── types/
    └── index.ts            # TypeScript interfaces
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

All design tokens are in `styles/variables.scss`:
- Colors (dark theme, red accent)
- Typography (Inter font)
- Spacing
- Breakpoints

## 🎬 Key Features

- **Horizontal Scroll**: Vertical scroll → horizontal motion
- **GSAP Animations**: Smooth parallax and reveals
- **5 Sections**: Hero, About, Timeline, Tracks, CTA
- **Responsive**: Mobile-friendly
- **Type-safe**: Full TypeScript

## 📦 Dependencies

- Next.js 14+
- TypeScript
- GSAP + ScrollTrigger
- SCSS Modules

## 🎯 Modification Guide

### Change Colors
Edit `styles/variables.scss`

### Add/Remove Sections
Edit `app/page.tsx`

### Modify Animations
Check each section's `.tsx` file for GSAP code

### Update Content
Each section has its own folder with component + styles
