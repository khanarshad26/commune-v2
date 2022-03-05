import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import CommentBox from "../commentBox/CommentBox";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false)
  const { user: currentUser } = useContext(AuthContext);


  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) { }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${post.userId}`}>
              <img className="postProfileImg" src={post.img ? post.img : "assets/noAvatar.png"} alt=" " />
            </Link>
            <div className="uppermiddle">
              <span className="postUsername">{post.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post?.postImg && <img className="postImg" src={post?.postImg} alt=" " />}

        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {like > 0 && <img
              className="likeIcon"
              src={"/assets/like.png"}
              alt=" "
            />}
            {like > 0 && <span className="postLikeCounter">{like}</span>}

            {/* <span className="postLikeCounter">{like}</span> */}
          </div>
        </div>

        <hr className="hrPost" />

        {/* ___post new bottom_____ */}
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption" onClick={likeHandler}>


              {!isLiked ? <>
                <ThumbUpAltOutlinedIcon
                  className="shareIcon"
                  htmlColor="#03045e"
                />
                <span className="shareOptionText">Like</span>
              </> : <>
                <ThumbUpIcon />
                <span className="shareOptionText">Dislike</span>
              </>
              }

            </div>
            <div className="shareOption">
              <ChatBubbleOutlineOutlinedIcon
                className="shareIcon"
                htmlColor="#0077b6"
              />
              <span className="shareOptionText" onClick={() => setShowCommentBox(!showCommentBox)} >Comment</span>
            </div>
            <div className="shareOption">
              <ShareIcon htmlColor="#00b4d8" className="shareIcon" />
              <span className="shareOptionText">Share</span>
            </div>
            <div className="shareOption">
              <SendIcon htmlColor="#00b4d8" className="shareIcon" />
              <span className="shareOptionText">Send</span>
            </div>
          </div>
        </div>


      </div>
      {showCommentBox ? <CommentBox post={post} /> : null}
    </div>
  );
}
