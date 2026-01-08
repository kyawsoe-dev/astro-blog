---
title: Express.js Routing
description: Master routing in Express.js applications with practical examples and best practices.
pubDate: 2025-01-13
author: Kyaw Soe
tags: ["nodejs", "express", "routing", "backend", "api"]
category: "Backend Development"
technology: "Node.js"
level: "intermediate"
course: "nodejs-backend"
lessonNumber: 3
readingTime: 10
---

<div class="blog-meta-enhanced">

<span class="tech-badge">Node.js</span>
<span class="level-badge level-intermediate">Intermediate</span>
<span class="course-badge">Node.js Backend L3</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/nodejs-backend/">Node.js Backend Development</a></h3>
    <p>Lesson 3 of 4</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/nodejs-express-middleware/">&larr; Previous: Express.js Middleware</a>
    </div>
    <div class="next-lesson">
      <a href="/blog/nodejs-express-database-integration/">Next: Database Integration →</a>
    </div>
  </div>
</div>

Routing refers to determining how an application responds to a client request to a particular endpoint, which is a URI (or path) and a specific HTTP request method (GET, POST, PUT, DELETE, etc.). Express.js provides a powerful routing system to handle various HTTP requests.

---

## Setting Up the Project

First, initialize your project and install dependencies:

```bash
mkdir nodejs-rest-api
cd nodejs-rest-api
npm init -y
npm install express cors helmet morgan
npm install --save-dev nodemon
```

## Basic Server Setup

```javascript
// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes will go here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Creating a Simple API

Let's create a basic API for managing users:

```javascript
// In-memory data store (use a real database in production)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
];

let nextId = 3;

// GET /api/users - Get all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET /api/users/:id - Get a specific user
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// POST /api/users - Create a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const newUser = {
    id: nextId++,
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /api/users/:id - Update a user
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  users[userIndex] = { ...users[userIndex], name, email };
  res.json(users[userIndex]);
});

// DELETE /api/users/:id - Delete a user
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  res.json(deletedUser);
});
```

## Adding Error Handling

```javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});
```

## Input Validation

For more robust validation, consider using a library like Joi:

```bash
npm install joi
```

```javascript
const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
});

app.post("/api/users", (req, res) => {
  const { error, value } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Process the validated data
  const newUser = {
    id: nextId++,
    ...value,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});
```

## Testing Your API

You can test your API using tools like Postman, curl, or a testing framework like Jest:

```bash
# Get all users
curl http://localhost:3000/api/users

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob Johnson","email":"bob@example.com"}'

# Get a specific user
curl http://localhost:3000/api/users/1

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","email":"john.updated@example.com"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1
```

## Best Practices

1. Use consistent naming conventions for endpoints
2. Implement proper error handling
3. Validate input data
4. Use environment variables for configuration
5. Implement logging
6. Add authentication and authorization as needed
7. Document your API endpoints

This foundation provides a solid starting point for building more complex REST APIs with Node.js.
