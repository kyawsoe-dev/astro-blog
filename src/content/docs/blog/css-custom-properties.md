---
title: CSS Custom Properties (CSS Variables)
description: Master CSS custom properties (variables) for dynamic and maintainable stylesheets.
pubDate: 2025-01-13
author: Kyaw Soe
tags: ['css', 'variables', 'custom-properties', 'theming', 'dynamic-styles']
category: 'Web Development'
technology: 'CSS'
level: 'intermediate'
course: 'css-modern-layouts'
lessonNumber: 5
readingTime: 8
---

<div class="blog-meta-enhanced">

<span class="tech-badge">CSS</span>
<span class="level-badge level-intermediate">Intermediate</span>
<span class="course-badge">CSS Variables L5</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/css-modern-layouts/">CSS Modern Layouts</a></h3>
    <p>Lesson 5 of 5</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/css-responsive-design-patterns/">&larr; Previous: Responsive Design Patterns</a>
    </div>
    <div class="next-lesson">
      <a href="/courses/css-modern-layouts/">Complete Course →</a>
    </div>
  </div>
</div>

CSS Custom Properties, commonly known as CSS variables, provide a powerful way to store and reuse values throughout your stylesheet. They enable dynamic styling, theming capabilities, and more maintainable CSS code.

---

## Understanding CSS Custom Properties

CSS Custom Properties allow you to define reusable values with the `--` prefix. Unlike preprocessor variables (like in Sass or Less), CSS custom properties are dynamic and can be modified at runtime with JavaScript or media queries.

### Basic Syntax
```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --font-size-base: 16px;
  --border-radius: 4px;
}

.component {
  color: var(--primary-color);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
}
```

## Declaration and Usage

### Declaration
Custom properties are declared with the `--` prefix followed by a custom name:

```css
:root {
  --main-bg-color: #f0f0f0;
  --main-text-color: #333;
  --main-padding: 15px;
}
```

### Usage
Use the `var()` function to reference custom properties:

```css
body {
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  padding: var(--main-padding);
}
```

## Scope of Custom Properties

### Global Scope (using :root)
```css
:root {
  --global-color: #333;
}
```

### Local Scope (within a selector)
```css
.card {
  --card-bg: #fff;
  --card-shadow: 0 2px 10px rgba(0,0,0,0.1);
  
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}
```

## Advanced Usage Patterns

### 1. Theming with Custom Properties

```css
/* Light theme (default) */
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #007bff;
  --border-color: #dee2e6;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-color: #2d3748;
  --text-color: #f7fafc;
  --primary-color: #63b3ed;
  --border-color: #4a5568;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.button {
  background-color: var(--primary-color);
  border: 1px solid var(--border-color);
  color: var(--text-color);
}
```

### 2. Responsive Values

```css
:root {
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
}

@media (min-width: 768px) {
  :root {
    --font-size-sm: 16px;
    --font-size-base: 18px;
    --font-size-lg: 20px;
    --font-size-xl: 28px;
  }
}

.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
```

### 3. Fallback Values

```css
.element {
  /* Using fallback value */
  color: var(--text-color, #333);
  
  /* Multiple fallbacks */
  background: var(--bg-gradient, linear-gradient(to right, #fff, #eee));
  
  /* Fallback with another custom property */
  border-color: var(--border-color, var(--primary-color, #000));
}
```

## JavaScript Integration

Custom properties can be modified dynamically with JavaScript:

```javascript
// Get the root element
const root = document.documentElement;

// Set a custom property
root.style.setProperty('--primary-color', '#e74c3c');

// Get a custom property value
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

// Update based on user interaction
document.getElementById('theme-toggle').addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', newTheme);
});
```

### Dynamic Theming Example
```javascript
function updateTheme(theme) {
  const root = document.documentElement;
  
  if (theme === 'ocean') {
    root.style.setProperty('--primary-color', '#3498db');
    root.style.setProperty('--secondary-color', '#1abc9c');
  } else if (theme === 'sunset') {
    root.style.setProperty('--primary-color', '#e74c3c');
    root.style.setProperty('--secondary-color', '#f39c12');
  }
}
```

## Practical Examples

### 1. Spacing System
```css
:root {
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-xxl: 3rem;
}

.card {
  padding: var(--space-md);
  margin-bottom: var(--space-lg);
}

.button {
  padding: var(--space-sm) var(--space-md);
}
```

### 2. Color Palette System
```css
:root {
  /* Primary colors */
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  
  /* Semantic colors */
  --color-success: var(--color-primary-500);
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #0ea5e9;
}
```

### 3. Component Theming
```css
:root {
  --button-bg: var(--color-primary-500);
  --button-text: white;
  --button-border: var(--color-primary-600);
  --button-hover-bg: var(--color-primary-600);
  --button-radius: 4px;
  --button-padding: 0.5rem 1rem;
}

.button {
  background-color: var(--button-bg);
  color: var(--button-text);
  border: 1px solid var(--button-border);
  border-radius: var(--button-radius);
  padding: var(--button-padding);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: var(--button-hover-bg);
}
```

## Best Practices

### 1. Naming Conventions
```css
/* Good: Semantic naming */
:root {
  --color-primary: #007bff;
  --spacing-unit: 1rem;
  --border-radius: 4px;
  --font-size-base: 16px;
}

/* Avoid: Non-semantic naming */
:root {
  --blue: #007bff;
  --big: 2rem;
  --round: 8px;
}
```

### 2. Organize in :root
```css
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Layout */
  --border-radius: 4px;
  --box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### 3. Use for Consistent Design Systems
```css
:root {
  /* Maintain consistent design tokens */
  --border-width: 1px;
  --border-style: solid;
  --border-color: #dee2e6;
  
  /* Component-specific variables */
  --input-padding: 0.375rem 0.75rem;
  --input-border-radius: var(--border-radius);
  --input-border: var(--border-width) var(--border-style) var(--border-color);
}
```

## Performance Considerations

1. **Limit the number of custom properties** - Too many can impact performance
2. **Use efficiently** - Custom properties are recalculated when changed
3. **Consider browser support** - Supported in all modern browsers, with IE11 requiring polyfills

## Browser Support

CSS Custom Properties are supported in all modern browsers:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- IE11 (with polyfills)

## Summary

CSS Custom Properties provide powerful capabilities for:
- Creating maintainable and consistent styles
- Implementing dynamic theming
- Building design systems
- Enabling runtime style modifications
- Improving code organization

They're an essential tool for modern CSS development, enabling more flexible and maintainable stylesheets.