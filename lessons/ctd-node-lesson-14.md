---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 14: Using EJS in a Database Application"     
description: "imported from WordPress,Lesson 14: Using EJS in a Database Application"     
---

# Lesson 14: Using EJS in a Database Application

## **Lesson Materials**

You have created a project with EJS that includes various views, user registration and logon, and secure routes. What remains is to perform CRUD operations to the database. Once you can do that, you can use EJS for a variety of projects. There are no new concepts in this lesson. It is just practice of the techniques you have learned.

## **Assignments**

### **Coding Assignment**

You continue to work in the `jobs-ejs` repository. Create a branch called `lesson14` for this week’s work.

### A Couple of Tips

This lesson shows how to build a dynamic database application with **no client-side JavaScript.** Of course, in real-world applications, you’ll often have client side JavaScript, but this lesson shows that you can do a lot of things without it.

However, it does necessitate some differences in approach. If all you have on the client side is HTML, the client can only send `GET` requests (for links) or `POST` requests (for submitting a form). You can’t send `PUT`, `PATCH`, or `DELETE` operations from HTML — unless you add in some client-side JavaScript. So, in this lesson, all routes are GET and POST routes.

You are going to get a list of job listings and display them in a table. You are also going to enable the user to create a new job listing, edit an existing one, or delete one from the list. As always, a given user can only access the entries they own, and not other people’s. Because you can’t do `PUT`, `PATCH`, or `DELETE`, you’ll do `POST` operations for each of these, giving a different URL for each so that the server knows what to do. **Never add, update, or delete data using a `GET`.** That would introduce security vulnerabilities.

Your table should have columns for each the attributes (company, position, status) of each job listing. In addition, it should have buttons on each row to edit or delete an entry. Editing an entry starts with a `GET` to display a form. Deleting an entry just sends a `POST`. So, you should have routes something like this:

```
GET /jobs (display all the job listings belonging to this user)
POST /jobs (Add a new job listing)
GET /jobs/new (Put up the form to create a new entry)
GET /jobs/edit/:id (Get a particular entry and show it in the edit box)
POST /jobs/update/:id (Update a particular entry)
POST /jobs/delete/:id (Delete an entry)
```

In your table, you’ll have a button for edit and a button for delete. The button for edit should do a GET, so that’s a link. A good way to make a link look like a button is to put the button inside the link, as follows:

```
<a href="/jobs/edit/2093410392"><button type="button>edit</button></a>
```

Of course, the URL in the href should have the actual ID of the entry. The button for delete should do a POST. How do you make a button do a POST? As follows:

```
<form method="POST" action="/jobs/delete/0qw9a09as0d9f" style="display: inline">
  <button>delete</button>
  <input type="hidden" name="_csrf" value="<%= _csrf %>" />
</form>
```

This is really a form masquerading as a button. And, because it’s a form, you have to add the `_csrf` token, or your CSRF protection won’t let the operation through. The `display: inline` allows this to line up on the table row.

Ok, so how to build the table? The `GET` for `"/jobs"` comes in, and your router calls a function in your controller to pull all the job listings for that user from the database into a jobs array (which might be empty). Then the controller function makes the following call:

```
res.render("jobs", { jobs });
```

This render call is going to load and parse` /views/jobs.ejs`, passing the array as a local variable to that template. Now you need to construct the table, using EJS code. It will look something like this:

```
    <h2>Jobs List</h2>
    <table id="jobs-table">
      <tr id="jobs-table-header">
        <th>Company</th>
        <th>Position</th>
        <th>Status</th>
        <th colspan="2"></th>
      </tr>
      <% if (jobs && jobs.length) { %>
        <% jobs.forEach((job) => { %>
          <tr>
            <td><%= job.company %></td>
            <td><%= job.position %></td>
            <td><%= job.status %></td>
            <td><button type="button">edit</button></td>
            <td>button type="button">delete</button></td>
          </tr>
        <% }) %>
      <% } %>
    </table>
```

Of course, you also have `include` statements for the header and footer in this ejs file. You see the conditional JavaScript logic in the EJS brackets `<% %>.` But, the buttons aren’t going to do anything yet. So you need to substitute this for the edit button:

```
<a href="/jobs/edit/<%= job.id %>">
  <button type="button">edit</button>
</a>
```

That puts the actual id of the job listing into the URL. Similarly, for the delete button, you have to build one of those button-only forms described above, and it should have the following as its action attribute:

```
action="/jobs/delete/<%= job.id %>"
```

So that the actual id of the entry to delete is included in the URL on the `POST`. Enough on the tips. Here are the steps to complete the project.

### Steps

1. Create `routes/jobs.js` and `controllers/jobs.js`. The router should have each of the routes previously described, and the controller should have functions to call when each route is invoked. Remember that `req.params` will have the id of the entry to be edited, updated, or deleted. You might want to start with simple `res.send()` operations to make sure each of the routes and controller functions are getting called as expected.
2. In `app.js`, `require` the jobs router, and add an `app.use` statement for it, at an appropriate place in the code. The `app.use` statement might look like:

```
app.use("/jobs", auth, jobs);
```

You need to include the auth middleware in the `app.use`, because these are protected routes and the requester must be a logged on user.

1. Test your routes. You can test the `GET` routes from the browser. For the `POST` routes, you’ll need to use Postman.
2. Create `views/jobs.ejs`. That should have the table described above, plus a button to add a new entry.
3. Create `views/job.ejs` (note the singular form here rather than plural like in step 4). That should have the fields so that you can create an entry. You’ll want to use the same form for adding and editing. When adding, you’ll do `res.render("job", { job: null })`. That will tell `job.ejs` that it is doing an add because there’s no value in the `job` local variable. When editing, you’ll do `res.render("job", { job })`. When a non-null entry is passed to `job.ejs`, then the form knows it is doing an edit, so the fields are populated and the button says update. Note that the action for the form is different for each case. If job is null, then `action="/job"`. But if job is not null, then `action="/job/update/<%= job.id %>` so that the update route is called.
4. Add the necessary Mongo calls to `controllers/jobs.js`. You first require the `models/Job` model, so that you can do `Job.create`, `Job.findOne`, etc. As always, have appropriate error handling. You can use `util/parseValidationErrs.js` to handle validation errors. You can use `flash` to pass error and information messages to the user. Be sure that if you do an edit or update or delete for an entry, that that entry belongs to the active user. Here’s a hint: Passport stores the active user in `req.user`. So you can use `req.user._id` for your `createdBy` value.
5. Add a link to `index.html` for the `/jobs` URL.
6. Try it out!
7. There is one more step. You need to make your application more secure! You should configure the helmet, xss-clean, and express-rate-limit packages, just as you did for Lesson 10\. Then try the application out one more time. CORS is not needed in this case.

### Submitting Your Work

The usual steps apply. This lesson is intended to be short and simple, as you need to progress on your final projects.

### **Mindset Assignment**

Your mindset assignment for this week can be found here: **[Asking for Help – part 2](https://learn.codethedream.org/mindset-curriculum-asking-for-help-part-2/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)