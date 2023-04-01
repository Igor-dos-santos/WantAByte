# WantAByte - My OWASP_APP


# This is a Simple and Secure Node-App
The idea is to secure a simple Node.js and Express app by adding user authentication with Passport.js and Auth0.

![Screenshot 2023-04-01 at 16 50 58](https://user-images.githubusercontent.com/56481210/229300531-e81fc1e9-c2fc-4d7b-b5bc-2860d1808b50.png)

Control user authentication and safeguard routes with Passport.js and Auth0. Pug templates are used on the front end to render views, while CSS is used to maintain style sheets.

Node.js development process using nodemon to restart the server and browser-sync to refresh the browser whenever relevant source files change.

## How to Build the App

This is a fictional restaurant named WANTABYTE that specializes in making delicious food for developers.
Using server-side rendering (SSR), the web app will consist of two views: a public login screen and a protected account information screen.

![Screenshot 2023-04-01 at 17 13 59](https://user-images.githubusercontent.com/56481210/229302211-ab5a2f0b-cab1-4808-a2e6-06fc04df1a93.png)


## Prerequisites
- Node.js and JavaScript.

- A terminal app for MacOS and Linux or PowerShell for Windows.

- Node.js v8+ and a Node.js package manager installed locally.

### To install Node.js and NPM, visit https://nodejs.org/en/download 

## Bootstrapping a Node.js Project
- Create a project directory named "wantabyte" to hold your application, and make that your working directory:

```
mkdir  wantabyte
cd toody-portal
```

- Use the npm init -y command to create a package.json file for your application:
```
npm init -y
```

- By passing it the -y flag as an argument, the file is created with sensible defaults:

```
{
  "name": "wantabyte",
  "version": "1.0.0",
  "description": "",
  "main": "./index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Create a file named index.js

```
# For macOS/Linux use:
touch index.js
# For Windows PowerShell use:
ni index.js
```
## Creating an NPM script to run the application
I'm using use nodemon for this project, a tool that monitors your application and automatically restarts your server when source code changes. With node, you'd have to restart the server manually when changes are made.

Install nodemon as a dependency of your Node.js application:
```
npm install --save-dev nodemon

```
Next, replace the test script under the scripts property of package.json with the following dev script:

```
{
  "name": "wantabyte",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon ./index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^1.19.1"
  }
}
```

The dev NPM script maps to the nodemon index.js command. nodemon takes as argument the entry point of an application and executes it. To run dev or any command from a package's scripts object use npm run:

```
npm run dev
```

# Integrating Express application framework with Node.js
To use the Express framework in your application, install it as a project dependency:

```
npm install express
```
### Earlier versions of npm require the --save flag to be specified explicitly.

With express installed, open index.js and populate it with the following content to create a simple Express app:

```
// index.js

const path = require("path");
const express = require("express");

const app = express();
const port = process.env.PORT || "8000";

app.get("/", (req, res) => {
  res.status(200).send("toody: Food For Devs");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
```
The express module is imported by the aforementioned index.js script, which exports a function that generates an Express application by default. The resulting Express application is stored in a variable called app once this function has been called. The script declares a port variable that takes the value of process.env.PORT, which defaults to 8000. After that, it builds a straightforward route that responds to GET HTTP requests made to the root path, /, with a string. Lastly, the Express application is configured to listen for HTTP requests in the predefined port.
Run the application to test this script if it isn't already running:
```
npm run dev
```
nodemon should output something similar to the following in the terminal:

```
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Listening to requests on http://localhost:8000
```
Open any browser and visit http://localhost:8000/ to see the app in action. If everything is running successfully, the browser should display the string toody: Food For Devs on a plain page.

If you want to learn more details about Express routing, please refer to the Express "Basic routing" document from the official docs.

With a basic web app in place, it's time to create views using Pug.

# Using Pug template engine to Create Express Views
Dynamic templates that can generate UI elements conditionally and can be filled with values from the server are necessary to construct rich web apps. Static HTML files can not be used to accomplish this. One alternative is a template engine like Pug. Conditional rendering, template hydration, template inheritance to build pages, and a terse syntax akin to writing Python code are all features of Pug templates.

Express must be set up with a location to look for templates and with Pug as the template engine. Open a new tab or window and use the following command to add Pug as a project requirement without shutting down the active server:

```
npm install pug
```
Next, create a directory named views under the project directory:

```
mkdir views
```

To optimize template creation, you'll create a layout to encapsulate the top-level HTML structure of a page. This layout will be extended by other templates to render a complete and valid HTML page. In Pug, this is known as template inheritance and it's done by using the block and extends artifacts.

Under the views directory, create a layout.pug file:
```
# For macOS/Linux use:
touch views/layout.pug
# For Windows PowerShell use:
ni views/layout.pug
```
Add the following content to it:

```
block variables
doctype html
html
  head
    meta(charset="utf-8")
    link(rel="shortcut icon", href="/favicon.ico")
    meta(name="viewport", content="width=device-width, initial-scale=1, shrink-to-fit=no")
    meta(name="theme-color", content="#000000")
    title #{title} | WHATABYTE
  body
    div#root
      block layout-content
```
This template uses the title variable to render the document title of a page. This variable value will be passed from the server to the template.

Next, create an index.pug file under the same directory:

```
# For macOS/Linux use:
touch views/index.pug
# For Windows PowerShell use:
ni views/index.pug
```   

## Adding Live Reload to Express Using Browsersync

Start by installing Browsersync as follows:

```
npm install --save-dev browser-sync
```
Next, you'll create an NPM script that configures and runs Browsersync to serve your web application. Open and update package.json with the following ui NPM script:

```
"ui": "browser-sync start --proxy=localhost:8000 --files='**/*.css, **/*.pug, **/*.js' --ignore=node_modules --reload-delay 10 --no-ui --no-notify"
```


For a detailed explanation of Pug's functionality, refer to the Getting Started page of the Pug documentation.

Based on the value of the isAuthenticated variable, the content of the div.NavButtons container is shown. Route controllers will also supply this value to the template, enabling it to render the appropriate button depending on the user's authentication state.

Configure Express such that it uses Pug as the application's view template engine, uses the views subdirectory as the views source folder, and renders a view template as the response of a route controller to connect the templates with the controllers.

```
npm run ui
```

The terminal will output information on the local and external locations where the static pages are being served:

```
[Browsersync] Proxying: http://localhost:8000
[Browsersync] Access URLs:
 -------------------------------
    Local: http://localhost:3000
 External: http://<YOUR IP ADDRESS>:3000
 -------------------------------
[Browsersync] Watching files...
```

Browsersync opens a new window or tab on your operating system default browser automatically to present the web app interface — if it didn't, open http://localhost:3000/.

To test this setup, you can make any change on the index.pug file, save it, and watch the site served on port 3000 update itself.

# Serving Static Assets with Express
To enhance the web application views with styling and images, Express needs to be configured to access static files, such as stylesheets and images, from a project directory. For your application, use a directory named public that you can create as follows:

```
mkdir public
```
The express.static() built-in middleware function lets you specify the path of the directory from which to serve static assets. To mount this middleware function, you use the app.use() method. Update the content of index.js as follows to perform both tasks in one line of code:

```
// index.js

// Imports and app instance

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Route controllers

// App listening
```

You are now using the public directory as the source of static assets. You should put inside this directory any CSS or image files that your application needs to use.

## Styling Express Templates using CSS
Inside this same directory, create a style.css file:

```
# For macOS/Linux use:
touch public/style.css
```
  
Save your changes. 

  
  
## This part is about the authentication of the web APP

  
  
#Install the project dependencies:
``` 
npm install
```

#Run the app server using Nodemon:
```
npm run dev
```

#In a separate terminal tab or window, serve the app frontend on a static server using Browsersync:
```
npm run ui
```

## Do not forget to run both DEV and UI 
Aut0 uses both ports to travel through authetnticated pages.


Browsersync proxies the server running on port 8000 with nodemon.

To see the app in action and start following the tutorial, visit http://localhost:8000 on your browser. 


Adding User Authentication to an Express App
In this section, I describe how to add user authentication to an Express app using Passport.js and Auth0. At this stage when you click on the login button present on the index page, you'll see the following error on the screen:


"Cannot GET /login"


At this moment, there is no controller to handle the GET /login endpoint in your API. The goal for that endpoint is to manage everything related to authenticating a user, that is, verifying the identity of a user.

Best practices as suggested by OWASP:

Implementing proper password strength controls such as password length, complexity, and topology.
Implementing secure password recovery mechanisms.
Storing passwords in a secure fashion which includes hashing passwords with a salt.
Transmitting passwords only over TLS or other strong transport.
Implementing correctly authentication and error messages that mitigate user ID and password enumeration.
Preventing brute-force attacks.
These authentication best practices address different attack vectors and mitigate vulnerabilities in the authentication process that could compromise the identity of your users. 

Identity as a service
Auth0 provides authentication as a service. It gives you the building blocks you need to secure your applications without having to become a security expert. You can connect any application to Auth0 and define the identity providers you want to use (how you want your users to log in).

To connect your app with Auth0, you'll use the Node.js SDKs. Then, any time a user tries to authenticate, Auth0 will verify their identity and send the required information back to your app.

Using middleware for authentication
As explained in the "Using middleware" section of the Express docs, an Express application is essentially a series of middleware function calls that execute during the request-response cycle. Each function can modify the request and response objects as needed and then either pass control to the next middleware function or end the request-response cycle.

When creating protected routes in Express, you need to know if the user is authenticated before executing the logic of route controllers. Thus, authentication in Express can be seen as a step in the request-response cycle which can be implemented as middleware.

To make the implementation of authentication easier, instead of writing all the code needed to structure the authentication middleware, you'll use Passport.js, a simple and unobtrusive authentication middleware for Node.js created by Jared Hanson, former Principal Architect at Auth0.

Setting up Passport.js with Node and Express
As explained in the Passport.js "Overview" document, authentication takes a variety of forms: users may log in by providing a username and password or single sign-on using an OAuth provider such as Facebook or Twitter.

Passport.js offers different authentication mechanisms, known as strategies, to cater to the unique authentication requirements each application has. Strategies are packaged as individual modules and you can choose which strategies to employ, without creating unnecessary dependencies.

You are going to use the Auth0 authentication strategy with Passport.js so that you don't have to worry about creating and managing user credentials yourself. To start, install the following packages:
```
npm install passport passport-auth0 express-session dotenv --save
```

Here's a breakdown of each package being installed:
```
passport: Passport.js is Express-compatible authentication middleware for Node.js.

passport-auth0: This is the Auth0 authentication strategy for Passport.js.

express-session: This is a module to create and manage session middleware.

dotenv: This is a zero-dependency module that loads environment variables from a .env file into process.env.
```


Securing an app's authentication login using Auth0 and Passport.js involves using Auth0 as an authentication provider and Passport.js as the middleware to handle the authentication process in your Node.js application. Auth0 provides a secure and reliable authentication service that allows you to add user authentication and authorization to your app without having to manage user data and credentials.

#Here are the steps to implement Auth0 and Passport.js in your Node.js application:

Securing an app's authentication login using Auth0 and Passport.js involves using Auth0 as an authentication provider and Passport.js as the middleware to handle the authentication process in your Node.js application. Auth0 provides a secure and reliable authentication service that allows you to add user authentication and authorization to your app without having to manage user data and credentials.
Here are the steps to implement Auth0 and Passport.js in your Node.js application:
1.	Create an account on Auth0 and create a new application in the Auth0 dashboard.
2.	Install the required packages for Passport.js and Auth0 in your Node.js application. These packages include passport, passport-auth0, and express-session.
3.	Set up Passport.js middleware to handle the authentication process in your Node.js application. This involves configuring Passport.js to use the Auth0 strategy for authentication, which involves setting the client ID, client secret, and callback URL for your Auth0 application.
4.	Create the login and logout routes in your Node.js application to handle the authentication process. This involves redirecting the user to the Auth0 login page when they click the login button, and redirecting them back to your application after successful authentication.
5.	Once the user is authenticated, create a session for them in your Node.js application using the express-session middleware. This session allows you to keep the user authenticated as they move around your application.
6.	To secure the app's routes, use Passport.js middleware to authenticate users before allowing them access to protected resources. This involves creating middleware that checks if the user is authenticated and redirects them to the login page if they are not.


In summary, Auth0 provides a secure and reliable authentication service that allows you to add user authentication and authorization to your app. Passport.js is used as middleware to handle the authentication process in your Node.js application. The steps involved in implementing Auth0 and Passport.js in your Node.js application include installing the required packages, setting up Passport.js middleware, creating login and logout routes, creating sessions, and securing app routes with Passport.js middleware.

