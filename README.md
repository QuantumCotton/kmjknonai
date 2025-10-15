# KMJK Home Improvement Website

A professional, sophisticated website for KMJK Home Improvement, showcasing exceptional craftsmanship and seamless renovation experiences.

## About

KMJK Home Improvement is dedicated to transforming homes through meticulous craftsmanship and an unwavering commitment to client satisfaction in Stuart, Florida, and the Treasure Coast area.

## Features

- **Responsive Design**: Beautiful, mobile-friendly layout that works on all devices
- **Portfolio Showcase**: Curated gallery of completed projects
- **Service Pages**: Detailed information about kitchen remodels, bathroom renovations, and custom cabinetry
- **Process Overview**: Clear explanation of the four-step renovation process
- **Contact Form**: Easy way for potential clients to get in touch

## Technology Stack

- **React** - Modern JavaScript framework
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **React Router** - Client-side routing
- **Lucide Icons** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 22.x or higher
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

### Accessing the contractor intake form

The Elite Service Hub contractor intake form lives in `public/kmjk_contractor_intake_form.html`. There are three easy ways to view or download it:

1. **During development** – run `pnpm run dev` and open `http://localhost:5173/kmjk_contractor_intake_form.html` in your browser. Vite automatically serves everything in the `public/` folder, so you can interact with the live form there.
2. **From the production build** – after `pnpm run build`, the compiled site will appear in the `dist/` folder. The intake form will be copied to `dist/kmjk_contractor_intake_form.html`; double-click that file to open it locally or drag it into any browser.
3. **Direct download from GitHub** – navigate to `public/kmjk_contractor_intake_form.html` in the repository, click **Raw**, then use your browser’s save dialog to download the file straight to your PC.

> **Tip for GitHub Desktop users:** ensure you are on the `main` branch and click **Pull origin**. The redesigned form shipped in commit `9143890`, so pulling the latest changes will place the file in the `public/` folder on your machine.

## Project Structure

```
kmjk-website/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # React components
│   │   └── ui/         # shadcn/ui components
│   ├── App.jsx         # Main application component
│   ├── App.css         # Global styles
│   └── main.jsx        # Application entry point
├── public/             # Public static files
└── dist/              # Production build output
```

## Contact Information

**KMJK Home Improvement**
- Phone: 650-501-7659
- Email: chris@theeliteservicehub.com
- Service Area: Stuart, Florida, and the Treasure Coast

## Brand Identity

- **Colors**: Deep Charcoal (#2C2C2C), Warm Off-White (#F8F8F8), Brushed Gold (#B8860B)
- **Typography**: Georgia, Times New Roman (serif fonts for elegance and trust)
- **Design Philosophy**: Sophisticated, trustworthy, detail-oriented

## License

© 2025 KMJK Home Improvement. All rights reserved.
