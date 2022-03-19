import React from 'react';
import Post from '../post/Post.jsx';
import "./feed.css";

const Feed = ({posts}) => {
  // console.log("feed rendered")
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

export default React.memo(Feed);
