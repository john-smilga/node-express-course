# Node.js OS Module Tutorial

This tutorial will guide you through using the built-in `os` module in Node.js to get information about your operating system.

## Prerequisites
- Node.js installed on your system
- Basic knowledge of JavaScript

## Step 1: Setting Up

Create a new file called `os-demo.js` and start by importing the OS module:

```javascript
const os = require('os')
```

The `os` module is built into Node.js, so you don't need to install any additional packages.

## Step 2: Getting User Information

The `os.userInfo()` method returns information about the current system user:

```javascript
// Get information about the current user
const user = os.userInfo()
console.log('User Information:')
console.log(user)
```

This will output something like:
```
User Information:
{
  uid: 501,
  gid: 20,
  username: 'yourusername',
  homedir: '/Users/yourusername',
  shell: '/bin/zsh'
}
```

## Step 3: Checking System Uptime

The `os.uptime()` method returns the system uptime in seconds:

```javascript
// Get system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)
```

To make this more readable, you can convert it to hours:

```javascript
const uptimeSeconds = os.uptime()
const uptimeHours = Math.floor(uptimeSeconds / 3600)
const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60)
const remainingSeconds = uptimeSeconds % 60

console.log(`System Uptime: ${uptimeHours} hours, ${uptimeMinutes} minutes, ${remainingSeconds} seconds`)
```

## Step 4: Getting System Information

Create an object to store various system information:

```javascript
// Create an object with system information
const currentOS = {
  name: os.type(),           // Operating system name
  release: os.release(),      // Operating system release version
  totalMem: os.totalmem(),    // Total system memory in bytes
  freeMem: os.freemem(),      // Free system memory in bytes
}

console.log('System Information:')
console.log(currentOS)
```

## Step 5: Complete Code

Here's the complete code with all the examples above:

```javascript
const os = require('os')

// User information
const user = os.userInfo()
console.log('=== USER INFORMATION ===')
console.log(user)
console.log('\n')

// System uptime
console.log('=== SYSTEM UPTIME ===')
const uptimeSeconds = os.uptime()
const uptimeHours = Math.floor(uptimeSeconds / 3600)
const uptimeMinutes = Math.floor((uptimeSeconds % 3600) / 60)
const remainingSeconds = uptimeSeconds % 60

console.log(`Raw uptime: ${uptimeSeconds} seconds`)
console.log(`Formatted uptime: ${uptimeHours} hours, ${uptimeMinutes} minutes, ${remainingSeconds} seconds`)
console.log('\n')

// System information
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  freeMem: `${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB`,
  platform: os.platform(),
  architecture: os.arch(),
  cpus: os.cpus().length,  // Number of CPU cores
}

console.log('=== SYSTEM INFORMATION ===')
console.log(currentOS)
```

## Step 6: Running the Code

Run your script using Node.js:

```bash
node os-demo.js
```

## Additional OS Module Methods

Here are some other useful methods from the `os` module you can explore:

```javascript
// Get network interfaces
console.log('Network Interfaces:', os.networkInterfaces())

// Get the hostname
console.log('Hostname:', os.hostname())

// Get the platform
console.log('Platform:', os.platform())

// Get CPU information
console.log('CPU Info:', os.cpus())

// Get the system's temporary directory
console.log('Temp Directory:', os.tmpdir())
```

## Summary

In this tutorial, you learned how to:
- Import and use the Node.js `os` module
- Get user information with `os.userInfo()`
- Check system uptime with `os.uptime()`
- Gather system information like OS type, release, and memory usage
- Format memory values from bytes to gigabytes
- Explore additional OS module methods

The `os` module is particularly useful for:
- System monitoring applications
- Creating platform-specific code
- Getting system resources information
- Understanding the environment your Node.js application is running in
