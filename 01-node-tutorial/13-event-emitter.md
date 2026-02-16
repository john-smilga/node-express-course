# Node.js Event Emitter Tutorial

The Event Emitter is a core module in Node.js that allows objects to communicate with each other through events. It's a fundamental pattern in Node.js that many built-in modules use. Let's explore it step by step.

## What is an Event Emitter?

Think of an event emitter like a radio station:
- The station **emits** (broadcasts) signals
- Radios that are tuned in **listen** (subscribe) to those signals
- When the signal is received, the radio **responds** by playing music

In Node.js, we have the same concept:
- An event emitter object **emits** named events
- Listener functions **subscribe** to these events
- When an event occurs, all subscribed listeners are **called**

## Getting Started

First, let's import the EventEmitter class from Node.js's built-in `events` module:

```javascript
const EventEmitter = require('events')
```

## Creating an Event Emitter Instance

To use events, we need to create an instance of EventEmitter:

```javascript
const customEmitter = new EventEmitter()
```

## The Two Main Methods: `on()` and `emit()`

The two most important methods are:
- **`on()`** - Used to listen for (subscribe to) an event
- **`emit()`** - Used to trigger (broadcast) an event

## Basic Example

Here's our working example that demonstrates the core concepts:

```javascript
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// Listen for the 'response' event
customEmitter.on('response', (name, id) => {
  console.log(`data received user ${name} with id:${id}`)
})

// Another listener for the same event
customEmitter.on('response', () => {
  console.log('some other logic here')
})

// Emit the 'response' event with data
customEmitter.emit('response', 'john', 34)
```

When you run this code, you'll see:
```
data received user john with id:34
some other logic here
```

## Key Concepts Explained

### 1. Order Matters
The order in which you set up your listeners (`on`) and emit events (`emit`) is crucial:

```javascript
// This works - listeners are set up before emitting
customEmitter.on('event', () => console.log('Listener 1'))
customEmitter.on('event', () => console.log('Listener 2'))
customEmitter.emit('event') // Both listeners will fire

// This won't work - emitting before listening
customEmitter.emit('event') // No listeners yet!
customEmitter.on('event', () => console.log('Too late!')) // This never runs
```

### 2. Passing Additional Arguments
You can pass any number of arguments from `emit()` to your listeners:

```javascript
customEmitter.on('userLogin', (username, timestamp, ip, userAgent) => {
  console.log(`${username} logged in at ${timestamp}`)
  console.log(`IP: ${ip}, Browser: ${userAgent}`)
})

customEmitter.emit(
  'userLogin', 
  'alice', 
  new Date().toISOString(),
  '192.168.1.100',
  'Mozilla/5.0...'
)
```

### 3. Multiple Listeners
You can attach multiple listeners to the same event. They will execute in the order they were registered:

```javascript
customEmitter.on('data', () => console.log('Logging data access'))
customEmitter.on('data', () => console.log('Validating data'))
customEmitter.on('data', () => console.log('Processing data'))

customEmitter.emit('data')
// Output:
// Logging data access
// Validating data
// Processing data
```

## Built-in Modules Use Event Emitter

Many Node.js built-in modules extend EventEmitter. Here's a practical example with an HTTP server:

```javascript
const http = require('http')

const server = http.createServer()

// The server object is an EventEmitter!
server.on('request', (req, res) => {
  console.log('Request received!')
  res.end('Hello World')
})

server.on('listening', () => {
  console.log('Server is listening on port 3000')
})

server.on('close', () => {
  console.log('Server closed')
})

server.listen(3000)
```

Another example with streams:

```javascript
const fs = require('fs')

const readStream = fs.createReadStream('./file.txt')

// Streams are EventEmitters too!
readStream.on('open', () => {
  console.log('File opened')
})

readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data`)
})

readStream.on('end', () => {
  console.log('Finished reading file')
})

readStream.on('error', (err) => {
  console.error('Error:', err.message)
})
```

## Additional Useful Methods

### `once()` - Listen for an event only once
```javascript
customEmitter.once('oneTime', () => {
  console.log('This will only run once!')
})

customEmitter.emit('oneTime') // Runs
customEmitter.emit('oneTime') // Does nothing
```

### `off()` or `removeListener()` - Stop listening
```javascript
function handler() {
  console.log('Event handled')
}

customEmitter.on('event', handler)

// Later, remove the listener
customEmitter.off('event', handler)
// or
customEmitter.removeListener('event', handler)
```

### `removeAllListeners()` - Remove all listeners for an event
```javascript
customEmitter.removeAllListeners('response')
```

## Common Patterns

### 1. Creating Custom Classes with EventEmitter
```javascript
const EventEmitter = require('events')

class User extends EventEmitter {
  constructor(name) {
    super()
    this.name = name
  }
  
  login() {
    console.log(`${this.name} logged in`)
    this.emit('login', this.name, Date.now())
  }
  
  logout() {
    console.log(`${this.name} logged out`)
    this.emit('logout', this.name)
  }
}

const user = new User('Alice')

user.on('login', (name, time) => {
  console.log(`Event: ${name} logged in at ${time}`)
})

user.on('logout', (name) => {
  console.log(`Event: ${name} logged out`)
})

user.login()
// Wait 1 second, then logout
setTimeout(() => user.logout(), 1000)
```

### 2. Error Handling
It's a good practice to always listen for 'error' events:

```javascript
customEmitter.on('error', (err) => {
  console.error('Something went wrong:', err.message)
})

// If you emit an error without listening, Node.js will throw
customEmitter.emit('error', new Error('Database connection failed'))
```

## Summary

Key takeaways:
1. **`on()`** subscribes to events, **`emit()`** publishes them
2. Listeners execute in the order they were registered
3. You can pass multiple arguments when emitting events
4. Many built-in modules (HTTP servers, streams, etc.) use EventEmitter
5. Always set up listeners before emitting events
6. Use `once()` for one-time listeners
7. Always handle error events to prevent crashes

Event Emitters are a powerful pattern for creating decoupled, event-driven architectures in Node.js applications!
