---
title: JavaScript Design Patterns
description: Essential design patterns for JavaScript developers to write maintainable and scalable code.
pubDate: 2023-08-15
author: Kyaw Soe
tags: ['javascript', 'design-patterns', 'architecture', 'best-practices']
category: 'Web Development'
technology: 'JavaScript'
level: 'advanced'
course: 'javascript-mastery'
lessonNumber: 5
readingTime: 12
---

<div class="blog-meta-enhanced">

<span class="tech-badge">JavaScript</span>
<span class="level-badge level-advanced">Advanced</span>
<span class="course-badge">JS Mastery L5</span>

</div>

<div class="course-navigation">
  <div class="course-info">
    <h3>Part of: <a href="/courses/javascript-mastery/">Complete JavaScript Mastery</a></h3>
    <p>Lesson 5 of 5</p>
  </div>
  <div class="lesson-nav">
    <div class="prev-lesson">
      <a href="/blog/js-async-await/">&larr; Previous: JavaScript Async/Await</a>
    </div>
    <div class="next-lesson">
      <a href="/courses/javascript-mastery/">Complete Course →</a>
    </div>
  </div>
</div>

## Introduction

Design patterns are reusable solutions to common problems in software design. In JavaScript, design patterns help developers write more maintainable, scalable, and efficient code. Understanding these patterns is crucial for building robust applications and becoming a better JavaScript developer.

This guide covers the most important design patterns in JavaScript, including creational, structural, and behavioral patterns that you'll encounter in real-world applications.

---

## Creational Patterns

Creational patterns focus on object creation mechanisms, trying to create objects in a manner suitable to the situation.

### 1. Constructor Pattern

The Constructor pattern is used to create specific type of objects. JavaScript has a constructor function that works similarly to classes in other languages.

```js
function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  
  this.start = function() {
    console.log(`${this.brand} ${this.model} is starting...`);
  };
}

const myCar = new Car("Toyota", "Camry", 2022);
myCar.start(); // Toyota Camry is starting...
```

### 2. Module Pattern

The Module pattern is used to create privacy and encapsulation in JavaScript. It allows you to have private and public members.

```js
const Calculator = (function() {
  // Private variables and functions
  let history = [];
  
  function addToHistory(operation) {
    history.push(operation);
  }
  
  // Public API
  return {
    add: function(a, b) {
      const result = a + b;
      addToHistory(`${a} + ${b} = ${result}`);
      return result;
    },
    
    subtract: function(a, b) {
      const result = a - b;
      addToHistory(`${a} - ${b} = ${result}`);
      return result;
    },
    
    getHistory: function() {
      return [...history]; // Return a copy to maintain privacy
    }
  };
})();

console.log(Calculator.add(5, 3)); // 8
console.log(Calculator.getHistory()); // ["5 + 3 = 8"]
```

### 3. Factory Pattern

The Factory pattern provides a way to create objects without specifying the exact class or constructor function.

```js
function UserFactory() {
  this.create = function(type) {
    let user;
    
    if (type === 'admin') {
      user = new AdminUser();
    } else if (type === 'guest') {
      user = new GuestUser();
    } else {
      user = new RegularUser();
    }
    
    user.type = type;
    user.define = function() {
      console.log(`I am a ${this.type} user with permissions: ${this.permissions}`);
    };
    
    return user;
  };
}

function AdminUser() {
  this.permissions = ['read', 'write', 'delete'];
}

function GuestUser() {
  this.permissions = ['read'];
}

function RegularUser() {
  this.permissions = ['read', 'write'];
}

const factory = new UserFactory();
const admin = factory.create('admin');
const guest = factory.create('guest');

admin.define(); // I am a admin user with permissions: read,write,delete
guest.define(); // I am a guest user with permissions: read
```

---

## Structural Patterns

Structural patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient.

### 1. Decorator Pattern

The Decorator pattern allows adding new functionality to an object without altering its structure.

