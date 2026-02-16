# Node.js HTTP Package Tutorial

## Introduction to the HTTP Module

The `http` module is a built-in Node.js module that allows you to create web servers and handle HTTP requests and responses. In this tutorial, we'll explore how to build a simple web server using this core module.

## Prerequisites
- Node.js installed on your system
- Basic JavaScript knowledge
- A code editor

## Setting Up Your First HTTP Server

Let's break down the provided code and understand each part:

```javascript
const http = require('http')
```

This line imports Node.js's built-in `http` module, giving us access to methods for creating HTTP servers and clients.

## Creating a Server

```javascript
const server = http.createServer((req, res) => {
  // Request handling logic goes here
})
```

The `http.createServer()` method creates an HTTP server object. It takes a callback function that executes whenever a request is made to the server. This callback receives two important objects:

- **req (Request object)**: Contains information about the incoming request (URL, headers, method, etc.)
- **res (Response object)**: Used to send data back to the client

## Understanding the Request Object

The `req.url` property tells us which page the client is trying to access. Based on this, we can serve different content:

### Home Page Route (/)
```javascript
if (req.url === '/') {
  res.end('Welcome to our home page')
}
```

When a user visits the root URL (`http://localhost:5000/`), we send back a simple text response.

### About Page Route (/about)
```javascript
else if (req.url === '/about') {
  res.end('Here is our short history')
}
```

When a user visits `/about`, we send a different text response.

### 404 Page - Not Found
```javascript
else {
  res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
  `)
}
```

For any other URL that doesn't match our defined routes, we send back an HTML error page with a link back to the home page.

## The Response Object Methods

### `res.end()`
This method signals that the response is complete. It can optionally send data back to the client. Notice we can send:
- Plain text: `res.end('Welcome to our home page')`
- HTML: `res.end('<h1>Title</h1>')`

## Starting the Server

```javascript
server.listen(5000)
```

This tells the server to start listening for requests on port 5000. You can access your server at `http://localhost:5000`.

## Complete Code with Explanations

```javascript
// Import Node.js core http module
const http = require('http')

// Create a server instance
const server = http.createServer((req, res) => {

  // Check the requested URL and respond accordingly
  if (req.url === '/') {
    // Home page
    res.end('Welcome to our home page')
  } 
  
  else if (req.url === '/about') {
    // About page
    res.end('Here is our short history')
  } 
  
  else {
    // 404 page for any other URL
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
  }
})

// Start the server on port 5000
server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000')
})
```

## Running the Server

1. Save the code in a file (e.g., `server.js`)
2. Open terminal in the file directory
3. Run: `node server.js`
4. Open browser and visit:
   - `http://localhost:5000/` - Shows home page
   - `http://localhost:5000/about` - Shows about page
   - `http://localhost:5000/anything-else` - Shows 404 page

## Key Concepts Explained

### 1. **HTTP Methods**
While our example doesn't check for HTTP methods, the `req.method` property would show if it's a GET, POST, PUT, etc. request.

### 2. **MIME Types**
When sending different types of content, you should set the appropriate `Content-Type` header:
```javascript
res.setHeader('Content-Type', 'text/html')
res.setHeader('Content-Type', 'text/plain')
```

### 3. **Status Codes**
You can set HTTP status codes to indicate the result of the request:
```javascript
res.statusCode = 404 // Page not found
res.statusCode = 200 // OK (this is default)
```

### 4. **Improved Version with Headers**

Here's an enhanced version of the same server with proper headers:

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Welcome to our home page')
  } 
  
  else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Here is our short history')
  } 
  
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end(`
    <h1>Oops!</h1>
    <p>We can't seem to find the page you are looking for</p>
    <a href="/">back home</a>
    `)
  }
})

server.listen(5000, () => {
  console.log('Server running at http://localhost:5000/')
})
```

## Common HTTP Status Codes

- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **301 Moved Permanently**: Resource has moved
- **400 Bad Request**: Server couldn't understand the request
- **404 Not Found**: Resource doesn't exist
- **500 Internal Server Error**: Server error

## Practice Exercises

1. **Add a contact page** at `/contact` that returns "Contact us at email@example.com"
2. **Add JSON response**: Create an `/api` route that returns a JSON object with some data
3. **Add query parameters**: Parse `req.url` to handle query strings like `?name=John`
4. **Serve HTML files**: Instead of writing HTML in strings, read actual HTML files from disk

## Limitations and Next Steps

This basic HTTP server is great for learning, but for production applications, you might want to explore:

- **Express.js** - A more feature-rich framework for building web applications
- **Routing libraries** - For handling complex routing requirements
- **Middleware** - For handling common tasks like logging, authentication, etc.
- **Template engines** - For dynamic HTML rendering

## Summary

You've learned:
- How to create an HTTP server with Node.js
- How to handle different routes (URLs)
- How to send different types of responses
- How to set status codes and headers
- The basics of request/response cycle

This foundation with the `http` module will help you understand how web servers work under the hood before moving to higher-level frameworks.
