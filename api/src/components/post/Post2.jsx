import "./post.css";
import { MoreHoriz } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState, useContext } from "react";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../context/AuthContext.js";
import { format } from "timeago.js";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(AuthContext);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              className="postProfileImg"
              src={
                Users.filter((u) => u.id === post?.userId)[0].profilePicture ||
                "/assets/person/1.jpeg"
              }
              alt=" "
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === post?.userId)[0].username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreHoriz />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img className="postImg" src={post.postImg} alt=" " />
        </div>
        <hr />

        {/* share Bottom */}
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <ThumbUpAltOutlinedIcon
                className="shareIcon"
                htmlColor="#03045e"
              />
              <span className="shareOptionText">Like</span>
            </div>
            <div className="shareOption">
              <ChatBubbleOutlineOutlinedIcon
                className="shareIcon"
                htmlColor="#0077b6"
              />
              <span className="shareOptionText">Comment</span>
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
    </div>
  );
}