```js
// Base coffee class
class Coffee {
  constructor() {
    this.cost = 2.00;
    this.description = 'Basic coffee';
  }
  
  getCost() {
    return this.cost;
  }
  
  getDescription() {
    return this.description;
  }
}

// Decorator base class
class CoffeeDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  getCost() {
    return this.coffee.getCost();
  }
  
  getDescription() {
    return this.coffee.getDescription();
  }
}

// Specific decorators
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getCost() {
    return this.coffee.getCost() + 0.50;
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', with milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }
  
  getCost() {
    return this.coffee.getCost() + 0.25;
  }
  
  getDescription() {
    return this.coffee.getDescription() + ', with sugar';
  }
}

// Usage
let coffee = new Coffee();
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`); // Basic coffee: $2

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`); // Basic coffee, with milk: $2.5

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`); // Basic coffee, with milk, with sugar: $2.75
```

### 2. Facade Pattern

The Facade pattern provides a simplified interface to a complex subsystem.

```js
// Complex subsystem
const CPU = {
  freeze: function() { console.log('CPU: Freezing...'); },
  jump: function(position) { console.log(`CPU: Jumping to ${position}`); },
  execute: function() { console.log('CPU: Executing...'); }
};

const Memory = {
  load: function(position, data) { 
    console.log(`Memory: Loading ${data} at ${position}`); 
    return data;
  }
};

const HardDrive = {
  read: function(lba, size) { 
    console.log(`HardDrive: Reading ${size} bytes from LBA ${lba}`); 
    return 'OS data';
  }
};

// Facade
class ComputerFacade {
  constructor() {
    this.cpu = CPU;
    this.memory = Memory;
    this.hardDrive = HardDrive;
  }
  
  start() {
    console.log('Computer starting up...');
    this.cpu.freeze();
    const data = this.hardDrive.read(0, 1024);
    this.memory.load(0, data);
    this.cpu.jump(0);
    this.cpu.execute();
    console.log('Computer started successfully!');
  }
}

// Usage
const computer = new ComputerFacade();
computer.start();
```

---

## Behavioral Patterns

Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.

### 1. Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all dependents are notified automatically.

```js
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} received update: ${data}`);
  }
}

// Usage
const newsAgency = new Subject();

const tvChannel = new Observer('TV Channel');
const radio = new Observer('Radio Station');
const newspaper = new Observer('Newspaper');

newsAgency.subscribe(tvChannel);
newsAgency.subscribe(radio);
newsAgency.subscribe(newspaper);

newsAgency.notify('Breaking news: New JavaScript framework released!');

// Unsubscribe one observer
newsAgency.unsubscribe(radio);
newsAgency.notify('Weather update: Sunny with a chance of rain.');
```

### 2. Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

```js
// Strategy interface
class PaymentStrategy {
  pay(amount) {
    throw new Error('Pay method must be implemented');
  }
}

// Concrete strategies
class CreditCardStrategy extends PaymentStrategy {
  constructor(cardNumber, cvv) {
    super();
    this.cardNumber = cardNumber;
    this.cvv = cvv;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using Credit Card ending in ${this.cardNumber.slice(-4)}`);
  }
}

