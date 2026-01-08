---
title: JavaScript Async/Await
description: Master asynchronous programming in JavaScript with async/await syntax and promises.
pubDate: 2023-07-20
author: Kyaw Soe
tags: ['javascript', 'async', 'promises', 'tutorial']
category: 'Web Development'
technology: 'JavaScript'
level: 'intermediate'
course: 'javascript-mastery'
lessonNumber: 4
readingTime: 8
---

<div class="blog-meta-enhanced">

<span class="tech-badge">JavaScript</span>
<span class="level-badge level-intermediate">Intermediate</span>
<span class="course-badge">JS Mastery L4</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/javascript-mastery/">Complete JavaScript Mastery</a></h3>
    <p>Lesson 4 of 5</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/js-closures/">&larr; Previous: JavaScript Closures</a>
    </div>
    <div class="next-lesson">
      <a href="/blog/js-design-patterns/">Next: JavaScript Design Patterns →</a>
    </div>
  </div>
</div>

## Introduction

Async/await is a modern syntax for handling asynchronous operations in JavaScript, making promise-based code easier to read and write. It builds on top of Promises and provides a cleaner, more synchronous-looking way to handle asynchronous code.

Before async/await, handling multiple asynchronous operations often led to deeply nested `.then()` chains, known as "callback hell". Async/await solves this problem elegantly.

---

## Understanding Async Functions

An async function is declared using the `async` keyword before the function declaration. When called, an async function returns a Promise that resolves to the value returned by the function body.

```js
async function fetchData() {
  return "Data fetched successfully!";
}

// This returns a Promise
fetchData().then(result => console.log(result)); // Logs: Data fetched successfully!
```

### The await keyword

The `await` keyword can only be used inside an async function. It pauses the execution of the async function and waits for the Promise to resolve before continuing.

```js
async function fetchUserData() {
  const response = await fetch('/api/user/123');
  const userData = await response.json();
  return userData;
}
```

---

## Practical Examples

### Example 1: Fetching Data from an API

```js
async function getUserProfile(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

// Usage
getUserProfile(123)
  .then(user => console.log(user))
  .catch(error => console.error('Failed to get user:', error));
```

### Example 2: Multiple Sequential Requests

```js
async function getUserWithPosts(userId) {
  try {
    // First, get user info
    const userResponse = await fetch(`/api/users/${userId}`);
    const user = await userResponse.json();
    
    // Then, get user's posts
    const postsResponse = await fetch(`/api/users/${userId}/posts`);
    const posts = await postsResponse.json();
    
    // Return combined data
    return {
      ...user,
      posts
    };
  } catch (error) {
    console.error('Error fetching user and posts:', error);
    throw error;
  }
}
```

### Example 3: Parallel Requests with Promise.all()

```js
async function getUserDashboardData(userId) {
  try {
    // Execute multiple requests in parallel
    const [userPromise, postsPromise, friendsPromise] = [
      fetch(`/api/users/${userId}`).then(res => res.json()),
      fetch(`/api/users/${userId}/posts`).then(res => res.json()),
      fetch(`/api/users/${userId}/friends`).then(res => res.json())
    ];
    
    const [user, posts, friends] = await Promise.all([
      userPromise, 
      postsPromise, 
      friendsPromise
    ]);
    
    return { user, posts, friends };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
}
```

---

## Error Handling

Error handling with async/await is done using try/catch blocks, which makes it much more readable than chaining `.catch()` methods.

```js
async function robustApiCall(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle different types of errors
    if (error instanceof TypeError) {
      console.error('Network error:', error.message);
    } else {
      console.error('API error:', error.message);
    }
    
    // Re-throw or return a default value
    throw error;
  }
}
```

---

## Common Pitfalls and Best Practices

### 1. Avoiding Sequential Operations When Possible

❌ Bad: Unnecessary sequential execution
```js
async function badExample() {
  // These could run in parallel but don't
  const user = await fetchUser();      // Takes 200ms
  const posts = await fetchPosts();    // Takes 300ms
  // Total: 500ms
  return { user, posts };
}
```

✅ Good: Parallel execution when possible
```js
async function goodExample() {
  // Execute in parallel
  const [user, posts] = await Promise.all([
    fetchUser(),  // Takes 200ms
    fetchPosts()  // Takes 300ms
  ]);
  // Total: 300ms (the longest operation)
  return { user, posts };
}
```

### 2. Proper Error Handling

Always wrap await calls in try/catch blocks to handle potential errors gracefully.

### 3. Using Promise.allSettled() for Independent Operations

When you need to wait for multiple promises but want to handle each result/error individually:

```js
async function fetchMultipleResources() {
  const urls = ['/api/users', '/api/posts', '/api/comments'];
  
  const promises = urls.map(url => fetch(url).then(r => r.json()));
  const results = await Promise.allSettled(promises);
  
  const data = results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return { success: true, data: result.value, url: urls[index] };
    } else {
      return { success: false, error: result.reason, url: urls[index] };
    }
  });
  
  return data;
}
```

---

## Advanced Patterns

### Conditional Async Operations

```js
async function conditionalFetch(fetchUserDetails = true) {
  const user = await fetch('/api/user');
  
  if (fetchUserDetails) {
    const details = await fetch(`/api/user/${user.id}/details`);
    return { ...user, details };
  }
  
  return user;
}
```

### Async Iteration

```js
async function processBatch(items) {
  const results = [];
  
  for (const item of items) {
    try {
      const result = await processItem(item);
      results.push(result);
    } catch (error) {
      console.error(`Error processing item ${item.id}:`, error);
      // Decide whether to continue or break
    }
  }
  
  return results;
}
```

---

## Summary

Async/await provides a clean and readable way to handle asynchronous operations in JavaScript:

- Use `async` to declare an asynchronous function
- Use `await` to pause execution until a Promise resolves
- Handle errors with try/catch blocks
- Use `Promise.all()` for parallel execution when appropriate
- Remember that async functions always return a Promise

Async/await has become the standard way to handle asynchronous code in modern JavaScript, offering better readability and maintainability compared to traditional Promise chains.