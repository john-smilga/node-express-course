---     
layout: "../../layouts/genericMarkdownFile.astro"     
title: "Lesson 11: A Front End for the Jobs API"     
description: "imported from WordPress,Lesson 11: A Front End for the Jobs API"     
---

# Lesson 11: A Front End for the Jobs API

## **Lesson Materials**

In this lesson, you create a front end for the Jobs API you created in the previous lesson. Front ends may be created in various ways, for example using React, and they may run in various environments, such as an app for a smart phone. The front end for this lesson is created using just HTML and JavaScript. It runs in a browser, and is loaded from the same Express instance as the API it calls. That is, you will be creating “server-rendered” pages.

**There is no video for this lesson. Instead, there are detailed instructions in the Assignment section.**

**Note:** This lesson appears to be mostly copy/paste — but it may not be depending on what you did the last few weeks! You create forms and tables, but if you used a data model different from Job, as was recommended in lessons 9 and 10, you must modify the HTML and JavaScript so that the forms, tables, and JavaScript variables match your data model. This may seem like a lot of work, and perhaps it is, but once you have completed it, if you used a data model different from the Job model used by the instructor (or you at least substantially extended that model) then you are well on your way to completing your class final project.

## **Assignments**

### Coding Assignment

Continue working in the `06-jobs-api` repository that you used for lessons 9 and 10\. Before you start, create a new branch as usual, with a branch name of `week12`. (Week 11 was a catch-up week, so you create the `week12` branch when the `week10` branch is active.)

Create a directory called `public`. This is for the HTML and JavaScript files for the front end. The HTML code you will use is below. Put that in the `public` directory with a file name of `index.html`. (**Reminder:** You will have to change the form, which below is for a job, to match your data model).

This lesson does not involve the creation of any new Node or Express functions. It is all client-side HTML and JavaScript.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Jobs List</title>
  </head>

  <body>
    <h1>Jobs List</h1>
    <hr />
    <p id="message"></p>
    <hr />
    <div id="logon-register" style="display:none;">
      <button type="button" id="logon">logon</button>
      <button type="button" id="register">register</button>
    </div>
    <div id="logon-div" style="display:none;">
      <form>
        <div>
          <label for="email">email:</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label for="password">password:</label>
          <input type="password" id="password" />
        </div>
        <button type="button" id="logon-button">logon</button>
        <button type="button" id="logon-cancel">cancel</button>
      </form>
    </div>
    <div id="register-div" style="display:none;">
      <form>
        <div>
          <label for="name">name:</label>
          <input type="text" id="name" />
        </div>
        <div>
          <label for="email1">email:</label>
          <input type="email" id="email1" />
        </div>
        <div>
          <label for="password1">password:</label>
          <input type="password" id="password1" />
        </div>
        <div>
          <label for="password2">verify password:</label>
          <input type="password" id="password2" />
        </div>
        <button type="button" id="register-button">register</button>
        <button type="button" id="register-cancel">cancel</button>
      </form>
    </div>
    <div id="jobs" style="display:none;">
      <p id="jobs-message"></p>
      <table id="jobs-table">
        <tr id="jobs-table-header">
          <th>Company</th>
          <th>Position</th>
          <th>Status</th>
          <th colspan="2"></th>
        </tr>
      </table>
      <button type="button" id="add-job">add job</button>
      <button type="button" id="logoff">log off</button>
    </div>
    <div id="edit-job" style="display:none;">
      <form>
        <div>
          <label for="company">company:</label>
          <input type="text" id="company" />
        </div>
        <div>
          <label for="position">position:</label>
          <input type="text" id="position" />
        </div>
        <div>
          <label for="status">status:</label>
          <select id="status">
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </select>
        </div>
        <button type="button" id="adding-job">add</button>
        <button type="button" id="edit-cancel">cancel</button>
      </form>
    </div>
  </body>
