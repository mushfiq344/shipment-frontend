import React, { useState } from "react";

const ShipmentConditions = (props) => {
    const [text, setText] = useState("");
    const [searchCon, setSearchCon] = useState("select");
    const [searchValue, setSearchValue] = useState("http://127.0.0.1:8000/api/allShipments");

    const setCriteriaAsText = (e) => {
        setText(e.target.value)
        setSearchCon("text");
        //setSearchValue("http://127.0.0.1:8000/api/shipmentsSearchByName/" + e.target.value);
        props.updateUrl("http://127.0.0.1:8000/api/shipmentsSearchByName/" + e.target.value)
    }
    const setCriteriaAsSelect = (e) => {

        setSearchCon("select");
        if (e.target.value == "total") {
            props.updateUrl("http://127.0.0.1:8000/api/shipmentsOrderByTotal")
            //setSearchValue("http://127.0.0.1:8000/api/shipmentsOrderByTotal");
        }
        else if (e.target.value == "id") {
            props.updateUrl("http://127.0.0.1:8000/api/shipmentsOrderById")
            // setSearchValue("http://127.0.0.1:8000/api/shipmentsOrderById");
        }

    }

    console.log("result value:", searchValue)


    return (
        <div>
            {/* searching criteria here */}
            <div className="row">
                <div className="col-6">
                    <input className="form-control" value={text} onChange={(e) => setCriteriaAsText(e)} placeholder="Type here to search by name"></input>
                </div>
                <div className="col-6">
                    <select className="form-control" onChange={(e) => setCriteriaAsSelect(e)} defaultValue="id">
                        <option value="id">ID</option>
                        <option value="total">Total</option>
                    </select>
                </div>
            </div>



        </div>

    )
}
export { ShipmentConditions }