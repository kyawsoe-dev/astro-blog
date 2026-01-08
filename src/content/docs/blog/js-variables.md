---
title: JavaScript Variables
description: A complete beginner-friendly introduction to JavaScript variables using var, let, and const.
pubDate: 2023-06-15
author: Kyaw Soe
tags: ['javascript', 'variables', 'tutorial']
category: 'Web Development'
technology: 'JavaScript'
level: 'beginner'
course: 'javascript-mastery'
lessonNumber: 2
readingTime: 3
---

<div class="blog-meta-enhanced">

<span class="tech-badge">JavaScript</span>
<span class="level-badge level-beginner">Beginner</span>
<span class="course-badge">JS Mastery L2</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/javascript-mastery/">Complete JavaScript Mastery</a></h3>
    <p>Lesson 2 of 5</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/js-intro/">&larr; Previous: JavaScript Introduction</a>
    </div>
    <div class="next-lesson">
      <a href="/blog/js-closures/">Next: JavaScript Closures →</a>
    </div>
  </div>
</div>

## Introduction

Variables allow you to **store data in memory** so your program can use and update it later.

In JavaScript, variables are declared using:

- `var` (old, avoid)
- `let` (modern, mutable)
- `const` (modern, immutable reference)

> 💡 **Best practice:**
> Always use `const` by default.
> Use `let` only when reassignment is required.

---

## Declaring variables

```js
let username = "Kyaw Soe";
const role = "Full-Stack Developer";
```
