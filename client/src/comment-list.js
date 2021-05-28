import React from 'react';

const CommentList = ({ comments }) => {
  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'rejected') {
      content = 'Comment not approved';
    }
    if (comment.status === 'pending') {
      content = 'Waiting approval';
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <ul>{renderComments}</ul>;
};

export default CommentList;