</html>
```

This front end uses a single-page style. There are multiple views in the page, in different DIV elements, but which of these is visible is controlled by the JavaScript you write.

Edit `app.js`. Comment out the following lines:

```
app.get("/", (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});
```

Add the following line below these commented out lines:

```
app.use(express.static("public"));
```

Start the server and go to `localhost:3000` in your browser. You see the page, but it does not do anything. This is because there is no JavaScript to go with it. You create that now. This is the JavaScript for the front end. **Front end JavaScript does not run in Node. Instead, it is delivered to the browser and runs in the browser context, with full access to the `document`, `window`, and `DOM` variables.**

There are various divs to be manipulated by this JavaScript. (Again, you have to change this code to match your data model.) The keep the code organized, we will separate them into various modules (files). There is one module, index.js, to initialize window handling. All the other modules can be imported from there. There are five divs, only one of which will show at a time:

* one to select logon or register,
* one to do logon,
* one to do register,
* one to display the jobs,
* and one to add or edit a job.

For each of these divs, there is a separate module controlling its operation.

To begin, add the following line to index.html, right above the close of the body tag:

```
<script src="./index.js" type="module"></script>
```

These modules call one another using the exports that each provides. For this to work, you must declare it as type `module`. Create `index.js` in the public directory. The `index.js` module should read as follows:

```
let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = "none";
    }
    newDiv.style.display = "block";
    activeDiv = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem("token", value);
  } else {
    localStorage.removeItem("token");
  }
};

export let message = null;

import { showJobs, handleJobs } from "./jobs.js";
import { showLoginRegister, handleLoginRegister } from "./loginRegister.js";
import { handleLogin } from "./login.js";
import { handleAddEdit } from "./addEdit.js";
import { handleRegister } from "./register.js";

document.addEventListener("DOMContentLoaded", () => {
  token = localStorage.getItem("token");
  message = document.getElementById("message");
  handleLoginRegister();
  handleLogin();
  handleJobs();
  handleRegister();
  handleAddEdit();
  if (token) {
    showJobs();
  } else {
    showLoginRegister();
  }
});
```

Remember that this code is running in the browser, and not in Node. That means you must use `import` and not `require`.

We need to keep track of the active div so that we know which one to disable when switching between them, and that is stored in the variable `activeDiv`. We don’t need to export that variable since it’s only used here in the index script by the `setDiv` function. We export a function that sets the active div, making it visible and hiding the previous active div.

We also have to have a means of enabling or disabling input. This is because we will use asynchronous functions, and the application can get confused if more input comes in while the previous requests are in progress.

We also have to keep track of whether the user is logged in. We do that in a `token` variable that we store in the browser’s local storage (although this creates security risks as previously described.) When local storage is used, the user remains logged in even if the page is refreshed. If the function is called with a `null` token, then we _remove_ the token from local storage instead.

When the user takes actions we may want to display a message on the page. We store the value of that message here in the index script in the `message` variable, so that it can easily be updated by any of the other modules.

Once the DOM is loaded, we load the token (if it exists already) from the browser’s local storage and initialize the handlers for each of the divs.

Then, if the user is logged in, we display the list of jobs. If the user is not logged in, we display the initial panel with a button for logon and a button for register. Note that we need to provide and to export functions to set the enabled flag and the token. This is because one can’t write directly to variables from other modules. Once a variable is `import`ed in a module, it is treated as a `const` variable in that module, so you cannot reassign values to that variable directly.

You will need to create `loginRegister.js`, `register.js`, `login.js`, `jobs.js`, and `addEdit.js` files, all in the public directory.

The `loginRegister.js` module is as follows:

```
import { inputEnabled, setDiv } from "./index.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";

let loginRegisterDiv = null;

export const handleLoginRegister = () => {
  loginRegisterDiv = document.getElementById("logon-register");
  const login = document.getElementById("logon");
  const register = document.getElementById("register");

  loginRegisterDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === login) {
        showLogin();
      } else if (e.target === register) {
        showRegister();
      }
    }
  });
};

export const showLoginRegister = () => {
  setDiv(loginRegisterDiv);
};
```

Each of the div handling modules follow this pattern. Required imports (used when one div handler calls another) are resolved up front. Then, within the handler function, the div and its controls are defined. Also, within the handler function, an event handler is declared to handle mouse clicks within the div.

A separate function handles display of the div. (React works in similar fashion, if you know that framework — but this lesson does not use React.)

The `register.js` module is as follows:

```
import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showJobs } from "./jobs.js";

let registerDiv = null;
let name = null;
let email1 = null;
let password1 = null;
let password2 = null;

export const handleRegister = () => {
  registerDiv = document.getElementById("register-div");
  name = document.getElementById("name");
  email1 = document.getElementById("email1");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");

  registerDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerButton) {
        showJobs();
      } else if (e.target === registerCancel) {
        showLoginRegister();
      }
    }
  });
};

