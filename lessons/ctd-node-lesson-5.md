---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 5: Task Manager API Part 1"     
description: "imported from WordPress,Lesson 5: Task Manager API Part 1"     
---

# Lesson 5: Task Manager API Part 1

## **Learning Materials**

Watch the “CodingAddict – Build 4 Node/Express Projects” video **[here](https://www.youtube.com/watch?v=rltfdjcXjmk)**. This lesson is on the first 1:28:45 of the video; next session’s lesson 6 will start with the section on validation.

In this lesson and in several that follow, **you duplicate the work of the instructor**, testing as you go with Postman. Since you will be building and testing as you watch, read through the Coding Assignment section below _**before**_ starting the video.

## **Assignments**

### **Coding Assignment**

### Warm Up: Array Methods

The Task Manager you develop for this assignment requires you to use a number of methods of the JavaScript `Array` class. You should review those (lesson on [javascript.info](https://javascript.info/array-methods) & handbook on [FreeCodeCamp](https://www.freecodecamp.org/news/the-javascript-array-handbook/)). Open the `03-task-manager/optionalArrayMethodsReviewExtraAssignment.js` file. Instructions are inside the file, with examples. You can optionally implement the challenges required; this is recommended!

### Task Manager with Mongo Database

In this lesson, you will

* Set up a free Mongo Cloud account, and connect to a Mongo NoSQL database
* Perform CRUD operations on that database
* Only work on the back end. This means that to test your work, you must use Postman.

## Warning: Skip download

The instructor suggests that you download code via a link on johnsmilga.com.  
**Don’t do this.**

Just continue to work on the same git repository you initially forked and downloaded for this course, which is `node-express-course`. You do not need to move directories from this git repository.

Create a new git branch called `week5`. **This should be created when the week4 branch is active, so that your work adds on to the work of the week4 branch.**

This week’s work is to be created in the `03-task-manager/starter` directory. Note that answers, if you get stuck, are in the `03-task-manager/final` directory, but try not to refer to that. Once you have changed directories to the `03-task-manager/starter` directory, you do an `npm install`. This loads the Node modules you will need for the assignment.

## ⚠️ **Warning: Be Careful of Your Mongo Password!** ⚠️

The instructor pastes the Mongo database URI into the code. It includes a password. You may do the same to make sure it works. However, in general, you would _**NEVER**_ put a password or API key into your code because, when you push it to Github, it becomes public and anyone can access your data. There are hackers with Github scrapers that go looking for just such an exposure. A little later in the lesson, the instructor moves the Mongo URI into a `.env` file. This is where it should be kept.

You will notice a `.gitignore` file in the `03-task-manager/starter` directory. That contains lines for `/node_modules` and `.env`, which are the files you _do not_ want in Github. The `.gitignore` file is very important! **Do not git add, git commit, or git push your code while the Mongo URI is included in the code.** Be sure it is _**completely removed**_ from the code, not just commented out! If you make a mistake and git commit your code with a password in it, the ONLY recovery is to change the password. This is because git keeps every old version of your code!

In the future, you would create the `.env` file at the start of any project, and you would make sure that the `.gitignore` file includes `.env`, before putting any secrets like the Mongo password into the `.env`. You would never put such secrets in your code, even temporarily.

## Additional Assignment

Within the starter directory, create a file `quizAnswers.txt`. Put answers to the following questions in it.

1. Quickly explain how middleware is used in an Express application.
2. What does CRUD stand for?
3. You are careful to store your sensitive information in a .env file.  
   1. How do you get your app to access the information in the .env file?  
   2. How do you protect the contents of the .env file so that it is not stored in your Github repository?

### **Mindset Assignment**

Your mindset assignment for this week can be found here: **[Peer Collaboration](https://learn.codethedream.org/mindset-curriculum-peer-collaboration/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)