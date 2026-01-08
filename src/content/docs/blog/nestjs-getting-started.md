---
title: Getting Started with NestJS
description: Learn how to build scalable and maintainable applications with NestJS framework.
pubDate: 2025-01-15
author: Kyaw Soe
tags: ['nestjs', 'nodejs', 'typescript', 'backend', 'framework']
category: 'Backend Development'
technology: 'NestJS'
level: 'beginner'
readingTime: 8
---

<div class="blog-meta-enhanced">

<span class="tech-badge">NestJS</span>
<span class="level-badge level-beginner">Beginner</span>

</div>

NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications. It uses TypeScript and combines elements of OOP, FP, and FRP.

---

## Why NestJS?

NestJS provides:
- Architecture based on Angular
- Dependency injection
- Modular structure
- Built-in support for TypeScript
- Robust testing capabilities
- Integration with various libraries (Express/Fastify)

## Installation

```bash
npm install -g @nestjs/cli
nest new my-nestjs-app
cd my-nestjs-app
```

## Project Structure

```
src/
├── app.module.ts
├── app.controller.ts
├── app.service.ts
├── main.ts
└── ...
```

## Core Concepts

### 1. Modules

Modules organize your application into distinct feature sets:

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 2. Controllers

Controllers handle incoming requests and return responses:

```typescript
// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

### 3. Services (Providers)

Services contain business logic:

```typescript
// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

## Building a REST API

Let's create a more complex example with a user API:

### 1. Create User Module

```bash
nest generate module user
nest generate service user
nest generate controller user
```

### 2. Define User Entity

```typescript
// user.entity.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
```

### 3. User Service

```typescript
// user.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: Partial<User>): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    
    this.users[userIndex] = { ...this.users[userIndex], ...updateUser };
    return this.users[userIndex];
  }

  remove(id: number): boolean {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    
    this.users.splice(userIndex, 1);
    return true;
  }
}
```

### 4. User Controller

```typescript
// user.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.userService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: Omit<User, 'id'>): User {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<User>,
  ): User {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    this.userService.remove(+id);
  }
}
```

### 5. Update User Module

```typescript
// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
```

### 6. Import Module in App Module

```typescript
// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Dependency Injection

NestJS has a powerful dependency injection system:

```typescript
// logger.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
  
  error(message: string) {
    console.error(`[ERROR] ${message}`);
  }
}

// user.service.ts (updated)
import { Injectable, Logger } from '@nestjs/common';
import { LoggerService } from './logger.service';

@Injectable()
export class UserService {
  constructor(private logger: LoggerService) {}

  create(user: any) {
    this.logger.log(`Creating user: ${user.name}`);
    // ... implementation
  }
}
```

## Exception Handling

NestJS provides built-in exception filters:

```typescript
// user.controller.ts (updated)
import {
  // ... existing imports
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Get(':id')
findOne(@Param('id') id: string): User {
  const user = this.userService.findOne(+id);
  if (!user) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
  return user;
}

@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() createUserDto: Omit<User, 'id'>): User {
  if (!createUserDto.name || !createUserDto.email) {
    throw new BadRequestException('Name and email are required');
  }
  return this.userService.create(createUserDto);
}
```

## Validation

Install class-validator for request validation:

```bash
npm install class-validator class-transformer
npm install -D @types/express
```

```typescript
// create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;
}

// user.controller.ts (updated)
@Post()
@HttpCode(HttpStatus.CREATED)
create(@Body() createUserDto: CreateUserDto): User {
  return this.userService.create(createUserDto);
}
```

## Testing

NestJS has excellent testing support:

```typescript
// user.service.spec.ts
import { Test } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', () => {
    const result = service.create({ name: 'Test User', email: 'test@example.com' });
    expect(result).toEqual({
      id: expect.any(Number),
      name: 'Test User',
      email: 'test@example.com',
    });
  });
});
```

NestJS provides a solid foundation for building scalable and maintainable backend applications with TypeScript.