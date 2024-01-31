---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 6: Task Manager API Part 2"     
description: "imported from WordPress,Lesson 6: Task Manager API Part 2"     
---

# Lesson 6: Task Manager API Part 2

## **Learning Materials**

This week begins at 1:29 of **[this video](https://www.youtube.com/watch?v=rltfdjcXjmk&t=5280s)**, and continues until the end of the task manager project, at 3:07:18 of the video.

In this lesson you will continue to develop the Task Manager API, testing with Postman as you go. You will add:

* Input Validation
* Error Handling
* Additional CRUD Operations

## **Assignments**

### **Coding Assignment**

Create a new git branch called `week6`. **This should be created when the `week5` branch is active, so that it adds to week 5’s work.** If you’ve made any changes to the `week5` branch due to reviews on your PR, make sure to update your `week6` branch by following the instructions from [Lesson 4](./ctd-node-lesson-4.md) Continue to work in the `node-express-course/03-task-manager/starter` directory. You duplicate the work of the instructor in the video.

### Additional Assignment

Create a file in the starter directory called `QuizAnswers2.txt`. Put answers to the following questions in it.

1. In this lesson, you created a middleware function called `asyncWrapper`. Why?
2. Suppose that you want to make sure that both a status code and an error message are sent back to the user when they request the URL for a task that does not exist. Assume that you’ve created a `CustomAPIError` class and an error handler that references that class. Complete the code:  
```  
const getTask = asyncWrapper(async (req, res, next) => {  
  const { id: taskID } = req.params;  
  const task = await Task.findOne({ _id: taskID });  
  if (!task) {  
    // your code here  
  }  
  res.status(200).json({ task });  
});  
```

As you will see in the lessons that follow, you do not have to always create the `asyncWrapper` middleware, because you can instead use an NPM package called `express-async-errors` that provides the same capability.

### **Mindset Assignment**

Your mindset assignment for this week can be found here: **[Debugging](https://learn.codethedream.org/mindset-curriculum-debugging-part-1/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)