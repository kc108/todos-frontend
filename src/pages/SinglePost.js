import React from 'react';
import { Link } from "react-router-dom";


// DESTRUCTURING THE PROPS NEEDED TO GET OUR POST, INCLUDING ROUTER PROP MATCH
const SinglePost = ({ posts, match }) => {

    const id = parseInt(match.params.id); // get the id from the url param
    const post = posts.find((post) => post.id === id);

    /////////////////////////////////
    // STYLES
    /////////////////////////////////
    const div = {
        textAlign: "center", 
        border: "3px solid green", 
        width: "80%",
        margin: "30px auto",
    };

    return (
        <div style={div}>
            <h1>{post.subject}</h1>
            <h2>{post.details}</h2>
            <Link to="/">
                <button>Go Back</button>
            </Link>
        </div>
    );
};

export default SinglePost;
