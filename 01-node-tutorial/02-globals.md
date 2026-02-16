## Overview

In Node.js, there are global objects and variables that are available in every module without needing to import them. Unlike browser JavaScript which has the `window` object, Node.js provides its own set of globals designed for server-side development.

## Key Node.js Globals

### 1. **`__dirname`** - Current Directory Path
```javascript
console.log(__dirname)
```

**What it does:** Returns the absolute path of the current directory containing the currently executing file.

**Example output:**
```
/Users/username/projects/node-express-course/01-node-tutorial
```

**Common use cases:**
- Reading files relative to the current directory
- Setting up file paths for asset serving
- Constructing dynamic paths for logging

**Example:**
```javascript
const path = require('path');
const filePath = path.join(__dirname, 'data', 'users.json');
```

---

### 2. **`__filename`** - Current File Name
**What it does:** Returns the absolute file path of the currently executing file.

**Example output:**
```
/Users/username/projects/node-express-course/01-node-tutorial/02-globals.js
```

---

### 3. **`require()`** - Module System Function
**What it does:** Allows you to import modules using the CommonJS module system.

**Example:**
```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
```

---

### 4. **`module`** - Current Module Information
**What it does:** Contains information about the current module, including exports and other metadata.

**Example:**
```javascript
console.log(module)
// Shows: { exports: {}, ...other properties }

module.exports = { name: 'My Module' };
```

---

### 5. **`process`** - Environment Information
**What it does:** Provides information about the Node.js process and environment variables.

**Common properties:**
```javascript
process.env       // Environment variables
process.argv      // Command-line arguments
process.cwd()     // Current working directory
process.exit()    // Exit the process
process.version   // Node.js version
```

**Example:**
```javascript
console.log(process.env.NODE_ENV);  // 'development' or 'production'
console.log(process.argv);           // Array of command-line arguments
```

---

## Practical Example: setInterval

The code also demonstrates **`setInterval()`**, a global function for running code repeatedly:

```javascript
setInterval(() => {
  console.log('hello world')
}, 1000)
```

**What it does:** Runs the callback function every 1000 milliseconds (1 second).

**Output:**
```
hello world
hello world
hello world
... (repeats indefinitely)
```

---

## Complete Working Example

```javascript
// Display current directory and file
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);

// Run a function every 1 second
let count = 0;
setInterval(() => {
  count++;
  console.log(`[${count}] hello world`);
  
  // Stop after 5 iterations
  if (count === 5) {
    process.exit(0);  // Use process.exit() to terminate
  }
}, 1000);
```

---

## Key Differences from Browser JavaScript

| Browser | Node.js |
|---------|---------|
| `window` global | `global` global |
| `document` available | No DOM |
| Can't access file system directly | `fs` module for file access |
| No `__dirname` or `__filename` | Both available automatically |
| `process` not available | `process` always available |

---

## Summary

Node.js globals are essential for:
- ✅ Working with file paths (`__dirname`, `__filename`)
- ✅ Managing modules (`require`, `module`)
- ✅ Accessing environment configuration (`process`)
- ✅ Creating timers and intervals (`setInterval`, `setTimeout`)

These globals make it easy to build server-side applications without needing to import everything explicitly!
