import React from 'react';
import PostCreate from './post-create';
import PostList from './post-list';

const App = () => {
  return (
    <div className="container">
      <h1>Post Create</h1>
      <PostCreate />
      <hr />
      <h1>Posts made by you</h1>
      <PostList />
    </div>
  );
};

export default App;
