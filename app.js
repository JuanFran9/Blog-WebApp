const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs'); // Set EJS as templating engine which will be used to render HTML

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

let posts = []; // This will store our posts
let todos = []; // Holds todo tasks

// Render the index page with the posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts, todos: todos }); 
  });


app.post('/posts', (req, res) => {
  const post = {
    id: posts.length + 1, // Simple way to generate unique ids
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post); // Add the post to the array
  res.redirect('/');
});

// Set up a route to display the edit form with the post's existing data
app.get('/posts/:id/edit', (req, res) => {
    const post = posts.find(post => post.id == req.params.id);
    res.render('edit', { post: post });
  });

// Set up a route to handle the form submission and update the post
app.post('/posts/:id/update', (req, res) => {
    const index = posts.findIndex(post => post.id == req.params.id);
    posts[index].title = req.body.title;
    posts[index].content = req.body.content;
    res.redirect('/');
  });

app.post('/posts/:id/delete', (req, res) => {
  const id = req.params.id;
  posts = posts.filter(post => post.id != id); // Remove the post from the array
  res.redirect('/'); // Redirect back to the home page
});

app.post('/todos', (req, res) => {
    const newTask = {
      id: todos.length + 1,
      task: req.body.task
    };
    todos.push(newTask);
    res.redirect('/'); // Or to a specific route that displays todos
  });
  
  

// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
