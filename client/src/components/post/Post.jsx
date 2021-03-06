import "./post.css";
import React from 'react';
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import CommentBox from "../commentBox/CommentBox";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes?.includes(user._id));
  }, [user._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: user._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const [readMore, setReadMore] = useState(true);

  // console.log(post.desc);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img
                className="postProfileImg"
                src={post.img ? post.img : "assets/noAvatar.png"}
                alt=" "
              />
            </Link>
            <div className="uppermiddle">
              <span className="postUsername">{post.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVert onClick={() => setShowModel(!showModel)} />
            {showModel ? <div className="morePost">
              <div id="more1" className="copyLink">
                <div id="cpylinkIcon"><img id="morepostIcon" className="cpylinkIcon" src="/assets/images/linkIcon.png" alt=" " /></div>
                <div id="more2" className="spn"><span className="morepostRighttop">Copy Link</span></div>
              </div>
              <div id="more1" className="hidePost">
                <div id="hidepostIcon"><img id="morepostIcon" className="hidepostIcon" src="/assets/images/hideIcon.png" alt=" " /></div>
                <div id="more2" className="hidepostRight">
                  <div ><span className="morepostRighttop"> Hide Post</span></div>
                  <div><span className="morepostRightBottom">See fewer posts of this kind</span></div>
                </div>
              </div>
              <div id="more1" className="unfollowPost">
                <div id="unfollowpostIcon"><img id="morepostIcon" className="unfollowpostIcon" src="/assets/images/unfollowIcon.png" alt=" " /></div>
                <div id="more2" className="unfollowpostRight">
                  <div ><span className="morepostRighttop"> Unfollow Username</span></div>
                  <div><span className="morepostRightBottom">stop seeing posts but stay friends</span></div>
                </div>
              </div>
              <div id="more1" className="reportPost">
                <div id="reportpostIcon"><img id="morepostIcon" className="reportpostIcon" src="/assets/images/reportIcon.png" alt=" " /></div>
                <div id="more2" className="reportpostRight">
                  <div ><span className="morepostRighttop">Report Post</span></div>
                  <div><span className="morepostRightBottom">I am concerned about this post</span></div>
                </div>
              </div>
            </div> : null}
          </div>
        </div>
        <div className="postCenter">
          <span className={readMore ? "postTextReadMore" : "postText"}>
            {readMore ? post?.desc.slice(0, 150) : post?.desc}
            {post?.desc.length > 150 ? <span onClick={() => setReadMore(!readMore)} className="read-or-hide">
              <span className="readmore">{readMore ? "...read more" : " show less"}</span>
            </span> : null}
          </span>

          {/* <span className={readMore ? "readmore" : "invisible"} onClick={() => setReadMore(false)}>read more</span> */}
          {post?.postImg && (
            <img className="postImg" src={post?.postImg} alt=" " />
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {like > 0 && (
              <img className="likeIcon" src={"/assets/like.png"} alt=" " />
            )}
            {like > 0 && <span className="postLikeCounter">{like}</span>}

            {/* <span className="postLikeCounter">{like}</span> */}
          </div>
        </div>

        <hr className="hrPost" />

        {/* ___post new bottom_____ */}
        <div className="feedBottom">
          <div className="feedOptions5">

            <div className="likefeedOption" onClick={likeHandler}>
              {!isLiked ? (
                <>
                  <ThumbUpAltOutlinedIcon
                    className="shareIcon"
                    htmlColor="#03045e"
                  />
                  <span className="shareOptionText">Like</span>
                </>
              ) : (
                <>
                  <ThumbUpIcon />
                  <span className="shareOptionText">Dislike</span>
                </>
              )}
            </div>

            <div className="commentfeedOption">
              <ChatBubbleOutlineOutlinedIcon
                className="shareIcon"
                htmlColor="#0077b6"
              />
              <span
                className="shareOptionText"
                onClick={() => setShowCommentBox(!showCommentBox)}
              >
                Comment
              </span>
            </div>

            <div className="sharefeedOption">
              <ShareIcon htmlColor="#00b4d8" className="shareIcon" />
              <span className="shareOptionText">Share</span>
            </div>
            
            <div className="sendfeedOption">
              <SendIcon htmlColor="#00b4d8" className="shareIcon" />
              <span className="shareOptionText">Send</span>
            </div>
          </div>
        </div>
      </div>
      {showCommentBox ? <CommentBox post={post} setShowCommentBox={setShowCommentBox} /> : null}
    </div>
  );
}

export default React.memo(Post);