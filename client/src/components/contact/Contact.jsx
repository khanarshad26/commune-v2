import React from 'react'
import Grid from '@material-ui/core/Grid';
import "./contact.css"

const Contact = ({ contact, setContact }) => {

    const users = ["Arshad","Aamir"];
    // const userPic = "assets/person/4.jpeg";
    // function handleClick(userName) {
    //     console.log(userName);
    //     setContact(userName);
    // }

    return (
        <Grid container spacing={0}>
            {users?.map((user, index) => (
                <Grid container spacing={2} style={{ border: "solid 1px", borderColor: "#dbd9d9", marginBottom:"6px" }} className="contactName">
                <Grid item>
                    <img src="assets/person/7.jpeg" className="messengeImg" alt=" " />
                </Grid>
                <Grid item>
                    <div className="contactName">{user}</div>
                </Grid>
            </Grid>
            ))}
                
            
        </Grid >

    )
}

export default Contact