import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Layout from "../../components/layout/layout";
import { remoteServer } from "../../variables";
import '../../css/movie-server.css';
import { ShipmentConditions } from "./shipmentConditions";
export default function ShipmentResult(props) {
    const [url, setUrl] = useState(remoteServer + '/allShipments');

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [first_page_url, setFirst_page_url] = useState(null);
    const [last_page_url, setLast_page_url] = useState(null);

    const [prev_page_url, setPrev_page_url] = useState(null);
    const [next_page_url, setNext_page_url] = useState(null);

    const [current_page, setCurrent_page] = useState(null);
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        console.log("fetch from here", url)
        fetch(url, {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("resutl here:", result);

                    setIsLoaded(true);

                    setItems(result.data);
                    // set links for first page and last page
                    setFirst_page_url(result.first_page_url);
                    setLast_page_url(result.last_page_url);
                    // set links for prev page and next page
                    setPrev_page_url(result.prev_page_url);
                    setNext_page_url(result.next_page_url);
                    // set links for current page
                    setCurrent_page(result.current_page);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError("error:", error);
                }
            )
    }, [url])
    const updateUrl = (url) => {
        setUrl(url);
    };
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (<div>Loading...</div>);
    } else {


        return (
            <div>
                <ShipmentConditions updateUrl={updateUrl}></ShipmentConditions>
                <div className="pagination row" >
                    {items.map(item => (
                        <div key={item.id} className={"ml-4 col-md-3 mt-4"}>
                            <div className="col-12" style={{ "textAlign": "center" }}>
                                <h4>{item.id}</h4>
                            </div>
                            <div className="col-12" style={{ "textAlign": "center" }}>
                                <Link to={{ pathname: `/shipments/${item.id}` }}>{item.id}</Link>

                            </div>
                            <div className="col-12" style={{ "textAlign": "center" }}>
                                <h4>Total:{item.total}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row ml-4 mt-4">
                    <ul className="pagination">
                        {first_page_url ? (
                            <li className="page-item"><a className="page-link" onClick={() => { updateUrl(first_page_url) }} href="#">First Page</a></li>
                        ) : (
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">First Page</a>
                                </li>
                            )}
                        {prev_page_url ? (
                            <li className="page-item"><a className="page-link" href="#" onClick={() => { updateUrl(prev_page_url) }}><i className="fa fa-angle-double-left"></i></a></li>
                        ) : (

                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1"><i className="fa fa-angle-double-left"></i></a>
                                </li>

                            )}
                        <li className="page-item active">
                            <a className="page-link" href="#">{current_page} <span className="sr-only">(current)</span></a>
                        </li>
                        {next_page_url ? (
                            <li className="page-item"><a onClick={() => { updateUrl(next_page_url) }} className="page-link" href="#" ><i className="fa fa-angle-double-right"></i></a></li>
                        ) : (

                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1" href="#"><i className="fa fa-angle-double-right"></i></a>
                                </li>

                            )}
                        {last_page_url ? (
                            <li className="page-item"><a className="page-link" href="#" onClick={() => { updateUrl(last_page_url) }}>Last Page</a></li>
                        ) : (
                                <li className="page-item disabled">
                                    <a className="page-link" href="#" tabIndex="-1">Last Page</a>
                                </li>
                            )}


                    </ul>
                </div>

            </div >
        );

    }

}