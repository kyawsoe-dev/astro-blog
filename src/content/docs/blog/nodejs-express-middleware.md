---
title: Express.js Middleware Guide
description: Comprehensive guide to Express.js middleware - built-in, custom, and third-party middleware.
pubDate: 2025-01-14
author: Kyaw Soe
tags: ['express', 'middleware', 'nodejs', 'backend']
category: 'Backend Development'
technology: 'Express.js'
level: 'intermediate'
course: 'nodejs-backend'
lessonNumber: 2
readingTime: 7
---
<div class="blog-meta-enhanced">

<span class="tech-badge">Express.js</span>
<span class="level-badge level-intermediate">Intermediate</span>
<span class="course-badge">Node.js Backend L2</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/nodejs-backend/">Node.js Backend Development</a></h3>
    <p>Lesson 2 of 4</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/nodejs-rest-api/">← Previous: Building REST APIs</a>
    </div>
    <div class="next-lesson">
      <a href="/blog/nodejs-express-routing/">Next: Express.js Routing →</a>
    </div>
  </div>
</div>

Middleware functions are essential to Express.js applications. They have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

---

## Understanding Middleware

Middleware functions can:

- Execute any code
- Make changes to the request and response objects
- End the request-response cycle
- Call the next middleware function

## Types of Middleware

### 1. Application-level Middleware

```javascript
const express = require('express');
const app = express();

// Middleware for all routes
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next(); // Pass control to the next middleware
});

// Middleware for specific route
app.use('/user/:id', (req, res, next) => {
  console.log('Request Type:', req.method);
  next();
});

// Route handler
app.get('/user/:id', (req, res) => {
  res.send(req.params.id);
});
```

### 2. Built-in Middleware

Express has several built-in middleware functions:

```javascript
const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));
```

### 3. Third-party Middleware

Install and use third-party middleware:

```bash
npm install cookie-parser morgan cors helmet
```

```javascript
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('combined')); // Logging
app.use(cookieParser()); // Parse cookies
```

## Creating Custom Middleware

### Basic Custom Middleware

```javascript
// Logger middleware
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
};

app.use(requestLogger);
```

### Authentication Middleware

```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // Verify token (simplified example)
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.get('/profile', authenticateToken, (req, res) => {
  res.json(req.user);
});
```

### Error-handling Middleware

```javascript
// Error-handling middleware must have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});
```

## Middleware Best Practices

### 1. Order Matters

Middleware functions are executed in the order they are defined:

```javascript
app.use((req, res, next) => {
  console.log('This runs first');
  next();
});

app.use((req, res, next) => {
  console.log('This runs second');
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
```

### 2. Conditional Middleware

```javascript
const conditionalMiddleware = (condition) => {
  return (req, res, next) => {
    if (condition) {
      console.log('Conditional middleware executed');
    }
    next();
  };
};

app.use(conditionalMiddleware(process.env.NODE_ENV === 'development'));
```

### 3. Route-specific Middleware

```javascript
const validateUser = (req, res, next) => {
  // Validation logic
  if (!req.body.name || !req.body.email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  next();
};

app.post('/users', validateUser, (req, res) => {
  // This route will only execute if validation passes
  res.json({ message: 'User created successfully' });
});
```

## Advanced Middleware Patterns

### Middleware with Configuration

```javascript
const rateLimit = (options = {}) => {
  const maxRequests = options.max || 100;
  const windowMs = options.windowMs || 60 * 1000; // 1 minute
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
  
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }
  
    const ipRequests = requests.get(ip);
    const recentRequests = ipRequests.filter(time => now - time < windowMs);
  
    if (recentRequests.length >= maxRequests) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
  
    ipRequests.push(now);
    requests.set(ip, recentRequests);
    next();
  };
};

app.use(rateLimit({ max: 50, windowMs: 15 * 60 * 1000 })); // 50 requests per 15 minutes
```

### Middleware Composition

```javascript
const composeMiddleware = (...middlewares) => {
  return (req, res, next) => {
    const run = (index) => {
      if (index >= middlewares.length) return next();
    
      const middleware = middlewares[index];
      middleware(req, res, () => run(index + 1));
    };
  
    run(0);
  };
};

const middleware1 = (req, res, next) => {
  req.timestamp = Date.now();
  next();
};

const middleware2 = (req, res, next) => {
  req.processed = true;
  next();
};

app.use('/api', composeMiddleware(middleware1, middleware2));
```

Middleware is the backbone of Express.js applications, enabling you to handle requests efficiently and maintain clean, organized code.
