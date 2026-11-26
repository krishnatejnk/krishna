# Portfolio Website

A modern, bold, and creative portfolio website built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Bold & Creative Design** - Vibrant gradients, dynamic animations, and modern UI
- **Smooth Animations** - Powered by Framer Motion for seamless transitions
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Fast Performance** - Built with Next.js 14+ for optimal speed
- **Modern Stack** - TypeScript, Tailwind CSS, and React 18

## Sections

- **Hero** - Eye-catching introduction with animated background
- **About** - Personal information and statistics
- **Experience** - Professional timeline with animated cards
- **Projects** - Showcase of work with hover effects
- **Education** - Educational background timeline
- **Skills** - Animated skill bars and technology icons
- **Contact** - Email, GitHub and LinkedIn links
- **Footer** - Additional links and information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Update Content

- Edit component files in `app/components/` to update content
- Modify the data arrays in each component (projects, experience, education, etc.)
- Update social links in `Contact.tsx`
- Change colors and gradients in Tailwind classes

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-specific styles are inline with Tailwind classes

### Colors & Theme

The portfolio uses a bold color scheme with:
- Primary: Purple (#9333EA)
- Secondary: Pink (#EC4899)
- Accent: Orange (#F97316)

You can customize these in the component files by updating the gradient classes.

## Project Structure

```
/
├── app/
│   ├── components/         # React components
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static assets
└── package.json            # Dependencies
```

## Technologies Used

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **React 18** - UI library

## License

This project is open source and available under the MIT License.

