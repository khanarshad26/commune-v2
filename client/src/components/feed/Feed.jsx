import React from 'react';
import Post from '../post/Post.jsx';
import "./feed.css";

export default function Feed({posts}) {
  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