export const showRegister = () => {
  email1.value = null;
  password1.value = null;
  password2.value = null;
  setDiv(registerDiv);
};
```

The `login.js` module is as follows:

```
import {
  inputEnabled,
  setDiv,
  token,
  message,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showJobs } from "./jobs.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("logon-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const logonButton = document.getElementById("logon-button");
  const logonCancel = document.getElementById("logon-cancel");

  loginDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === logonButton) {
        showJobs();
      } else if (e.target === logonCancel) {
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  email.value = null;
  password.value = null;
  setDiv(loginDiv);
};
```

The `jobs.js` module is as follows:

```
import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let jobsDiv = null;
let jobsTable = null;
let jobsTableHeader = null;

export const handleJobs = () => {
  jobsDiv = document.getElementById("jobs");
  const logoff = document.getElementById("logoff");
  const addJob = document.getElementById("add-job");
  jobsTable = document.getElementById("jobs-table");
  jobsTableHeader = document.getElementById("jobs-table-header");

  jobsDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addJob) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      }
    }
  });
};

export const showJobs = async () => {
  setDiv(jobsDiv);
};
```

The `addEdit.js` module is as follows:

```
import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showJobs } from "./jobs.js";

let addEditDiv = null;
let company = null;
let position = null;
let status = null;
let addingJob = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-job");
  company = document.getElementById("company");
  position = document.getElementById("position");
  status = document.getElementById("status");
  addingJob = document.getElementById("adding-job");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingJob) {
        showJobs();
      } else if (e.target === editCancel) {
        showJobs();
      }
    }
  });
};

export const showAddEdit = (job) => {
  message.textContent = "";
  setDiv(addEditDiv);
};
```

Create all these files and then try the application out. You will find that the application now allows for user interaction, and you can navigate between the active divs.

However, the application still does not do much, because, of course, there is no code there to communicate with the back end. This is to be added using the `fetch()` function. Fetch makes REST calls, and it returns results asynchronously. In the code that follows, we use the `async/await` pattern, so of course whenever that is used, the surrounding function must be declared as an `async` function.

Also, we need to disable input during the period in which the `async` operation is in progress. We do this by setting the `inputEnabled` flag using the `enableInput` function that is exported from `index.js`. Our click handlers ignore clicks if they occur while the `inputEnabled` flag is `false`.

We may get an error when making the request to the server, so the async operations must be surrounded with a `try/catch`. If an error occurs, we notify the user by displaying a message in the page, but we also log the error to the console. You may not want to log all errors to the console in a production application, but it is wise to do it when you are developing, so that you can find your own errors.

First, we’ll make register and logon work. For either register or logon, if the step is successful, the back end returns a JWT token. This is stored for use in accessing jobs records.

Adding these capabilities to `register.js` gives the following:

```
import {
  inputEnabled,
  setDiv,
  message,
  token,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showJobs } from "./jobs.js";

let registerDiv = null;
let name = null;
let email1 = null;
let password1 = null;
let password2 = null;

