# Unity Vault Website

A modern, resource-driven platform for the ERLC (Emergency Response: Liberty County) community. Unity Vault curates and organizes the best ERLC resources, making them accessible to everyone building successful communities.

## Purpose

Unity Vault exists to remove the intimidation factor around building successful ERLC communities. We show that big servers learned from public resources and anyone can learn the same way through organization, consistency, and execution.

## Features

- **Resources Vault**: Curated YouTube videos and resources organized by category with search and filtering
- **Community Guides**: High-level guidance section (coming soon)
- **Clean Design**: Modern, professional, dark-mode friendly interface

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── resources/         # Resources Vault page
│   ├── community-guides/  # Community guides (empty state)
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx    # Site navigation
│   ├── Footer.tsx        # Site footer
│   └── ResourceCard.tsx  # Resource display card
├── lib/                   # Utilities and data
│   └── resources.ts      # Resource data and utilities
└── public/                # Static assets
```

## Key Principles

- **No Tutorials**: Unity Vault curates resources, it does not create tutorials
- **Proper Credit**: All resources are credited to their original creators
- **Community First**: Built for and by the ERLC community
- **Accessibility**: Free and accessible to everyone
- **Transparency**: Clear about what Unity Vault is and is not

## Development

The website uses Next.js 14 with the App Router. All pages are server components by default, with client components used only when needed (forms, interactive elements).

### Adding Resources

Resources are currently stored in `lib/resources.ts`. In production, this would be replaced with a database or CMS integration.

### Styling

The site uses Tailwind CSS with a custom design system defined in `app/globals.css`. Dark mode is the default, with light mode support available through CSS variables.

## License

Unity Vault is an independent community resource.
