import React, { useState, useEffect } from "react";
import axios from 'axios';
import { logOut } from '../auth/session';
const PostComment = (props) => {
    const [comment, setComment] = useState("");
    const postComment = () => {
        let bearer = 'Bearer ' + window.localStorage.getItem("token");
        console.log("comment", comment);
        const data = new FormData();
        data.append('comment', comment)
        data.append('slug_name', props.slug_name)
        data.append('user_id', window.localStorage.getItem("user_id"))
        data.append('name', window.localStorage.getItem("name"))
        axios.post('http://127.0.0.1:8000/api/insertComment', data, {
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                if (response.status != 200) {
                    logOut();
                }
                setComment("");
                props.newComment(comment)
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    return (
        <div className="mb-4">
            <input className="form-control" value={comment} onChange={e => setComment(e.target.value)} type="text" />;
            <button type="submit" className="btn btn-primary mr-1" onClick={() => postComment()}>Submit</button>
        </div>
    )
}

export { PostComment }