export const handleRegister = () => {
  registerDiv = document.getElementById("register-div");
  name = document.getElementById("name");
  email1 = document.getElementById("email1");
  password1 = document.getElementById("password1");
  password2 = document.getElementById("password2");
  const registerButton = document.getElementById("register-button");
  const registerCancel = document.getElementById("register-cancel");

  registerDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === registerButton) {
        if (password1.value != password2.value) {
          message.textContent = "The passwords entered do not match.";
        } else {
          enableInput(false);

          try {
            const response = await fetch("/api/v1/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: name.value,
                email: email1.value,
                password: password1.value,
              }),
            });

            const data = await response.json();
            if (response.status === 201) {
              message.textContent = `Registration successful.  Welcome ${data.user.name}`;
              setToken(data.token);

              name.value = "";
              email1.value = "";
              password1.value = "";
              password2.value = "";

              showJobs();
            } else {
              message.textContent = data.msg;
            }
          } catch (err) {
            console.error(err);
            message.textContent = "A communications error occurred.";
          }

          enableInput(true);
        }
      } else if (e.target === registerCancel) {
        name.value = "";
        email1.value = "";
        password1.value = "";
        password2.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showRegister = () => {
  email1.value = null;
  password1.value = null;
  password2.value = null;
  setDiv(registerDiv);
};
```

Notice that we’ve now made the click event listener callback function `async`. We then check to see if the user entered matching passwords in the two inputs. If they did, disable clicking on the buttons and then make the `fetch()` call to the register endpoint.

If the call is successful, we parse the data from the response, display a message to the user, and save the token to local storage using the function exported from `index.js`. We can then display the jobs page. If the call was not successful we will continue to show the register page and will display the error message from the response to the user. If any errors occur, then we catch them and continue to show the register page and show a generic error message to the user.

After we’re done processing the call (whether it was successful or not) we re-enable clicking on the buttons.

Notice that we always clear out the input values before we switch to another page. We do not want those to live on in memory.

The `login.js` module becomes:

```
import {
  inputEnabled,
  setDiv,
  token,
  message,
  enableInput,
  setToken,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showJobs } from "./jobs.js";

let loginDiv = null;
let email = null;
let password = null;

export const handleLogin = () => {
  loginDiv = document.getElementById("logon-div");
  email = document.getElementById("email");
  password = document.getElementById("password");
  const logonButton = document.getElementById("logon-button");
  const logonCancel = document.getElementById("logon-cancel");

  loginDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === logonButton) {
        enableInput(false);

        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.value,
              password: password.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200) {
            message.textContent = `Logon successful.  Welcome ${data.user.name}`;
            setToken(data.token);

            email.value = "";
            password.value = "";

            showJobs();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communications error occurred.";
        }

        enableInput(true);
      } else if (e.target === logonCancel) {
        email.value = "";
        password.value = "";
        showLoginRegister();
      }
    }
  });
};

export const showLogin = () => {
  email.value = null;
  password.value = null;
  setDiv(loginDiv);
};
```

Make these changes and test the application again. You should find that you can register and logon. Logoff doesn’t work right at present, but this can be corrected in `jobs.js` with the following change:

```
      } else if (e.target === logoff) {
        setToken(null);

        message.textContent = "You have been logged off.";

        jobsTable.replaceChildren([jobsTableHeader]);

        showLoginRegister();
      }
