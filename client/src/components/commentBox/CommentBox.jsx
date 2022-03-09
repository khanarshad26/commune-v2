import React, {useState, useEffect, useRef  } from 'react';
import './commentBox.css';
import axios from 'axios';
import { useSelector } from 'react-redux';
   
import {format} from 'timeago.js';
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import { MoreVert } from "@material-ui/icons";

const CommentBox = ({post, setShowCommentBox}) => {
  const user = useSelector(state => state.user.user);
    const [comments, setComments] = useState([]);
    const commentText = useRef();

    const fetchComments = async() => {
        try{
            const res = await axios.get('/api/comment/all/'+post._id);
            setComments(res.data.sort((p1,p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }));
        }catch(err){
            console.log(err);
        }
    }

    const cancelHandler = () => {
        commentText.current.value = "";
        setShowCommentBox(false);
    }

    const commentHandler = async() => {
    if(!commentText.current.value) return;
    const newComment = {
      postId : post._id,
      comment : commentText.current.value,
      userId: user._id,
      commentorName : user.username, 
      profilePicture : user.profilePicture || "/assets/noAvatar.png",
    };
    // console.log(newComment);
    try {
        await axios.post("/api/comment/"+post._id, newComment);
        commentText.current.value = "";
        fetchComments();
      } catch (err) {
        console.log(err);
      }
    }

    useEffect(() => {
        fetchComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const CommentTemplate = ({comment}) => {
        return(
            <>
            <div className="commentTemplateContainer">
                <div className="commentTemplateUpper">
                <img className="commentProfileImg" src={"/assets/noAvatar.png"} alt=" " />
              <div className="commentTemplateRight">
              <div className="commentTemplateTop">
                <span className="postUsernameComment">{"Arshad Khan" || comment.commentor.username}</span>
                <span className="commentDate">{format(comment.createdAt)}</span>
              </div>
              <p className="commentText">{comment.comment}</p>
              </div>
              <MoreVert />
                </div>
              
              <div className="CommentTemplateBottom">
                  <div className="featureButton">
                      <ThumbUpAltOutlinedIcon className="featureButtonIcon"/>
                      <div className="featureButtonText">Like</div>
                  </div>

                  <div className="featureButton">
                      {/* <ThumbUpAltOutlinedIcon className="featureButtonIcon"/> */}
                      <div className="featureButtonText">Reply</div>
                  </div>

                  <div className="featureButton">
                      {/* <ThumbUpAltOutlinedIcon className="featureButtonIcon"/> */}
                      <div className="featureButtonText">View replies</div>
                  </div>
              </div>
      

            </div>
            </>
        );
    }

    return(
      <>
        <h3 className="commentHeading">Comments</h3>
        <div className="shareTop">
          <img className="commentProfileImg" src={user.profilePicture || "/assets/noAvatar.png"} alt=" " />
          <input 
            placeholder="Commenting publicly"
            className="commentInput"
            style = {{fontSize : 'small'}}
            ref = {commentText}
          />
        </div>

        <div className="boxBottomComment">
            <div className="cancel" onClick={cancelHandler}>
              Cancel
            </div>
            <div className="save" onClick={commentHandler}>
              Comment
            </div>
          </div>

        {/* <hr className="shareHr"/> */}
        {comments.map(comment => {
          return <CommentTemplate comment={comment}/>
        })}
      </>
    );
  }

  export default CommentBox;