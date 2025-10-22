# ⭐ Stellar Explorer - Interactive Galaxy Journey

![Stellar Explorer](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=300&fit=crop&auto=format)

An immersive, interactive web experience that transforms astronomical data into a captivating visual journey through the cosmos. Explore clickable stars that reveal detailed astronomical information in an engaging, educational platform.

## ✨ Features

- **Interactive Galaxy View** - Click stars to zoom in and reveal detailed information
- **Dynamic Star Data** - All content managed through Cosmic CMS
- **Smooth Animations** - Floating stars, zoom effects, and elegant transitions
- **Responsive Design** - Perfect experience on any device
- **Rich Content Display** - HTML-rendered astronomical details with images
- **Type-Safe** - Full TypeScript implementation with comprehensive type definitions
- **Immersive UI** - Space-themed design with cosmic backgrounds and effects

## 🚀 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68f92f38e8f05775dc5cf805&clone_repository=68f93163e8f05775dc5cf833)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a website where is the view of galaxy, and there are stars. when the star will be clicked it will zooms and there will be information which i will insert later"

### Code Generation Prompt

> "Based on the content model I created for 'Create a website where is the view of galaxy, and there are stars. when the star will be clicked it will zooms and there will be information which i will insert later', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Framer Motion** - Smooth animations (implemented via CSS)
- **Inter Font** - Modern typography

## 📋 Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with your bucket set up
- Environment variables configured

## 🚀 Getting Started

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd stellar-explorer

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials
```

### Environment Variables

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

### Development

```bash
# Run development server
bun run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Build the application
bun run build

# Start production server
bun run start
```

## 📚 Cosmic SDK Examples

### Fetching All Stars

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: stars } = await cosmic.objects
  .find({ type: 'stars' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Star

```typescript
const { object: star } = await cosmic.objects
  .findOne({
    type: 'stars',
    slug: 'proxima-centauri'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## 🌌 Cosmic CMS Integration

This application uses the following Cosmic object type:

### Stars Object Type

- **star_name** (text) - The name of the star
- **short_description** (textarea) - Brief description shown on hover
- **detailed_information** (html-textarea) - Full information shown when clicked
- **discovery_date** (text) - When the star was discovered
- **star_image** (file) - Image of the star or constellation
- **distance** (text) - Distance from Earth in light years
- **star_type** (select-dropdown) - Classification (Red Dwarf, Main Sequence, etc.)

## 🚀 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the deploy button
2. Connect your repository
3. Add environment variables (COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, COSMIC_WRITE_KEY)
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the deploy button
2. Connect your repository
3. Add environment variables
4. Deploy!

## 📱 Features in Detail

### Galaxy View
- Interactive star field with floating animations
- Responsive positioning based on screen size
- Smooth hover effects and cursor interactions

### Star Details Modal
- Zoom animation when opening
- HTML-rendered detailed information
- Star images optimized with imgix
- Comprehensive metadata display
- Smooth close transitions

### Content Management
- All content editable through Cosmic dashboard
- Automatic updates when content changes
- Support for rich text and media

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) and Next.js

<!-- README_END -->