```

Note that logoff involves no communication with the back end. The user is logged off by deleting the JWT from memory. We also have to clear the jobs data from memory, for security reasons, so that a non-logged-in user can’t see the previously logged-in user’s jobs. That’s what the replaceChildren does here: it replaces the contents of the `<table id="jobs-table">` element with just the `<tr id="jobs-header">` element and nothing else.

Next we need to make the changes so that we can create job entries. The `addEdit.js` module is changed as follows:

```
addEditDiv.addEventListener("click", async (e) => {
  if (inputEnabled && e.target.nodeName === "BUTTON") {
    if (e.target === addingJob) {
      enableInput(false);

      let method = "POST";
      let url = "/api/v1/jobs";
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            company: company.value,
            position: position.value,
            status: status.value,
          }),
        });

        const data = await response.json();
        if (response.status === 201) {
          // 201 indicates a successful create
          message.textContent = "The job entry was created.";

          company.value = "";
          position.value = "";
          status.value = "pending";

          showJobs();
        } else {
          message.textContent = data.msg;
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communication error occurred.";
      }

      enableInput(true);
    } else if (e.target === editCancel) {
      message.textContent = "";
      showJobs();
    }
  }
});
```

In this case, we have to pass the JWT in the header for the call to work.

Once you have added this code, try out the application again. You are now able to add entries, but you can’t actually see them. Next you add the code to populate the table of jobs entries. Of course, this involves another fetch operation, passing the JWT as for the add. Then the results are used to populate a table.

There is a somewhat tricky part to this. We want to have edit and delete buttons for each row of the table. But, how do we associate an edit button with the edit operation, and when it is clicked, how do we know which entry is to be edited? This is done as follows. The edit buttons are given a class of `"editButton"`, and similarly, the delete buttons are given a class of `"deleteButton"`. We can also add an `data-<something>` attribute to the buttons. These are called [data attributes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) and in Javascript they correspond to a DOM hash/object called `dataset`. By adding a `data-id` attribute to the elemnet, we can access it via the `dataset.id` property. We want to set that id to be the id of that job (or your custom object), as returned from the database.

It looks like this in `jobs.js`:

```
export const showJobs = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [jobsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        jobsTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.jobs.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.jobs[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.jobs[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.jobs[i].company}</td>
            <td>${data.jobs[i].position}</td>
            <td>${data.jobs[i].status}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        jobsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(jobsDiv);
};
```

So, plug this code into `jobs.js` at the appropriate point, and then try the application again. You should now be able to see the entries for each job.

However, the edit and delete buttons don’t actually work. This is because the click handler in `jobs.js` isn’t set to look for them yet. We can add a section to the click handler to remedy this.

```
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      }
```

The `dataset.id` contains the id of the entry to be edited. That is then passed on to the showAddEdit function. So we need to change that function to do something with this parameter.

This function is in `addEdit.js`, and should be changed as follows:

```
export const showAddEdit = async (jobId) => {
  if (!jobId) {
    company.value = "";
    position.value = "";
    status.value = "pending";
    addingJob.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/jobs/${jobId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        company.value = data.job.company;
        position.value = data.job.position;
        status.value = data.job.status;
        addingJob.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = jobId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The jobs entry was not found";
        showJobs();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showJobs();
    }

    enableInput(true);
  }
};
```

With this change, the `add/edit` div will be displayed with the appropriate values. If an add is being done, the function is called with a null parameter, and the form comes up blank with an add button. If an edit is being done, the function is called with the id of the entry to edit. The job is then retrieved from the database and the input fields are populated, and the button is changed to say update. We also store the id of the entry in the `dataset.id` of the `addEdit` div, so we keep track of which entry is to be updated.

So far, so good, but what happens when the user clicks on the update button? In this case, we need to do a PATCH instead of a POST, and we need to include the id of the entry to be updated in the URL. So we need the following additional changes to addEdit.js:

```
if (e.target === addingJob) {
  enableInput(false);

  let method = "POST";
  let url = "/api/v1/jobs";

  if (addingJob.textContent === "update") {
    method = "PATCH";
    url = `/api/v1/jobs/${addEditDiv.dataset.id}`;
  }

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: company.value,
        position: position.value,
        status: status.value,
      }),
    });

    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      if (response.status === 200) {
        // a 200 is expected for a successful update
        message.textContent = "The job entry was updated.";
      } else {
        // a 201 is expected for a successful create
        message.textContent = "The job entry was created.";
      }

      company.value = "";
      position.value = "";
      status.value = "pending";
      showJobs();
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
}
```

Make these changes, and editing jobs should work. Make sure that adding a new job still work correctly.

This completes all CRUD operations except for delete. You will notice that the delete buttons don’t work yet. Fix this on your own by following the pattern used for the edit button.

You’ll call the jobs delete API, and in the URL you will include the ID of the entry to be deleted. Then display the job list page if the delete was successful.

**Note:** There is an error in the implementation of the delete operation in the jobs controller. The instructor’s guidance is to use this line:

```
res.status(StatusCodes.OK).send();
```

This is incorrect, because an empty body is not valid JSON. Change it to:

```
res.status(StatusCodes.OK).json({ msg: "The entry was deleted." });
```

If you do not make this change, an exception is thrown on the front end when you attempt to parse the response body with response.json().

You should be making commits as you go along. Once you have everything working, do a last `git add` and `git commit`, then push your `week12` branch to your Github repository. Then modify the Render.com deployment you have to point to the new branch. This will cause your new code to be deployed to Render.com. Verify that your application front end is working on Render.com.

### Tips on Getting the Delete to Work

* How do you know that the user wants to make a delete request? Each of the delete buttons is given a class of `deleteButton`. You check for that class in the e.target.
* How do you know which entry to delete? The id of the entry is stored in the `dataset.id` of the button.
* How do you do the delete? You need a call to `fetch` with a method of `DELETE` giving the URL of that entry. Be sure you include the JWT in the authorization header. Also, remember that fetch is asynchronous, and should be called in a `try/catch` block.
* What do you do if the delete succeeds? First, you put a message in the text content of the message paragraph. Second, you redraw the table showing the updated list of entries. The jobs.js module has a function for this.
* What do you do if the delete fails? Put a message indicating the failure in the message paragraph.
* Anything else? You don’t want to take input while these asynchronous operations are in progress, so you set the enabled flag before you start them, and clear it afterwards.

### **Mindset Assignment**

Your mindset assignment for this week can be found here: **[Design Concepts](https://learn.codethedream.org/mindset-curriculum-design-concepts/)**

**Submitting Your Work**

**When you’ve completed your Coding Assignment and Mindset Assignment this week, submit all of your work using:**

[**Homework Assignment Submission Form**](https://airtable.com/shrBpqHbS6wgInoF9)