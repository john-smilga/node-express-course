---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 10: Jobs API Part 2"     
description: "imported from WordPress,Lesson 10: Jobs API Part 2"     
---

# Lesson 10: Jobs API Part 2

## **Lesson Materials**

In this lesson, you complete implementation of the CRUD operations for the API, using either the `Job` model as the instructor does, or the model you invented in the last lesson. You test with Postman as you go. Your Postman configuration should have environment variables for the URL and, as the instructor explains, the accessToken. You will improve the error handling to return meaningful error messages to the user when Mongoose validation errors occur. You then add security protection for the application so that it can be deployed on the Internet. The security configuration uses the following node packages:

* [helmet](https://www.npmjs.com/package/helmet) for setting various HTTP headers to protect against well-known vulnerabilities
* [cors](https://www.npmjs.com/package/cors) for enabling cross-origin resource sharing
* [xss-clean](https://www.npmjs.com/package/xss-clean) for preventing cross-site scripting attacks. Note that this package is now deprecated. We can still use it for this assignment, but we will need to find a replacement for it in the future.
* [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) for limiting the number of requests from a single IP address. This is to prevent denial of service attacks.

These packages must be used whenever you deploy an application publicly, to minimize the chance of a security exposure. For your class final project, you will use these same packages, because you will deploy your final project on the Internet, and you want it to be secure.

As for the previous lesson, you may duplicate the work that the instructor shows, or if in the last lesson you invented your own model to use instead of the `Job` model, you instead implement CRUD operations for your model. You continue to put your work in the new `06-jobs-api` **repository** that you forked and cloned last session. If you get stuck, answers are in the `node-express -course/06-jobs-api/final` directory, and it’s certainly a good idea to read the instructors code, but please try to do your own work. Before you start this lesson, you create the `week10` git branch, **which should be created when the `week9` git branch is active**. This lesson runs from 8:20:35 to 9:34:30 of **[this video](https://youtu.be/rltfdjcXjmk?t=30036)**.

The instructor shows how to deploy to Heroku. However, since this video was made, Heroku has announced that they are ending free access for deploying web applications. **Therefore, do not install the Heroku CLI, and do not deploy to Heroku.** Instead, you deploy your application to Render.com. Instructions for deploying to Render.com are found in the [Assignment section](/node-express/lesson10-a1).

### Concepts: Internet Deployment

When you deploy to the Internet, you need to be confident that your application is secure. In your case, the risk is very small, because you aren’t storing or retrieving sensitive information. This is fortunate, because security is hard — very hard. The packages the instructor specifies are good starting points.

CORS stands for cross-origin resource sharing, and it is what allows one web application to call another, subject to configuration limits. The front end we will build in lesson 12 will run from the same origin (the origin is the base URL) as the back end, so we don’t really need CORS. But frequently you will build a front end, using React or some other framework, that resides on a different origin from the back end. Without CORS, the REST requests to the back end will fail. So, depending on how you build your final project, you may need CORS. CORS enables cross-origin access, but it can and should be configured to limit it as well, to avoid attacks on application security. The default configuration is not very secure, because it permits access from any origin whatsoever. You can check the documentation for the npm CORS package to see how it should be configured.

The xss-clean package is to avert an attack called cross site scripting. This occurs when an attacker is able to insert some JavaScript into your application and have your application run that script, potentially getting access to resources managed by the application. This can happen when a script is inserted into a URL that calls the application, or into a REST request, or into an HTML form. The xss-clean package strips those scripts out.

The helmet package provides additional protection against cross site scripting. It sets headers on your HTML pages to limit what script the pages will load. Helmet can get a bit complicated to configure for a front end, particularly if the front end uses resources to style the application such as Bootstrap.

The express-rate-limit package limits the number of requests that can be issued per minute from a given client, so that attackers can’t cause application problems by brute force.

## **Assignments**

### Coding Assignment

Complete and test all CRUD operations for your model (or the `Jobs` model). Be sure that each operation uses the ID of the user, so that you have good access control.

**Test each step with Postman, creating a Postman collection of tests just like the instructor is doing.**

### Deploying to Render.com

You deploy your application once you have your assignment completed and working, and once you have pushed your `week10` branch to Github.

To deploy to Render.com, follow these steps:

1. Specify the version of Node that Render is to use. One way is to create a `.node-version` file in the root of your project repository, specifying the same version of node as you are running on your machine. On my machine, when I type `node -v`, I get back v16.19.0 . So I would create a `.node-version` file with the single line: `16.19.0`
2. Create a [Render.com](https://render.com/) account. You do not need to install anything on your workstation for Render deployment. You do not need to enter any credit card information.
3. From your Render.com dashboard, click on the New button in the upper right. Select Web Service. You will then be prompted to connect a repository. Scroll down to the entry field that says “public git repository”, and enter the URL of your 06-jobs-api repository. Then press continue.
4. The next page prompts you for the name of the service. This becomes the first part of the URL for your application. You need to give it a unique name that no one else is using, maybe something like `jobs-api-<your name>`.
5. Scroll down to the entry field for branch. Put in `week10`.
6. Scroll down until you see the “advanced” button. Click on that. You then click on Add Environment Variable. You need to add an environment variable for each of the values in your .env file: the Mongo URI, the JWT key, and so on.
7. Scroll to the bottom and click on Create Web Service. Render.com then builds the application for deployment. The process takes a while. Once the process completes, you see a link in the upper right for your new web service. The URL will be something like `https://jobs-api-<your name>.onrender.com`.
8. Copy that URL and put it into your Postman tests for the assignment. Then test with Postman. Your application is live!

<video controls="" title="Deploying backend on Render.com" src="./images/lesson10-deploying-on-render.mp4"></video>

### Swagger / OpenAPI documentation

The section of the video from 9:34:30 to the end discusses setting up a Swagger configuration. When you have an API, you need to document it so that implementers of applications that call the API (like the frontend) know what the available endpoints and operations are. Swagger is the best way to do that. It also creates a graphical user interface so that one can call the APIs directly from the UI. You should watch this section so that you understand how a Swagger configuration may be created and what functions it provides. However, this section of the video gets a bit complicated, so you are not required to implement Swagger for your application, but it’s a great idea to watch this section and familiarize yourself with the concept of Swagger. If possible, try to implement it as a bonus task this week.

### Mindset Assignment

Your mindset assignment for this week can be found here: **[Problem Solving](https://learn.codethedream.org/mindset-curriculum-problem-solving/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)