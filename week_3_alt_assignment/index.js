/**
 ******************************************************************************
 *********************** Assignment Instructions! *****************************
 ******************************************************************************
 *
 * First, start up the website and check it out. This is an interactive
 * tutorial, so interact with it before you go any further! You can run this
 * server just like the assignments you have been working on so far:
 *
 * ```
 * npm install
 * npm run start
 * ```
 *
 * Go through the website, then come back; have fun!
 *
 * ============================================================================
 *
 * If you choose to complete this alternative assignment, your task is to
 * create one fun and creative server game like the ones that make up this
 * guide. It doesn't need to be fancy or complex! Just be creative, and make
 * a neat little widget. You can use HTML, or even just plain text. It can
 * be as simple as a riddle whose solution is a URL parameter.
 *
 * Get creative, have fun, and make sure to request code review for whatever
 * you create!
 */

const app = require("./stuffThatYouCanIgnore"); // take my word for it :)

app.get("/", (_, res) => res.send(`
  <h1>Hi!</h1><a href="/whatisaserver">Visit /whatisaserver to get started!</a>
`));

/**
 * Visit `http://localhost:3000/whatisaserver` to run this function and see
 * what it does!
 */
app.get("/whatisaserver", (request, response) => {
  response.setHeader("content-type", "text/plain").send(
    `A server is just a program that runs forever and does a very simple job.

It receives a HTTP request, and sends a HTTP response. HTTP is a
text-based protocol. That's why it is called hyper-text transfer protocol.
The most important part is "text transfer protocol." That is the most
important job of HTTP - to transfer text.

See, this page serves text. Just plain old text. Text is cool, but not _super_
cool. For example, I really wanted the word "super" to be in italic, but I
can't do that! This is just text. Also, I'd love to provide you with a link
to the next page, but I can't, because plain text can't have links!

We don't have to be limited to plain text, though! A cool thing about HTTP
that every request and response actually has two parts: the headers, and
the body. When the server responds to the client, it can include a
content-type header with the response. This tells the browser what type
of data it's getting back from the server! That means we can send way more
than just plain text; for example, we can send HTML (hyper-text markup
language)! For that matter, we can send any textual data: JSON, XML,
url-encoded and url-encoded form data are just some of the content types we
can specify.

Technically, we're not even limited to text. It is also possible to use HTTP
to send images, videos, custom data formats, or any other type of data.


--


Moving along on our tour, let's explore the hyper-powers of HTTP.

Unfortunately, I can't give you a link, because this is just plain text,
but that's about to change!

      ⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄⌄
Visit http://localhost:3000/whatisaserver/html to learn more.
      ⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃⌃

Fun fact: Did you know this is just plain text: 😆
`
  );
});

/**
 * This is the second step of the interactive tutorial, at `/whatisaserver/html`
 */
app.get("/whatisaserver/html", (request, response) => {
  // content-type: text/html is the default, so we don't need to specify it
  // anymore!
  response.send(`

    <!--
      Woah, HTML!! Now we can write comments (this text won't appear on
      the page). We also don't really care about indentation anymore. HTML,
      like most programming languages, is pretty flexible about where you put
      whitespace.

      And, yes, this is HTML inside JavaScript!
      Inception!!: http://localhost:3000/static/inception_meme.jpg
    --!>

    <style>
      /**
       * And now some CSS
       * in our HTML
       * which is in our JavaScript
       * :)
       */

      * { font-family: Arial; box-sizing: border-box; }
      body { display: flex; align-items: center; justify-content: center; }
      main { max-width: 70ch; }
    </style>

    <body><main>
      <h1>Hello world!</h1>
      <p>
        Text is cool and all, but with <b><i>HTML</i></b> we can do all kinds
        of fancy stuff!
      </p>

      <details>
        <summary>For example, with nothing more than a little HTML, we can hide
        a little surprise for you to find!</summary>

        <img width="500px" src="/static/inception_meme.jpg" />

        <p>
          Turns out that serving up a little HTML and CSS can create a pretty
          cool user experience!
        </p>

        <p>
          And, it turns out that a server can do a whole lot more than just
          share some hard-coded HTML. Before we check that out, there is one more
          cool thing that HTML can do: we don't have to tell you the next link
          to visit like we did before. Instead, we can hide the link behind some
          text, and
            <a href="/whatisaserver/dynamicHtml">all you need to do is click!</a>
        </p>
      </detail>

    </main></body>

  `);
});

