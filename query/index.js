const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const eventHandle = (type, data) => {
  if (type === 'Post Created') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'Comment Created') {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === 'Comment Updated') {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id == id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get('/post', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;
  eventHandle(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log('listen 4002 Query');
  const res = await axios.get('http://event-bus-srv:4005/events');

  for (let event of res.data) {
    eventHandle(event.type, event.data);
  }
});
