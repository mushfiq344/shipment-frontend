import React, { useState, useEffect } from "react";
import { logOut } from '../auth/session';
import { remoteServer } from "../../variables";
import axios from 'axios';
const Comments = (props) => {

    const [slug_name, setSlug_name] = useState(props.slug_name);
    const [comments, setComments] = useState([]);


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
                let newComment = {
                    "id": comments.length,
                    "comment": comment,
                    "name": localStorage.getItem("name")
                }
                setComments([...comments, newComment]);
                setComment("");

            })
            .catch(function (error) {
                console.log(error);
            });

    }


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let url = remoteServer + '/comments/' + slug_name;
        let bearer = 'Bearer ' + window.localStorage.getItem("token");
        fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("comments::", result);
                    if (result.status) {
                        logOut();
                    } else {
                        setComments(result);
                    }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )
    }, [])
    console.log("comments:::", comments);

    return (
        <div>
            <ul className="list-group">
                {comments.map(item => (
                    <li key={item.id} className="list-group-item d-flex  align-items-center">
                        <span className="badge badge-primary badge-pill mr-4">{item.name} ::</span>  {item.comment}
                    </li>

                ))}

            </ul>
            <div className="mb-4">
                <input className="form-control" value={comment} onChange={e => setComment(e.target.value)} type="text" placeholder="Add new comment" />;
            <button type="submit" className="btn btn-primary mr-1" onClick={() => postComment()}>Submit</button>
            </div>

        </div >
    )
}

export { Comments }