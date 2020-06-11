import React, { useState, useEffect } from "react";
import { remoteServer } from "../../variables";
import axios from 'axios';
import {
    withRouter
} from 'react-router-dom'


const SingleShipment = (props) => {
    const { match: { params } } = props;
    const [name, setName] = useState("");
    const [mode, setMode] = useState("");
    const [type, setType] = useState("");
    const [destination, setDestination] = useState("");
    const [origin, setOrigin] = useState("");
    const [total, setTotal] = useState(0);
    const [status, setStatus] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(() => {
        let url = remoteServer + '/shipmentById/' + params.id;

        fetch(url, {
            method: 'GET',
            headers: {

                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("shipment", result)
                    setName(result.name);
                    setMode(result.mode);
                    setType(result.type);
                    setDestination(result.destination);
                    setOrigin(result.origin);
                    setTotal(result.total);
                    setStatus(result.status);
                    setUserId(result.userId);
                    console.log("status", status);

                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    props.history.push('/shipments');
                }
            )
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = new FormData();
        data.append('id', params.id);
        data.append('name', name);
        data.append('mode', mode);
        data.append('type', type);
        data.append('destination', destination);
        data.append('origin', origin);
        data.append('total', total);
        data.append('status', status);
        data.append('userId', userId);

        axios.post(remoteServer + '/updateShipment', data, {
            headers: { "Content-Type": "multipart/form-data", ctype: 'multipart/form-data' }
        })
            .then(function (response) {

                console.log("response", response)
                props.history.push('/shipments');
            })
            .catch(function (error) {
                alert(error)
            });



    }


    return (
        <div className="row">
            <div className="col-12">
                <form className="theme-form mega-form" onSubmit={handleSubmit} ctype='multipart/form-data'>
                    <div className="card">
                        <div className="card-header">
                            <h5>Edit Shipment  {params.id}</h5>
                        </div>
                        <div className="card-body">


                            <div className="form-group ">
                                <label className="col-form-label">Name</label>
                                < input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="form-group ">
                                <label className="col-form-label">Mode</label>
                                < input className="form-control" type="text" value={mode} onChange={(e) => setMode(e.target.value)} required />

                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Type</label>
                                < input className="form-control" type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Destination</label>
                                < input className="form-control" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Origin</label>
                                < input className="form-control" type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />

                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Total</label>
                                < input className="form-control" type="number" step="1" min="0" value={total} onChange={(e) => setTotal(e.target.value)} required />

                            </div>
                            <div className="form-group">
                                <label className="col-form-label">Status</label>
                                < input className="form-control" type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />

                            </div>
                            <div className="form-group">
                                <label className="col-form-label">User ID</label>
                                < input className="form-control" type="text" step="1" min="0" value={userId} onChange={(e) => setUserId(e.target.value)} required />

                            </div>
                            <hr className="mt-4 mb-4" />
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary mr-1">Submit</button>

                        </div>
                    </div>
                </form>
            </div>

        </div >
    );
}

export { SingleShipment }