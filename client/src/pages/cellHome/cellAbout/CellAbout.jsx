import React from 'react';
import { Link } from 'react-router-dom';

const CellAbout = ({ cell }) => {
    return (
      <div className="aboutBottom">
        <div className="generalInfo">
          <div className="Header">
            <span>
              GENERAL INFORMATION
              <hr />
            </span>
          </div>
         {cell.category ? <div className="genInfo genInfospan">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/organizationIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>{"Type - "} + {cell.category}</span>
            </div>
          </div> : null}
          
          <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/DescriptionIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>{cell.description}</span>
            </div>
          </div>
          <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/calendarIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>{cell.doe}</span>
            </div>
          </div>
          {/* {(address !== "") ? <div className="genInfo">
            <div>
              <img
                className="genInfoIcons"
                src="assets/images/addressIcon.png"
                alt=" "
              />
            </div>
            <div>
              <span>{address}</span>
            </div> 
          </div> : null} */}

          <div className="people">
            <div className="peopleInfo">
              <div className="">
                <img
                  className="genInfoPics"
                  src="assets/images/camera icon.png"
                  alt=" "
                />
              </div>
              <div className="peopleRight">
                <span className="peopleName">{cell.facultyAdvisor}</span>
                <span className="peoplePosition">Faculty Advisor</span>
              </div>
            </div>
            <div className="peopleInfo">
              <div className="peoplePic">
                <img
                  className="genInfoPics"
                  src="assets/images/sanju.jpg"
                  alt=" "
                />
              </div>
              <div className="peopleRight">
                <span className="peopleName">{cell.generalSecrataty}</span>
                <span className="peoplePosition">General Secretary</span>
              </div>
            </div>
          </div>
        </div>
        <div classpans="ContactInfo">
          <div className="Header">
            <span className="general">
              CONTACT INFORMATION
              <hr />
            </span>
          </div>
          <div className="conInfo">
            <div className="conInfoRight">
              <div>
                <img
                  className="genInfoIcons"
                  src="assets/images/emailIcon.png"
                  alt=" "
                />
              </div>
              <div className="conMail">
                <span>{cell.email}</span>
              </div>

            </div>
            <div className="conInfoRightPhone">
              <div>
                <img
                  className="genInfoIcons"
                  src="assets/images/phoneIcon.png"
                  alt=" "
                />
              </div>
              <div className="conMail">
                <span>{cell.phone}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="sposors">
          <div className="sponInfo Header">
            <span className="general">
              Sponsors
              <hr />
            </span>
          </div>

          {cell.sponsors.map(sponsor => {
            return (
              <>
                <div className="genInfo">
                  <div>
                    <img
                      className="genInfoIcons"
                      src={sponsor.profilePicture}
                      alt=" "
                    />
                  </div>
                  <div>
                    <span>{sponsor.name}</span>
                  </div>
                </div>
              </>
            )
          })}



        </div>
        <div className="socialMedia">
          <div className="conInfo Header">
            <span className="general">
              Social Media Accounts
              <hr />
            </span>
          </div>
          <div className="SocialmediaIcons">

            <Link to="" className="Insta">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-instagram-48.png"
                alt=" "
              />
            </Link>

            <Link to="" className="Facebook">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-facebook-48.png"
                alt=" "
              />
            </Link>

            <Link to="" className="Twitter">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-twitter-circled-48.png"
                alt=" "
              />
            </Link>

            <Link to="" className="LinkedIn">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-linkedin-circled-48.png"
                alt=" "
              />
            </Link>

            <Link to="" className="Youtube">
              <img
                className="genInfoIcons"
                src="assets/images/icons8-youtube-48.png"
                alt=" "
              />
            </Link>

          </div>
        </div>
      </div>
    )
  }

  export default CellAbout;