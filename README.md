# Kyaw Soe's Developer Blog

A production-ready developer blog built with Astro and Starlight, inspired by [takkatho.dev](https://www.takkatho.dev).

## Features

- ✅ Modern blog with category and tag filtering
- ✅ Responsive design with mobile-first approach
- ✅ SEO optimized with proper metadata
- ✅ Fast performance with Vercel integration
- ✅ Built-in search functionality
- ✅ Pagination for blog posts
- ✅ Analytics and performance monitoring

## Tech Stack

- [Astro](https://astro.build/) - Modern static site builder
- [Starlight](https://starlight.astro.build/) - Documentation framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Vercel Analytics](https://vercel.com/analytics) - Performance monitoring

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:4321](http://localhost:4321) in your browser

### Adding Blog Posts

Create new blog posts in `src/content/blog/` with the following frontmatter:

```markdown
---
title: 'Your Blog Post Title'
description: 'Brief description of your post'
pubDate: 2024-01-01
author: 'Your Name'
tags: ['tag1', 'tag2', 'tag3']
category: 'Category Name'
readingTime: 5
draft: false
---

Your blog content here...
```

## Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. Push your code to a Git repository
2. Connect your repository to [Vercel](https://vercel.com/)
3. Set the following environment variables:
   - `VERCEL_PROJECT_ID`: Your Vercel project ID for analytics
4. Vercel will automatically detect this as an Astro project and build it

### Environment Variables

- `VERCEL_PROJECT_ID`: Required for Vercel Analytics (when deploying to Vercel)

### Manual Deployment

```bash
npm run build
# The built site will be in the `dist` directory
```

## Performance

- Bundle size optimized
- Asset compression enabled
- Critical CSS inlined
- Images optimized with Sharp
- Vercel Speed Insights integrated

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).