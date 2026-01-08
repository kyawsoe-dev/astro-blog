---
title: Database Integration with Node.js
description: Learn how to integrate databases with Node.js applications using popular ORMs and database drivers.
pubDate: 2025-01-14
author: Kyaw Soe
tags: ['nodejs', 'database', 'mongodb', 'postgresql', 'mysql', 'orm']
category: 'Backend Development'
technology: 'Node.js'
level: 'intermediate'
course: 'nodejs-backend'
lessonNumber: 4
readingTime: 12
---

<div class="blog-meta-enhanced">

<span class="tech-badge">Node.js</span>
<span class="level-badge level-intermediate">Intermediate</span>
<span class="course-badge">Node.js Backend L4</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/nodejs-backend/">Node.js Backend Development</a></h3>
    <p>Lesson 4 of 4</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/nodejs-express-routing/">&larr; Previous: Express.js Routing</a>
    </div>
    <div class="next-lesson">
      <a href="/courses/nodejs-backend/">Complete Course →</a>
    </div>
  </div>
</div>

Database integration is a crucial aspect of any backend application. Node.js provides excellent support for various databases including SQL databases like PostgreSQL, MySQL, and SQLite, as well as NoSQL databases like MongoDB, Redis, and CouchDB. In this guide, we'll explore different approaches to database integration with practical examples.

---

## Choosing the Right Database Solution

When building Node.js applications, you have several database options:

- **SQL Databases**: PostgreSQL, MySQL, SQLite, Microsoft SQL Server
- **NoSQL Databases**: MongoDB, Redis, CouchDB, Cassandra
- **Cloud Databases**: Firebase, AWS DynamoDB, Google Cloud Firestore

The choice depends on your application's requirements, scalability needs, and data structure.

---

## Popular Database Libraries and ORMs

### 1. Mongoose (for MongoDB)

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data.

```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const User = mongoose.model('User', userSchema);

// Usage examples
async function createUser(userData) {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    console.log('User created:', savedUser);
    return savedUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findUsers() {
  try {
    const users = await User.find({}).select('name email age');
    console.log('Users found:', users);
    return users;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}
```

### 2. Prisma (Modern ORM)

Prisma is a modern database toolkit that provides type-safe database access and automatic migrations.

```bash
npm install prisma @prisma/client
npx prisma init
```

Create a `schema.prisma` file:

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  age       Int?
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String
  author   User   @relation(fields: [authorId], references: [id])
  authorId Int
  published Boolean @default(false)
  createdAt DateTime @default(now())
}
```

```javascript
// app.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30,
    },
  });

  console.log(user);

  // Create a post for the user
  const post = await prisma.post.create({
    data: {
      title: 'My First Post',
      content: 'Hello, world!',
      author: {
        connect: { id: user.id },
      },
    },
  });

  console.log(post);

  // Find all published posts with their authors
  const postsWithAuthors = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });

  console.log(postsWithAuthors);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 3. Sequelize (for SQL databases)

Sequelize is a promise-based Node.js ORM for SQL databases like PostgreSQL, MySQL, MariaDB, SQLite, and MSSQL.

```bash
npm install sequelize pg pg-hstore  # for PostgreSQL
# or
npm install sequelize mysql2       # for MySQL
```

```javascript
const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres' // or 'mysql', 'sqlite', etc.
});

// Define a model
const User = sequelize.define('User', {
  // Model attributes
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  // Other model options
  tableName: 'Users'
});

// Sync the model with the database
async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Creates table if it doesn't exist
    console.log('Database synced');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Usage examples
async function createUser(userData) {
  try {
    const user = await User.create(userData);
    console.log('User created:', user.toJSON());
    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function findUsers() {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email']
    });
    console.log('Users found:', users.map(user => user.toJSON()));
    return users;
  } catch (error) {
    console.error('Error finding users:', error);
    throw error;
  }
}
```

---

## Connection Pooling and Configuration

For production applications, proper connection pooling is essential for performance:

```javascript
// For PostgreSQL with pg
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Query function
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}
```

---

## Environment Configuration

Store database credentials securely using environment variables:

```javascript
// config/database.js
require('dotenv').config();

const dbConfig = {
  development: {
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  test: {
    username: process.env.DB_USERNAME || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp_test',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

module.exports = dbConfig;
```

Create a `.env` file:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USERNAME=myuser
DB_PASSWORD=mypassword
DATABASE_URL=postgresql://myuser:mypassword@localhost:5432/myapp
```

---

## Error Handling and Best Practices

### 1. Proper Error Handling

```javascript
async function safeDatabaseOperation() {
  try {
    // Database operation
    const result = await User.findOne({ where: { email: 'user@example.com' } });
    
    if (!result) {
      throw new Error('User not found');
    }
    
    return result;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      // Handle validation errors
      console.error('Validation error:', error.errors);
      throw new Error('Invalid data provided');
    } else if (error.name === 'SequelizeConnectionError') {
      // Handle connection errors
      console.error('Connection error:', error);
      throw new Error('Unable to connect to database');
    } else {
      // Handle other errors
      console.error('Database error:', error);
      throw error;
    }
  }
}
```

### 2. Transaction Management

```javascript
const { Op } = require('sequelize'); // For Sequelize

async function transferMoney(fromUserId, toUserId, amount) {
  const transaction = await sequelize.transaction();
  
  try {
    // Deduct from sender
    await User.decrement('balance', {
      by: amount,
      where: { id: fromUserId },
      transaction
    });
    
    // Add to receiver
    await User.increment('balance', {
      by: amount,
      where: { id: toUserId },
      transaction
    });
    
    // Commit the transaction
    await transaction.commit();
    console.log('Transfer completed successfully');
  } catch (error) {
    // Rollback the transaction in case of error
    await transaction.rollback();
    console.error('Transfer failed, rolled back:', error);
    throw error;
  }
}
```

---

## Migration Strategies

Database migrations help manage schema changes over time:

```javascript
// Example migration with Sequelize CLI
// npx sequelize-cli migration:create --name create-users-table

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
```

---

## Performance Optimization

### 1. Indexing

```javascript
// Add indexes for frequently queried fields
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Creates a unique index
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  indexes: [
    {
      unique: true,
      fields: ['email'] // Index on email field
    },
    {
      fields: ['status'] // Index on status field
    }
  ]
});
```

### 2. Query Optimization

```javascript
// Instead of fetching all fields
const users = await User.findAll(); // Fetches all fields

// Only fetch needed fields
const users = await User.findAll({
  attributes: ['id', 'name', 'email'] // Only fetch specific fields
});

// Use eager loading to prevent N+1 queries
const posts = await Post.findAll({
  include: [{
    model: User,
    attributes: ['name', 'email']
  }]
});
```

---

## Summary

Database integration in Node.js involves:

- Choosing the right database and ORM/library for your needs
- Properly configuring connections and connection pooling
- Implementing secure credential management
- Following best practices for error handling and transactions
- Optimizing queries and using appropriate indexing
- Managing schema changes with migrations

The choice of database technology should align with your application's requirements, scalability needs, and team expertise. Whether you choose SQL or NoSQL, ORMs or raw queries, the key is to implement proper error handling, security measures, and performance optimizations.