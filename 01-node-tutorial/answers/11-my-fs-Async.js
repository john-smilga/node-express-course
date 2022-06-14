// asynchronous
// With this method: We start a task and off load the task and the we start a next task right away.

const {readFile, writeFile} = require('fs')

// The moment this task is started its off loaded and we continue with our code.
console.log('start');

// With the async approach a call back function is needed. Think of it as an event-listener that does something when a button is clicked.

// This way when user #1 for example comes here and want to get this functionality node will just off load this task. And, then your application can keep on serving other users.

// An alternative approach would be to use promises and Async away
readFile('../content/first.txt','utf8', (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result;
    readFile('../content/second.txt','utf8',(err,) => {
        
        // console.log(result)
        // Without using 'utf8' in the call back function <Buffer 48 65 6c 6c 6f 20 74 68 6f 20 74 68 69 73> is returned what does this mean? Is this a certain type of err? What is so special about the use of utf8? 
        
        if (err) {
            console.log(err)
            return
        }
        const second = result;
        writeFile(
            '../content/result-async.txt',
            `Here is the result : ${first}, ${second}`,
            (err, result)=> {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('done with this task')  
            })
        })
    })
    console.log('starting next task')