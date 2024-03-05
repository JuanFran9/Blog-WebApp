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

// Render the index page with the posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts }); 
  });

let posts = []; // This will store our posts

app.post('/posts', (req, res) => {
  const post = {
    id: posts.length + 1, // Simple way to generate unique ids
    title: req.body.title,
    content: req.body.content
  };
  posts.push(post);
  res.redirect('/');
});


// Listen on the configured port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
