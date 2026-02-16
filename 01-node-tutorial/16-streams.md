# Node.js Streams Tutorial: Understanding Readable Streams

In this tutorial, we'll explore Node.js readable streams using the `fs.createReadStream()` method. Streams are a fundamental concept in Node.js that allow you to handle data efficiently, especially when working with large files.

## Prerequisites
- Basic knowledge of Node.js
- Node.js installed on your system

## What are Streams?

Streams are objects that let you read data from a source or write data to a destination in continuous fashion. Instead of reading a file entirely into memory, streams process data in chunks, making them memory-efficient and ideal for handling large files.

## The Code Explained

Let's break down the example code:

```javascript
const { createReadStream } = require('fs')

// Create a readable stream from a file
const stream = createReadStream('./content/big.txt')

// Listen for data events
stream.on('data', (result) => {
  console.log(result)
})

// Handle errors
stream.on('error', (err) => console.log(err))
```

### How It Works

1. **Import the `createReadStream` method** from the built-in `fs` (file system) module.

2. **Create a readable stream** by calling `createReadStream()` with the path to your file.

3. **Listen for the 'data' event** - this event is emitted whenever a new chunk of data is available from the stream.

4. **Handle errors** by listening for the 'error' event.

## Understanding Buffer Size

By default, `createReadStream()` reads files in chunks of **64 kilobytes**. This is controlled by the `highWaterMark` option.

```javascript
// Read in 90KB chunks instead of the default 64KB
const stream = createReadStream('./content/big.txt', { 
  highWaterMark: 90000 
})
```

The last chunk will be smaller than the specified size (the remainder of the file).

## Working with Text Encoding

By default, the stream returns data as buffers. To get strings instead, specify an encoding:

```javascript
const stream = createReadStream('./content/big.txt', { 
  encoding: 'utf8' 
})
```

## Complete Example with All Options

```javascript
const { createReadStream } = require('fs')
const path = require('path')

const filePath = path.join(__dirname, './content/big.txt')

const stream = createReadStream(filePath, {
  highWaterMark: 90000,  // Read 90KB chunks
  encoding: 'utf8'        // Return strings instead of buffers
})

let chunkCount = 0

stream.on('data', (chunk) => {
  chunkCount++
  console.log(`Received chunk ${chunkCount}: ${chunk.length} characters`)
  // console.log(chunk) // Uncomment to see the actual data
})

stream.on('end', () => {
  console.log(`Finished reading file. Total chunks: ${chunkCount}`)
})

stream.on('error', (err) => {
  console.error('Error reading file:', err)
})
```

## Creating a Test File

To test the stream with a larger file, create one first:

```javascript
const { writeFileSync } = require('fs')

// Create a 1MB test file
for (let i = 0; i < 10000; i++) {
  writeFileSync('./content/big.txt', `Line ${i}: Hello world\n`, { flag: 'a' })
}
```

## Key Concepts

### 1. **Events**
- `data` - emitted when a new chunk is available
- `end` - emitted when all data has been read
- `error` - emitted when an error occurs
- `close` - emitted when the stream is closed

### 2. **Stream States**
- **Paused Mode** - Stream doesn't emit 'data' events
- **Flowing Mode** - Stream actively emits 'data' events (default with 'data' listener)

### 3. **Benefits of Streams**
- **Memory Efficiency**: Process files without loading them entirely into memory
- **Time Efficiency**: Start processing data immediately instead of waiting for the whole file
- **Composability**: Pipe streams together for powerful data processing

## Practical Example: File Copy with Streams

```javascript
const { createReadStream, createWriteStream } = require('fs')

const readStream = createReadStream('./content/big.txt', { encoding: 'utf8' })
const writeStream = createWriteStream('./content/copy.txt')

// Pipe data from read stream to write stream
readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('File copied successfully!')
})

readStream.on('error', (err) => {
  console.error('Error:', err)
})
```

## Common Use Cases for Streams

1. **Reading large files** (logs, videos, databases)
2. **Network communications** (HTTP requests/responses)
3. **Data compression** (zlib streams)
4. **File uploads/downloads**
5. **Real-time data processing**

## Error Handling Best Practices

Always handle stream errors to prevent crashes:

```javascript
const stream = createReadStream('./nonexistent-file.txt')

stream.on('error', (err) => {
  console.error('Stream error:', err.message)
  // Perform cleanup or fallback operations
})
```

## Conclusion

Streams are a powerful feature in Node.js that enable efficient data handling. By processing data in chunks rather than loading entire files into memory, you can build applications that handle large files gracefully and perform well under memory constraints.

## Practice Exercises

1. Try modifying the `highWaterMark` value and observe how it affects chunk sizes
2. Create a large CSV file and process it line by line using streams
3. Build a simple HTTP server that streams a video file to clients
4. Implement a file upload endpoint using streams

Remember: Streams are everywhere in Node.js - understanding them is key to building scalable applications!
