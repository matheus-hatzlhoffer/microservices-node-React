import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './comment-create';
import CommentList from './comment-list';

const PostList = () => {
  const [post, setPost] = useState({});
  const fetchPost = async () => {
    const res = await axios.get('http://posts.com/posts');
    setPost(res.data);
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const renderPost = Object.values(post).map((post) => {
    return (
      <div
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderPost}
    </div>
  );
};

export default PostList;
