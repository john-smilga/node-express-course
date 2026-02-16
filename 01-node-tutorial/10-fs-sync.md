# Node.js Synchronous File Operations Tutorial

This tutorial explains how to use synchronous file operations in Node.js, based on the provided code example.

## Prerequisites
- Node.js installed on your system
- Basic understanding of JavaScript
- A code editor

## Step 1: Understanding Synchronous vs Asynchronous Operations

Synchronous operations in Node.js execute line by line. Each operation must complete before the next one begins. This is also known as "blocking" code because it blocks the execution of subsequent code until the current operation finishes.

## Step 2: Setting Up the Project

Create a new directory for your project and navigate into it:

```bash
mkdir node-sync-tutorial
cd node-sync-tutorial
```

## Step 3: Creating the Required Files

First, let's create a `content` directory and the text files we'll be reading:

```bash
mkdir content
```

Create `first.txt` in the content folder:
```
Hello, this is the first text file.
```

Create `second.txt` in the content folder:
```
This is the second text file with some content.
```

## Step 4: The Synchronous File Operations Code

Create a new file called `sync-demo.js` with the following code:

```javascript
// Import the required methods from the fs (file system) module
const { readFileSync, writeFileSync } = require('fs')

console.log('start')

// Synchronously read the contents of first.txt
const first = readFileSync('./content/first.txt', 'utf8')
console.log('First file read completed')

// Synchronously read the contents of second.txt
const second = readFileSync('./content/second.txt', 'utf8')
console.log('Second file read completed')

// Synchronously write to a new file
writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' } // 'a' flag means append to the file if it exists
)
console.log('Write operation completed')

console.log('done with this task')
console.log('starting the next one')
```

## Step 5: Understanding Each Line

### Importing the Module
```javascript
const { readFileSync, writeFileSync } = require('fs')
```
This line uses destructuring to import only the synchronous methods we need from Node.js's built-in `fs` (file system) module.

### Reading Files Synchronously
```javascript
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')
```
- `readFileSync()` reads the entire contents of a file
- First parameter: the file path
- Second parameter: the encoding (utf8 ensures we get text, not a buffer)
- The function blocks execution until the file is completely read

### Writing Files Synchronously
```javascript
writeFileSync(
  './content/result-sync.txt',
  `Here is the result : ${first}, ${second}`,
  { flag: 'a' }
)
```
- `writeFileSync()` writes data to a file
- First parameter: the file path (creates the file if it doesn't exist)
- Second parameter: the content to write (using template literals)
- Third parameter: options object - `{ flag: 'a' }` means append to existing content

## Step 6: Running the Code

Execute the program:

```bash
node sync-demo.js
```

Expected output:
```
start
First file read completed
Second file read completed
Write operation completed
done with this task
starting the next one
```

After running, check the `content/result-sync.txt` file - it should contain the combined content from both files.

## Step 7: Key Concepts Explained

### The Blocking Nature
Notice how the console logs appear in perfect order. Each operation waits for the previous one:
1. "start" appears immediately
2. Then the first file is read completely
3. Then the second file is read completely
4. Then the write operation happens
5. Only after everything is done, we see "done with this task"

### The Flag Option
The `{ flag: 'a' }` option is important:
- Without it (or with `{ flag: 'w' }`), the file would be overwritten each time
- With `'a'`, content is appended to the existing file
- Run the program multiple times to see the content grow

## Step 8: Error Handling

Synchronous operations can throw errors. Here's how to handle them:

```javascript
const { readFileSync, writeFileSync } = require('fs')

console.log('start')

try {
  const first = readFileSync('./content/first.txt', 'utf8')
  console.log('First file read completed')
  
  const second = readFileSync('./content/second.txt', 'utf8')
  console.log('Second file read completed')
  
  writeFileSync(
    './content/result-sync.txt',
    `Here is the result : ${first}, ${second}\n`,
    { flag: 'a' }
  )
  console.log('Write operation completed')
} catch (error) {
  console.error('An error occurred:', error.message)
}

console.log('done with this task')
```

## Step 9: When to Use Synchronous Operations

### ✅ Good Use Cases:
- Initialization scripts that run once at startup
- Simple command-line tools
- Learning and debugging
- When you need guaranteed sequential execution

### ❌ Avoid In:
- Web servers handling multiple requests
- Any application requiring high concurrency
- Performance-critical applications

## Complete Code Example with Comments

```javascript
/**
 * Node.js Synchronous File Operations Demo
 * This demonstrates blocking I/O operations
 */

// Import only the synchronous methods we need
const { readFileSync, writeFileSync } = require('fs')
const path = require('path') // For better path handling

console.log('🚀 Application started')

// Use path.join for cross-platform compatibility
const firstPath = path.join(__dirname, 'content', 'first.txt')
const secondPath = path.join(__dirname, 'content', 'second.txt')
const resultPath = path.join(__dirname, 'content', 'result-sync.txt')

try {
  // Each operation waits for the previous one to complete
  console.log('📖 Reading first file...')
  const first = readFileSync(firstPath, 'utf8')
  console.log('✅ First file read complete')
  
  console.log('📖 Reading second file...')
  const second = readFileSync(secondPath, 'utf8')
  console.log('✅ Second file read complete')
  
  console.log('✍️ Writing combined content...')
  writeFileSync(
    resultPath,
    `Here is the result : ${first}, ${second}\n`,
    { flag: 'a' } // Append mode
  )
  console.log('✅ Write operation complete')
  
} catch (error) {
  console.error('❌ Error:', error.message)
}

console.log('✨ Task completed')
console.log('➡️ Starting next task...')
```

## Summary

This tutorial demonstrated:
- How synchronous file operations work in Node.js
- Reading files with `readFileSync()`
- Writing files with `writeFileSync()`
- The blocking nature of synchronous code
- Error handling with try-catch
- When to use (and avoid) synchronous operations

The key takeaway is that synchronous operations are simple and predictable but can hurt performance in applications that need to handle multiple operations concurrently.
