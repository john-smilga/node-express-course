## Node.js Path Module Tutorial

The path module is a built-in Node.js utility that provides tools for working with file and directory paths. This tutorial will guide you through its basic usage.

### Prerequisites
- Node.js installed on your system
- Basic knowledge of JavaScript

### Step 1: Setting Up the Project

Create a new directory for your project and navigate into it:
```bash
mkdir node-path-tutorial
cd node-path-tutorial
```

Create a new file called `path-demo.js`:
```bash
touch path-demo.js
```

### Step 2: Importing the Path Module

Open `path-demo.js` and start by importing the path module:

```javascript
const path = require('path');
```

The path module is built into Node.js, so no additional installation is needed.

### Step 3: Understanding Path Separators

Different operating systems use different path separators:
- Windows uses backslashes (`\`)
- Unix-based systems (Linux, macOS) use forward slashes (`/`)

The path module handles these differences automatically. Add this code to see your system's path separator:

```javascript
console.log('Path separator:', path.sep);
// Output on Windows: '\'
// Output on Unix: '/'
```

### Step 4: Joining Path Segments

The `path.join()` method joins multiple path segments into one path. Run this code:

```javascript
const filePath = path.join('/content/', 'subfolder', 'test.txt');
console.log('Joined path:', filePath);
// Output: '/content/subfolder/test.txt' (Unix) or '\content\subfolder\test.txt' (Windows)
```

Note how `path.join()`:
- Normalizes the path (removes extra slashes)
- Uses the correct separator for your OS
- Creates a valid path string

### Step 5: Extracting Filename from a Path

The `path.basename()` method returns the last portion of a path (usually the filename):

```javascript
const base = path.basename(filePath);
console.log('Base name (filename):', base);
// Output: 'test.txt'
```

You can also specify an extension to remove it:
```javascript
const baseWithoutExt = path.basename(filePath, '.txt');
console.log('Base name without extension:', baseWithoutExt);
// Output: 'test'
```

### Step 6: Getting the Absolute Path

The `path.resolve()` method resolves a sequence of paths into an absolute path:

```javascript
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log('Absolute path:', absolute);
// Output: /your/current/directory/content/subfolder/test.txt
```

`__dirname` is a global variable in Node.js that gives the absolute path of the current directory.

### Complete Code Example

Here's the complete code with additional examples:

```javascript
const path = require('path');

// 1. Get the path separator
console.log('1. Path separator:', path.sep);

// 2. Join path segments
const filePath = path.join('/content/', 'subfolder', 'test.txt');
console.log('2. Joined path:', filePath);

// 3. Get the filename from a path
const base = path.basename(filePath);
console.log('3. Base name:', base);

// 4. Get filename without extension
const baseWithoutExt = path.basename(filePath, '.txt');
console.log('4. Base name without extension:', baseWithoutExt);

// 5. Get the directory name
const dirName = path.dirname(filePath);
console.log('5. Directory name:', dirName);

// 6. Get the file extension
const extName = path.extname(filePath);
console.log('6. File extension:', extName);

// 7. Resolve to absolute path
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log('7. Absolute path:', absolute);

// 8. Parse a path into its components
const parsed = path.parse(absolute);
console.log('8. Parsed path:', parsed);
```

### Running the Code

Execute the script with Node.js:
```bash
node path-demo.js
```

### Common Use Cases for the Path Module

1. **Building file paths** for reading/writing files
2. **Getting file extensions** for file type validation
3. **Extracting filenames** from full paths
4. **Creating cross-platform compatible paths** in your applications

### Practice Exercises

Try these exercises to reinforce your learning:

1. Create a function that takes a filename and returns its extension
2. Write code to get the parent directory of a given file
3. Build a path to a configuration file in the user's home directory
4. Parse a URL-like path and extract different components

### Next Steps

- Read the [official Node.js path module documentation](https://nodejs.org/api/path.html)
- Learn about other useful Node.js core modules like `fs` (file system)
- Practice combining path operations with file system operations

This tutorial covers the basics of the Node.js path module. It's an essential tool for any Node.js developer, especially when working with file operations and building cross-platform applications.
