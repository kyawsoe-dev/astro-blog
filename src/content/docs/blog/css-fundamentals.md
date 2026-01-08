---
title: CSS Fundamentals
description: Master the core concepts of CSS including selectors, specificity, the box model, and positioning.
pubDate: 2025-01-10
author: Kyaw Soe
tags: ['css', 'fundamentals', 'selectors', 'box-model', 'positioning']
category: 'Web Development'
technology: 'CSS'
level: 'beginner'
course: 'css-modern-layouts'
lessonNumber: 1
readingTime: 8
---

<div class="blog-meta-enhanced">

<span class="tech-badge">CSS</span>
<span class="level-badge level-beginner">Beginner</span>
<span class="course-badge">CSS Layouts L1</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/css-modern-layouts/">CSS Modern Layouts</a></h3>
    <p>Lesson 1 of 4</p>
  </div>
  <div class="lesson-nav">
    <div class="next-lesson">
      <a href="/blog/css-grid-flexbox/">Next: CSS Grid vs Flexbox →</a>
    </div>
  </div>
</div>

CSS (Cascading Style Sheets) is the language used to describe the presentation of a document written in HTML. Understanding CSS fundamentals is essential for any web developer. This guide covers the core concepts you need to master before diving into advanced layout techniques.

---

## CSS Syntax and Structure

CSS rules consist of selectors and declarations:

```css
selector {
  property: value;
}
```

For example:
```css
h1 {
  color: blue;
  font-size: 24px;
}
```

## CSS Selectors

Selectors define which HTML elements to style:

### Element Selectors
```css
p {
  color: black;
}
```

### Class Selectors
```css
.highlight {
  background-color: yellow;
}
```

### ID Selectors
```css
#header {
  background-color: blue;
}
```

### Attribute Selectors
```css
input[type="text"] {
  border: 1px solid #ccc;
}
```

### Pseudo-selectors
```css
a:hover {
  color: red;
}

p:first-child {
  margin-top: 0;
}
```

## The Cascade and Specificity

CSS stands for Cascading Style Sheets. The cascade determines how to handle conflicts when multiple rules apply to the same element.

### Specificity Hierarchy (from highest to lowest):
1. Inline styles (`style="..."`)
2. IDs (`#identifier`)
3. Classes, attributes, pseudo-classes (`.class`, `[type="text"]`, `:hover`)
4. Elements and pseudo-elements (`h1`, `::before`)

## The Box Model

Every HTML element is treated as a rectangular box with content, padding, border, and margin:

```
+-------------------------+
|        Margin          |
|  +------------------+   |
|  |    Border        |   |
|  |  +------------+  |   |
|  |  |   Padding  |  |   |
|  |  | +--------+ |  |   |
|  |  | |Content | |  |   |
|  |  | +--------+ |  |   |
|  |  +------------+  |   |
|  +------------------+   |
+-------------------------+
```

```css
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
}
```

## CSS Display Property

The display property controls how an element is displayed:

### Block Elements
- Take up the full width available
- Start on a new line
- Examples: `<div>`, `<p>`, `<h1>`-`<h6>`

```css
.block-element {
  display: block;
}
```

### Inline Elements
- Only take up as much width as necessary
- Do not start on a new line
- Examples: `<span>`, `<a>`, `<strong>`

```css
.inline-element {
  display: inline;
}
```

### Inline-Block Elements
- Behave like inline elements but can have width and height set

```css
.inline-block-element {
  display: inline-block;
  width: 100px;
  height: 50px;
}
```

## CSS Positioning

Positioning allows precise control over element placement:

### Static (Default)
```css
.static {
  position: static;
}
```

### Relative
```css
.relative {
  position: relative;
  top: 10px;
  left: 20px;
}
```

### Absolute
```css
.absolute {
  position: absolute;
  top: 10px;
  right: 20px;
}
```

### Fixed
```css
.fixed {
  position: fixed;
  bottom: 0;
  right: 0;
}
```

### Sticky
```css
.sticky {
  position: sticky;
  top: 0;
}
```

## CSS Units

### Absolute Units
- `px` - Pixels
- `pt` - Points (1/72 inch)
- `cm` - Centimeters
- `in` - Inches

### Relative Units
- `em` - Relative to the font-size of the element
- `rem` - Relative to the font-size of the root element
- `%` - Percentage of the parent element
- `vw` - 1% of the viewport width
- `vh` - 1% of the viewport height

## Best Practices

1. **Use semantic class names**: Use descriptive names like `.navigation` instead of `.blue-text`
2. **Organize your CSS**: Group related styles together
3. **Use CSS variables**: Define reusable values
4. **Consider mobile first**: Design for smaller screens first
5. **Use external stylesheets**: Keep CSS separate from HTML
6. **Minimize specificity**: Avoid overly complex selectors

Mastering these fundamentals will provide a solid foundation for more advanced CSS techniques like Grid and Flexbox layouts.