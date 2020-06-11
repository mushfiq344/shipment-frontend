import React, { useState, useEffect } from "react";
import { Movie } from "./movie";
import { Comments } from "./comments";
import { PostComment } from "./postComment";
const SingleMovie = (props) => {
    const { match: { params } } = props;
    const [newUpdate, setNewUpdate] = useState(false);
    useEffect(() => {

    }, [])
    const newComment = (submittedComment) => {

        setNewUpdate(true)
        console.log("hello")
    }
    console.log("Loading")
    return (
        <div>
            <Movie slug_name={params.slug_name}></Movie>
            <Comments newUpdate={newUpdate} slug_name={params.slug_name}></Comments>


        </div>
    )
}

export { SingleMovie }