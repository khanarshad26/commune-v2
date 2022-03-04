import React from "react";
import "./forum.css";
import Topbar from "../../components/topbar/Topbar";
import { Search } from "@material-ui/icons";

const Forum = () => {
  return (
    <>
       
      <div className="forumContainer">
        <div className="forumLeftside">
      <div className="forumWrapper">
        
          <div className="forumHeading">Student Forum</div>
          <hr className="hrform" />
          <div className="makeSure">Make sure what you’re asking is unique, concise, and phrased like a question.</div>
          <div className="forumFields">
          <div className="inputContainer">
              <label htmlFor="" className="label1">
              <b>Title<sup>*</sup></b>
              </label>
              <input type="text" className="input2" />
            </div>

            <div className="inputContainer">
              <label htmlFor="" className="label1">
              <b>Description</b>
              </label>
              <textarea type="text" className="input3" />
            </div>

            <div className="inputContainer">
              <label htmlFor="" className="label1">
              <b>Add Topics<sup>*</sup></b>
              </label>
              <input type="text" className="input2" />
            </div>
          </div>
        </div>


        <div className="forumWrapper">
          <div className="forumHeading">Already Asked Questions</div>
          <hr className="hrform" />
          <div className="forumQuestions">

            <div className="forumQuestion">
              <img src="/assets/person/1.jpeg" className="questioneerImg" alt=" " />
              <div className="questionWapper">
                <div className="questionText">
                  What should i do? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Corrupti tempora architecto esse sapiente
                  saepe facere eum?
                </div>
                <div className="questioneerInfo">
                  <div className="questioneerName">Arshad Khan</div>
                  <div className="desc">IV-BTech Mech NIT Andhra Pradesh</div>
                </div>
              </div>
            </div>

            <div className="forumQuestion">
              <img src="/assets/person/1.jpeg" className="questioneerImg" alt=" " />
              <div className="questionWapper">
                <div className="questionText">
                  What should i do? Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Corrupti tempora architecto esse sapiente
                  saepe facere eum?
                </div>
                <div className="questioneerInfo">
                  <div className="questioneerName">Arshad Khan</div>
                  <div className="desc">IV-BTech Mech NIT Andhra Pradesh</div>
                </div>
              </div>
            </div>
            </div>

          </div>
        </div>

        <div className="forumTag">
          <div className="tagHeading">Tag</div>
          <hr className="hrform" />
          <span className="searchbar1">
            <Search className="searchIcon" />
            <input placeholder="Search" className="searchInput" />
          </span>
          <div className="tagWrapper">
            <div className="tags">
              <div className="tag">Java</div>
              <div className="tag">JavaScript</div>
              <div className="tag">CSS</div>
              {/* <div className="tag">HTML</div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
