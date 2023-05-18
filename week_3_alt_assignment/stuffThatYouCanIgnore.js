/**
 * You can ignore everything in this file. It accomplishes two things:
 *
 * - Requests that contain a content-type header of `application/json` will be
 *   parsed before reaching request handlers.
 * - Requests that come from submitting an HTML <form> element will be parsed;
 *   that's what `body-parser` does!
 *
 * We also setup the app in here, so that the `index.js` file is more minimal
 * and distraction-free
 */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json({ type: "application/json" }));
app.use(
  bodyParser.urlencoded({
    type: "application/x-www-form-urlencoded",
    extended: false,
  })
);
app.use('/static', express.static('./static'))

module.exports = app;
