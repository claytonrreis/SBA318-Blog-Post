**BlogPost Project**

This is a Node.js application for a basic blog website. It allows users to view a list of blog posts with their content and comments, and includes functionalities for creating new posts and adding comments (CRUD operations).

**Getting Started**

Prerequisites:
Node.js and npm (or yarn) installed on your system.
Installation:
Clone this repository.
Run npm install (or yarn install) to install dependencies.
Run the application:
Run node app.js to start the server.
The application will be available at http://localhost:5050

**Project Structure**

├── data/ # Folder containing data files (e.g., posts.js);

├── public/ # Folder for static files (e.g., stylesheets);

├── routes/ # Folder for API route handlers (e.g., postsRoutes.js);

├── views/ # Folder containing Pug template files (e.g., index.pug);

├── app.js # Main application file;

├── package.json # Package dependencies;

└── README.md # This file (you're reading it!);

**Technologies Used**

Node.js: JavaScript runtime environment for server-side development.
Express: Web framework for building web applications with Node.js.
Pug: Template engine for generating dynamic HTML content.
Body-Parser: Middleware for parsing incoming request bodies.