class PayPalStrategy extends PaymentStrategy {
  constructor(email) {
    super();
    this.email = email;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using PayPal account ${this.email}`);
  }
}

class BitcoinStrategy extends PaymentStrategy {
  constructor(wallet) {
    super();
    this.wallet = wallet;
  }
  
  pay(amount) {
    console.log(`Paid $${amount} using Bitcoin wallet ${this.wallet}`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  processPayment() {
    const total = this.items.reduce((sum, item) => sum + item.price, 0);
    if (this.paymentStrategy) {
      this.paymentStrategy.pay(total);
    } else {
      throw new Error('Payment strategy not set');
    }
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Laptop', price: 999.99 });
cart.addItem({ name: 'Mouse', price: 29.99 });

cart.setPaymentStrategy(new CreditCardStrategy('1234567890123456', '123'));
cart.processPayment(); // Paid $1029.98 using Credit Card ending in 3456

cart.setPaymentStrategy(new PayPalStrategy('user@example.com'));
cart.processPayment(); // Paid $1029.98 using PayPal account user@example.com
```

### 3. Command Pattern

The Command pattern turns a request into a stand-alone object that contains all information about the request.

```js
// Command interface
class Command {
  execute() {
    throw new Error('Execute method must be implemented');
  }
  
  undo() {
    throw new Error('Undo method must be implemented');
  }
}

// Receiver
class TextEditor {
  constructor() {
    this.content = '';
  }
  
  write(text) {
    this.content += text;
    console.log(`Content: ${this.content}`);
  }
  
  deleteLastWord() {
    const words = this.content.split(' ');
    words.pop();
    this.content = words.join(' ');
    console.log(`Content: ${this.content}`);
  }
}

// Concrete commands
class WriteCommand extends Command {
  constructor(editor, text) {
    super();
    this.editor = editor;
    this.text = text;
  }
  
  execute() {
    this.editor.write(this.text);
  }
  
  undo() {
    const words = this.editor.content.split(' ');
    const textWords = this.text.split(' ');
    for (let i = 0; i < textWords.length; i++) {
      words.pop();
    }
    this.editor.content = words.join(' ');
    console.log(`Undo write: ${this.editor.content}`);
  }
}

class DeleteCommand extends Command {
  constructor(editor) {
    super();
    this.editor = editor;
    this.deletedContent = '';
  }
  
  execute() {
    const words = this.editor.content.split(' ');
    this.deletedContent = words.pop() || '';
    this.editor.content = words.join(' ');
    console.log(`Deleted: ${this.deletedContent}, Content: ${this.editor.content}`);
  }
  
  undo() {
    this.editor.content += ` ${this.deletedContent}`;
    console.log(`Undo delete: ${this.editor.content}`);
  }
}

// Invoker
class EditorInvoker {
  constructor() {
    this.history = [];
  }
  
  executeCommand(command) {
    command.execute();
    this.history.push(command);
  }
  
  undoLastCommand() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
    }
  }
}

// Usage
const editor = new TextEditor();
const invoker = new EditorInvoker();

invoker.executeCommand(new WriteCommand(editor, 'Hello World'));
invoker.executeCommand(new WriteCommand(editor, 'from JavaScript'));
invoker.undoLastCommand(); // Undo the last write
```

---

## Modern JavaScript Patterns

### 1. Revealing Module Pattern

An improvement over the Module pattern that provides better readability and maintainability.

```js
const Calculator = (function() {
  let history = [];
  
  function addToHistory(operation) {
    history.push(operation);
  }
  
  function add(a, b) {
    const result = a + b;
    addToHistory(`${a} + ${b} = ${result}`);
    return result;
  }
  
  function subtract(a, b) {
    const result = a - b;
    addToHistory(`${a} - ${b} = ${result}`);
    return result;
  }
  
  function getHistory() {
    return [...history];
  }
  
  // Reveal only the methods we want to be public
  return {
    add: add,
    subtract: subtract,
    getHistory: getHistory
  };
})();

console.log(Calculator.add(10, 5)); // 15
console.log(Calculator.getHistory()); // ["10 + 5 = 15"]
```

### 2. Publish/Subscribe Pattern

A more decoupled version of the Observer pattern.

```js
class EventBus {
  constructor() {
    this.events = {};
  }
  
  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  publish(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  unsubscribe(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
}

// Usage
const eventBus = new EventBus();

eventBus.subscribe('user:login', (user) => {
  console.log(`Welcome back, ${user.name}!`);
});

eventBus.subscribe('user:login', (user) => {
  console.log(`Logging in user: ${user.id}`);
});

eventBus.publish('user:login', { id: 123, name: 'John Doe' });
```

---

## When to Use Each Pattern

- **Constructor Pattern**: When you need to create multiple similar objects
- **Module Pattern**: When you need to encapsulate private data and public methods
- **Factory Pattern**: When object creation is complex or you want to decouple creation from use
- **Decorator Pattern**: When you want to add functionality without modifying existing code
- **Observer Pattern**: When you need to maintain consistency between related objects without making them tightly coupled
- **Strategy Pattern**: When you have multiple algorithms for the same task
- **Command Pattern**: When you need to parameterize objects with operations or support undo/redo functionality

---

## Summary

JavaScript design patterns provide proven solutions to common programming challenges:

- **Creational patterns** help with object creation
- **Structural patterns** help with object composition
- **Behavioral patterns** help with object interaction

Understanding and applying these patterns will make your code more maintainable, scalable, and easier to understand for other developers. The key is to use them appropriately and not over-engineer simple problems.