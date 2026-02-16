# Node.js HTTP Streams Tutorial

## Understanding Streams in HTTP Responses

This tutorial explores how to use Node.js streams to efficiently serve large files over HTTP, comparing the traditional approach with stream-based solutions.

## The Code Explained

```javascript
var http = require('http')
var fs = require('fs')

http
  .createServer(function (req, res) {
    // Traditional approach - loading entire file into memory
    // const text = fs.readFileSync('./content/big.txt', 'utf8')
    // res.end(text)
    
    // Stream-based approach - chunks of data
    const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
    fileStream.on('open', () => {
      fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
      res.end(err)
    })
  })
  .listen(5000)
```

## Key Concepts

### 1. **What are Streams?**
Streams are objects that let you read data from a source or write data to a destination continuously. Instead of reading a file entirely into memory, streams process data in chunks.

### 2. **Why Use Streams?**
- **Memory Efficiency**: Process large files without loading them entirely into RAM
- **Time Efficiency**: Start processing data immediately without waiting for the entire payload
- **Better User Experience**: Clients receive data progressively

## Comparison: Without Streams vs With Streams

### Without Streams (Traditional Approach)
```javascript
// This loads the ENTIRE file into memory before sending
const text = fs.readFileSync('./content/big.txt', 'utf8')
res.end(text)
```
**Problems:**
- High memory usage for large files
- Client waits for complete file read before receiving anything
- Can crash your server with very large files

### With Streams (Our Example)
```javascript
// This reads and sends data in CHUNKS
const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
fileStream.pipe(res)
```
**Benefits:**
- Low memory footprint
- Client receives data as it's being read
- Handles files of any size

## Step-by-Step Breakdown

### 1. **Creating the Server**
```javascript
http.createServer(function (req, res) {
  // Request handling logic
}).listen(5000)
```
Creates an HTTP server listening on port 5000.

### 2. **Creating a Read Stream**
```javascript
const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
```
- Opens the file as a readable stream
- `'utf8'` encoding ensures we get text data
- File is read in chunks (default: 64KB)

### 3. **The Magic of `.pipe()`**
```javascript
fileStream.on('open', () => {
  fileStream.pipe(res)
})
```
- `pipe()` automatically handles:
  - Reading data chunks from the file
  - Writing chunks to the HTTP response
  - Backpressure management
  - Ending the response when done

### 4. **Error Handling**
```javascript
fileStream.on('error', (err) => {
  res.end(err)
})
```
Catches and handles any stream errors (like file not found).

## Practical Examples

### Example 1: Creating a Test File
First, create a large text file to test with:

```javascript
// create-big-file.js
const fs = require('fs')
const file = fs.createWriteStream('./content/big.txt')

for(let i = 0; i <= 10000; i++) {
  file.write('Lorem ipsum dolor sit amet, consectetur adipiscing elit. ')
}
file.end()
```

### Example 2: Monitoring Memory Usage
Compare memory usage between approaches:

```javascript
// memory-test.js
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  if (req.url === '/stream') {
    // Stream approach
    console.log('Memory before stream:', process.memoryUsage().rss / 1024 / 1024, 'MB')
    const stream = fs.createReadStream('./content/big.txt')
    stream.pipe(res)
    stream.on('end', () => {
      console.log('Memory after stream:', process.memoryUsage().rss / 1024 / 1024, 'MB')
    })
  } else if (req.url === '/nostream') {
    // Traditional approach
    console.log('Memory before read:', process.memoryUsage().rss / 1024 / 1024, 'MB')
    fs.readFile('./content/big.txt', (err, data) => {
      res.end(data)
      console.log('Memory after read:', process.memoryUsage().rss / 1024 / 1024, 'MB')
    })
  }
}).listen(5000)
```

### Example 3: Adding Progress Indicator
```javascript
const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const fileStream = fs.createReadStream('./content/big.txt', 'utf8')
  let bytesRead = 0
  
  fileStream.on('data', (chunk) => {
    bytesRead += chunk.length
    console.log(`Read ${bytesRead} bytes so far...`)
  })
  
  fileStream.on('open', () => {
    fileStream.pipe(res)
  })
  
  fileStream.on('end', () => {
    console.log(`Completed! Total: ${bytesRead} bytes`)
  })
  
  fileStream.on('error', (err) => {
    console.error('Stream error:', err)
    res.statusCode = 500
    res.end('File not found')
  })
}).listen(5000)
```

## Testing Your Server

1. **Start the server:**
```bash
node server.js
```

2. **Test in browser:**
```
http://localhost:5000
```

3. **Test with curl:**
```bash
curl http://localhost:5000
```

4. **Monitor memory usage:**
```bash
# In another terminal while server is running
top -p $(pgrep node)
```

## Advanced Stream Techniques

### 1. **Transforming Data on the Fly**
```javascript
const { Transform } = require('stream')

const upperCaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
})

const fileStream = fs.createReadStream('./content/big.txt')
fileStream
  .pipe(upperCaseTransform)
  .pipe(res)
```

### 2. **Handling Multiple File Types**
```javascript
const path = require('path')

http.createServer((req, res) => {
  const filePath = './content' + req.url
  const extname = path.extname(filePath)
  
  // Set appropriate content type
  const contentTypes = {
    '.txt': 'text/plain',
    '.html': 'text/html',
    '.json': 'application/json'
  }
  
  res.setHeader('Content-Type', contentTypes[extname] || 'application/octet-stream')
  
  const stream = fs.createReadStream(filePath)
  stream.pipe(res)
  
  stream.on('error', () => {
    res.statusCode = 404
    res.end('File not found')
  })
}).listen(5000)
```

## Best Practices

1. **Always handle stream errors** to prevent server crashes
2. **Set appropriate MIME types** for different file types
3. **Consider compression** for text files:
```javascript
const zlib = require('zlib')
fileStream.pipe(zlib.createGzip()).pipe(res)
```

4. **Implement range requests** for video/audio streaming
5. **Use `pipe()`** instead of manual event handling when possible

## Common Pitfalls to Avoid

❌ **Don't forget error handling** - Unhandled stream errors crash the server
❌ **Avoid mixing streams with synchronous operations** - This defeats the purpose
❌ **Don't modify the response after piping** - The stream controls the response

## Summary

Streams in Node.js are powerful tools for handling data efficiently. By using `fs.createReadStream()` and `.pipe()`, you can:
- Serve large files without memory issues
- Provide faster response times to clients
- Build scalable applications
- Handle multiple concurrent requests efficiently

The example code demonstrates the elegant simplicity of streams: just a few lines of code transform your server from memory-intensive to highly efficient!
