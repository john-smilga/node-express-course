## Introduction

This tutorial guides you through your first Node.js application. Node.js allows you to run JavaScript outside of a web browser, on servers and command-line tools.

## What is Node.js?

Node.js is a runtime environment that lets you execute JavaScript code on the server-side. It's built on top of Chrome's V8 JavaScript engine and is perfect for building scalable applications.

## Your First Node.js App

Let's examine the code from `01-intro.js`:

```javascript
const amount = 9

if (amount < 10) {
  console.log('small number')
} else {
  console.log('large number')
}

console.log(`hey it's my first node app!!!`)
```

### Breaking Down the Code

#### 1. **Variable Declaration**

```javascript
const amount = 9
```

- **`const`**: Declares a constant variable that cannot be reassigned after initialization
- **`amount`**: The variable name
- **`9`**: The initial value (a number)

**Key Points:**
- Use `const` by default (it's safer than `let` or `var`)
- Use `let` if you need to reassign the variable
- Avoid `var` in modern JavaScript

#### 2. **Conditional Logic (if/else statement)**

```javascript
if (amount < 10) {
  console.log('small number')
} else {
  console.log('large number')
}
```

**What happens here:**
- The `if` statement checks if `amount` is less than 10
- If the condition is `true`, it executes the code in the first block
- Otherwise (when condition is `false`), it executes the `else` block

**In this example:**
- Since `amount = 9`, and `9 < 10` is `true`
- The output will be: `small number`

#### 3. **Template Literals (String Interpolation)**

```javascript
console.log(`hey it's my first node app!!!`)
```

**Key Features:**
- Uses backticks (`` ` ``) instead of quotes
- Allows you to embed variables using `${}` syntax
- Makes multi-line strings easier to work with

**Example with variable interpolation:**
```javascript
const name = "Node.js"
console.log(`Welcome to ${name}!`)  // Output: Welcome to Node.js!
```

#### 4. **Console Output**

```javascript
console.log()
```

- Prints messages to the terminal/console
- Essential for debugging and monitoring your application

## Running the Code

### Prerequisites
- Node.js installed on your computer
- A terminal or command prompt

### Steps

1. **Create a file** named `01-intro.js` with the code above

2. **Open your terminal** and navigate to the file's directory:
   ```bash
   cd path/to/your/directory
   ```

3. **Run the file** using Node.js:
   ```bash
   node 01-intro.js
   ```

4. **Expected Output:**
   ```
   small number
   hey it's my first node app!!!
   ```

## Key Concepts Learned

| Concept | Explanation |
|---------|-------------|
| **const** | Declares an immutable variable |
| **if/else** | Conditional statement for decision-making |
| **Comparison Operator (<)** | Checks if a value is less than another |
| **console.log()** | Prints output to the console |
| **Template Literals** | String literals that allow embedded expressions |

## Practice Exercises

### Exercise 1: Change the Condition
Modify the code to check if `amount` is greater than 10:

```javascript
const amount = 9

if (amount > 10) {
  console.log('large number')
} else {
  console.log('small number')
}
```

**Question:** What will be the output?

### Exercise 2: Use Different Operators
Try these comparison operators:
- `>` (greater than)
- `>=` (greater than or equal)
- `<=` (less than or equal)
- `===` (strictly equal)
- `!==` (not equal)

### Exercise 3: Multiple Conditions with else if
```javascript
const amount = 10

if (amount < 10) {
  console.log('small number')
} else if (amount === 10) {
  console.log('exactly ten')
} else {
  console.log('large number')
}
```

### Exercise 4: Using Variables in Template Literals
```javascript
const amount = 9

if (amount < 10) {
  console.log(`${amount} is a small number`)
} else {
  console.log(`${amount} is a large number`)
}
```

## Next Steps

Now that you understand the basics, explore:

1. **Loops** - Repeat code multiple times
2. **Functions** - Create reusable code blocks
3. **Objects & Arrays** - Store and manage data
4. **File System** - Read and write files
5. **Modules** - Import and export code
6. **npm Packages** - Use third-party libraries

## Common Mistakes to Avoid

❌ **Using `var` instead of `const`/`let`**
```javascript
var amount = 9  // Avoid this
const amount = 9  // Better
```

❌ **Forgetting quotes in console.log()**
```javascript
console.log(hey it's my first node app)  // Error!
console.log('hey it\'s my first node app')  // Correct
console.log(`hey it's my first node app`)  // Best (template literal)
```

❌ **Using = instead of === for comparison**
```javascript
if (amount = 10) { }  // Wrong! This assigns, not compares
if (amount === 10) { }  // Correct! Compares values
```

## Summary

Congratulations! You've created your first Node.js application. You've learned about:
- ✅ Variable declaration with `const`
- ✅ Conditional logic with `if/else`
- ✅ String output with `console.log()`
- ✅ Template literals for dynamic strings

Continue building on these fundamentals to master Node.js!
```

This tutorial provides a comprehensive guide to your first Node.js application, covering the concepts, execution steps, and practical exercises to reinforce learning.
