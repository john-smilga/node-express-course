# Node.js Modules Tutorial: Understanding CommonJS

This tutorial explains the Node.js module system using CommonJS, based on the code pattern you provided. We'll explore how modules work, how to share code between files, and the different ways to export and import functionality.

## Prerequisites
- Node.js installed on your system
- Basic understanding of JavaScript
- A code editor

## Project Structure
Create a folder for this tutorial with the following files:
```
node-modules-tutorial/
├── 04-names.js
├── 05-utils.js
├── 06-alternative-flavor.js
├── 07-mind-grenade.js
└── app.js
```

## 1. Understanding Modules in Node.js

In Node.js, every file is a module by default. This means variables and functions defined in a file are scoped to that module and not automatically available to other files.

### Key Concepts:
- **Module**: Each JavaScript file is treated as a separate module
- **Encapsulation**: Code within a module is private by default
- **Sharing**: Use `module.exports` or `exports` to share code
- **Importing**: Use `require()` to import code from other modules

## 2. Creating Modules with Exports

### File: `04-names.js`
This module demonstrates how to export multiple variables:

```javascript
// Local variable (not shared)
const secret = 'SUPER SECRET'

// Variables to share
const john = 'john'
const peter = 'peter'

module.exports = { john, peter }
```

**Explanation:**
- `secret` is a local variable - it's not exported, so it can't be accessed from other files
- `john` and `peter` are exported as an object
- `module.exports` specifies what should be available when this file is required

### File: `05-utils.js`
This module exports a single function:

```javascript
const sayHi = (name) => {
    console.log(`Hello there ${name}`)
}

module.exports = sayHi
```

**Explanation:**
- A function is defined and then assigned to `module.exports`
- This exports the function directly (not inside an object)

### File: `06-alternative-flavor.js`
This shows different ways to export values:

```javascript
// Method 1: Direct export as property
module.exports.items = ['item1', 'item2']

// Method 2: Export object
const person = {
    name: 'bob',
}

module.exports.singlePerson = person
```

**Explanation:**
- You can add properties to `module.exports` directly
- This demonstrates that you can export multiple things without creating a single export object at the end

## 3. Module Execution on Import

### File: `07-mind-grenade.js`
This file demonstrates that code runs when a module is required:

```javascript
const num1 = 5
const num2 = 10

function addValues() {
    console.log(`the sum is : ${num1 + num2}`)
}

addValues()
```

**Explanation:**
- When this module is required, the code executes immediately
- No exports are provided, but the function runs during import
- This is useful for initialization code or setup tasks

## 4. Bringing It All Together

### File: `app.js`
This is the main file that imports and uses all modules:

```javascript
// Import names module
const names = require('./04-names')
// Import sayHi function
const sayHi = require('./05-utils')
// Import alternative flavor module
const data = require('./06-alternative-flavor')
// Import mind grenade (executes code automatically)
require('./07-mind-grenade')

// Use the imported modules
sayHi('susan')
sayHi(names.john)
sayHi(names.peter)

// Uncomment to see the data structure
// console.log(data)
```

## 5. Running the Application

To run the application, execute:
```bash
node app.js
```

Expected output:
```
the sum is : 15    (from 07-mind-grenade.js)
Hello there susan
Hello there john
Hello there peter
```

## Complete Code Examples

### 04-names.js
```javascript
// local
const secret = 'SUPER SECRET'
// share
const john = 'john'
const peter = 'peter'

module.exports = { john, peter }
```

### 05-utils.js
```javascript
const sayHi = (name) => {
    console.log(`Hello there ${name}`)
}
// export default
module.exports = sayHi
```

### 06-alternative-flavor.js
```javascript
module.exports.items = ['item1', 'item2']
const person = {
    name: 'bob',
}

module.exports.singlePerson = person
```

### 07-mind-grenade.js
```javascript
const num1 = 5
const num2 = 10

function addValues() {
    console.log(`the sum is : ${num1 + num2}`)
}

addValues()
```

### app.js
```javascript
// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./04-names')
const sayHi = require('./05-utils')
const data = require('./06-alternative-flavor')
require('./07-mind-grenade')

sayHi('susan')
sayHi(names.john)
sayHi(names.peter)
```

## Key Takeaways

1. **Module Encapsulation**: Each file has its own scope - variables aren't shared unless explicitly exported

2. **Export Patterns**: 
   - Export objects: `module.exports = { key: value }`
   - Export functions: `module.exports = function`
   - Add properties: `module.exports.property = value`

3. **Import Patterns**:
   - Use `require('./path')` to import
   - The `.js` extension is optional
   - Imported modules are cached after first require

4. **Module Execution**: Code in required modules runs immediately when imported, even without exports

5. **Destructuring**: You can destructure imports to access specific exports:
   ```javascript
   const { john, peter } = require('./04-names')
   ```

## Practice Exercises

1. Create a new module that exports multiple utility functions
2. Import only specific items using destructuring
3. Create a module that doesn't export anything but performs a setup task
4. Experiment with circular dependencies (and learn why to avoid them)

This module pattern is fundamental to Node.js development and helps create maintainable, organized applications by separating concerns into different files.
