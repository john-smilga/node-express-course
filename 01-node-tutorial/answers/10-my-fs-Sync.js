// Synchronous
// This process may be very time consuming. If we have many users.
// Everything is happening line-by-line.

const {readFileSync, writeFileSync} = require('fs')
console.log('start');
// Can also use the following:
// const fs = require('fs');
// fs.read

// ???? ATTENTION !!!!! I to use (../) I believe this was b/c of my answers folder.

// If one of the users does this task or both tasks readFileSync(), writeFileSync. And they take a long time this means node will not be able to serve other users. JS in reading this code synchronously meaning it just goes line-by-line.
// If the is something that takes a long time your application is down. So no other user can do anything with that application. Because one of the users are for example reading the files and writing one.
const first = readFileSync('../content/first.txt','utf-8')
const second = readFileSync('../content/second.txt','utf-8')

// If file is not here node will create one. If the file is already there by default node will override all the values that are in the file.
// { flag: 'a'} creates a new value.
writeFileSync(
    '../content/results-sync.txt',
     `Here is the result : ${first}, ${second}`,
     { flag: 'a' }
 )
 console.log('done with this task')
 console.log('starting the next one')
