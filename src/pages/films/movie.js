import React, { useState, useEffect } from "react";
import { logOut } from '../auth/session';
import { remoteServer } from "../../variables";
const Movie = (props) => {
    const [slug_name, setSlug_name] = useState(props.slug_name);
    const [data, setData] = useState({});
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        let url = remoteServer + '/movie/' + slug_name;
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
                    console.log("resutl:", result);
                    if (result.status) {
                        logOut();
                    } else {
                        setData(result);
                    }

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {

                }
            )
    }, [])
    console.log("data", data);
    let rating = [];

    const ratingStars = () => {
        for (let i = 0; i < data.rating; i++) {
            rating.push(<i key={i} className="fa fa-star" aria-hidden="true"></i>);
        }
        return rating;
    };
    return (
        <div>
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-2">
                    <img src={data.photo} width="200px"></img>
                </div>
                <div className="col-2 float-left">
                    <div className="card">
                        <div className="card-body" height="100%">
                            <h5 className="card-title">{data.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {ratingStars()}
                            </h6>
                            <p className="card-text">{data.description}</p>

                        </div>
                    </div>
                    <div className="col-4"></div>

                </div>
            </div>
        </div>
    )
}

export { Movie }