// Now, I'm going to refactor the CSS into a separate string so that I can
// re-use it for the remaining pages without repeating it! Instead you'll see
// ${STYLE} at the beginning of each of the following HTML pages.
const STYLE = `
<style>
  * { font-family: Arial; box-sizing: border-box; }
  body { display: flex; align-items: center; justify-content: center; }
  main { max-width: 70ch; }
  pre { font-family: monospace; }
</style>`;

app.get("/whatisaserver/dynamicHtml", (request, response) => {
  response.send(`
    ${STYLE}
    <body><main>
    <p>
      The most powerful thing about a server is that you can serve dynamic
      content to the user. For example, I can actually inspect the request you
      sent me, the server, to see where you're visiting from. For example, I
      know all this about the browser you are sending a request from now:

    <pre>${request.headers["user-agent"]}</pre>

    <p>
      This is how the browser and the server can communicate with each other
      in order make your website dynamic. The server can decide to return different
      data based on information the browser gives it in the request.
    </p>
    <p>  
      Even the URL itself can have information that lets us change what we show
      on the website! Have you ever seen a URL with a bunch of gibberish in it? For example:
    </p>
    <pre>http://example.com?filter=1%2C56%2C3%2C7&sortOrder=id%3Adesc</pre>
    <p>
      Those are called URL parameters! It might look like gibberish, but
      those are actually key-value pairs that the server can read while it
      is processing a request. It's almost like using the URL as a tiny little
      database; the URL itself can store data!
    </p>
    <p>
        Try visiting
        <a href="/whatisaserver/dynamicHtml?yourName=typeItInTheAddressBar&myName=TheServer%20%3A%29">
          this link                                                                   <!-- ^^^^^^^^^ -->
        </a>                                                                          <!-- URL-encoded :) -->
        to see this behavior in action, and I will echo back the URL parameters
        you provide:
    </p>

    ${
      // Don't show the second part of the page until some URL params are
      // present, which will typically happen after the user clicks the link
      // above
      Object.keys(request.query).length !== 0

        ? `


          <!--
            We don't want anyone accidentally skipping this demo; let's make
            it super clear with some extra styles!
          --!>

          <style>
            .paramDemo {
              padding: 5px;
              background-color: #ffe9c7;
              border: 2px solid #ff9800;
              border-radius: 5px;
            }
            .demoNagging {
              font-size: 1rem;
              font-weight: light;
            }
          </style>

          <div class="paramDemo">

        <!--
          stringifying the whole 'request.query' makes this highly dynamic;
          whatever URL parameters the user sends us will go into the page.

          Hmmmm, I wonder what would happen if we put a URL parameter that
          said:

            <script>alert('hi')</script>

          Do you think the browser would run that code?....
        --!>

            <pre>${JSON.stringify(request.query, null, 2)}</pre>
            <h2 class="demoNagging">Hey! Make sure you don't skip this demo!</h2>
            <p style="font-size: 12px"><i>You can change the text in this orange box by changing the URL!!</i></p>
          </div>

          <p>You might still be wondering, what's up with the percent signs and whatnot in the
             earlier example (<code>http://example.com?filter=1%2C56%2C3%2C7&sortOrder=id%3Adesc</code>).
             
             There's certain characters that don't play very well with links in the browser,
             like spaces. There's also certain characters that already have a specific meaning in URLs like
             ampersands (<code>&</code>) and colons (<code>:</code>). 
         </p>
         <p>In order to make things more clear for the browser, we use URL encoding to translate those characters
            into a format that the browser can understand without ambiguity. 
            
             To learn more, check out this tool for
              <a href="https://www.urlencoder.org/">URL Encoding!</a> (you can switch between encoding and decoding 
             using the buttons at the top)
            </p>

            <p>
              Before you move on, follow the directions above! Look in your
              browser's URL bar - there's something up there for you to interact
              with!
            </p>

            <p>
              Then, check out the
              <a href="/whatisaserver/dynamicHtml/extra">next demo</a>
            </p>
        `
        : ""
    }
    </body></main>
  `);
});

app.get("/whatisaserver/dynamicHtml/extra", (request, response) => {
  response.send(`
    ${STYLE}
    <body><main>
    <p>
      With a little creativity, it is amazing how much we can build with
      these simple primitives. For example:
      <ul>
        <a href="/whatisaserver/dynamicHtml/extra?lightsOn=false"><li>Lights Off</li></a>
        <a href="/whatisaserver/dynamicHtml/extra?lightsOn=true"><li>Lights On</li></a>
        <a href="/whatisaserver/dynamicHtml/extra"><li>Undo</li></a>
      </ul>
    </p>

    <!-- And here are the styles and server-side code to enable the above
    trickery to work. Remember the ${"javascript"} code runs on the server! --!>

    ${
      // I am using strings that say "true" and "false" which is a bit
      // confusing. These are strings, not boolean values! Hence, I actually
      // have a lot more than 2 possibilities; I only turn the lights on
      // if I have an exact "true". I turn them off for an exact "false".
      // Otherwise, I do nothing!
      request.query["lightsOn"] === "true"
        ? "<style>body { background-color: #ffff82 /* light yellow */ }</style>"
        : request.query["lightsOn"] === "false"
        ? "<style>body {background-color: black }</style>"
        : ""
    }


    <h2>Pretty cool!</h2>
    <p><a href="/whatisaserver/json">Next Demo</a></p>
    </body></main>
  `);
});

app.get("/whatisaserver/json", (_, response) => {
                                // ^ It is not a bad idea to use an underscore
                                // to displace positional arguments that you
                                // don't need. I don't need `request`, so I
                                // just put an _. This is not very beautiful,
                                // but sometimes developers do this if they
                                // have no other choice!
  response.contentType("application/json").send(`
    {
      "Oh!": "and don't get stressed about JSON!",
      "you see": "JSON is just a nifty way to share structured data between programs",
      "fun fact": "if you copy and paste this into a JS program, it's all valid JS!",
      "it": [
        "turns",
        "out",
        "it's",
        "just",
        "another",
        "type",
        "of",
        "text",
        "that",
        "HTTP",
        "servers",
        "like",
        "to",
        "send!"
      ],
      "and": {
        "if": "you are a human user, it might not look that pretty,",
        "but": "if you are a computer, this stuff is absolutely infectious!"
      },
      "finalPageHref": "http://localhost:3000/whatisaserver/xmlcloser",
      "note": "visit the above link next!     ^^^^^^^^^^^^^^^^^^^^^^^"
    }
  `);
});

// XML is an older alternative to JSON, which is still widely used!
//
// - You might notice the relationship between XML / HTML because they look
//   similar! They both descended from Standard Generalized Markup Language but
//   have different use cases
// - You may see it in payloads for things like ecommerce, banking, sports
//   betting, weather
// - Some people consider it more human-readable than JSON (though of course
//   with practice, JSON is plenty human-readable)
// - You can add comments and attributes to tags which is not possible in JSON
// - If you ever go into mobile development, XML is often used for creating
//   layouts in Android development, and it's used for config in macOS / iOS
//   too!
// - In fact, it's generally more popular for configuration files than JSON
//   (YAML or TOML) are probably the most trendy configuration languages today,
//   though
// - XML can be converted to JSON and vice-versa:
//   https://codebeautify.org/xmltojson
app.get("/whatisaserver/xmlcloser", (_, response) => {
  response.contentType("application/xml").send(`
      <xml>
      <so>
      <that>
      <is>
      <about>
      <all_I_have>
      <got>
      <for_you>
      <today.>
      <thank_you_for_learning_with_me>
      <and_see_you_next_time>
      😁
      </and_see_you_next_time>
      </thank_you_for_learning_with_me>
      </today.>
      </for_you>
      </got>
      </all_I_have>
      </about>
      </is>
      </that>
      </so>
      </xml>
    `);
});

app.listen(3000);
