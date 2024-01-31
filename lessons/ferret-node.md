---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "FERRET: Node/Express Class"     
description: "imported from WordPress,FERRET: Node/Express Class"     
---

# FERRET: Node/Express Class

Welcome to the Code the Dream’s Node/Express class, Ferret! 

Node, short for Node.js, is an implementation of the Chrome JavaScript engine, but one that runs outside of the browser, so that it can be used to write standalone programs as well as web serving applications. Express is a framework for Node that makes the creation of web applications very easy. These are complemented by a vast library of NPM packages to make adding common functions easy. The combination is a leading framework throughout the IT industry, and continues to grow in adoption. And, all programming in Node and Express is in JavaScript, so the back end engine for an application can be written in the same language as the front end.

Below is a quick outline of this course. Remember to keep pace with the mentor sessions, and don’t hesitate to ask lots of questions! Slack is the best place for your questions, and you have a Slack channel for that purpose ([#ferret-discussion](https://codethedream.slack.com/archives/C05QUGWCJHL)). Get oriented on the [**Student Resources** ](http://www.learn.codethedream.org/student-resources)page. [See below for information on mentor sessions.](https://learn.codethedream.org/ferret-node/#ferret-mentors)

**If you need assistance with non-curriculum items please contact your Cohort Instructional Leader, Chase Allman-Knieper, on [Slack](https://codethedream.slack.com/team/U0535FFH3CN) or by this email:** [ferret@codethedream.org](mailto:ferret@codethedream.org)

## **Course Calendar**

| **Week**     | **Start Date** | **Due Date**                                                                                                                                                                                                                               | **Lessons**                                                                                                                                                                                                                    |
| ------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Pre-Class    | Sept 26, 2023  | **[Machine Setup](./getting-started-with-node-development.md)** **[Github Cookbook](https://learn.codethedream.org/git-and-github-starter/)**[**Gear up for Class**](https://learn.codethedream.org/pre-class/) |                                                                                                                                                                                                                                |
| 1            | Sept 27, 2023  | Oct 3, 2023                                                                                                                                                                                                                                | **[Node Introduction](./ctd-node-lesson-1.md)**                                                                                                                                 |
| 2            | Oct 4, 2023    | Oct 10, 2023                                                                                                                                                                                                                               | **[NPM and Async Patterns](./ctd-node-lesson-2.md)**                                                                                                                                     |
| 3            | Oct 11, 2023   | Oct 17, 2023                                                                                                                                                                                                                               | **[Introduction To Express](./ctd-node-lesson-3.md)**                                                                                                                                    |
| 4            | Oct 18, 2023   | Oct 24, 2023                                                                                                                                                                                                                               | **[](./ctd-node-lesson-4.md)**[****Middleware, REST Methods,**  ****and Postman**](./ctd-node-lesson-4.md) |
| 5            | Oct 25, 2023   | Oct 31, 2023                                                                                                                                                                                                                               | **[Task Manager API Part 1](./ctd-node-lesson-5.md)**                                                                                                                                    |
| 6            | Nov 1, 2023    | Nov 7, 2023                                                                                                                                                                                                                                | **[Task Manager API Part 2](./ctd-node-lesson-6.md)**                                                                                                                                     |
| 7            | Nov 8, 2023    | Nov 14, 2023                                                                                                                                                                                                                               | **[Using Query Parameters](./ctd-node-lesson-7.md)**                                                                                                                                      |
| 8            | Nov 15, 2023   | Nov 21, 2023                                                                                                                                                                                                                               | **[JWT Basics](./ctd-node-lesson-8.md)**                                                                                                                                                  |
| –            | Nov 22, 2023   | Nov 28, 2023                                                                                                                                                                                                                               | **HOLIDAY**                                                                                                                                                                                                                    |
| 9            | Nov 29, 2023   | Dec 5, 2023                                                                                                                                                                                                                                | **[Jobs API Part 1](./ctd-node-lesson-9.md)**                                                                                                                                             |
| 10           | Dec 6, 2023    | Dec 12, 2023                                                                                                                                                                                                                               | **[Jobs API Part 2](./ctd-node-lesson-10.md)**                                                                                                                                            |
| 11           | Dec 13, 2023   | Dec 19, 2023                                                                                                                                                                                                                               | **Catch Up Week**                                                                                                                                                                                                              |
| –            | Dec 20, 2023   | Jan 2, 2024                                                                                                                                                                                                                                | **HOLIDAY**                                                                                                                                                                                                                    |
| 12           | Jan 3, 2024    | Jan 9, 2024                                                                                                                                                                                                                                | **[A Front End for the Jobs API](./ctd-node-lesson-11.md)**                                                                                                                               |
| 13           | Jan 10, 2024   | Jan 16, 2024                                                                                                                                                                                                                               | **[Server Side Rendering with EJS](./ctd-node-lesson-12.md)**                                                                                                                             |
| 14           | Jan 17, 2024   | Jan 23, 2024                                                                                                                                                                                                                               | **[Authentication with Passport](./ctd-node-lesson-13.md)**                                                                                                                               |
| 15           | Jan 24, 2024   | Jan 30, 2024                                                                                                                                                                                                                               | **[Using EJS in a Database ](./ctd-node-lesson-14.md)** **[Application](./ctd-node-lesson-14.md)**                                                   |
| 16           | Jan 31, 2024   | Feb 6, 2024                                                                                                                                                                                                                                | [Final Project Begins](https://learn.codethedream.org/node-express-final-project-latest/)                                                                                                                                      |
| 17           | Feb 7, 2024    | Feb 13, 2024                                                                                                                                                                                                                               | Final Project Completed                                                                                                                                                                                                        |
| Feb 14, 2024 | Feb 16, 2024   | Final Project Presentations                                                                                                                                                                                                                |                                                                                                                                                                                                                                |
| Mar 4, 2024  | TBD            | Practicum                                                                                                                                                                                                                                  |                                                                                                                                                                                                                                |

## **Before You Begin**

You should plan to use the VSCode editor for this course. You should already know how to access your terminal. Refer to the Pre-Class week above to help with any environment setup.

**[This is a cheat sheet for some of the concepts of this course.](https://learn.codethedream.org/cheat-sheet-for-the-node-express-class/)**

## **Submitting Your Assignments**

For each lesson, you will have a coding assignment and a mindset assignment. Follow the coding assignment instructions and make changes to your code as instructed. You should have basic familiarity with git before starting this course, but if you aren’t confident in your git skills, see this **[Github Cookbook.](https://learn.codethedream.org/git-and-github-starter/)** For each assignment, you will do the following steps:

1. Create a branch for your lesson. Commit changes to that branch periodically, and push it to GitHub.
2. When the lesson is complete and all your work has been pushed to GitHub, open a pull request for your branch. **Note: The target for your pull request should be the main branch of your own repository, not the Code-the-Dream-School Repository.**
3. Then use the Assignment Submission Form to submit the link to your pull request, your mindset answers, and feedback.

Please review the homework submission tips at [**this link**](https://learn.codethedream.org/tips-on-submitting-your-homework/) before you begin.

## **When Submitting Your Code**

When you submit your code, it should be working. If you are not able to get your code working, ask for help on Slack, or bring up questions in a mentor session, or arrange a 1:1 mentor session.

All code should be readable. There are many aspects to good code style, but the most important for right now is indentation! The content of blocks, methods, and classes should be indented two spaces. The end statement should line up, being indented the same number of spaces, with the statement that begins the block, method, or class. Here’s an example:

```
function my_function(parameter) {
  if (x === 0) {
    return x;
  else {
    return error;
  }
}
```

We need proper indentation in order to be able to review your assignments. You need proper indentation to make sure your code is structured correctly. There are two npm packages that will help you (once you know how to use npm): prettier and eslint. Prettier can reformat your code. Eslint can find syntax errors and bad practices.

Having useful commenting in your code is also advised. It helps you, your reviewer, and anyone else who may work with your code find needed areas during review or debugging. Here’s an example of a useful comment on the example code from above:

```
//ERROR CATCH FUNCTION
function my_function(parameter) {
  if (parameter === 0) {
    return parameter;
  else {
    throw new Error("Failure occurred.");
  }
}
```

## **Final Project**

For the final project, each student implements an Express application that includes authentication and CRUD operations to a MongoDB database. The application may be implemented as APIs plus a front end (full stack) or using Server Side Rendering with EJS templates. The rubric is below:

**[Rubric for Express Final Project](https://learn.codethedream.org/node-express-final-project-latest/)**

A sample final project is described **[here.](https://learn.codethedream.org/a-sample-node-express-project/)** The provided sample is for EJS, but all students should read the description at the link, as it provides an important introduction to security in web applications. Look at the rubric for a warning about reusing this code.

## **Mentor Session Calendar / Links**

**Group Instructors**

Group Instructors are volunteer mentors who will host one or more one-hour long group sessions weekly. **You do not need to sign up for the sessions** anymore; the mentors will inform Code the Dream or your attendance. **You must attend a minimum of 1 session (group or 1:1) each week.** The mentor session schedule for your class can be found here: [Ferret Mentor Session Schedule](https://docs.google.com/document/d/1LGIN7U0ksxVsPj7SZ%5FgDFmcavKpF7%5Fl%5FLesvqIT4fs8/edit?usp=sharing)

**1:1 (One-on-One) Mentors**

One-on-One Mentors are volunteer mentors who will be assigned specific students. They will be reviewing your assignments as you turn them in and will be reaching out to you by Slack every week to see how you’re doing with the materials/lessons. Feel free to reach out to them by direct messaging them on Slack if you have questions you need help with outside of group sessions. If you have more than a quick question for them, please schedule an appointment with them using the links on the session schedule sheet. If your assigned mentor is unavailable when you are, please reach out to any of the other 1:1 mentors with availability that matches yours.