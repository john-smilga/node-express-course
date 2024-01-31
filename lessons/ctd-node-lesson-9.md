---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 9: Jobs API Part 1"     
description: "imported from WordPress,Lesson 9: Jobs API Part 1"     
---

# Lesson 9: Jobs API Part 1

## **Lesson Materials**

## Thinking About Your Final Project

In this lesson, as in the previous one, you can choose to implement some content different from what the instructor shows. The instructor shows CRUD operations for job records, and uses a Job model. However, you can choose to store objects of a different kind instead of job records. Try to imagine something for an application you’d like to invent! This work could then comprise the beginning of your final project. Look at the final project rubric **[here](https://learn.codethedream.org/node-express-final-project-latest/)** to see what is required. (Bear in mind, though, that there are two ways to go in the final project — either using a front end and back end, or using server side rendering, which we haven’t covered yet.)

If you do implement a model different from the Job model, it should still have a `createdBy` attribute, which is a reference to a `User` record, to associate each entry with a particular user, and the `createdBy` attribute should be of type `mongoose.Types.ObjectId`. This is for access control: A particular user can do CRUD operations only on their own records. Your model should also have an entry that is an `enum` type. You use an enum when an attribute can take only a small set of values, like “vanilla”, “chocolate”, and “strawberry” for ice cream flavors. See the instructor’s work for the `Job` model in the final directory for an example, both of how to do the `createdBy` attribute and how to do an enum. You are encouraged to use a variety of data types in your model such as numbers, strings, and dates.

## Concepts: Authentication with JWT Tokens

In this lesson as in the previous one, you use JSON web tokens (JWTs) for authenticating the user. But, in this case, you do store user records in MongoDB, so you have a User model. You store the user’s name, email, and hashed password in the database. **We never store passwords in plain text**. Instead, they are cryptographically hashed so that even if the database is compromised, the passwords are not. The cryptography for the password comes from the `bcryptjs` npm package. The hashing is performed in a middleware routine that is added to the `User` model, which is a pre-routine for the save operation (meaning that it will run before saving data to the database for any `.save()` call). You also add instance methods to the `User` model for generating the `JWT` and for validating the user password. When you do so, you use the `function` keyword, not the arrow function syntax, so that the function is associated with the `this` variable correctly. In this case `this` will be the user instance that’s being operated on. You also set timestamps on your entries, just as the instructor does.

As in the previous lesson, you use authentication middleware to protect routes.

## Concepts: Access Control for Entries

The purpose of `createdBy` is to limit access to certain entries. For each of your CRUD operations, you use the ID of the User record for the logged on user. Your authentication middleware stores this in `req.user` when the JWT token is validated. When creating a `Job` entry (or an entry of the new model you create instead of using Job) you store the user’s ID in the createdBy attribute. When retrieving the Job entries, or a single Job entry, or doing an update or delete of a Job entry, you include the user’s ID to filter your Mongoose operation, to make sure that a user can’t see or change or delete another user’s records.

For this lesson, you create only an API. Although the instructor mentions a front end, he does not provide one, so each of your routes must be tested using Postman.

## Continuing with the Video

This lesson runs from 6:28:35 to 8:20:35 of **[this video](https://youtu.be/rltfdjcXjmk?t=23306)**. **Read the Coding Assignment Instructions before watching the video, so that you know how your assignment will differ from the video instructions.**

As with previous lessons, you duplicate the work that the instructor shows, except that instead of creating a Job model, you can choose to create a model of your own choosing. (You can use the `Job` model the instructor uses if you prefer, but it would have to be extended to make a final project.)

## **Assignments**

### **Coding Assignment**

There is a **new repository** for this lesson. It is [**here**](https://github.com/Code-the-Dream-School/06-jobs-api)[.](https://github.com/Code-the-Dream-School/06-jobs-api) This is because you will eventually deploy the repository to a cloud service so that it runs on the Internet. The instructor has you do the work in the `node-express-course/06-jobs-api/starter` directory, and then copy that entire directory tree to a folder outside of the `node-express-course` folder, and then do a `git init`. That is complicated and messy. So we have this new repository instead. It is just a copy of the starter directory, but in its own repository. So, fork this repository and then clone your fork. For a reminder on how to fork a Github repo, you can refer to the instructions at the top of the [Lesson 1 Assignment.](./ctd-node-lesson1.md)

### **Warning!**

When you clone, make sure you are not inside the`node-express-course` folder, so that you keep this repository separate.

You will do your work in this new `06-jobs-api` repository directory. If you get stuck, answers are in the old repository, in the `node-express-course/06-jobs-api/final` directory, but please try to do your own work. Before you start this lesson, you create the `week9` git branch.

### **Warning!**

**_Do not_** do the copy of the starter directory that is described by the instructor.

**_Do not_** do the `git init`.

You can choose to just repeat the work that the instructor shows, but it is better if you invent a model for a new kind of record you want to create instead of the Job model, as described above in the “Thinking About Your Final Project” section.

**Be sure you test each step with Postman, creating a Postman collection of tests just like the instructor is doing.** This Postman collection of tests is used not only to test the API as it runs on your machine, but also, in Lesson 10, to test the application as deployed to Render.com. (We deploy to Render.com instead of to Heroku, as Heroku no longer allows applications to be deployed for free.)

### **Mindset Assignment**

Your mindset assignment for this week can be found here: **[Information Literacy](https://learn.codethedream.org/mindset-curriculum-information-literacy/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)